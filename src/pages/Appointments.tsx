
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, Clock, Video, User, MessageSquare, Check, X, Link as LinkIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MessagesPanel from '@/components/messaging/MessagesPanel';

interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  patientId: string;
  date: string;
  time: string;
  type: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  meetingLink?: string;
}

const Appointments: React.FC = () => {
  const { user, isAuthenticated, isPatient } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedDoctor, setSelectedDoctor] = useState<{ id: string; name: string } | null>(null);
  
  useEffect(() => {
    if (!isAuthenticated || !isPatient) {
      navigate('/login');
    } else {
      loadAppointments();
    }
  }, [isAuthenticated, isPatient, navigate]);
  
  const loadAppointments = () => {
    if (!user) return;
    
    // In a real app, this would fetch from a backend
    const storedAppointments = JSON.parse(localStorage.getItem('synergiAppointments') || '[]');
    const userAppointments = storedAppointments.filter((apt: Appointment) => apt.patientId === user.id);
    setAppointments(userAppointments);
  };
  
  const filteredAppointments = appointments.filter(apt => {
    if (activeTab === 'upcoming') {
      return ['pending', 'confirmed'].includes(apt.status);
    } else if (activeTab === 'completed') {
      return apt.status === 'completed';
    } else {
      return apt.status === 'cancelled';
    }
  });
  
  if (!isAuthenticated || !isPatient) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-6">My Appointments</h1>
          
          <div className="bg-white rounded-lg shadow-md">
            <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
              <div className="p-4 border-b">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="upcoming" className="p-4">
                {filteredAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {filteredAppointments.map(appointment => (
                      <div key={appointment.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">Dr. {appointment.doctorName}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{format(new Date(appointment.date), 'PPP')}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              {appointment.type === 'online' ? (
                                <>
                                  <Video className="h-4 w-4 mr-1" />
                                  <span>Online Consultation</span>
                                </>
                              ) : (
                                <>
                                  <User className="h-4 w-4 mr-1" />
                                  <span>In-person Consultation</span>
                                </>
                              )}
                            </div>
                            
                            {appointment.status === 'pending' ? (
                              <div className="mt-2 bg-amber-100 text-amber-700 text-sm px-2 py-1 rounded inline-flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                Awaiting confirmation
                              </div>
                            ) : (
                              <div className="mt-2 bg-green-100 text-green-700 text-sm px-2 py-1 rounded inline-flex items-center">
                                <Check className="h-3 w-3 mr-1" />
                                Confirmed
                              </div>
                            )}
                          </div>
                          
                          <div className="flex flex-col space-y-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedDoctor({ id: appointment.doctorId, name: appointment.doctorName })}
                            >
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Message Doctor
                            </Button>
                            
                            {appointment.status === 'confirmed' && appointment.type === 'online' && appointment.meetingLink && (
                              <Button 
                                size="sm"
                                className="bg-synergi-500 hover:bg-synergi-600"
                                asChild
                              >
                                <a href={appointment.meetingLink} target="_blank" rel="noopener noreferrer">
                                  <LinkIcon className="h-3 w-3 mr-1" />
                                  Join Meeting
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No upcoming appointments</p>
                    <Button 
                      className="mt-4 bg-synergi-500 hover:bg-synergi-600"
                      onClick={() => navigate('/doctors')}
                    >
                      Book an Appointment
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="completed" className="p-4">
                {filteredAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {filteredAppointments.map(appointment => (
                      <div key={appointment.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">Dr. {appointment.doctorName}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{format(new Date(appointment.date), 'PPP')}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="mt-2 bg-green-100 text-green-700 text-sm px-2 py-1 rounded inline-flex items-center">
                              <Check className="h-3 w-3 mr-1" />
                              Completed
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedDoctor({ id: appointment.doctorId, name: appointment.doctorName })}
                          >
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Message Doctor
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Check className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No completed appointments</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="cancelled" className="p-4">
                {filteredAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {filteredAppointments.map(appointment => (
                      <div key={appointment.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">Dr. {appointment.doctorName}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{format(new Date(appointment.date), 'PPP')}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="mt-2 bg-red-100 text-red-700 text-sm px-2 py-1 rounded inline-flex items-center">
                              <X className="h-3 w-3 mr-1" />
                              Cancelled
                            </div>
                          </div>
                          <Button 
                            className="bg-synergi-500 hover:bg-synergi-600"
                            size="sm"
                            onClick={() => navigate('/doctors')}
                          >
                            Book New Appointment
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <X className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No cancelled appointments</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      {/* Modal for messaging doctor */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md h-[500px] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">Message to Dr. {selectedDoctor.name}</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedDoctor(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <MessagesPanel recipientId={selectedDoctor.id} recipientName={`Dr. ${selectedDoctor.name}`} />
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Appointments;
