
import React from 'react';
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { isPastDate, isDateInRange } from "@/utils/appointmentUtils";

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
            className="w-full justify-start text-left font-normal border border-gray-200 p-6 bg-white hover:bg-gray-50"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "MMMM do, yyyy") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white z-50" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onSelectDate}
            initialFocus={true}
            disabled={(currentDate) => {
              return isPastDate(currentDate) || !isDateInRange(currentDate) || isDayUnavailable(currentDate);
            }}
            className="border rounded-md"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
