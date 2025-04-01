
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, UserX, Clock, Check, X, User, Users } from 'lucide-react';
import { useAuth } from "@/contexts/AuthContext";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const AdminPanel: React.FC = () => {
  const { user, isAuthenticated, isSuperAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('users');
  
  useEffect(() => {
    if (!isAuthenticated || !isSuperAdmin) {
      navigate('/login');
    } else {
      loadUsers();
      loadAppointments();
    }
  }, [isAuthenticated, isSuperAdmin, navigate]);
  
  const loadUsers = () => {
    // In a real app, this would fetch from a backend
    const storedUsers = JSON.parse(localStorage.getItem('synergiUsers') || '[]').map((user: any) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    setUsers(storedUsers);
  };
  
  const loadAppointments = () => {
    // In a real app, this would fetch from a backend
    const storedAppointments = JSON.parse(localStorage.getItem('synergiAppointments') || '[]');
    setAppointments(storedAppointments);
  };
  
  const updateUserStatus = (userId: string, active: boolean) => {
    const storedUsers = JSON.parse(localStorage.getItem('synergiUsers') || '[]');
    
    const updatedUsers = storedUsers.map((u: any) => 
      u.id === userId ? { ...u, active } : u
    );
    
    localStorage.setItem('synergiUsers', JSON.stringify(updatedUsers));
    loadUsers();
    
    toast({
      title: active ? "User Activated" : "User Deactivated",
      description: `User has been ${active ? 'activated' : 'deactivated'} successfully.`,
    });
  };
  
  if (!isAuthenticated || !isSuperAdmin) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
          
          <Tabs defaultValue="users" value={activeTab} onValueChange={setActiveTab}>
            <div className="mb-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="doctors">Doctors</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="users">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                  <h2 className="font-semibold">Patient Users</h2>
                  <div className="text-sm text-gray-500">
                    Total: {users.filter(u => u.role === 'patient').length}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Created</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {users
                        .filter(user => user.role === 'patient')
                        .map(user => (
                          <tr key={user.id}>
                            <td className="px-4 py-3">{user.name}</td>
                            <td className="px-4 py-3">{user.email}</td>
                            <td className="px-4 py-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td className="px-4 py-3">
                              {user.active !== false ? (
                                <span className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                  <UserCheck className="h-3 w-3 mr-1" /> Active
                                </span>
                              ) : (
                                <span className="inline-flex items-center bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                                  <UserX className="h-3 w-3 mr-1" /> Inactive
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right">
                              {user.active !== false ? (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-red-500 border-red-300 hover:bg-red-50"
                                  onClick={() => updateUserStatus(user.id, false)}
                                >
                                  Deactivate
                                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-green-500 border-green-300 hover:bg-green-50"
                                  onClick={() => updateUserStatus(user.id, true)}
                                >
                                  Activate
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="doctors">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                  <h2 className="font-semibold">Doctor Users</h2>
                  <div className="text-sm text-gray-500">
                    Total: {users.filter(u => u.role === 'doctor').length}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Created</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {users
                        .filter(user => user.role === 'doctor')
                        .map(user => (
                          <tr key={user.id}>
                            <td className="px-4 py-3">{user.name}</td>
                            <td className="px-4 py-3">{user.email}</td>
                            <td className="px-4 py-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td className="px-4 py-3">
                              {user.active !== false ? (
                                <span className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                  <UserCheck className="h-3 w-3 mr-1" /> Active
                                </span>
                              ) : (
                                <span className="inline-flex items-center bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                                  <UserX className="h-3 w-3 mr-1" /> Inactive
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right">
                              {user.active !== false ? (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-red-500 border-red-300 hover:bg-red-50"
                                  onClick={() => updateUserStatus(user.id, false)}
                                >
                                  Deactivate
                                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-green-500 border-green-300 hover:bg-green-50"
                                  onClick={() => updateUserStatus(user.id, true)}
                                >
                                  Activate
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="appointments">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                  <h2 className="font-semibold">All Appointments</h2>
                  <div className="text-sm text-gray-500">
                    Total: {appointments.length}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">Patient</th>
                        <th className="px-4 py-2 text-left">Doctor</th>
                        <th className="px-4 py-2 text-left">Date & Time</th>
                        <th className="px-4 py-2 text-left">Type</th>
                        <th className="px-4 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {appointments.map((appointment: any) => (
                        <tr key={appointment.id}>
                          <td className="px-4 py-3">{appointment.patientName}</td>
                          <td className="px-4 py-3">{appointment.doctorName}</td>
                          <td className="px-4 py-3">
                            {new Date(appointment.date).toLocaleDateString()} {appointment.time}
                          </td>
                          <td className="px-4 py-3">
                            {appointment.type === 'online' ? (
                              <span className="inline-flex items-center">
                                <User className="h-3 w-3 mr-1" /> Online
                              </span>
                            ) : (
                              <span className="inline-flex items-center">
                                <Users className="h-3 w-3 mr-1" /> In-person
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {appointment.status === 'pending' && (
                              <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                                <Clock className="h-3 w-3 mr-1" /> Pending
                              </span>
                            )}
                            {appointment.status === 'confirmed' && (
                              <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                <Check className="h-3 w-3 mr-1" /> Confirmed
                              </span>
                            )}
                            {appointment.status === 'completed' && (
                              <span className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                <Check className="h-3 w-3 mr-1" /> Completed
                              </span>
                            )}
                            {appointment.status === 'cancelled' && (
                              <span className="inline-flex items-center bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                                <X className="h-3 w-3 mr-1" /> Cancelled
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPanel;
