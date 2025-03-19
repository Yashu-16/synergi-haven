import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Users, 
  Award, 
  Clock, 
  Target, 
  Sparkles,
  CheckCircle2, 
  HandHeart,
  Smile,
  Brain,
  Stethoscope,
  MessageCircle,
  BarChart as BarChartIcon,
  Shield,
  MapPin
} from 'lucide-react';

const mentalHealthStats = [
  { name: 'Depression', value: 56 },
  { name: 'Anxiety', value: 42 },
  { name: 'Bipolar Disorder', value: 12 },
  { name: 'Schizophrenia', value: 8 },
  { name: 'PTSD', value: 15 }
];

const accessibilityData = [
  { name: 'Urban Access', value: 73 },
  { name: 'Rural Access', value: 27 }
];

const growthData = [
  { year: '2020', patients: 500, doctors: 15 },
  { year: '2021', patients: 1200, doctors: 28 },
  { year: '2022', patients: 3000, doctors: 45 },
  { year: '2023', patients: 5500, doctors: 68 },
  { year: '2024', patients: 8200, doctors: 92 }
];

const satisfactionData = [
  { month: 'Jan', rating: 4.5 },
  { month: 'Feb', rating: 4.6 },
  { month: 'Mar', rating: 4.7 },
  { month: 'Apr', rating: 4.8 },
  { month: 'May', rating: 4.9 },
  { month: 'Jun', rating: 4.8 },
  { month: 'Jul', rating: 4.9 },
  { month: 'Aug', rating: 4.9 }
];

const consultationTypes = [
  { name: 'Depression', value: 35 },
  { name: 'Anxiety', value: 30 },
  { name: 'Stress', value: 15 },
  { name: 'Relationships', value: 10 },
  { name: 'Others', value: 10 }
];

