
import React, { useState, useEffect } from 'react';
import { format } from "date-fns";
import { Calendar, Clock, Video, User, MessageSquare, Check, X, AlertTriangle, Link as LinkIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import MessagesPanel from '../messaging/MessagesPanel';

interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  type: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  meetingLink?: string;
}

const AppointmentManager: React.FC = () => {
  const { user, sendMessage } = useAuth();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedPatient, setSelectedPatient] = useState<{ id: string; name: string } | null>(null);
  
  useEffect(() => {
    if (user) {
      loadAppointments();
    }
  }, [user]);
  
  const loadAppointments = () => {
    // In a real app, this would fetch from a backend
    const storedAppointments = JSON.parse(localStorage.getItem('synergiAppointments') || '[]');
    const doctorAppointments = storedAppointments.filter((apt: Appointment) => apt.doctorId === user?.id);
    setAppointments(doctorAppointments);
  };
  
  const updateAppointmentStatus = (appointmentId: string, status: 'confirmed' | 'completed' | 'cancelled', meetingLink?: string) => {
    try {
      const storedAppointments = JSON.parse(localStorage.getItem('synergiAppointments') || '[]');
      
      const updatedAppointments = storedAppointments.map((apt: Appointment) => 
        apt.id === appointmentId ? { ...apt, status, ...(meetingLink ? { meetingLink } : {}) } : apt
      );
      
      localStorage.setItem('synergiAppointments', JSON.stringify(updatedAppointments));
      
      const appointment = storedAppointments.find((apt: Appointment) => apt.id === appointmentId);
      
      // Create notification for patient
      if (appointment) {
        const notifications = JSON.parse(localStorage.getItem('synergiNotifications') || '[]');
        
        let title, message;
        if (status === 'confirmed') {
          title = 'Appointment Confirmed';
          message = `Dr. ${user?.name} has confirmed your appointment on ${format(new Date(appointment.date), 'PPP')} at ${appointment.time}`;
        } else if (status === 'cancelled') {
          title = 'Appointment Cancelled';
          message = `Dr. ${user?.name} has cancelled your appointment on ${format(new Date(appointment.date), 'PPP')} at ${appointment.time}`;
        } else {
          title = 'Appointment Completed';
          message = `Your appointment with Dr. ${user?.name} has been marked as completed`;
        }
        
        notifications.push({
          id: crypto.randomUUID(),
          userId: appointment.patientId,
          title,
          message,
          timestamp: new Date().toISOString(),
          read: false,
          type: 'appointment',
          relatedId: appointmentId
        });
        
        localStorage.setItem('synergiNotifications', JSON.stringify(notifications));
        
        // Send a message to patient about the status update
        let messageContent;
        if (status === 'confirmed') {
          if (meetingLink) {
            messageContent = `I've confirmed our appointment on ${format(new Date(appointment.date), 'PPP')} at ${appointment.time}. Here's the meeting link: ${meetingLink}`;
          } else {
            messageContent = `I've confirmed our appointment on ${format(new Date(appointment.date), 'PPP')} at ${appointment.time}.`;
          }
        } else if (status === 'cancelled') {
          messageContent = `I need to cancel our appointment scheduled for ${format(new Date(appointment.date), 'PPP')} at ${appointment.time}. Please book another time that works for you.`;
        }
        
        if (messageContent) {
          sendMessage(appointment.patientId, messageContent);
        }
      }
      
      loadAppointments();
      
      toast({
        title: `Appointment ${status}`,
        description: `The appointment has been ${status} successfully.`,
      });
      
    } catch (error) {
      console.error('Update appointment error:', error);
      toast({
        title: "Failed to update appointment",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const generateMeetingLink = (appointmentId: string) => {
    const meetingId = Math.random().toString(36).substring(2, 10);
    const meetingLink = `https://synergihub.meet/${user?.id}/${meetingId}`;
    
    updateAppointmentStatus(appointmentId, 'confirmed', meetingLink);
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
  
  return (
    <div className="bg-white rounded-lg shadow-md">
      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold mb-4">Appointment Management</h2>
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
                      <h3 className="font-medium">{appointment.patientName}</h3>
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
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Pending confirmation
                        </div>
                      ) : (
                        <div className="mt-2 bg-green-100 text-green-700 text-sm px-2 py-1 rounded inline-flex items-center">
                          <Check className="h-3 w-3 mr-1" />
                          Confirmed
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      {appointment.status === 'pending' && (
                        <>
                          {appointment.type === 'online' && (
                            <Button 
                              size="sm" 
                              onClick={() => generateMeetingLink(appointment.id)}
                              className="bg-synergi-500 hover:bg-synergi-600"
                            >
                              Confirm & Generate Link
                            </Button>
                          )}
                          {appointment.type === 'in-person' && (
                            <Button 
                              size="sm" 
                              onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                              className="bg-synergi-500 hover:bg-synergi-600"
                            >
                              Confirm Appointment
                            </Button>
                          )}
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                            className="border-red-300 text-red-500 hover:bg-red-50"
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      
                      {appointment.status === 'confirmed' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            Mark as Completed
                          </Button>
                          
                          {appointment.type === 'online' && appointment.meetingLink && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex items-center"
                              asChild
                            >
                              <a href={appointment.meetingLink} target="_blank" rel="noopener noreferrer">
                                <LinkIcon className="h-3 w-3 mr-1" />
                                Join Meeting
                              </a>
                            </Button>
                          )}
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedPatient({ id: appointment.patientId, name: appointment.patientName })}
                          >
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Message Patient
                          </Button>
                        </>
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
                      <h3 className="font-medium">{appointment.patientName}</h3>
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
                      onClick={() => setSelectedPatient({ id: appointment.patientId, name: appointment.patientName })}
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Message Patient
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
                      <h3 className="font-medium">{appointment.patientName}</h3>
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
      
      {/* Modal for messaging patients */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md h-[500px] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">Message to {selectedPatient.name}</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedPatient(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <MessagesPanel recipientId={selectedPatient.id} recipientName={selectedPatient.name} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentManager;
