
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: 'patient' | 'doctor') => Promise<boolean>;
  logout: () => void;
  sendTestResults: (doctorId: string, assessmentData: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('synergiUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('synergiUser');
      }
    }
  }, []);

  // Note: This is still using localStorage but is structured to be easily replaced with Supabase
  // In a real implementation, we would replace these functions with Supabase auth calls
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app with Supabase, we would use supabase.auth.signInWithPassword()
      const users = JSON.parse(localStorage.getItem('synergiUsers') || '[]');
      const user = users.find((u: any) => 
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        setUser(userWithoutPassword);
        localStorage.setItem('synergiUser', JSON.stringify(userWithoutPassword));
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        });
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: 'patient' | 'doctor'
  ): Promise<boolean> => {
    try {
      // In a real app with Supabase, we would use supabase.auth.signUp()
      const users = JSON.parse(localStorage.getItem('synergiUsers') || '[]');
      
      if (users.some((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
        toast({
          title: "Registration failed",
          description: "This email is already registered",
          variant: "destructive",
        });
        return false;
      }
      
      const newUser = {
        id: crypto.randomUUID(),
        name,
        email,
        password,
        role,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem('synergiUsers', JSON.stringify(users));
      
      // Log the user in
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('synergiUser', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Registration successful",
        description: "Your account has been created!",
      });
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    // In a real app with Supabase, we would use supabase.auth.signOut()
    setUser(null);
    localStorage.removeItem('synergiUser');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  // New function to send test results to a doctor
  const sendTestResults = async (doctorId: string, assessmentData: any): Promise<boolean> => {
    try {
      // In a real app with Supabase, we would store this in a database table
      // For now, we'll simulate it with localStorage
      if (!user) {
        toast({
          title: "Authentication required",
          description: "You must be logged in to send assessment results",
          variant: "destructive",
        });
        return false;
      }

      const testResults = JSON.parse(localStorage.getItem('synergiTestResults') || '[]');
      
      const newTestResult = {
        id: crypto.randomUUID(),
        patientId: user.id,
        patientName: user.name,
        doctorId,
        assessmentData,
        sentAt: new Date().toISOString(),
        status: 'pending'
      };
      
      testResults.push(newTestResult);
      localStorage.setItem('synergiTestResults', JSON.stringify(testResults));
      
      toast({
        title: "Assessment sent",
        description: "Your assessment has been sent to the doctor successfully",
      });
      return true;
    } catch (error) {
      console.error('Send test results error:', error);
      toast({
        title: "Failed to send assessment",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      register, 
      logout,
      sendTestResults
    }}>
      {children}
    </AuthContext.Provider>
  );
};
