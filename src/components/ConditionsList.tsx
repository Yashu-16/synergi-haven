import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface ConditionProps {
  title: string;
  description: string;
  link: string;
}

const Condition: React.FC<ConditionProps> = ({ title, description, link }) => {
  return (
    <div className="p-6 border border-synergi-100 rounded-xl transition-all duration-300 hover:border-synergi-300 hover:shadow-md bg-white">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link 
        to={link}
        className="inline-flex items-center text-synergi-600 hover:text-synergi-700 font-medium"
      >
        Learn more <ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
};

const ConditionsList: React.FC = () => {
  const conditions = {
    common: [
      {
        title: "Depression",
        description: "Persistent feelings of sadness, hopelessness, and loss of interest in activities.",
        link: "/conditions/depression"
      },
      {
        title: "Anxiety Disorders",
        description: "Excessive worry, fear, and nervousness that interferes with daily activities.",
        link: "/conditions/anxiety"
      },
      {
        title: "Stress",
        description: "Physical or emotional tension resulting from demanding circumstances.",
        link: "/conditions/stress"
      },
      {
        title: "Trauma & PTSD",
        description: "Psychological response to a deeply distressing or disturbing experience.",
        link: "/conditions/trauma"
      }
    ],
    mood: [
      {
        title: "Bipolar Disorder",
        description: "Extreme mood swings including emotional highs (mania) and lows (depression).",
        link: "/conditions/bipolar"
      },
      {
        title: "Dysthymia",
        description: "A persistent mild depression that lasts for years and affects daily functioning.",
        link: "/conditions/dysthymia"
      },
      {
        title: "Seasonal Affective Disorder",
        description: "Depression related to changes in seasons, typically beginning in fall and winter.",
        link: "/conditions/sad"
      }
    ],
    behavioral: [
      {
        title: "ADHD",
        description: "Difficulty paying attention, excessive activity, and impulsive behavior.",
        link: "/conditions/adhd"
      },
      {
        title: "OCD",
        description: "Unwanted thoughts (obsessions) and repetitive behaviors (compulsions).",
        link: "/conditions/ocd"
      },
      {
        title: "Eating Disorders",
        description: "Abnormal eating habits that negatively impact physical or mental health.",
        link: "/conditions/eating-disorders"
      },
      {
        title: "Addiction & Substance Use",
        description: "Dependence on substances or behaviors despite harmful consequences.",
        link: "/conditions/addiction"
      }
    ],
    specific: [
      {
        title: "Schizophrenia",
        description: "A disorder that affects how a person thinks, feels, and behaves.",
        link: "/conditions/schizophrenia"
      },
      {
        title: "Personality Disorders",
        description: "Unhealthy patterns of thinking, functioning, and behaving.",
        link: "/conditions/personality-disorders"
      },
      {
        title: "Sleep Disorders",
        description: "Problems with sleep quality, timing, or duration affecting daily life.",
        link: "/conditions/sleep-disorders"
      },
      {
        title: "Autism Spectrum",
        description: "Neurodevelopmental disorder affecting communication and behavior.",
        link: "/conditions/autism"
      }
    ]
  };

  const handleTabChange = () => {
    const sectionElement = document.querySelector('section.py-20.bg-synergi-50');
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-synergi-50" id="conditions-section">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-synergi-100 text-synergi-700 text-sm font-medium">
            Mental Health Conditions
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">We Provide Support for a Wide Range of Conditions</h2>
          <p className="text-lg text-gray-600">
            Our specialists are trained to address various mental health challenges with compassion and expertise.
          </p>
        </div>
        
        <Tabs defaultValue="common" className="w-full" onValueChange={handleTabChange}>
          <div className="flex justify-center mb-8">
            <TabsList className="bg-synergi-100/50">
              <TabsTrigger value="common" className="data-[state=active]:bg-white data-[state=active]:text-synergi-700">Common Concerns</TabsTrigger>
              <TabsTrigger value="mood" className="data-[state=active]:bg-white data-[state=active]:text-synergi-700">Mood Disorders</TabsTrigger>
              <TabsTrigger value="behavioral" className="data-[state=active]:bg-white data-[state=active]:text-synergi-700">Behavioral Conditions</TabsTrigger>
              <TabsTrigger value="specific" className="data-[state=active]:bg-white data-[state=active]:text-synergi-700">Specific Disorders</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="common" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {conditions.common.map((condition, index) => (
                <Condition 
                  key={index}
                  title={condition.title}
                  description={condition.description}
                  link={condition.link}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="mood" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conditions.mood.map((condition, index) => (
                <Condition 
                  key={index}
                  title={condition.title}
                  description={condition.description}
                  link={condition.link}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="behavioral" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {conditions.behavioral.map((condition, index) => (
                <Condition 
                  key={index}
                  title={condition.title}
                  description={condition.description}
                  link={condition.link}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="specific" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {conditions.specific.map((condition, index) => (
                <Condition 
                  key={index}
                  title={condition.title}
                  description={condition.description}
                  link={condition.link}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-12">
          <Button 
            asChild 
            className="bg-synergi-400 hover:bg-synergi-500 text-white px-8 py-6 text-lg"
            onClick={() => window.scrollTo(0, 0)}
          >
            <Link to="/assessment">Take a Mental Health Assessment</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ConditionsList;
