import React from 'react';
import { Shield, MapPin, Calendar, MessageCircle } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Blockchain Security",
      description: "Secure transactions with blockchain technology"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Interactive Maps",
      description: "Explore with detailed route planning"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Smart Itinerary",
      description: "AI-powered trip customization"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "24/7 AI Support",
      description: "Instant assistance for all queries"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-40 h-40 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -left-20 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-teal-200/20 rounded-full blur-xl animate-float"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 px-4 animate-slide-in-up">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Experience the Future of Travel
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full animate-pulse-glow"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 text-center sm:text-left relative overflow-hidden border border-white/50"
              style={{
                animationDelay: `${index * 0.2}s`,
                animation: 'slide-in-up 0.6s ease-out forwards'
              }}
            >
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Icon container with enhanced animations */}
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mb-4 text-emerald-600 mx-auto sm:mx-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 group-hover:animate-wiggle">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base group-hover:text-gray-700 transition-colors duration-300">
                {feature.description}
              </p>
              
              {/* Decorative corner element */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Call to action section */}
        <div className="text-center mt-12 animate-slide-in-up" style={{animationDelay: '0.8s'}}>
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <span className="text-emerald-600 font-semibold">Learn More About Our Features</span>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;