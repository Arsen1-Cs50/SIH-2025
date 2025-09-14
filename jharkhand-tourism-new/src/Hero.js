import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const heroSlides = [
    {
      title: "Discover the Heart of India",
      subtitle: "Experience Jharkhand's pristine waterfalls, lush forests, and rich tribal culture",
      image: "bg-gradient-to-r from-emerald-800 via-green-700 to-teal-600"
    },
    {
      title: "Ancient Temples & Sacred Sites", 
      subtitle: "Journey through centuries of spiritual heritage and architectural marvels",
      image: "bg-gradient-to-r from-amber-800 via-orange-700 to-red-600"
    },
    {
      title: "Adventure Awaits",
      subtitle: "Trek through dense forests, explore caves, and witness incredible wildlife",
      image: "bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-600"
    }
  ];

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-0">
      {/* Background Slide */}
      <div className={`absolute inset-0 ${heroSlides[currentSlide].image} transition-all duration-1000`}>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
          {heroSlides[currentSlide].title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
          {heroSlides[currentSlide].subtitle}
        </p>
        
        {/* Search Bar */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-1 sm:p-2 max-w-sm sm:max-w-2xl mx-auto mb-6 sm:mb-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="w-full flex-1 flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-0">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Where do you want to explore?"
                className="w-full text-gray-700 bg-transparent outline-none text-sm sm:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button 
              onClick={handleSearch}
              className="bg-emerald-600 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-emerald-700 transition-colors text-sm sm:text-base font-medium w-full sm:w-auto"
            >
              Search
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
          <button className="bg-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-emerald-700 transition-all transform hover:scale-105 font-semibold text-sm sm:text-base">
            Plan Your Journey
          </button>
          <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105 font-semibold text-sm sm:text-base">
            Virtual Tour
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
        {heroSlides.map((_, index) => (
          <button 
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white/40'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;