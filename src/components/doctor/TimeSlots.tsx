
import React from 'react';
import { Button } from "@/components/ui/button";

interface TimeSlotsProps {
  timeSlots: { time: string; isAvailable: boolean }[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

const TimeSlots: React.FC<TimeSlotsProps> = ({ 
  timeSlots, 
  selectedTime, 
  onSelectTime 
}) => {
  if (timeSlots.length === 0) {
    return (
      <div className="text-center py-6 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No available slots for the selected date</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {timeSlots.map((slot, idx) => (
        <Button
          key={idx}
          variant={selectedTime === slot.time ? "default" : "outline"}
          className={`${
            !slot.isAvailable 
              ? "opacity-50 cursor-not-allowed" 
              : selectedTime === slot.time
                ? "bg-synergi-500 text-white"
                : "hover:bg-synergi-50 hover:text-synergi-700"
          }`}
          onClick={() => slot.isAvailable && onSelectTime(slot.time)}
          disabled={!slot.isAvailable}
        >
          {slot.time}
        </Button>
      ))}
    </div>
  );
};

export default TimeSlots;
