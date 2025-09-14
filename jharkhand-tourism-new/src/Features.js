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
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900 px-4">
          Experience the Future of Travel
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 text-center sm:text-left">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 text-emerald-600 mx-auto sm:mx-0">
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;