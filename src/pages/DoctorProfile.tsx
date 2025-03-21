import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { format, addDays, addWeeks, isSameDay, isToday, isFuture, parseISO } from "date-fns";
import { doctorsData } from "@/utils/data";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Star, 
  Clock, 
  Award, 
  Globe, 
  Mail, 
  Video, 
  User, 
  Calendar as CalendarIcon,
  GraduationCap,
  Languages,
  Check,
  AlertTriangle,
  X
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";

// Generate unavailable dates (in a real app, this would come from an API)
const generateUnavailableDates = (doctorId: string) => {
  const today = new Date();
  const unavailableDates = [];
  
  // Make some random dates unavailable
  for (let i = 1; i <= 30; i++) {
    if (Math.random() > 0.7) { // 30% chance of a date being unavailable
      const date = addDays(today, i);
      unavailableDates.push(date);
    }
  }
  
  return unavailableDates;
};

// Get time slots for a specific day
const getTimeSlots = (doctorId: string, date: Date) => {
  // In a real app, this would come from a backend API
  const day = date.getDay();
  
  // Simulate different availability based on day of week
  if (day === 0) return []; // No slots on Sunday
  
  const baseSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", 
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];
  
  // Randomly mark some slots as booked
  return baseSlots.map(slot => ({
    time: slot,
    isAvailable: Math.random() > 0.3 // 70% chance of being available
  }));
};

const DoctorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const doctor = doctorsData.find(doc => doc.id === id);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<{time: string, isAvailable: boolean}[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [consultType, setConsultType] = useState<"online" | "in-person">("online");
  const [appointmentDetails, setAppointmentDetails] = useState<{
    date: Date | null;
    time: string | null;
    type: string;
  }>({
    date: null,
    time: null,
    type: "online",
  });
  
  // Update unavailable and available dates when doctor changes
  useEffect(() => {
    if (doctor) {
      const today = new Date();
      const unavailableDays = generateUnavailableDates(doctor.id);
      setUnavailableDates(unavailableDays);
      
      // Generate available dates (all dates in the next 30 days except unavailable ones)
      const allDates = Array.from({ length: 30 }, (_, i) => addDays(today, i + 1));
      const availableDays = allDates.filter(date => 
        !unavailableDays.some(unavailDate => isSameDay(date, unavailDate))
      );
      setAvailableDates(availableDays);
    }
  }, [doctor]);
  
  // Update time slots when date changes
  useEffect(() => {
    if (date && doctor) {
      setTimeSlots(getTimeSlots(doctor.id, date));
      setSelectedTime(null);
    }
  }, [date, doctor]);

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
  };

  const handleBookAppointment = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login or register to book an appointment",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedTime) {
      toast({
        title: "Time slot required",
        description: "Please select a time slot for your appointment",
        variant: "destructive",
      });
      return;
    }

    // Open confirmation dialog instead of immediate booking
    setAppointmentDetails({
      date: date || null,
      time: selectedTime,
      type: consultType,
    });
    setConfirmationOpen(true);
  };
  
  const handleConfirmBooking = () => {
    // In a real app, this would be an API call to book the appointment
    toast({
      title: "Appointment Booked!",
      description: `Your ${consultType} appointment with ${doctor?.name} on ${format(date!, 'PPP')} at ${selectedTime} has been confirmed. The doctor has been notified.`,
    });
    
    // Close dialog and reset selection
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

  const isDayUnavailable = (day: Date) => {
    return unavailableDates.some(unavailableDate => 
      isSameDay(day, unavailableDate)
    );
  };

  // Modify the booking section to show only one calendar
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
            {/* Left Column - Doctor Info */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardContent className="p-0">
                  <div className="relative h-48 md:h-64 w-full">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name} 
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    <div className="absolute bottom-4 left-6 text-white">
                      <h1 className="text-3xl font-bold mb-1">{doctor.name}</h1>
                      <p className="flex items-center text-white/90">
                        {doctor.specialty}
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                          {doctor.rating.toFixed(1)} ({doctor.reviews} reviews)
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="bg-gray-50 px-4 py-3 rounded-lg flex items-center">
                        <Award className="text-synergi-500 mr-2" />
                        <div>
                          <p className="text-gray-500 text-sm">Experience</p>
                          <p className="font-medium">{doctor.experience} years</p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 px-4 py-3 rounded-lg flex items-center">
                        <Globe className="text-synergi-500 mr-2" />
                        <div>
                          <p className="text-gray-500 text-sm">Availability</p>
                          <p className="font-medium">{doctor.availability}</p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 px-4 py-3 rounded-lg flex items-center">
                        <Clock className="text-synergi-500 mr-2" />
                        <div>
                          <p className="text-gray-500 text-sm">Next Available</p>
                          <p className="font-medium">{doctor.nextAvailable}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-3">About</h2>
                      <p className="text-gray-700 leading-relaxed">{doctor.bio}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-3">Specializations</h2>
                      <div className="flex flex-wrap gap-2">
                        {doctor.specializations.map((specialization, idx) => (
                          <Badge key={idx} className="bg-synergi-100 text-synergi-800 hover:bg-synergi-200 border-0">
                            {specialization}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-3">Education & Training</h2>
                      <ul className="space-y-3">
                        {doctor.education?.map((edu, idx) => (
                          <li key={idx} className="flex items-start">
                            <GraduationCap className="text-synergi-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">{edu}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-3">Languages</h2>
                      <div className="flex items-center">
                        <Languages className="text-synergi-500 mr-2" />
                        <span className="text-gray-700">{doctor.languages?.join(", ")}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Consultation Fee</h2>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-700">
                            ₹{doctor.consultationFee} per session
                          </p>
                          {doctor.firstConsultFree && (
                            <p className="text-green-600 text-sm font-medium flex items-center mt-1">
                              <Check className="w-4 h-4 mr-1" />
                              First consultation is free
                            </p>
                          )}
                        </div>
                        
                        <Button asChild variant="outline" className="lg:hidden border-synergi-300 text-synergi-700">
                          <a href="#booking-section">Book Appointment</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right Column - Booking */}
            <div id="booking-section">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>
                  
                  <Tabs 
                    defaultValue="online" 
                    className="mb-6"
                    onValueChange={(value) => setConsultType(value as "online" | "in-person")}
                  >
                    <TabsList className="grid grid-cols-2 mb-4">
                      <TabsTrigger value="online" className="flex items-center gap-2">
                        <Video className="h-4 w-4" /> 
                        Online
                      </TabsTrigger>
                      <TabsTrigger value="in-person" disabled={doctor.availability === "Online Only"} className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        In-person
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="online" className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <h3 className="font-medium mb-2">Select Date</h3>
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            availableDates={availableDates}
                            disabled={(currentDate) => {
                              // Can't select dates in the past or unavailable dates
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return (
                                currentDate < today || 
                                currentDate > addWeeks(today, 4) || 
                                isDayUnavailable(currentDate)
                              );
                            }}
                            className="p-3 pointer-events-auto border border-gray-200 rounded-lg"
                          />
                          <div className="flex items-center justify-center text-sm mt-2 text-gray-500">
                            <span className="inline-block w-3 h-3 border-2 border-green-500 rounded-full mr-1"></span>
                            <span>Available dates</span>
                          </div>

                          <div className="mt-4">
                            <h3 className="font-medium mb-2">Available Time Slots</h3>
                            {timeSlots.length > 0 ? (
                              <div className="grid grid-cols-3 gap-2">
                                {timeSlots.map((slot, idx) => (
                                  <Button
                                    key={idx}
                                    variant={selectedTime === slot.time ? "default" : "outline"}
                                    className={`${!slot.isAvailable ? "opacity-50 cursor-not-allowed" : "hover:bg-synergi-50 hover:text-synergi-700"}`}
                                    onClick={() => slot.isAvailable && setSelectedTime(slot.time)}
                                    disabled={!slot.isAvailable}
                                  >
                                    {slot.time}
                                  </Button>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-6 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">No available slots for the selected date</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {doctor.firstConsultFree && (
                        <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-start">
                          <Check className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-green-800">
                            Your first consultation with {doctor.name} will be free of charge. No time limit until we properly understand your concerns.
                          </p>
                        </div>
                      )}
                      
                      {!user && (
                        <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 flex items-start">
                          <AlertTriangle className="text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-amber-800">
                            You need to be logged in to book an appointment. <Link to="/login" className="font-medium underline">Log in</Link> or <Link to="/register" className="font-medium underline">create an account</Link>.
                          </p>
                        </div>
                      )}
                      
                      <Button 
                        className="w-full bg-synergi-500 hover:bg-synergi-600 text-white" 
                        disabled={!selectedTime}
                        onClick={handleBookAppointment}
                      >
                        Book Appointment
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="in-person" className="space-y-4">
                      {doctor.availability === "Online Only" ? (
                        <div className="text-center py-6 bg-gray-50 rounded-lg">
                          <p className="text-gray-500">This doctor is available for online consultations only</p>
                        </div>
                      ) : (
                        <>
                          <div>
                            <h3 className="font-medium mb-2">Address</h3>
                            <p className="text-gray-700">
                              SynergiHub Clinic, 42 Health Avenue, Koramangala<br />
                              Bangalore, Karnataka 560034
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <h3 className="font-medium mb-2">Select Date</h3>
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={handleDateSelect}
                                availableDates={availableDates}
                                disabled={(currentDate) => {
                                  // Can't select dates in the past or unavailable dates
                                  const today = new Date();
                                  today.setHours(0, 0, 0, 0);
                                  return (
                                    currentDate < today || 
                                    currentDate > addWeeks(today, 4) || 
                                    isDayUnavailable(currentDate)
                                  );
                                }}
                                className="p-3 pointer-events-auto border border-gray-200 rounded-lg"
                              />
                              <div className="flex items-center justify-center text-sm mt-2 text-gray-500">
                                <span className="inline-block w-3 h-3 border-2 border-green-500 rounded-full mr-1"></span>
                                <span>Available dates</span>
                              </div>

                              <div className="mt-4">
                                <h3 className="font-medium mb-2">Available Time Slots</h3>
                                {timeSlots.length > 0 ? (
                                  <div className="grid grid-cols-3 gap-2">
                                    {timeSlots.map((slot, idx) => (
                                      <Button
                                        key={idx}
                                        variant={selectedTime === slot.time ? "default" : "outline"}
                                        className={`${!slot.isAvailable ? "opacity-50 cursor-not-allowed" : "hover:bg-synergi-50 hover:text-synergi-700"}`}
                                        onClick={() => slot.isAvailable && setSelectedTime(slot.time)}
                                        disabled={!slot.isAvailable}
                                      >
                                        {slot.time}
                                      </Button>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="text-center py-6 bg-gray-50 rounded-lg">
                                    <p className="text-gray-500">No available slots for the selected date</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {doctor.firstConsultFree && (
                            <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-start">
                              <Check className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-green-800">
                                Your first consultation with {doctor.name} will be free of charge. No time limit until we properly understand your concerns.
                              </p>
                            </div>
                          )}
                          
                          {!user && (
                            <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 flex items-start">
                              <AlertTriangle className="text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-amber-800">
                                You need to be logged in to book an appointment. <Link to="/login" className="font-medium underline">Log in</Link> or <Link to="/register" className="font-medium underline">create an account</Link>.
                              </p>
                            </div>
                          )}
                          
                          <Button 
                            className="w-full bg-synergi-500 hover:bg-synergi-600 text-white" 
                            disabled={!selectedTime}
                            onClick={handleBookAppointment}
                          >
                            Book Appointment
                          </Button>
                        </>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {/* Confirmation Dialog */}
      <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Appointment</DialogTitle>
            <DialogDescription>
              Please review the appointment details before confirming.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="flex items-center">
              <img src={doctor.image} alt={doctor.name} className="w-12 h-12 rounded-full object-cover mr-3" />
              <div>
                <h4 className="font-medium">{doctor.name}</h4>
                <p className="text-sm text-gray-500">{doctor.specialty}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Date:</span>
                <span className="font-medium">{appointmentDetails.date ? format(appointmentDetails.date, 'PPP') : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Time:</span>
                <span className="font-medium">{appointmentDetails.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Type:</span>
                <span className="font-medium capitalize">{appointmentDetails.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fee:</span>
                <span className="font-medium">{doctor.firstConsultFree ? 'Free (First consultation)' : `₹${doctor.consultationFee}`}</span>
              </div>
            </div>
            
            {doctor.firstConsultFree && (
              <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-start">
                <Check className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-green-800">
                  Your first consultation is free with no time limit until we properly understand your concerns.
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setConfirmationOpen(false)}
              className="border-gray-200"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmBooking}
              className="bg-synergi-500 hover:bg-synergi-600 text-white"
            >
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default DoctorProfile;
