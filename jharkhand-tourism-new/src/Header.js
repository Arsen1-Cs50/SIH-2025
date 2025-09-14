import React, { useState } from 'react';
import { Menu, X, Mountain } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Mountain className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg sm:text-xl text-gray-900">Jharkhand</h1>
              <p className="text-xs text-gray-600 hidden sm:block">Tourism</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a href="#attractions" className="text-gray-700 hover:text-emerald-600 transition-colors text-sm">Attractions</a>
            <a href="#culture" className="text-gray-700 hover:text-emerald-600 transition-colors text-sm">Culture</a>
            <a href="#adventure" className="text-gray-700 hover:text-emerald-600 transition-colors text-sm">Adventure</a>
            <a href="#travel" className="text-gray-700 hover:text-emerald-600 transition-colors text-sm">Travel Guide</a>
            <button className="bg-emerald-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-emerald-700 transition-colors">
              Book Now
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 bg-white">
            <div className="flex flex-col space-y-3">
              <a 
                href="#attractions" 
                className="text-gray-700 hover:text-emerald-600 transition-colors py-2 text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                Attractions
              </a>
              <a 
                href="#culture" 
                className="text-gray-700 hover:text-emerald-600 transition-colors py-2 text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                Culture
              </a>
              <a 
                href="#adventure" 
                className="text-gray-700 hover:text-emerald-600 transition-colors py-2 text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                Adventure
              </a>
              <a 
                href="#travel" 
                className="text-gray-700 hover:text-emerald-600 transition-colors py-2 text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                Travel Guide
              </a>
              <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors w-full mt-2">
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;