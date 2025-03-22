
import { addDays } from "date-fns";

export const generateUnavailableDates = (doctorId: string) => {
  const today = new Date();
  const unavailableDates: Date[] = [];
  
  for (let i = 1; i <= 30; i++) {
    if (Math.random() > 0.7) {
      const date = addDays(today, i);
      unavailableDates.push(date);
    }
  }
  
  return unavailableDates;
};

export const getTimeSlots = (doctorId: string, date: Date) => {
  const day = date.getDay();
  
  if (day === 0) return [];
  
  const baseSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", 
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];
  
  return baseSlots.map(slot => ({
    time: slot,
    isAvailable: Math.random() > 0.3
  }));
};
