import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = () => setIsOpen(false);

  const isActive = (path) => {
    return location.pathname === path
      ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text border-b-2 border-purple-500 pb-1'
      : 'text-white hover:text-purple-400';
  };

  return (
    <header className="md:fixed w-full z-50 transition-all duration-300 bg-gray-950/90 backdrop-blur-md py-3 md:py-4 shadow-lg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text"
          >
            Manasa Aila
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-8 text-base">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/projects" className={isActive('/projects')}>Projects</Link>
            <Link to="/about" className={isActive('/about')}>About</Link>
            <Link to="/contact" className={isActive('/contact')}>Contact</Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav menu */}
      <div
        className={`md:hidden bg-gray-950/95 backdrop-blur-md overflow-hidden transition-max-height duration-300 ease-in-out ${
          isOpen ? 'max-h-60 py-4' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col space-y-4 px-6 text-white">
          <Link to="/" className={isActive('/')} onClick={handleLinkClick}>Home</Link>
          <Link to="/projects" className={isActive('/projects')} onClick={handleLinkClick}>Projects</Link>
          <Link to="/about" className={isActive('/about')} onClick={handleLinkClick}>About</Link>
          <Link to="/contact" className={isActive('/contact')} onClick={handleLinkClick}>Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
