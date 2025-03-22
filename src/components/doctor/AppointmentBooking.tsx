
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Video, User, Check, AlertTriangle } from "lucide-react";
import DatePicker from './DatePicker';
import TimeSlots from './TimeSlots';
import AppointmentConfirmation from './AppointmentConfirmation';

interface AppointmentBookingProps {
  doctor: any;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  timeSlots: { time: string; isAvailable: boolean }[];
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  availableDates: Date[];
  unavailableDates: Date[];
  appointmentDetails: {
    date: Date | null;
    time: string | null;
    type: string;
  };
  setAppointmentDetails: (details: any) => void;
  confirmationOpen: boolean;
  setConfirmationOpen: (open: boolean) => void;
  calendarOpen: boolean;
  setCalendarOpen: (open: boolean) => void;
  handleConfirmBooking: () => void;
}

const AppointmentBooking: React.FC<AppointmentBookingProps> = ({
  doctor,
  date,
  setDate,
  timeSlots,
  selectedTime,
  setSelectedTime,
  availableDates,
  unavailableDates,
  appointmentDetails,
  setAppointmentDetails,
  confirmationOpen,
  setConfirmationOpen,
  calendarOpen,
  setCalendarOpen,
  handleConfirmBooking
}) => {
  const { user } = useAuth();
  const [consultType, setConsultType] = useState<"online" | "in-person">("online");

  const isDayUnavailable = (day: Date) => {
    return unavailableDates.some(unavailableDate => 
      unavailableDate.getDate() === day.getDate() &&
      unavailableDate.getMonth() === day.getMonth() &&
      unavailableDate.getFullYear() === day.getFullYear()
    );
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setCalendarOpen(false);
    }
  };

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleBookAppointment = () => {
    if (!user) {
      return;
    }
    
    if (!selectedTime) {
      return;
    }

    setAppointmentDetails({
      date: date || null,
      time: selectedTime,
      type: consultType,
    });
    setConfirmationOpen(true);
  };

  return (
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
              <DatePicker 
                date={date}
                availableDates={availableDates}
                onSelectDate={handleDateSelect}
                isOpen={calendarOpen}
                setIsOpen={setCalendarOpen}
                isDayUnavailable={isDayUnavailable}
              />

              <div className="mt-4">
                <h3 className="font-medium mb-2">Available Time Slots</h3>
                <TimeSlots 
                  timeSlots={timeSlots}
                  selectedTime={selectedTime}
                  onSelectTime={handleTimeSlotSelect}
                />
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
                className="w-full bg-synergi-500 hover:bg-synergi-600 text-white shadow-lg shadow-synergi-200 transition-all" 
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
                  
                  <DatePicker 
                    date={date}
                    availableDates={availableDates}
                    onSelectDate={handleDateSelect}
                    isOpen={calendarOpen}
                    setIsOpen={setCalendarOpen}
                    isDayUnavailable={isDayUnavailable}
                  />

                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Available Time Slots</h3>
                    <TimeSlots 
                      timeSlots={timeSlots}
                      selectedTime={selectedTime}
                      onSelectTime={handleTimeSlotSelect}
                    />
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
                    className="w-full bg-synergi-500 hover:bg-synergi-600 text-white shadow-lg shadow-synergi-200 transition-all" 
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

      <AppointmentConfirmation 
        open={confirmationOpen}
        onOpenChange={setConfirmationOpen}
        doctor={doctor}
        appointmentDetails={appointmentDetails}
        onConfirm={handleConfirmBooking}
      />
    </div>
  );
};

export default AppointmentBooking;