const COLORS = ['#ff7e67', '#ff9a76', '#ffc29e', '#ffdbcc', '#ffeee5'];
const ACCESS_COLORS = ['#ff7e67', '#eef2f7'];
const CONSULTATION_COLORS = ['#ff7e67', '#6E59A5', '#85d8ce', '#72b5e8', '#ffc29e'];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-synergi-100 to-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About SynergiHub</h1>
              <p className="text-xl text-gray-700 mb-8">
                Transforming mental healthcare in India through accessible,
                personalized, and stigma-free virtual consultations.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="bg-synergi-500 hover:bg-synergi-600 text-white">
                  <Link to="/doctors">Meet Our Doctors</Link>
                </Button>
                <Button asChild variant="outline" className="border-synergi-300 text-synergi-700">
                  <Link to="/assessment">Take Assessment</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Story - New Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 mb-6">
                SynergiHub was founded in 2024 by a team of mental health professionals and technologists who recognized a critical gap in India's healthcare system: access to quality mental healthcare.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                In a country where over 150 million people need mental health support but less than 30% have access to it, we saw an opportunity to leverage technology to bridge this gap. Our founders, coming from both clinical psychology and digital innovation backgrounds, believed that virtual consultation could democratize access to mental healthcare across India's diverse geography.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We started with a small team of 15 doctors serving around 500 patients in our first year. Today, we've grown to a network of over 90 mental health specialists serving thousands of patients across India, from metropolitan cities to remote villages.
              </p>
              
              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-6 text-center">Our Growth Journey</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={growthData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="patients" stroke="#ff7e67" fill="#ff7e67" name="Patients" />
                      <Area type="monotone" dataKey="doctors" stroke="#6E59A5" fill="#6E59A5" name="Doctors" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-gray-500 text-center mt-4">
                  Growth in number of patients served and specialists on our platform
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission & Vision */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission & Vision</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-synergi-100 p-3 rounded-full mr-4">
                      <Heart className="text-synergi-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                      <p className="text-gray-700">
                        To make quality mental healthcare accessible to everyone in India, 
                        regardless of geography, economic status, or social stigma. We aim to 
                        create a supportive environment where seeking help for mental health 
                        becomes as normal as seeking help for physical health.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-synergi-100 p-3 rounded-full mr-4">
                      <Target className="text-synergi-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                      <p className="text-gray-700">
                        A future where every Indian has access to quality mental healthcare, 
                        where mental health is discussed openly without stigma, and where 
                        technology bridges the gap between those in need and qualified professionals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-100 p-6 rounded-2xl">
                <h3 className="text-xl font-semibold mb-6 text-center">Mental Health Statistics in India</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={mentalHealthStats}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'Millions of People', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#ff7e67" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-gray-500 text-center mt-4">
                  Estimated prevalence of common mental health conditions in India (in millions)
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Approach */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Approach to Mental Healthcare</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="bg-synergi-100 p-4 inline-flex rounded-full mb-6">
                  <Sparkles className="text-synergi-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Personalized Care</h3>
                <p className="text-gray-700">
                  We believe that mental healthcare is not one-size-fits-all. Through our detailed assessments, we match you with professionals who specialize in your specific needs.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="bg-synergi-100 p-4 inline-flex rounded-full mb-6">
                  <CheckCircle2 className="text-synergi-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Evidence-Based</h3>
                <p className="text-gray-700">
                  Our platform connects you with licensed professionals who use scientifically validated approaches to mental healthcare, ensuring you receive the highest quality treatment.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="bg-synergi-100 p-4 inline-flex rounded-full mb-6">
                  <HandHeart className="text-synergi-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Compassionate Support</h3>
                <p className="text-gray-700">
                  Mental health journeys can be challenging. Our platform is designed to provide a supportive environment where you feel heard, understood, and respected.
                </p>
              </div>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Addressing the Access Gap</h3>
                <p className="text-gray-700 mb-6">
                  In India, there is a significant gap in mental healthcare accessibility between urban and rural areas. SynergiHub aims to bridge this gap through our virtual consultation platform.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-synergi-500 rounded-full mr-2"></div>
                    <span>Over 150 million Indians need mental healthcare</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-synergi-500 rounded-full mr-2"></div>
                    <span>Less than 30% have access to quality care</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-synergi-500 rounded-full mr-2"></div>
                    <span>Only 1 psychiatrist per 100,000 people in India</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-synergi-500 rounded-full mr-2"></div>
                    <span>83% of mental health professionals are in urban areas</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-6 text-center">Mental Healthcare Accessibility</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={accessibilityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {accessibilityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={ACCESS_COLORS[index % ACCESS_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-gray-500 text-center mt-4">
                  Distribution of mental healthcare services in India
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Free First Consultation - New Highlighted Section */}
        <section className="py-16 bg-synergi-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 border border-synergi-100">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-synergi-100 p-5 rounded-full">
                  <MessageCircle className="h-12 w-12 text-synergi-600" />
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold mb-4">Free First Consultation</h2>
                  <p className="text-xl text-gray-700 mb-6">
                    We believe that building trust is the foundation of effective mental healthcare.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-gray-700">
                        <span className="font-semibold">Completely free first session</span> with no hidden charges or obligations
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-gray-700">
                        <span className="font-semibold">No time limit</span> - take all the time you need to get comfortable and explain your concerns fully
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-gray-700">
                        <span className="font-semibold">Get to know your doctor</span> before committing to a treatment plan
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-gray-700">
                        <span className="font-semibold">Thorough understanding</span> of your concerns by the doctor before beginning treatment
                      </p>
                    </div>
                  </div>
                  
                  <Button asChild className="bg-synergi-500 hover:bg-synergi-600 text-white px-6">
                    <Link to="/doctors">Book Your Free Consultation</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Impact - New Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Impact</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Types of Consultations</h3>
                <p className="text-gray-700 mb-8">
                  Our platform has helped thousands of individuals across India address various mental health concerns. Here's a breakdown of the most common issues our specialists help with:
                </p>
                
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={consultationTypes}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {consultationTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CONSULTATION_COLORS[index % CONSULTATION_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-6">Patient Satisfaction</h3>
                <p className="text-gray-700 mb-8">
                  We continuously measure and improve our service quality. Our average patient satisfaction rating has consistently remained above 4.5/5 throughout our journey.
                </p>
                
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={satisfactionData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[4, 5]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="rating" stroke="#ff7e67" activeDot={{ r: 8 }} name="Satisfaction (out of 5)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
                <div className="bg-synergi-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-synergi-600" />
                </div>
                <h3 className="text-4xl font-bold mb-2 text-synergi-600">8,200+</h3>
                <p className="text-lg text-gray-700">Patients Served</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
                <div className="bg-synergi-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="h-8 w-8 text-synergi-600" />
                </div>
                <h3 className="text-4xl font-bold mb-2 text-synergi-600">90+</h3>
                <p className="text-lg text-gray-700">Mental Health Specialists</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
                <div className="bg-synergi-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-synergi-600" />
                </div>
                <h3 className="text-4xl font-bold mb-2 text-synergi-600">450+</h3>
                <p className="text-lg text-gray-700">Cities & Towns Reached</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why SynergiHub */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4 text-center">Why Choose SynergiHub?</h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              SynergiHub provides several unique advantages that set us apart in the mental healthcare landscape.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-synergi-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="text-synergi-600" size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Qualified Specialists</h3>
                <p className="text-gray-600">
                  All our mental health professionals are licensed experts with extensive experience in their specializations.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-synergi-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-synergi-600" size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Flexible Scheduling</h3>
                <p className="text-gray-600">
                  Book appointments at times that suit your schedule, with options for both daytime and evening sessions.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-synergi-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Brain className="text-synergi-600" size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Comprehensive Assessment</h3>
                <p className="text-gray-600">
                  Our detailed mental health assessments help identify your specific needs and match you with the right specialist.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-synergi-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="text-synergi-600" size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">First Consultation Free</h3>
                <p className="text-gray-600">
                  Your first consultation is completely free, with no time limit, to ensure you feel comfortable with your specialist.
                </p>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-synergi-50 rounded-xl max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold mb-4 text-center">Our Promise</h3>
              <p className="text-center text-gray-700">
                We believe that mental health care should be accessible to everyone. 
                That's why we offer a free first consultation with no time limit. 
                Take all the time you need to get comfortable with your doctor and 
                explain your concerns fully. We're committed to understanding you 
                before beginning any treatment plan.
              </p>
            </div>
          </div>
        </section>
        
        {/* For Whom We Exist */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Who We Serve</h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              SynergiHub is designed for everyone in India seeking mental healthcare, with special focus on:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="mb-4">
                  <Smile className="text-synergi-500" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Individuals</h3>
                <p className="text-gray-700 mb-4">
                  People seeking help for depression, anxiety, stress, trauma, or any other mental health concern.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-synergi-400 rounded-full mr-2"></div>
                    <span>Young adults struggling with life transitions</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-synergi-400 rounded-full mr-2"></div>
                    <span>Professionals managing workplace stress</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-synergi-400 rounded-full mr-2"></div>
                    <span>Those in remote areas with limited access</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="mb-4">
                  <Users className="text-synergi-500" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Families</h3>
                <p className="text-gray-700 mb-4">
                  Families navigating relationship dynamics, parenting challenges, or supporting a loved one with mental health issues.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-synergi-400 rounded-full mr-2"></div>
                    <span>Parents of children with behavioral concerns</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-synergi-400 rounded-full mr-2"></div>
                    <span>Couples seeking relationship counseling</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-synergi-400 rounded-full mr-2"></div>
                    <span>Caregivers of individuals with mental illness</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="mb-4">
                  <Award className="text-synergi-500" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Organizations</h3>
                <p className="text-gray-700 mb-4">
                  Companies, educational institutions, and NGOs looking to provide mental health support to their members.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-synergi-400 rounded-full mr-2"></div>
                    <span>Corporates seeking employee wellness programs</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-synergi-400 rounded-full mr-2"></div>
                    <span>Schools and universities supporting students</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-synergi-400 rounded-full mr-2"></div>
                    <span>Community organizations serving vulnerable groups</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-synergi-100">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Your Mental Health Journey Today</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Take the first step towards better mental health. Your journey begins with a free, no-obligation consultation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-synergi-500 hover:bg-synergi-600 text-white px-8 py-6 text-lg">
                <Link to="/assessment">Take Free Assessment</Link>
              </Button>
              <Button asChild variant="outline" className="border-synergi-300 text-synergi-700 px-8 py-6 text-lg">
                <Link to="/doctors">Browse Specialists</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
