
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import {
  Star,
  Award,
  Globe,
  Clock,
  GraduationCap,
  Languages,
  Check
} from 'lucide-react';

interface DoctorInfoProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    reviews: number;
    image: string;
    experience: number;
    availability: string;
    nextAvailable: string;
    bio: string;
    specializations: string[];
    education?: string[];
    languages?: string[];
    consultationFee: number;
    firstConsultFree?: boolean;
  };
}

const DoctorInfo: React.FC<DoctorInfoProps> = ({ doctor }) => {
  return (
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
  );
};

export default DoctorInfo;
