
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="text-2xl font-semibold flex items-center space-x-2 mb-6">
              <span className="text-synergi-500">Synergi</span>
              <span className="text-gray-800">Hub</span>
            </Link>
            <p className="text-gray-600 mb-6">
              Providing accessible mental healthcare for everyone in India through technology and compassion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-synergi-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-synergi-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-synergi-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-synergi-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/doctors" className="text-gray-600 hover:text-synergi-500 transition-colors">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="text-gray-600 hover:text-synergi-500 transition-colors">
                  Mental Health Assessment
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-synergi-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-synergi-500 transition-colors">
                  Blog & Resources
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-synergi-500 transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* For Patients */}
          <div>
            <h3 className="text-lg font-semibold mb-6">For Patients</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/register" className="text-gray-600 hover:text-synergi-500 transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/conditions" className="text-gray-600 hover:text-synergi-500 transition-colors">
                  Mental Health Conditions
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-synergi-500 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-600 hover:text-synergi-500 transition-colors">
                  Patient Testimonials
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-synergi-500 transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-synergi-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">
                  123 Mental Health Street, Bangalore, Karnataka 560001, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-synergi-500" />
                <span className="text-gray-600">+91 9876543210</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-synergi-500" />
                <span className="text-gray-600">contact@synergihub.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} SynergiHub. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-500 hover:text-synergi-500 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-synergi-500 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-500 hover:text-synergi-500 text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
