
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Award, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface DoctorProps {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  reviews: number;
  image: string;
  availability: string;
  specializations: string[];
  nextAvailable: string;
}

const DoctorCard: React.FC<{ doctor: DoctorProps }> = ({ doctor }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 hover-lift">
      <div className="relative">
        <img 
          src={doctor.image} 
          alt={doctor.name} 
          className="w-full h-64 object-cover object-center"
        />
        <div className="absolute top-4 right-4">
          <div className="flex items-center bg-white/90 backdrop-blur-sm py-1 px-3 rounded-full">
            <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
            <span className="font-medium text-sm">{doctor.rating.toFixed(1)}</span>
            <span className="text-gray-500 text-xs ml-1">({doctor.reviews})</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1">{doctor.name}</h3>
        <p className="text-gray-600 mb-3">{doctor.specialty}</p>
        
        <div className="flex mb-4 space-x-3">
          <div className="flex items-center text-gray-600 text-sm">
            <Award className="w-4 h-4 mr-1 text-synergi-500" />
            <span>{doctor.experience} years exp.</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="w-4 h-4 mr-1 text-synergi-500" />
            <span>{doctor.availability}</span>
          </div>
        </div>
        
        <div className="mb-5">
          <div className="flex flex-wrap gap-2">
            {doctor.specializations.slice(0, 3).map((spec, index) => (
              <Badge key={index} variant="outline" className="bg-synergi-50 text-synergi-700 border-synergi-200">
                {spec}
              </Badge>
            ))}
            {doctor.specializations.length > 3 && (
              <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                +{doctor.specializations.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Next available: <span className="font-medium text-gray-700">{doctor.nextAvailable}</span>
          </div>
          <Button asChild variant="outline" className="border-synergi-300 text-synergi-700 hover:bg-synergi-50">
            <Link to={`/doctor/${doctor.id}`} className="inline-flex items-center">
              View Profile <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
