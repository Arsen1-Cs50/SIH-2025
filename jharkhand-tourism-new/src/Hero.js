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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-float" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-blue-500/20 rounded-full blur-lg animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Background Slide */}
      <div className={`absolute inset-0 ${heroSlides[currentSlide].image} transition-all duration-1000 animate-gradient-shift`}>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight animate-fade-in-scale">
          <span className="inline-block animate-slide-in-up" style={{animationDelay: '0.2s'}}>
            {heroSlides[currentSlide].title}
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed animate-slide-in-up" style={{animationDelay: '0.4s'}}>
          {heroSlides[currentSlide].subtitle}
        </p>
        
        {/* Search Bar */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-1 sm:p-2 max-w-sm sm:max-w-2xl mx-auto mb-6 sm:mb-8 shadow-2xl animate-slide-in-up hover-lift" style={{animationDelay: '0.6s'}}>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="w-full flex-1 flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-0">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0 animate-bounce-slow" />
              <input 
                type="text" 
                placeholder="Where do you want to explore?"
                className="w-full text-gray-700 bg-transparent outline-none text-sm sm:text-base focus:placeholder-transparent transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                onFocus={(e) => e.target.parentElement.parentElement.classList.add('ring-2', 'ring-emerald-500')}
                onBlur={(e) => e.target.parentElement.parentElement.classList.remove('ring-2', 'ring-emerald-500')}
              />
            </div>
            <button 
              onClick={handleSearch}
              className="bg-emerald-600 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-emerald-700 transition-all transform hover:scale-105 hover-glow text-sm sm:text-base font-medium w-full sm:w-auto relative overflow-hidden group"
            >
              <span className="relative z-10">Search</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto animate-slide-in-up" style={{animationDelay: '0.8s'}}>
          <button className="bg-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-emerald-700 transition-all transform hover:scale-105 hover-glow font-semibold text-sm sm:text-base relative overflow-hidden group">
            <span className="relative z-10">Plan Your Journey</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
          <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105 font-semibold text-sm sm:text-base relative overflow-hidden group">
            <span className="relative z-10">Virtual Tour</span>
            <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 animate-slide-in-up" style={{animationDelay: '1s'}}>
        {heroSlides.map((_, index) => (
          <button 
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 hover:scale-125 ${
              index === currentSlide ? 'bg-white animate-pulse-glow' : 'bg-white/40 hover:bg-white/60'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;