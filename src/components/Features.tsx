
import React from 'react';
import { 
  UserCheck, 
  Calendar, 
  MessageSquare, 
  Shield, 
  Award, 
  Clock 
} from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 hover-lift glass-card rounded-2xl">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-synergi-100 text-synergi-600 mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <UserCheck size={24} />,
      title: "Verified Professionals",
      description: "All our therapists and psychiatrists are verified and have relevant licenses and certifications."
    },
    {
      icon: <Calendar size={24} />,
      title: "Flexible Scheduling",
      description: "Book sessions at your convenience, with options for both immediate and scheduled consultations."
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Secure Messaging",
      description: "Stay connected with your therapist through our secure messaging platform between sessions."
    },
    {
      icon: <Shield size={24} />,
      title: "Confidentiality",
      description: "Your privacy is our priority. All sessions and data are protected with end-to-end encryption."
    },
    {
      icon: <Award size={24} />,
      title: "Personalized Care",
      description: "Receive treatment plans tailored specifically to your unique mental health needs."
    },
    {
      icon: <Clock size={24} />,
      title: "24/7 Support",
      description: "Access to support resources and crisis intervention whenever you need it."
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute top-1/2 left-1/2 w-full h-full max-w-5xl -translate-x-1/2 -translate-y-1/2 bg-synergi-100 rounded-full opacity-30 blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-synergi-100 text-synergi-700 text-sm font-medium">
            Why Choose SynergiHub
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Comprehensive Mental Healthcare at Your Fingertips</h2>
          <p className="text-lg text-gray-600">
            Our platform combines technology with human compassion to provide accessible mental healthcare for everyone.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
