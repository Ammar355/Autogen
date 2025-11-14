import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-electric-blue to-electric-teal bg-clip-text text-transparent">
              AutoGen
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive('/') ? 'text-electric-blue' : 'text-charcoal hover:text-electric-blue'
              }`}
            >
              Search
            </Link>
            <Link
              to="/buy"
              className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive('/buy') ? 'text-electric-blue' : 'text-charcoal hover:text-electric-blue'
              }`}
            >
              Buy
            </Link>
            <Link
              to="/sell"
              className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive('/sell') ? 'text-electric-blue' : 'text-charcoal hover:text-electric-blue'
              }`}
            >
              Sell
            </Link>
            <Link
              to="/garage"
              className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive('/garage') ? 'text-electric-blue' : 'text-charcoal hover:text-electric-blue'
              }`}
            >
              My Garage
            </Link>
            <Link
              to="/assistant"
              className="px-4 py-2 bg-electric-blue text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center space-x-2"
            >
              <span>🤖</span>
              <span>AutoGenius</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-charcoal hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block px-3 py-2 rounded-lg font-medium text-charcoal hover:bg-gray-100">
              Search
            </Link>
            <Link to="/buy" className="block px-3 py-2 rounded-lg font-medium text-charcoal hover:bg-gray-100">
              Buy
            </Link>
            <Link to="/sell" className="block px-3 py-2 rounded-lg font-medium text-charcoal hover:bg-gray-100">
              Sell
            </Link>
            <Link to="/garage" className="block px-3 py-2 rounded-lg font-medium text-charcoal hover:bg-gray-100">
              My Garage
            </Link>
            <Link
              to="/assistant"
              className="block px-3 py-2 bg-electric-blue text-white rounded-lg font-semibold text-center"
            >
              🤖 AutoGenius
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

