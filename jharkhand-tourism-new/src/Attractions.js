import React, { useState } from 'react';
import { MapPin, Star } from 'lucide-react';

const Attractions = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const attractions = [
    {
      name: "Hundru Falls",
      type: "Waterfall",
      rating: 4.8,
      image: "bg-gradient-to-br from-blue-400 to-blue-600",
      description: "Spectacular 322 feet waterfall cascading through rocky terrain",
      location: "Ranchi",
      bestTime: "Oct-Feb",
      price: "₹50"
    },
    {
      name: "Betla National Park",
      type: "Wildlife",
      rating: 4.6,
      image: "bg-gradient-to-br from-green-400 to-green-600", 
      description: "Home to tigers, elephants and diverse flora and fauna",
      location: "Latehar",
      bestTime: "Nov-Apr",
      price: "₹200"
    },
    {
      name: "Jagannath Temple",
      type: "Heritage",
      rating: 4.9,
      image: "bg-gradient-to-br from-orange-400 to-red-600",
      description: "Ancient temple showcasing exquisite Kalinga architecture",
      location: "Ranchi",
      bestTime: "Year round",
      price: "Free"
    },
    {
      name: "Deoghar",
      type: "Spiritual",
      rating: 4.7,
      image: "bg-gradient-to-br from-purple-400 to-indigo-600",
      description: "Sacred pilgrimage site with the famous Baidyanath Temple",
      location: "Deoghar",
      bestTime: "Oct-Mar",
      price: "Free"
    },
    {
      name: "Netarhat",
      type: "Hill Station",
      rating: 4.5,
      image: "bg-gradient-to-br from-teal-400 to-cyan-600",
      description: "Queen of Chotanagpur with mesmerizing sunrise views",
      location: "Latehar",
      bestTime: "Oct-Apr",
      price: "₹30"
    },
    {
      name: "Dassam Falls",
      type: "Waterfall",
      rating: 4.4,
      image: "bg-gradient-to-br from-indigo-400 to-purple-600",
      description: "Beautiful waterfall perfect for picnics and photography",
      location: "Ranchi",
      bestTime: "Jul-Mar",
      price: "₹20"
    },
    {
      name: "Palamau Tiger Reserve",
      type: "Wildlife",
      rating: 4.3,
      image: "bg-gradient-to-br from-yellow-400 to-orange-600",
      description: "India's first tiger reserve with rich biodiversity",
      location: "Latehar",
      bestTime: "Nov-Jun",
      price: "₹300"
    },
    {
      name: "Rajrappa Temple",
      type: "Spiritual",
      rating: 4.6,
      image: "bg-gradient-to-br from-pink-400 to-rose-600",
      description: "Ancient Shakti Peeth temple dedicated to Goddess Chinnamasta",
      location: "Ramgarh",
      bestTime: "Oct-Mar",
      price: "Free"
    }
  ];

  const categories = ['all', 'Waterfall', 'Wildlife', 'Heritage', 'Spiritual', 'Hill Station'];
  
  const filteredAttractions = selectedCategory === 'all' 
    ? attractions.filter(attraction => 
        attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attraction.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : attractions.filter(attraction => 
        attraction.type === selectedCategory &&
        (attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         attraction.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  return (
    <section id="attractions" className="py-12 sm:py-16 bg-gradient-to-br from-white via-gray-50 to-emerald-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-blue-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-teal-200/15 rounded-full blur-xl animate-float"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 animate-slide-in-up">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
              Discover Jharkhand
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4 animate-slide-in-up" style={{animationDelay: '0.2s'}}>
            From pristine waterfalls to ancient temples, explore the diverse beauty of Jharkhand
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 mx-auto rounded-full mt-4 animate-pulse-glow"></div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 animate-slide-in-up" style={{animationDelay: '0.4s'}}>
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden group ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg hover:shadow-xl'
                  : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 border border-gray-200'
              }`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <span className="relative z-10">{category === 'all' ? 'All' : category}</span>
              {selectedCategory === category && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 animate-pulse"></div>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredAttractions.map((attraction, index) => (
            <div 
              key={index} 
              className="group cursor-pointer bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 relative overflow-hidden border border-white/50"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'slide-in-up 0.6s ease-out forwards'
              }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative overflow-hidden rounded-t-2xl">
                <div className={`h-48 sm:h-56 lg:h-48 ${attraction.image} transition-all duration-700 group-hover:scale-110 group-hover:rotate-1`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                    {/* Animated overlay pattern */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
                    </div>
                    
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1 group-hover:scale-110 transition-transform duration-300">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current animate-pulse" />
                      <span className="text-xs sm:text-sm font-semibold">{attraction.rating}</span>
                    </div>
                    
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                      <span className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm group-hover:bg-emerald-500/80 transition-colors duration-300">
                        {attraction.type}
                      </span>
                    </div>

                    {/* Floating elements on hover */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 relative z-10">
                <h3 className="font-bold text-base sm:text-lg mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                  {attraction.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 group-hover:text-gray-700 transition-colors duration-300">
                  {attraction.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span className="flex items-center group-hover:text-emerald-600 transition-colors duration-300">
                    <MapPin className="h-3 w-3 mr-1 group-hover:animate-bounce-slow" />
                    {attraction.location}
                  </span>
                  <span className="group-hover:text-emerald-600 transition-colors duration-300">{attraction.bestTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300">
                    {attraction.price}
                  </span>
                  <button className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-lg text-xs hover:bg-emerald-200 hover:scale-105 transition-all duration-300 group-hover:shadow-md">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Decorative corner elements */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{transitionDelay: '0.1s'}}></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12 animate-slide-in-up" style={{animationDelay: '0.6s'}}>
          <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105 hover:shadow-xl font-semibold text-sm sm:text-base relative overflow-hidden group">
            <span className="relative z-10">View All Attractions</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Attractions;