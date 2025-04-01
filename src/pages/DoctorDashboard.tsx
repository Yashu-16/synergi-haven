
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/contexts/AuthContext";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppointmentManager from '@/components/doctor/AppointmentManager';

const DoctorDashboard: React.FC = () => {
  const { user, isAuthenticated, isDoctor } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (!isAuthenticated || !isDoctor) {
      navigate('/login');
    }
  }, [isAuthenticated, isDoctor, navigate]);
  
  if (!isAuthenticated || !isDoctor) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>
          
          <div className="grid grid-cols-1 gap-6">
            <AppointmentManager />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DoctorDashboard;
