import React from 'react';

const Culture = () => {
  return (
    <section id="culture" className="py-12 sm:py-16 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-900 text-center lg:text-left">
              Rich Cultural Heritage
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 text-center lg:text-left">
              Jharkhand is home to diverse tribal communities, each with unique traditions, 
              festivals, and art forms that have been preserved for centuries.
            </p>
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-gray-700 text-sm sm:text-base">32+ Tribal Communities</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-gray-700 text-sm sm:text-base">Traditional Festivals & Celebrations</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-gray-700 text-sm sm:text-base">Ancient Art & Craft Traditions</span>
              </div>
            </div>
            <div className="text-center lg:text-left">
              <button className="bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-orange-700 transition-all transform hover:scale-105 font-semibold text-sm sm:text-base">
                Explore Culture
              </button>
            </div>
          </div>
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-3 sm:gap-4 max-w-sm sm:max-w-md mx-auto lg:max-w-none">
            <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl sm:rounded-2xl h-32 sm:h-40 lg:h-48"></div>
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl sm:rounded-2xl h-32 sm:h-40 lg:h-48 mt-4 sm:mt-6 lg:mt-8"></div>
            <div className="bg-gradient-to-br from-red-400 to-pink-500 rounded-xl sm:rounded-2xl h-32 sm:h-40 lg:h-48 -mt-4 sm:-mt-6 lg:-mt-8"></div>
            <div className="bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl sm:rounded-2xl h-32 sm:h-40 lg:h-48"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Culture;