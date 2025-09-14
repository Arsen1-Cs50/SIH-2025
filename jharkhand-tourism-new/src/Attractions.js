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
    <section id="attractions" className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">Discover Jharkhand</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            From pristine waterfalls to ancient temples, explore the diverse beauty of Jharkhand
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredAttractions.map((attraction, index) => (
            <div key={index} className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="relative overflow-hidden rounded-t-2xl">
                <div className={`h-48 sm:h-56 lg:h-48 ${attraction.image} transition-transform group-hover:scale-110 duration-500`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all">
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white rounded-lg px-2 py-1 flex items-center space-x-1">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                      <span className="text-xs sm:text-sm font-semibold">{attraction.rating}</span>
                    </div>
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                      <span className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm">
                        {attraction.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-base sm:text-lg mb-2 group-hover:text-emerald-600 transition-colors">
                  {attraction.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{attraction.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {attraction.location}
                  </span>
                  <span>{attraction.bestTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-600">{attraction.price}</span>
                  <button className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-lg text-xs hover:bg-emerald-200 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <button className="bg-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-emerald-700 transition-all transform hover:scale-105 font-semibold text-sm sm:text-base">
            View All Attractions
          </button>
        </div>
      </div>
    </section>
  );
};

export default Attractions;