
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { addDays, addWeeks, isSameDay, isFuture } from "date-fns";
import { doctorsData } from "@/utils/data";
import { generateUnavailableDates, getTimeSlots } from "@/utils/appointmentUtils";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import DoctorInfo from '@/components/doctor/DoctorInfo';
import AppointmentBooking from '@/components/doctor/AppointmentBooking';

const DoctorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const doctor = doctorsData.find(doc => doc.id === id);
  const { toast } = useToast();
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<{time: string, isAvailable: boolean}[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState<{
    date: Date | null;
    time: string | null;
    type: string;
  }>({
    date: null,
    time: null,
    type: "online",
  });
  
  useEffect(() => {
    if (doctor) {
      const today = new Date();
      const unavailableDays = generateUnavailableDates(doctor.id);
      setUnavailableDates(unavailableDays);
      
      const allDates = Array.from({ length: 30 }, (_, i) => addDays(today, i + 1));
      const availableDays = allDates.filter(date => 
        !unavailableDays.some(unavailDate => isSameDay(date, unavailDate))
      );
      setAvailableDates(availableDays);
    }
  }, [doctor]);
  
  useEffect(() => {
    if (date && doctor) {
      setTimeSlots(getTimeSlots(doctor.id, date));
      setSelectedTime(null);
    }
  }, [date, doctor]);

  const handleConfirmBooking = () => {
    toast({
      title: "Appointment Booked!",
      description: `Your ${appointmentDetails.type} appointment with ${doctor?.name} on ${date?.toLocaleDateString()} at ${selectedTime} has been confirmed. The doctor has been notified.`,
    });
    
    setConfirmationOpen(false);
    setSelectedTime(null);
  };

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-24 pb-20 container mx-auto px-6">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Doctor Not Found</h1>
            <p className="mb-8">The doctor you're looking for doesn't exist or may have been removed.</p>
            <Button asChild>
              <Link to="/doctors">Browse All Doctors</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <Link to="/doctors" className="text-synergi-600 hover:text-synergi-800 flex items-center">
              ← Back to Doctors
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <DoctorInfo doctor={doctor} />
            </div>
            
            <AppointmentBooking 
              doctor={doctor}
              date={date}
              setDate={setDate}
              timeSlots={timeSlots}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              availableDates={availableDates}
              unavailableDates={unavailableDates}
              appointmentDetails={appointmentDetails}
              setAppointmentDetails={setAppointmentDetails}
              confirmationOpen={confirmationOpen}
              setConfirmationOpen={setConfirmationOpen}
              calendarOpen={calendarOpen}
              setCalendarOpen={setCalendarOpen}
              handleConfirmBooking={handleConfirmBooking}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DoctorProfile;
