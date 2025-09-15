import React, { useCallback, useEffect, useRef, useState } from 'react';

const LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
const LEAFLET_JS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';

function loadLeafletResources() {
  return new Promise((resolve) => {
    // If L already available, resolve immediately
    if (typeof window !== 'undefined' && window.L) {
      resolve();
      return;
    }

    // Inject CSS if not present
    const hasCss = Array.from(document.styleSheets).some((sheet) => {
      try {
        // Accessing href may throw for cross-domain sheets
        const href = sheet && sheet.href ? sheet.href : '';
        return typeof href === 'string' && href.includes('leaflet');
      } catch {
        return false;
      }
    });
    if (!hasCss) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = LEAFLET_CSS;
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      document.head.appendChild(link);
    }

    // Inject JS if not present
    const existing = document.querySelector(`script[src="${LEAFLET_JS}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      if (existing.readyState === 'complete') resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = LEAFLET_JS;
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.addEventListener('load', () => resolve(), { once: true });
    document.head.appendChild(script);
  });
}

const touristSpots = [
  { name: 'Hundru Falls', coords: [23.4639, 85.6590], type: 'Waterfall', description: 'Spectacular 322 feet waterfall cascading through rocky terrain', link: '#' },
  { name: 'Betla National Park', coords: [23.8876, 84.1875], type: 'Wildlife', description: 'Home to tigers, elephants and diverse flora and fauna', link: '#' },
  { name: 'Jagannath Temple', coords: [23.3441, 85.3096], type: 'Heritage', description: 'Ancient temple showcasing exquisite Kalinga architecture', link: '#' },
  { name: 'Deoghar - Baidyanath Temple', coords: [24.4823, 86.7000], type: 'Spiritual', description: 'Sacred pilgrimage site with the famous Baidyanath Temple', link: '#' },
  { name: 'Dassam Falls', coords: [23.3594, 85.2552], type: 'Waterfall', description: 'Beautiful waterfall located on the Kanchi River', link: '#' },
  { name: 'Netarhat', coords: [23.4833, 84.2667], type: 'Hill Station', description: "Popular hill station known as the 'Queen of Chotanagpur'", link: '#' },
  { name: 'Patratu Valley', coords: [23.6167, 85.2833], type: 'Scenic', description: 'Serpentine valley with breathtaking views', link: '#' },
  { name: 'Jonha Falls', coords: [23.4289, 85.5450], type: 'Waterfall', description: 'Also known as Gautamdhara, a beautiful waterfall near Ranchi', link: '#' },
  { name: 'Hazaribagh National Park', coords: [24.0167, 85.3500], type: 'Wildlife', description: 'Home to diverse wildlife including tigers, leopards and sambar deer', link: '#' },
  { name: 'Palamau Fort', coords: [24.0833, 84.0667], type: 'Heritage', description: 'Historic fort with great archaeological significance', link: '#' },
  { name: 'Sun Temple', coords: [23.3439, 85.3095], type: 'Spiritual', description: 'Beautiful temple shaped like a chariot with intricate carvings', link: '#' },
  { name: 'McCluskieganj', coords: [23.6333, 85.1667], type: 'Heritage', description: 'Colonial-era town with Anglo-Indian architecture', link: '#' },
  { name: 'Shikharji', coords: [23.9667, 86.1333], type: 'Spiritual', description: 'Sacred pilgrimage site for Jains, believed to be where 20 Tirthankaras attained Nirvana', link: '#' },
  { name: 'Rajrappa Temple', coords: [23.6333, 85.7167], type: 'Spiritual', description: 'Ancient temple dedicated to Goddess Chhinmastika', link: '#' },
  { name: 'Topchanchi Lake', coords: [23.9000, 86.2000], type: 'Scenic', description: 'Serene lake surrounded by hills, perfect for picnics', link: '#' },
  { name: 'Lodh Falls', coords: [23.7333, 84.6167], type: 'Waterfall', description: 'Highest waterfall in Jharkhand, also known as Burhaghagh Falls', link: '#' },
  { name: 'Tilaiya Dam', coords: [24.1833, 85.4333], type: 'Scenic', description: 'Picturesque dam on the Barakar River with boating facilities', link: '#' },
  { name: 'Tagore Hill', coords: [23.3833, 85.3333], type: 'Heritage', description: 'Hill associated with Rabindranath Tagore, offering panoramic views of Ranchi', link: '#' },
  { name: 'Pahari Mandir', coords: [23.3667, 85.3333], type: 'Spiritual', description: 'Hilltop temple dedicated to Lord Shiva with city views', link: '#' },
  { name: 'Dalma Wildlife Sanctuary', coords: [22.9333, 86.2000], type: 'Wildlife', description: 'Sanctuary known for its elephant population and diverse flora', link: '#' },
];

const typeToColor = {
  Waterfall: '#059669',
  Wildlife: '#f59e0b',
  Heritage: '#ef4444',
  Spiritual: '#8b5cf6',
  'Hill Station': '#0ea5e9',
  Scenic: '#ec4899',
};

const MapSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Initialize map when modal opens
  useEffect(() => {
    if (!isOpen) {
      // Cleanup if map exists
      if (mapRef.current) {
        try { mapRef.current.remove(); } catch {}
        mapRef.current = null;
      }
      return;
    }

    let keydownHandler;
    loadLeafletResources().then(() => {
      const L = window.L;
      if (!L || !mapContainerRef.current) return;

      // Create/Reset map
      if (mapRef.current) {
        try { mapRef.current.remove(); } catch {}
      }
      mapRef.current = L.map(mapContainerRef.current).setView([23.6345, 85.3803], 8);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      touristSpots.forEach((spot) => {
        const color = typeToColor[spot.type] || '#059669';
        const iconSvg = `\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="24px" height="24px">\
  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>\
</svg>`;
        const icon = L.icon({
          iconUrl: 'data:image/svg+xml;base64,' + btoa(iconSvg),
          iconSize: [24, 24],
          iconAnchor: [12, 24],
          popupAnchor: [0, -24],
        });
        const marker = L.marker(spot.coords, { icon }).addTo(mapRef.current);
        marker.bindPopup(
          `<div class="map-popup">\
            <h4 style="margin:0 0 8px;color:#059669;">${spot.name}</h4>\
            <p style="margin:0 0 6px;font-size:14px;"><strong>Type:</strong> ${spot.type}</p>\
            <p style="margin:0 0 10px;font-size:14px;">${spot.description}</p>\
            <a href="${spot.link}" style="color:#059669;font-weight:600;">Learn more</a>\
          </div>`
        );
      });

      // Legend control
      const legend = window.L.control({ position: 'bottomright' });
      legend.onAdd = function () {
        const div = window.L.DomUtil.create('div', 'info legend');
        div.style.backgroundColor = 'white';
        div.style.padding = '10px';
        div.style.borderRadius = '5px';
        div.style.boxShadow = '0 0 15px rgba(0,0,0,0.2)';
        const labels = ['<strong>Tourist Attractions</strong>'];
        Object.keys(typeToColor).forEach((t) => {
          labels.push(`<i style="background:${typeToColor[t]}; width:12px; height:12px; display:inline-block; border-radius:50%; margin-right:5px;"></i> ${t}`);
        });
        div.innerHTML = labels.join('<br>');
        return div;
      };
      legend.addTo(mapRef.current);

      // Ensure size after open
      setTimeout(() => mapRef.current && mapRef.current.invalidateSize(), 0);
    });

    // Esc to close
    keydownHandler = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', keydownHandler);
    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, [isOpen, closeModal]);

  // Open modal when any element with data-open-map is clicked (from static index.html)
  useEffect(() => {
    const handler = () => setIsOpen(true);
    const triggers = document.querySelectorAll('[data-open-map]');
    triggers.forEach((el) => el.addEventListener('click', handler));
    return () => {
      triggers.forEach((el) => el.removeEventListener('click', handler));
    };
  }, []);

  return (
    <>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[1000]"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl w-[90%] max-w-[900px] max-h-[85%] p-2 sm:p-3 md:p-4 flex flex-col border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="flex justify-end">
              <button aria-label="Close" onClick={closeModal} className="bg-white/0 border-0 text-xl leading-none cursor-pointer text-slate-500 hover:text-slate-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors hover:bg-slate-100/60 focus:outline-none focus:ring-2 focus:ring-slate-300">×</button>
            </div>
            <div ref={mapContainerRef} className="h-[70vh] w-full rounded-xl overflow-hidden ring-1 ring-black/5" />
          </div>
        </div>
      )}
    </>
  );
};

export default MapSection;