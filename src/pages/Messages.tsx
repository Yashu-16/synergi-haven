
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/contexts/AuthContext";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MessagesPanel from '@/components/messaging/MessagesPanel';

const Messages: React.FC = () => {
  const { user, isAuthenticated, getAllMessageThreads } = useAuth();
  const navigate = useNavigate();
  const [activeContact, setActiveContact] = useState<{ id: string; name: string } | null>(null);
  const [threads, setThreads] = useState<Array<{ userId: string; userName: string; unreadCount: number; lastMessage: any }>>([]);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    if (isAuthenticated) {
      const messageThreads = getAllMessageThreads();
      setThreads(messageThreads);
      
      if (messageThreads.length > 0 && !activeContact) {
        setActiveContact({
          id: messageThreads[0].userId,
          name: messageThreads[0].userName
        });
      }
    }
  }, [isAuthenticated, getAllMessageThreads, activeContact]);
  
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-6">Messages</h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {threads.length === 0 ? (
              <div className="p-8 text-center">
                <h3 className="text-lg font-medium mb-2">No messages yet</h3>
                <p className="text-gray-500">When you start a conversation, it will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
                <div className="border-r">
                  <div className="p-3 border-b">
                    <h3 className="font-medium">Conversations</h3>
                  </div>
                  <div className="overflow-auto h-[calc(100%-53px)]">
                    {threads.map(thread => (
                      <div
                        key={thread.userId}
                        className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                          activeContact?.id === thread.userId ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => setActiveContact({ id: thread.userId, name: thread.userName })}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{thread.userName}</h4>
                            <p className="text-sm text-gray-500 truncate w-40">
                              {thread.lastMessage?.content || 'Start a conversation'}
                            </p>
                          </div>
                          {thread.unreadCount > 0 && (
                            <span className="bg-synergi-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {thread.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="col-span-2 h-full">
                  {activeContact ? (
                    <MessagesPanel 
                      recipientId={activeContact.id}
                      recipientName={activeContact.name}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-gray-500">
                        <p>Select a conversation to start messaging</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Messages;
