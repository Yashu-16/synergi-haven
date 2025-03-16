
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="pt-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-synergi-100 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute top-40 -left-20 w-72 h-72 bg-synergi-200 rounded-full opacity-40 blur-3xl"></div>
      
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 animate-fade-in-up">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-synergi-100 text-synergi-700 text-sm font-medium">
              Mental Healthcare Platform for India
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your Journey to <span className="text-synergi-500">Mental Wellness</span> Begins Here
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
              Connect with experienced mental health professionals and start your journey towards emotional well-being through personalized virtual counseling.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asChild className="bg-synergi-400 hover:bg-synergi-500 text-white px-8 py-6 text-lg">
                <Link to="/assessment">Take Assessment</Link>
              </Button>
              <Button asChild variant="outline" className="border-synergi-300 text-synergi-700 hover:bg-synergi-50 px-8 py-6 text-lg">
                <Link to="/doctors" className="inline-flex items-center">
                  Find Doctors
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-12 md:mt-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-synergi-200 to-synergi-300/30 rounded-3xl transform rotate-3 scale-105"></div>
              <img 
                src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Mental wellness consultation" 
                className="relative z-10 rounded-3xl shadow-xl object-cover w-full h-[500px]"
              />
              <div className="glass-card absolute -bottom-6 -right-6 py-4 px-6 rounded-2xl z-20 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="font-medium">300+ Doctors Online Now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
