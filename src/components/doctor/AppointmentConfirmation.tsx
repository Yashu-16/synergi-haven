
import React from 'react';
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check } from "lucide-react";

interface AppointmentConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: {
    name: string;
    specialty: string;
    image: string;
    consultationFee: number;
    firstConsultFree?: boolean;
  };
  appointmentDetails: {
    date: Date | null;
    time: string | null;
    type: string;
  };
  onConfirm: () => void;
}

const AppointmentConfirmation: React.FC<AppointmentConfirmationProps> = ({
  open,
  onOpenChange,
  doctor,
  appointmentDetails,
  onConfirm
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            onClick={() => onOpenChange(false)}
            className="border-gray-200"
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            className="bg-synergi-500 hover:bg-synergi-600 text-white"
          >
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentConfirmation;
