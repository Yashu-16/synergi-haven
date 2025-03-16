
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Check if page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-semibold flex items-center space-x-2"
          >
            <span className="text-synergi-500">Synergi</span>
            <span className="text-gray-800">Hub</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-synergi-500 transition-colors duration-300">
              Home
            </Link>
            <Link to="/doctors" className="text-gray-700 hover:text-synergi-500 transition-colors duration-300">
              Doctors
            </Link>
            <Link to="/assessment" className="text-gray-700 hover:text-synergi-500 transition-colors duration-300">
              Assessment
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-synergi-500 transition-colors duration-300">
              About
            </Link>
            <Button asChild variant="outline" className="border-synergi-300 text-synergi-700 hover:bg-synergi-50">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="bg-synergi-400 hover:bg-synergi-500 text-white">
              <Link to="/register">Register</Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-synergi-500 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-in">
            <div className="flex flex-col space-y-4 p-6">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-synergi-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/doctors" 
                className="text-gray-700 hover:text-synergi-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Doctors
              </Link>
              <Link 
                to="/assessment" 
                className="text-gray-700 hover:text-synergi-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Assessment
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-synergi-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <div className="flex space-x-4 pt-2">
                <Button asChild variant="outline" className="w-full border-synergi-300 text-synergi-700">
                  <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                </Button>
                <Button asChild className="w-full bg-synergi-400 hover:bg-synergi-500 text-white">
                  <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
