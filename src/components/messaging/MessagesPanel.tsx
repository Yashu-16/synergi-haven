
import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MessagesPanelProps {
  recipientId: string;
  recipientName: string;
}

const MessagesPanel: React.FC<MessagesPanelProps> = ({ recipientId, recipientName }) => {
  const { user, getMessages, sendMessage } = useAuth();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  // Load messages
  useEffect(() => {
    if (recipientId) {
      setMessages(getMessages(recipientId));
    }
    
    // Poll for new messages every 5 seconds
    const interval = setInterval(() => {
      if (recipientId) {
        setMessages(getMessages(recipientId));
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [recipientId, getMessages]);
  
  // Scroll to bottom on new messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    sendMessage(recipientId, newMessage).then(() => {
      setNewMessage("");
      setMessages(getMessages(recipientId));
    });
  };

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden">
      <div className="bg-white border-b p-3 flex items-center">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarFallback>{recipientName.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="font-medium">{recipientName}</h3>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>No messages yet</p>
              <p className="text-sm">Start the conversation!</p>
            </div>
          ) : (
            messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.senderId === user?.id
                      ? 'bg-synergi-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.senderId === user?.id ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {format(new Date(message.timestamp), 'h:mm a')}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messageEndRef} />
        </div>
      </ScrollArea>
      
      <form onSubmit={handleSendMessage} className="border-t p-3 flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button type="submit" disabled={newMessage.trim() === ''}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default MessagesPanel;
