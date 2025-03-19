
import { DoctorProps } from "@/components/DoctorCard";

// Mental health conditions
export const mentalHealthConditions = [
  { id: "depression", name: "Depression", icon: "🌧️", description: "Persistent feelings of sadness and loss of interest" },
  { id: "anxiety", name: "Anxiety Disorders", icon: "😰", description: "Excessive worry, nervousness, or fear" },
  { id: "bipolar", name: "Bipolar Disorder", icon: "🔄", description: "Unusual shifts in mood, energy, and activity levels" },
  { id: "ptsd", name: "PTSD", icon: "⚡", description: "Difficulty recovering after experiencing or witnessing a terrifying event" },
  { id: "ocd", name: "OCD", icon: "🔁", description: "Unreasonable thoughts and fears that lead to repetitive behaviors" },
  { id: "schizophrenia", name: "Schizophrenia", icon: "🧠", description: "Distorted thinking, hallucinations, and altered perceptions" },
  { id: "eating-disorders", name: "Eating Disorders", icon: "🍽️", description: "Extreme emotions and behaviors surrounding food and weight" },
  { id: "addiction", name: "Addiction", icon: "⛓️", description: "Inability to stop using substances or engaging in behaviors" },
  { id: "adhd", name: "ADHD", icon: "🔍", description: "Difficulty paying attention, controlling impulsive behaviors" },
  { id: "stress", name: "Stress Management", icon: "😫", description: "Difficulty coping with pressure or challenging situations" },
  { id: "sleep-disorders", name: "Sleep Disorders", icon: "😴", description: "Problems with sleep quality, timing, or duration" },
  { id: "trauma", name: "Trauma", icon: "💔", description: "Emotional response to terrible events" }
];

// Doctors data
export const doctorsData: DoctorProps[] = [
  {
    id: "1",
    name: "Dr. Ananya Sharma",
    specialty: "Psychiatrist",
    experience: 12,
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    availability: "Online & In-person",
    specializations: ["Depression", "Anxiety", "PTSD", "OCD"],
    nextAvailable: "Today, 4:00 PM",
    bio: "Dr. Sharma is a board-certified psychiatrist with over 12 years of experience treating a wide range of mental health conditions. She specializes in medication management and psychotherapy for depression, anxiety, and trauma-related disorders.",
    education: [
      "MBBS, All India Institute of Medical Sciences (AIIMS), Delhi",
      "MD in Psychiatry, NIMHANS, Bangalore",
      "Fellowship in Cognitive Behavioral Therapy, King's College London"
    ],
    languages: ["English", "Hindi", "Bengali"],
    consultationFee: 1500,
    firstConsultFree: true
  },
  {
    id: "2",
    name: "Dr. Vikram Patel",
    specialty: "Clinical Psychologist",
    experience: 8,
    rating: 4.7,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    availability: "Online Only",
    specializations: ["Stress Management", "Trauma", "Couples Therapy"],
    nextAvailable: "Tomorrow, 10:00 AM",
    bio: "Dr. Patel is a clinical psychologist specializing in stress management, trauma recovery, and relationship counseling. He uses an evidence-based approach combining cognitive-behavioral techniques with mindfulness practices.",
    education: [
      "MA in Clinical Psychology, University of Delhi",
      "PhD in Psychology, Tata Institute of Social Sciences, Mumbai",
      "Certification in Trauma-Focused Therapy"
    ],
    languages: ["English", "Hindi", "Gujarati"],
    consultationFee: 1200,
    firstConsultFree: true
  },
  {
    id: "3",
    name: "Dr. Priya Nair",
    specialty: "Child Psychiatrist",
    experience: 15,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    availability: "Online & In-person",
    specializations: ["ADHD", "Autism Spectrum", "Learning Disorders", "Behavioral Issues"],
    nextAvailable: "Today, 6:30 PM",
    bio: "Dr. Nair is a child psychiatrist with 15 years of experience in diagnosing and treating mental health conditions in children and adolescents. She specializes in ADHD, autism spectrum disorders, and behavioral problems.",
    education: [
      "MBBS, Christian Medical College, Vellore",
      "MD in Psychiatry, PGIMER, Chandigarh",
      "Fellowship in Child & Adolescent Psychiatry, Massachusetts General Hospital, USA"
    ],
    languages: ["English", "Hindi", "Malayalam", "Tamil"],
    consultationFee: 1800,
    firstConsultFree: true
  },
  {
    id: "4",
    name: "Dr. Arjun Singh",
    specialty: "Addiction Specialist",
    experience: 10,
    rating: 4.6,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80",
    availability: "In-person Only",
    specializations: ["Substance Abuse", "Addiction Recovery", "Dual Diagnosis"],
    nextAvailable: "Tomorrow, 2:00 PM",
    bio: "Dr. Singh specializes in addiction medicine and recovery. With a decade of experience, he has helped hundreds of patients overcome substance abuse disorders through a combination of medical treatment and psychosocial support.",
    education: [
      "MBBS, Maulana Azad Medical College, Delhi",
      "MD in Psychiatry, KEM Hospital, Mumbai",
      "Certified in Addiction Medicine by ISAM"
    ],
    languages: ["English", "Hindi", "Punjabi"],
    consultationFee: 1600,
    firstConsultFree: true
  },
  {
    id: "5",
    name: "Dr. Meena Kapoor",
    specialty: "Psychotherapist",
    experience: 7,
    rating: 4.8,
    reviews: 72,
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80",
    availability: "Online Only",
    specializations: ["Depression", "Anxiety", "Work-Life Balance", "Self-esteem"],
    nextAvailable: "Today, 8:00 PM",
    bio: "Dr. Kapoor is a psychotherapist focusing on depression, anxiety, and work-related stress. She employs a holistic approach that addresses the mind-body connection and helps patients develop practical coping strategies.",
    education: [
      "Master's in Clinical Psychology, Bangalore University",
      "PhD in Counseling Psychology, NIMHANS",
      "Certified in Cognitive Behavioral Therapy and Mindfulness-Based Stress Reduction"
    ],
    languages: ["English", "Hindi", "Kannada"],
    consultationFee: 1100,
    firstConsultFree: true
  },
  {
    id: "6",
    name: "Dr. Rajesh Kumar",
    specialty: "Geriatric Psychiatrist",
    experience: 20,
    rating: 4.9,
    reviews: 214,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    availability: "Online & In-person",
    specializations: ["Dementia", "Alzheimer's", "Late-life Depression", "Elder Care"],
    nextAvailable: "Tomorrow, 11:30 AM",
    bio: "Dr. Kumar is one of India's leading geriatric psychiatrists with two decades of experience. He specializes in late-life mental health concerns including dementia, depression, and anxiety disorders in the elderly population.",
    education: [
      "MBBS, Armed Forces Medical College, Pune",
      "MD in Psychiatry, AIIMS, Delhi",
      "Fellowship in Geriatric Psychiatry, Johns Hopkins University, USA"
    ],
    languages: ["English", "Hindi", "Marathi"],
    consultationFee: 2000,
    firstConsultFree: true
  }
];
