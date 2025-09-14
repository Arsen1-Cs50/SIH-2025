import React from 'react';
import { Mountain } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Mountain className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg">Jharkhand Tourism</span>
            </div>
            <p className="text-gray-400 mb-4">
              Discover the hidden gems of India's heartland with our curated travel experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#attractions" className="text-gray-400 hover:text-white transition-colors">Attractions</a></li>
              <li><a href="#culture" className="text-gray-400 hover:text-white transition-colors">Culture</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Travel Packages</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Events & Festivals</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">How to Book</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i>
                Tourism House, Ranchi, Jharkhand
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone mr-2"></i>
                +91 9876543210
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2"></i>
                info@jharkhandtourism.com
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2023 Jharkhand Tourism. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;