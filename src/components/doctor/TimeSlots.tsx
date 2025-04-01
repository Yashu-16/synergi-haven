
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <div className="grid grid-cols-3 gap-3">
      {timeSlots.map((slot, idx) => (
        <Button
          key={idx}
          variant={selectedTime === slot.time ? "default" : "outline"}
          className={cn(
            "transition-all",
            !slot.isAvailable 
              ? "opacity-40 cursor-not-allowed bg-gray-100" 
              : selectedTime === slot.time
                ? "bg-synergi-500 text-white shadow-md shadow-synergi-200"
                : "hover:bg-synergi-50 hover:text-synergi-700 hover:border-synergi-300"
          )}
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
