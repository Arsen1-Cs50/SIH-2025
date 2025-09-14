import React from 'react';
import { MapPin } from 'lucide-react';

const MapSection = () => {
  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">Plan Your Route</h2>
          <p className="text-lg sm:text-xl text-gray-600 px-4">Interactive maps with detailed travel information</p>
        </div>
        
        <div className="bg-gray-100 rounded-2xl h-64 sm:h-80 lg:h-96 flex items-center justify-center shadow-lg">
          <div className="text-center px-4">
            <MapPin className="h-12 w-12 sm:h-16 sm:w-16 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-bold mb-2">Interactive Map</h3>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">Explore destinations, routes, and travel information</p>
            <button className="bg-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-emerald-700 transition-colors text-sm sm:text-base">
              Launch Map
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;