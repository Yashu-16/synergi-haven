
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Clock, Send } from 'lucide-react';
import { doctorsData } from "@/utils/data";

// Assessment questions
const questions = [
  {
    id: 1,
    category: "Depression",
    question: "Over the past two weeks, how often have you felt little interest or pleasure in doing things?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 2,
    category: "Depression",
    question: "Over the past two weeks, how often have you felt down, depressed, or hopeless?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 3,
    category: "Anxiety",
    question: "Over the past two weeks, how often have you been feeling nervous, anxious, or on edge?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 4,
    category: "Anxiety",
    question: "Over the past two weeks, how often have you been unable to stop or control worrying?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 5,
    category: "Sleep",
    question: "Over the past two weeks, how often have you had trouble falling or staying asleep, or sleeping too much?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 6,
    category: "Energy",
    question: "Over the past two weeks, how often have you been feeling tired or having little energy?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 7,
    category: "Self-image",
    question: "Over the past two weeks, how often have you been feeling bad about yourself, or that you are a failure or have let yourself or your family down?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 8,
    category: "Concentration",
    question: "Over the past two weeks, how often have you had trouble concentrating on things, such as reading or watching television?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 9,
    category: "Physical Symptoms",
    question: "Over the past two weeks, how often have you been moving or speaking so slowly that other people could have noticed, or being so fidgety or restless that you have been moving around more than usual?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 10,
    category: "Suicidal Thoughts",
    question: "Over the past two weeks, how often have you had thoughts that you would be better off dead or of hurting yourself in some way?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  }
];

// Result evaluator
const evaluateResults = (answers: Record<number, number>) => {
  const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
  
  // Categories and their corresponding question IDs
  const categories = {
    depression: [1, 2, 7],
    anxiety: [3, 4],
    physicalSymptoms: [5, 6, 8, 9],
    suicidalThoughts: [10]
  };
  
  // Calculate category scores
  const categoryScores = {
    depression: categories.depression.reduce((sum, id) => sum + (answers[id] || 0), 0) / categories.depression.length,
    anxiety: categories.anxiety.reduce((sum, id) => sum + (answers[id] || 0), 0) / categories.anxiety.length,
    physicalSymptoms: categories.physicalSymptoms.reduce((sum, id) => sum + (answers[id] || 0), 0) / categories.physicalSymptoms.length,
    suicidalThoughts: answers[10] || 0
  };
  
  // Determine severity level
  let severity = "minimal";
  if (totalScore >= 20) {
    severity = "severe";
  } else if (totalScore >= 15) {
    severity = "moderately severe";
  } else if (totalScore >= 10) {
    severity = "moderate";
  } else if (totalScore >= 5) {
    severity = "mild";
  }
  
  // Determine primary concerns
  const primaryConcerns = [];
  if (categoryScores.depression >= 2) primaryConcerns.push("Depression");
  if (categoryScores.anxiety >= 2) primaryConcerns.push("Anxiety");
  if (categoryScores.physicalSymptoms >= 2) primaryConcerns.push("Physical Symptoms");
  if (categoryScores.suicidalThoughts >= 1) {
    primaryConcerns.push("Suicidal Thoughts");
    severity = "severe"; // Override severity if suicidal thoughts are present
  }
  
  return {
    totalScore,
    severity,
    primaryConcerns,
    categoryScores
  };
};

// Get relevant doctors based on assessment results
const getRelevantDoctors = (results: any) => {
  if (!results || !results.primaryConcerns) return [];
  
  return doctorsData.filter(doctor => {
    // If there are no primary concerns, all doctors are relevant
    if (results.primaryConcerns.length === 0) return true;
    
    // Match doctors based on their specializations
    return results.primaryConcerns.some((concern: string) => {
      // Map concerns to related specializations
      const relatedSpecializations = {
        "Depression": ["Depression", "Trauma", "Self-esteem"],
        "Anxiety": ["Anxiety", "Stress Management", "Work-Life Balance"],
        "Physical Symptoms": ["Sleep Disorders", "Stress Management"],
        "Suicidal Thoughts": ["Depression", "Trauma", "Self-esteem"]
      };
      
      // Get related specializations for this concern
      const specializations = relatedSpecializations[concern as keyof typeof relatedSpecializations] || [];
      
      // Check if doctor specializes in any of these
      return specializations.some(spec => 
        doctor.specializations.includes(spec)
      );
    });
  });
};

const Assessment: React.FC = () => {
  const { toast } = useToast();
  const { user, sendTestResults } = useAuth();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(0); // 0: intro, 1-10: questions, 11: results
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [assessmentStartTime, setAssessmentStartTime] = useState<Date | null>(null);
  const [results, setResults] = useState<any>(null);
  const [relevantDoctors, setRelevantDoctors] = useState<any[]>([]);
  const [doctorSelectionOpen, setDoctorSelectionOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [reportSent, setReportSent] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const handleStart = () => {
    setCurrentStep(1);
    setAssessmentStartTime(new Date());
  };
  
  const handleAnswer = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate results
      const evalResults = evaluateResults(answers);
      setResults(evalResults);
      
      // Get relevant doctors
      const doctors = getRelevantDoctors(evalResults);
      setRelevantDoctors(doctors);
      
      // Update to not show results immediately, but open doctor selection instead
      setCurrentStep(questions.length + 1);
      
      // Automatically open doctor selection dialog if user is logged in
      if (user) {
        setDoctorSelectionOpen(true);
      } else {
        toast({
          title: "Login Required",
          description: "Please login to send your assessment to a doctor. Results will not be shown to protect privacy.",
          variant: "default",
        });
        navigate("/login", { 
          state: { 
            fromAssessment: true,
            assessmentData: {
              answers,
              results: evalResults
            }
          }
        });
      }
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResults(null);
    setAssessmentStartTime(null);
    setRelevantDoctors([]);
    setSelectedDoctor(null);
    setReportSent(false);
  };
  
  const handleSendToDoctor = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login or register to send your assessment to a doctor",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    setDoctorSelectionOpen(true);
  };
  
  const handleSelectDoctor = (doctorId: string) => {
    setSelectedDoctor(doctorId);
  };
  
  const handleConfirmSend = async () => {
    if (!selectedDoctor || !results) return;
    
    // Use the new sendTestResults function
    const success = await sendTestResults(selectedDoctor, {
      answers,
      results,
      completedAt: new Date().toISOString()
    });
    
    if (success) {
      const selectedDoctorName = doctorsData.find(d => d.id === selectedDoctor)?.name;
      
      toast({
        title: "Assessment Sent!",
        description: `Your assessment has been sent to Dr. ${selectedDoctorName}. They will review it and get back to you soon.`,
      });
      
      setDoctorSelectionOpen(false);
      setReportSent(true);
      
      // Navigate to relevant doctors page
      navigate("/doctors", { 
        state: { 
          fromAssessment: true, 
          concerns: results?.primaryConcerns || [],
          assessmentCompleted: true
        }
      });
    }
  };
  
  const handleViewDoctors = () => {
    navigate("/doctors", { 
      state: { 
        fromAssessment: true, 
        concerns: results?.primaryConcerns || [],
        assessmentCompleted: true
      }
    });
  };
  
  const currentQuestion = questions[currentStep - 1];
  const progress = (currentStep / (questions.length + 1)) * 100;
  
  const getTimeElapsed = () => {
    if (!assessmentStartTime) return "";
    const now = new Date();
    const elapsedMs = now.getTime() - assessmentStartTime.getTime();
    const minutes = Math.floor(elapsedMs / 60000);
    const seconds = Math.floor((elapsedMs % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "minimal": return "text-green-600";
      case "mild": return "text-blue-600";
      case "moderate": return "text-yellow-600";
      case "moderately severe": return "text-orange-600";
      case "severe": return "text-red-600";
      default: return "";
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-20 page-transition">
        <div className="container mx-auto px-6">
          {currentStep === 0 ? (
            <Card className="max-w-3xl mx-auto animate-scale-in">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <h1 className="text-3xl font-bold mb-4">Mental Health Assessment</h1>
                  <p className="text-gray-600 mb-8">
                    This confidential assessment will help us understand your mental health needs better.
                    You'll answer a series of questions about how you've been feeling over the past two weeks.
                  </p>
                </div>
                
                <div className="space-y-8 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 text-blue-600 p-2 rounded-full mr-4">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium">Takes only 3-5 minutes</h3>
                      <p className="text-gray-600 text-sm">
                        The assessment contains 10 simple questions that are quick to answer.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 text-green-600 p-2 rounded-full mr-4">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium">Completely confidential</h3>
                      <p className="text-gray-600 text-sm">
                        Your answers are secure and will only be used to provide you with better care.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-yellow-100 text-yellow-600 p-2 rounded-full mr-4">
                      <AlertTriangle size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium">Not a diagnostic tool</h3>
                      <p className="text-gray-600 text-sm">
                        This assessment provides insights but is not a substitute for professional diagnosis.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6 text-center">
                  <Button 
                    onClick={handleStart}
                    className="bg-synergi-400 hover:bg-synergi-500 text-white px-8 py-6 text-lg"
                  >
                    Begin Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : currentStep <= questions.length ? (
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Question {currentStep} of {questions.length}
                  </span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <Clock size={16} className="mr-1" />
                    {getTimeElapsed()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-synergi-400 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              
              <Card className="animate-fade-in">
                <CardContent className="pt-6">
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 bg-synergi-100 text-synergi-700 text-xs font-medium rounded-full">
                      {currentQuestion.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
                  
                  <RadioGroup
                    value={answers[currentQuestion.id]?.toString()}
                    onValueChange={(value) => handleAnswer(currentQuestion.id, parseInt(value))}
                    className="space-y-4"
                  >
                    {currentQuestion.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                        <RadioGroupItem id={`option-${option.value}`} value={option.value.toString()} />
                        <Label htmlFor={`option-${option.value}`} className="flex-1 cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  
                  <div className="flex justify-between mt-8 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      className="flex items-center"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={answers[currentQuestion.id] === undefined}
                      className="bg-synergi-400 hover:bg-synergi-500 text-white flex items-center"
                    >
                      {currentStep === questions.length ? 'Complete' : 'Next'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto animate-fade-in-up">
              <Card>
                <CardContent className="pt-8 pb-8">
                  {showResults ? (
                    <>
                      <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-4">Your Assessment Results</h1>
                        <p className="text-gray-600">
                          Based on your responses, we've prepared the following insights about your mental health.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                          <h3 className="text-lg font-medium mb-2">Overall Score</h3>
                          <div className="text-4xl font-bold mb-1">{results.totalScore}</div>
                          <p className="text-sm text-gray-500">Out of 30</p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                          <h3 className="text-lg font-medium mb-2">Severity Level</h3>
                          <div className={`text-2xl font-bold mb-1 capitalize ${getSeverityColor(results.severity)}`}>
                            {results.severity}
                          </div>
                          <p className="text-sm text-gray-500">Based on your responses</p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                          <h3 className="text-lg font-medium mb-2 text-center">Primary Concerns</h3>
                          <div>
                            {results.primaryConcerns.length > 0 ? (
                              <ul className="space-y-1">
                                {results.primaryConcerns.map((concern: string, index: number) => (
                                  <li key={index} className="flex items-center">
                                    <div className="w-2 h-2 bg-synergi-400 rounded-full mr-2"></div>
                                    {concern}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-500 text-center">No significant concerns detected</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-synergi-50 p-6 rounded-xl mb-8">
                        <h3 className="text-lg font-semibold mb-4">What does this mean?</h3>
                        {results.severity === "minimal" && (
                          <p>Your responses suggest minimal symptoms. It's still beneficial to practice self-care and monitor your mental health.</p>
                        )}
                        {results.severity === "mild" && (
                          <p>Your responses suggest mild symptoms. Consider speaking with a mental health professional for guidance on coping strategies.</p>
                        )}
                        {results.severity === "moderate" && (
                          <p>Your responses suggest moderate symptoms. We recommend consultation with a mental health professional to develop a treatment plan.</p>
                        )}
                        {results.severity === "moderately severe" && (
                          <p>Your responses suggest moderately severe symptoms. We strongly recommend seeking professional help from a psychiatrist or psychologist.</p>
                        )}
                        {results.severity === "severe" && (
                          <p>Your responses suggest severe symptoms. Please consult with a mental health professional as soon as possible for appropriate intervention.</p>
                        )}
                        
                        {results.categoryScores.suicidalThoughts > 0 && (
                          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 font-medium">
                              Your responses indicate thoughts about self-harm or suicide. Please reach out for help immediately:
                            </p>
                            <p className="mt-2">
                              India Mental Health Helpline: <strong>1800-599-0019</strong> (Toll Free 24/7)
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-10">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold mb-2">Assessment Completed!</h2>
                      <p className="text-gray-600 mb-8">
                        {reportSent 
                          ? "Your assessment has been sent to the doctor. They will review it and get back to you soon."
                          : "Your assessment is ready to be sent to a doctor who can help with your specific needs."}
                      </p>
                      
                      {!reportSent && (
                        <div className="space-y-4">
                          <Button 
                            onClick={handleSendToDoctor} 
                            className="bg-synergi-400 hover:bg-synergi-500 text-white px-8 py-2"
                          >
                            <Send className="mr-2 h-4 w-4" />
                            Send to a Doctor
                          </Button>
                          <div>
                            <Button 
                              variant="outline" 
                              onClick={handleViewDoctors}
                              className="mt-2"
                            >
                              View Recommended Doctors
                            </Button>
                          </div>
                          <div>
                            <Button 
                              variant="link" 
                              onClick={handleReset}
                              className="text-gray-500"
                            >
                              Reset Assessment
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      
      {/* Doctor Selection Dialog */}
      <Dialog open={doctorSelectionOpen} onOpenChange={setDoctorSelectionOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select a Doctor</DialogTitle>
            <DialogDescription>
              Choose a doctor to send your assessment results to:
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4 max-h-[300px] overflow-y-auto">
            {relevantDoctors.length > 0 ? (
              relevantDoctors.map((doctor) => (
                <div 
                  key={doctor.id} 
                  className={`flex items-start space-x-4 p-3 rounded-lg cursor-pointer border ${
                    selectedDoctor === doctor.id ? 'border-synergi-400 bg-synergi-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleSelectDoctor(doctor.id)}
                >
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium">{doctor.name}</h4>
                    <p className="text-sm text-gray-500">
                      {doctor.specializations.slice(0, 2).join(", ")}
                      {doctor.specializations.length > 2 ? "..." : ""}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No doctors found matching your needs</p>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDoctorSelectionOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmSend}
              disabled={!selectedDoctor}
              className="bg-synergi-400 hover:bg-synergi-500 text-white"
            >
              Send Assessment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Assessment;
