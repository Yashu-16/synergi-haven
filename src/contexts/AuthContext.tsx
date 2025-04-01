import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'appointment' | 'message' | 'system';
  relatedId?: string;
}

interface MessageThread {
  userId: string;
  userName: string;
  unreadCount: number;
  lastMessage: Message;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  isDoctor: boolean;
  isPatient: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: 'patient' | 'doctor' | 'admin') => Promise<boolean>;
  logout: () => void;
  sendTestResults: (doctorId: string, assessmentData: any) => Promise<boolean>;
  sendMessage: (recipientId: string, content: string) => Promise<boolean>;
  getMessages: (otherUserId: string) => Message[];
  getAllMessageThreads: () => MessageThread[];
  getNotifications: () => Notification[];
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  getUnreadNotificationCount: () => number;
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

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
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
    role: 'patient' | 'doctor' | 'admin'
  ): Promise<boolean> => {
    try {
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
    setUser(null);
    localStorage.removeItem('synergiUser');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const sendTestResults = async (doctorId: string, assessmentData: any): Promise<boolean> => {
    try {
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
      
      const notifications = JSON.parse(localStorage.getItem('synergiNotifications') || '[]');
      notifications.push({
        id: crypto.randomUUID(),
        userId: doctorId,
        title: 'New Assessment Result',
        message: `${user.name} has sent you their assessment results.`,
        timestamp: new Date().toISOString(),
        read: false,
        type: 'system',
        relatedId: newTestResult.id
      });
      localStorage.setItem('synergiNotifications', JSON.stringify(notifications));
      
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

  const sendMessage = async (recipientId: string, content: string): Promise<boolean> => {
    try {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "You must be logged in to send messages",
          variant: "destructive",
        });
        return false;
      }

      const messages = JSON.parse(localStorage.getItem('synergiMessages') || '[]');
      
      const newMessage = {
        id: crypto.randomUUID(),
        senderId: user.id,
        senderName: user.name,
        recipientId: recipientId,
        content: content,
        timestamp: new Date().toISOString(),
        read: false
      };
      
      messages.push(newMessage);
      localStorage.setItem('synergiMessages', JSON.stringify(messages));
      
      const notifications = JSON.parse(localStorage.getItem('synergiNotifications') || '[]');
      const users = JSON.parse(localStorage.getItem('synergiUsers') || '[]');
      const recipient = users.find((u: any) => u.id === recipientId);
      
      if (recipient) {
        notifications.push({
          id: crypto.randomUUID(),
          userId: recipientId,
          title: 'New Message',
          message: `You have received a new message from ${user.name}`,
          timestamp: new Date().toISOString(),
          read: false,
          type: 'message',
          relatedId: newMessage.id
        });
        localStorage.setItem('synergiNotifications', JSON.stringify(notifications));
      }
      
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully",
      });
      return true;
    } catch (error) {
      console.error('Send message error:', error);
      toast({
        title: "Failed to send message",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const getMessages = (otherUserId: string): Message[] => {
    if (!user) return [];
    
    try {
      const messages = JSON.parse(localStorage.getItem('synergiMessages') || '[]');
      return messages.filter((message: Message) => 
        (message.senderId === user.id && message.recipientId === otherUserId) ||
        (message.senderId === otherUserId && message.recipientId === user.id)
      ).sort((a: Message, b: Message) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
    } catch (error) {
      console.error('Get messages error:', error);
      return [];
    }
  };

  const getAllMessageThreads = (): MessageThread[] => {
    if (!user) return [];
    
    try {
      const messages = JSON.parse(localStorage.getItem('synergiMessages') || '[]') as Message[];
      const userMessages = messages.filter((message: Message) => 
        message.senderId === user.id || message.recipientId === user.id
      );
      
      const users = JSON.parse(localStorage.getItem('synergiUsers') || '[]');
      
      const uniqueUserIds = [...new Set(
        userMessages.map((message: Message) => 
          message.senderId === user.id ? message.recipientId : message.senderId
        )
      )] as string[];
      
      return uniqueUserIds.map(userId => {
        const contactUser = users.find((u: any) => u.id === userId);
        const contactName = contactUser ? contactUser.name : 'Unknown User';
        
        const threadMessages = userMessages.filter((message: Message) => 
          (message.senderId === user.id && message.recipientId === userId) ||
          (message.senderId === userId && message.recipientId === user.id)
        );
        
        const unreadCount = threadMessages.filter((message: Message) => 
          message.recipientId === user.id && !message.read
        ).length;
        
        const sortedMessages = [...threadMessages].sort((a: Message, b: Message) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        
        const lastMessage = sortedMessages.length > 0 ? sortedMessages[0] : {
          id: '',
          senderId: '',
          senderName: '',
          recipientId: '',
          content: '',
          timestamp: new Date().toISOString(),
          read: true
        };
        
        return {
          userId,
          userName: contactName,
          unreadCount,
          lastMessage
        };
      });
    } catch (error) {
      console.error('Get message threads error:', error);
      return [];
    }
  };

  const getNotifications = (): Notification[] => {
    if (!user) return [];
    
    try {
      const notifications = JSON.parse(localStorage.getItem('synergiNotifications') || '[]');
      return notifications
        .filter((notification: Notification) => notification.userId === user.id)
        .sort((a: Notification, b: Notification) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
    } catch (error) {
      console.error('Get notifications error:', error);
      return [];
    }
  };

  const markNotificationAsRead = (notificationId: string): void => {
    try {
      const notifications = JSON.parse(localStorage.getItem('synergiNotifications') || '[]');
      const updatedNotifications = notifications.map((notification: Notification) => 
        notification.id === notificationId ? { ...notification, read: true } : notification
      );
      localStorage.setItem('synergiNotifications', JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Mark notification as read error:', error);
    }
  };

  const markAllNotificationsAsRead = (): void => {
    try {
      if (!user) return;
      
      const notifications = JSON.parse(localStorage.getItem('synergiNotifications') || '[]');
      const updatedNotifications = notifications.map((notification: Notification) => 
        notification.userId === user.id ? { ...notification, read: true } : notification
      );
      localStorage.setItem('synergiNotifications', JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Mark all notifications as read error:', error);
    }
  };

  const getUnreadNotificationCount = (): number => {
    if (!user) return 0;
    
    try {
      const notifications = JSON.parse(localStorage.getItem('synergiNotifications') || '[]');
      return notifications.filter((notification: Notification) => 
        notification.userId === user.id && !notification.read
      ).length;
    } catch (error) {
      console.error('Get unread notification count error:', error);
      return 0;
    }
  };

  const isSuperAdmin = user?.role === 'admin';
  const isDoctor = user?.role === 'doctor';
  const isPatient = user?.role === 'patient';

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      isSuperAdmin,
      isDoctor,
      isPatient,
      login, 
      register, 
      logout,
      sendTestResults,
      sendMessage,
      getMessages,
      getAllMessageThreads,
      getNotifications,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      getUnreadNotificationCount
    }}>
      {children}
    </AuthContext.Provider>
  );
};
