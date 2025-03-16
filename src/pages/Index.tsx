
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ConditionsList from '../components/ConditionsList';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Patient",
    text: "SynergiHub connected me with a therapist who truly understood my anxiety issues. The virtual sessions are so convenient, and I've made significant progress in just a few months.",
    rating: 5
  },
  {
    name: "Arjun Mehta",
    role: "Patient",
    text: "After struggling with depression for years, finding the right psychiatrist through SynergiHub changed everything. The assessment process matched me perfectly with a doctor who specializes in my exact condition.",
    rating: 5
  },
  {
    name: "Neha Patel",
    role: "Parent",
    text: "As a parent, I was worried about my teenager's behavioral changes. The professionals at SynergiHub provided guidance and support for both of us. The platform is user-friendly and respectful.",
    rating: 4
  }
];

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="page-transition">
        <Hero />
        <Features />
        
        {/* How It Works Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-synergi-100 text-synergi-700 text-sm font-medium">
                Simple Process
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How SynergiHub Works</h2>
              <p className="text-lg text-gray-600">
                We've made getting mental health support straightforward and accessible for everyone.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-synergi-100 flex items-center justify-center text-synergi-500 text-2xl font-bold mx-auto mb-6">1</div>
                <h3 className="text-xl font-semibold mb-4">Take an Assessment</h3>
                <p className="text-gray-600">
                  Complete our comprehensive mental health assessment to help identify your specific needs.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-synergi-100 flex items-center justify-center text-synergi-500 text-2xl font-bold mx-auto mb-6">2</div>
                <h3 className="text-xl font-semibold mb-4">Match with a Specialist</h3>
                <p className="text-gray-600">
                  Based on your assessment, we'll match you with mental health professionals specialized in your area of concern.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-synergi-100 flex items-center justify-center text-synergi-500 text-2xl font-bold mx-auto mb-6">3</div>
                <h3 className="text-xl font-semibold mb-4">Begin Your Journey</h3>
                <p className="text-gray-600">
                  Schedule virtual sessions and start your personalized treatment plan with ongoing support.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button asChild className="bg-synergi-400 hover:bg-synergi-500 text-white">
                <Link to="/register">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </section>
        
        <ConditionsList />
        
        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-synergi-100 text-synergi-700 text-sm font-medium">
                Patient Experiences
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Patients Say</h2>
              <p className="text-lg text-gray-600">
                Real stories from real people who have found support through SynergiHub.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/testimonials" className="inline-flex items-center text-synergi-600 hover:text-synergi-700 font-medium">
                Read more patient stories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-synergi-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-10 md:p-12">
                  <h2 className="text-3xl font-bold mb-4">Start Your Mental Health Journey Today</h2>
                  <p className="text-gray-600 mb-8">
                    Take the first step towards a healthier mind. Our team of professionals is ready to support you.
                  </p>
                  <div className="space-y-4">
                    <Button asChild className="w-full bg-synergi-400 hover:bg-synergi-500 text-white">
                      <Link to="/register">Create an Account</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full border-synergi-300 text-synergi-700 hover:bg-synergi-50">
                      <Link to="/assessment">Take Assessment First</Link>
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/2 bg-synergi-100 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                    alt="Mental wellness" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
