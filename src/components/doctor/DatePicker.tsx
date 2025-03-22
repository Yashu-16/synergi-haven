
import React from 'react';
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

interface DatePickerProps {
  date: Date | undefined;
  availableDates: Date[];
  onSelectDate: (date: Date | undefined) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isDayUnavailable: (day: Date) => boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  date,
  availableDates,
  onSelectDate,
  isOpen,
  setIsOpen,
  isDayUnavailable
}) => {
  return (
    <div>
      <h3 className="font-medium mb-2">Select Date</h3>
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal border border-gray-200 p-6 bg-white"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "MMMM do, yyyy") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onSelectDate}
            availableDates={availableDates}
            disabled={(currentDate) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const fourWeeksFromNow = new Date(today);
              fourWeeksFromNow.setDate(today.getDate() + 28);
              
              return (
                currentDate < today || 
                currentDate > fourWeeksFromNow || 
                isDayUnavailable(currentDate)
              );
            }}
            className="border rounded-md"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
