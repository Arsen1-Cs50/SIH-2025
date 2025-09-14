import React, { useState } from 'react';
import { MapPin, Users, Zap } from 'lucide-react';

const Booking = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingType, setBookingType] = useState('');

  const handleBooking = (type) => {
    setBookingType(type);
    setShowBookingModal(true);
  };

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">Book Your Experience</h2>
          <p className="text-lg sm:text-xl text-gray-600 px-4">Secure, seamless booking for hotels, tours, and activities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto md:mx-0">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg sm:text-xl mb-4 text-center md:text-left">Hotels & Stays</h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base text-center md:text-left">Find the perfect accommodation for your journey</p>
            <button 
              onClick={() => handleBooking('hotel')}
              className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Book Hotels
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto md:mx-0">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-bold text-lg sm:text-xl mb-4 text-center md:text-left">Tour Packages</h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base text-center md:text-left">Guided tours for the best experiences</p>
            <button 
              onClick={() => handleBooking('tour')}
              className="w-full bg-green-600 text-white py-2 sm:py-3 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
            >
              Book Tours
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto md:mx-0">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-lg sm:text-xl mb-4 text-center md:text-left">Activities</h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base text-center md:text-left">Adventure activities and experiences</p>
            <button 
              onClick={() => handleBooking('activity')}
              className="w-full bg-purple-600 text-white py-2 sm:py-3 rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
            >
              Book Activities
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Book {bookingType}</h3>
            <p className="text-gray-600 mb-6">Booking functionality will be implemented here.</p>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowBookingModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button className="flex-1 bg-emerald-600 text-white py-2 rounded-lg">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Booking;