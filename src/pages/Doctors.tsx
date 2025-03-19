
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DoctorCard from '../components/DoctorCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, Filter, ArrowDownAZ, Star, AlertCircle, Check } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { doctorsData } from "@/utils/data";

const Doctors: React.FC = () => {
  const location = useLocation();
  const fromAssessment = location.state?.fromAssessment || false;
  const concernsFromAssessment = location.state?.concerns || [];
  const assessmentCompleted = location.state?.assessmentCompleted || false;
  
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [minExperience, setMinExperience] = useState(0);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("rating");
  const [showAssessmentAlert, setShowAssessmentAlert] = useState(fromAssessment);
  
  const specialties = ["Psychiatrist", "Clinical Psychologist", "Child Psychiatrist", "Addiction Specialist", "Psychotherapist", "Geriatric Psychiatrist"];
  const availabilityOptions = ["Online Only", "In-person Only", "Online & In-person"];
  
  // If coming from assessment, pre-filter based on concerns
  useEffect(() => {
    if (fromAssessment && concernsFromAssessment.length > 0) {
      // Map concerns to specializations
      const concernToSpecialtyMap: Record<string, string[]> = {
        "Depression": ["Psychiatrist", "Psychotherapist"],
        "Anxiety": ["Psychiatrist", "Psychotherapist", "Clinical Psychologist"],
        "Physical Symptoms": ["Psychiatrist", "Clinical Psychologist"],
        "Suicidal Thoughts": ["Psychiatrist"]
      };
      
      // Get relevant specialties based on concerns
      const relevantSpecialties = concernsFromAssessment.flatMap(concern => 
        concernToSpecialtyMap[concern as keyof typeof concernToSpecialtyMap] || []
      );
      
      // Remove duplicates and set as selected specialties
      setSelectedSpecialties([...new Set(relevantSpecialties)]);
    }
  }, [fromAssessment, concernsFromAssessment]);
  
  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialty) 
        ? prev.filter(s => s !== specialty) 
        : [...prev, specialty]
    );
  };
  
  const toggleAvailability = (option: string) => {
    setSelectedAvailability(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option) 
        : [...prev, option]
    );
  };
  
  const filteredDoctors = doctorsData
    .filter(doctor => 
      (searchQuery === "" || 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specializations.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      ) &&
      doctor.experience >= minExperience &&
      (selectedSpecialties.length === 0 || selectedSpecialties.includes(doctor.specialty)) &&
      (selectedAvailability.length === 0 || selectedAvailability.includes(doctor.availability))
    )
    .sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating;
      } else if (sortBy === "experience") {
        return b.experience - a.experience;
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
    
  // Check if all doctors offer free first consultation
  const allFirstConsultFree = filteredDoctors.every(doctor => doctor.firstConsultFree);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 page-transition">
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Find a Mental Health Specialist</h1>
            <p className="text-lg text-gray-600 max-w-3xl mb-8">
              Browse through our network of qualified mental health professionals specializing in various areas of mental healthcare.
            </p>
            
            {assessmentCompleted && (
              <Alert className="mb-8 bg-green-50 border-green-300">
                <Check className="h-4 w-4 text-green-500" />
                <AlertTitle className="text-green-700">Assessment Completed</AlertTitle>
                <AlertDescription className="text-green-600">
                  Your assessment has been sent to a doctor who will review it and contact you soon.
                </AlertDescription>
              </Alert>
            )}
            
            {showAssessmentAlert && (
              <Alert className="mb-8 bg-synergi-50 border-synergi-300">
                <AlertCircle className="h-4 w-4 text-synergi-500" />
                <AlertTitle className="text-synergi-700">Based on your assessment</AlertTitle>
                <AlertDescription className="text-synergi-600">
                  We've filtered specialists who can address your specific needs: {concernsFromAssessment.join(', ')}.
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSelectedSpecialties([]);
                      setShowAssessmentAlert(false);
                    }} 
                    className="p-0 h-auto text-synergi-700 font-medium"
                  >
                    Clear filters
                  </Button>
                </AlertDescription>
              </Alert>
            )}
            
            <div className="relative flex flex-col md:flex-row items-start gap-4">
              <div className="relative w-full md:w-2/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  type="text"
                  placeholder="Search by name, specialty or condition..."
                  className="w-full pl-10 py-6 border-gray-200 focus:border-synergi-300 focus:ring focus:ring-synergi-100 rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button 
                variant="outline" 
                className="md:ml-2 border-gray-200 text-gray-700 gap-2 py-6 w-full md:w-auto"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
              
              <div className="relative group w-full md:w-auto">
                <Button 
                  variant="outline" 
                  className="border-gray-200 text-gray-700 gap-2 py-6 w-full md:w-auto"
                >
                  <ArrowDownAZ size={18} />
                  Sort By
                </Button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden group-hover:block">
                  <div className="py-1">
                    <button 
                      className={`px-4 py-2 text-sm text-left w-full hover:bg-synergi-50 ${sortBy === 'rating' ? 'text-synergi-600 font-medium' : 'text-gray-700'}`}
                      onClick={() => setSortBy('rating')}
                    >
                      Highest Rated
                    </button>
                    <button 
                      className={`px-4 py-2 text-sm text-left w-full hover:bg-synergi-50 ${sortBy === 'experience' ? 'text-synergi-600 font-medium' : 'text-gray-700'}`}
                      onClick={() => setSortBy('experience')}
                    >
                      Most Experienced
                    </button>
                    <button 
                      className={`px-4 py-2 text-sm text-left w-full hover:bg-synergi-50 ${sortBy === 'name' ? 'text-synergi-600 font-medium' : 'text-gray-700'}`}
                      onClick={() => setSortBy('name')}
                    >
                      Alphabetical (A-Z)
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {showFilters && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in">
                <h3 className="font-semibold text-lg mb-4">Filter Options</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="font-medium mb-3">Minimum Experience</h4>
                    <div className="mb-2">
                      <span className="text-sm text-gray-500">{minExperience} years</span>
                    </div>
                    <Slider 
                      value={[minExperience]}
                      min={0}
                      max={20}
                      step={1}
                      onValueChange={(value) => setMinExperience(value[0])}
                      className="my-6"
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Specialty</h4>
                    <div className="space-y-2">
                      {specialties.map((specialty) => (
                        <div key={specialty} className="flex items-center">
                          <Checkbox 
                            id={`specialty-${specialty}`}
                            checked={selectedSpecialties.includes(specialty)}
                            onCheckedChange={() => toggleSpecialty(specialty)}
                          />
                          <Label 
                            htmlFor={`specialty-${specialty}`}
                            className="ml-2 text-sm font-normal"
                          >
                            {specialty}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Availability</h4>
                    <div className="space-y-2">
                      {availabilityOptions.map((option) => (
                        <div key={option} className="flex items-center">
                          <Checkbox 
                            id={`availability-${option}`}
                            checked={selectedAvailability.includes(option)}
                            onCheckedChange={() => toggleAvailability(option)}
                          />
                          <Label 
                            htmlFor={`availability-${option}`}
                            className="ml-2 text-sm font-normal"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button 
                    variant="outline" 
                    className="mr-2"
                    onClick={() => {
                      setMinExperience(0);
                      setSelectedSpecialties([]);
                      setSelectedAvailability([]);
                    }}
                  >
                    Reset Filters
                  </Button>
                  <Button 
                    className="bg-synergi-400 hover:bg-synergi-500 text-white"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold">
                {filteredDoctors.length} Mental Health Specialists Available
              </h2>
              {sortBy === 'rating' && (
                <div className="flex items-center text-gray-600 text-sm">
                  <span>Sorted by:</span>
                  <div className="flex items-center ml-2">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                    <span>Highest Rated</span>
                  </div>
                </div>
              )}
            </div>
            
            {allFirstConsultFree && filteredDoctors.length > 0 && (
              <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                <Star className="text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" />
                <div>
                  <h3 className="font-medium text-green-800">First Consultation Free</h3>
                  <p className="text-green-700 text-sm">
                    All our specialists offer a free first consultation with no time limit, ensuring you get comfortable with your doctor and they understand your needs thoroughly.
                  </p>
                </div>
              </div>
            )}
            
            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-2">No doctors match your search criteria</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search for different keywords.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setMinExperience(0);
                    setSelectedSpecialties([]);
                    setSelectedAvailability([]);
                    setShowAssessmentAlert(false);
                  }}
                >
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Doctors;
