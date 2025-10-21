// List of major colleges and universities in India
export const indianColleges = [
  // IITs
  'Indian Institute of Technology (IIT) Bombay',
  'Indian Institute of Technology (IIT) Delhi',
  'Indian Institute of Technology (IIT) Madras',
  'Indian Institute of Technology (IIT) Kanpur',
  'Indian Institute of Technology (IIT) Kharagpur',
  'Indian Institute of Technology (IIT) Roorkee',
  'Indian Institute of Technology (IIT) Guwahati',
  'Indian Institute of Technology (IIT) Hyderabad',
  'Indian Institute of Technology (IIT) Indore',
  'Indian Institute of Technology (IIT) Varanasi (BHU)',
  'Indian Institute of Technology (IIT) Patna',
  'Indian Institute of Technology (IIT) Ropar',
  'Indian Institute of Technology (IIT) Bhubaneswar',
  'Indian Institute of Technology (IIT) Gandhinagar',
  'Indian Institute of Technology (IIT) Jodhpur',
  'Indian Institute of Technology (IIT) Mandi',
  'Indian Institute of Technology (IIT) Palakkad',
  'Indian Institute of Technology (IIT) Tirupati',
  'Indian Institute of Technology (IIT) Dhanbad',
  'Indian Institute of Technology (IIT) Bhilai',
  'Indian Institute of Technology (IIT) Goa',
  'Indian Institute of Technology (IIT) Jammu',
  'Indian Institute of Technology (IIT) Dharwad',
  
  // NITs
  'National Institute of Technology (NIT) Trichy',
  'National Institute of Technology (NIT) Warangal',
  'National Institute of Technology (NIT) Surathkal',
  'National Institute of Technology (NIT) Calicut',
  'National Institute of Technology (NIT) Rourkela',
  'National Institute of Technology (NIT) Allahabad',
  'National Institute of Technology (NIT) Durgapur',
  'National Institute of Technology (NIT) Jaipur',
  'National Institute of Technology (NIT) Kurukshetra',
  'National Institute of Technology (NIT) Silchar',
  
  // IIMs
  'Indian Institute of Management (IIM) Ahmedabad',
  'Indian Institute of Management (IIM) Bangalore',
  'Indian Institute of Management (IIM) Calcutta',
  'Indian Institute of Management (IIM) Lucknow',
  'Indian Institute of Management (IIM) Indore',
  'Indian Institute of Management (IIM) Kozhikode',
  
  // IISc
  'Indian Institute of Science (IISc) Bangalore',
  
  // Central Universities
  'Jawaharlal Nehru University (JNU)',
  'University of Delhi',
  'Banaras Hindu University (BHU)',
  'Aligarh Muslim University (AMU)',
  'University of Hyderabad',
  'Jamia Millia Islamia',
  'Tata Institute of Fundamental Research (TIFR)',
  'Jadavpur University',
  'Anna University',
  'University of Mumbai',
  'University of Calcutta',
  'University of Madras',
  'Savitribai Phule Pune University',
  
  // State Universities
  'Osmania University',
  'Andhra University',
  'Visvesvaraya Technological University (VTU)',
  'Gujarat Technological University (GTU)',
  'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
  'Rajasthan Technical University (RTU)',
  
  // Deemed Universities
  'Birla Institute of Technology and Science (BITS) Pilani',
  'Vellore Institute of Technology (VIT)',
  'Manipal Academy of Higher Education',
  'SRM Institute of Science and Technology',
  'Amity University',
  'Symbiosis International University',
  'SASTRA University',
  'Thapar Institute of Engineering and Technology',
  'Lovely Professional University (LPU)',
  
  // Management Institutes
  'Xavier School of Management (XLRI)',
  'SP Jain Institute of Management and Research',
  'Management Development Institute (MDI) Gurgaon',
  'Faculty of Management Studies (FMS) Delhi',
  
  // Medical Colleges
  'All India Institute of Medical Sciences (AIIMS) Delhi',
  'Christian Medical College (CMC) Vellore',
  'Armed Forces Medical College (AFMC) Pune',
  'Maulana Azad Medical College',
  'King George Medical University',
  
  // Law Colleges
  'National Law School of India University (NLSIU) Bangalore',
  'National Academy of Legal Studies and Research (NALSAR) Hyderabad',
  'National Law University (NLU) Delhi',
  
  // Design & Arts
  'National Institute of Design (NID) Ahmedabad',
  'National Institute of Fashion Technology (NIFT)',
  'Film and Television Institute of India (FTII) Pune',
  
  // Engineering Colleges
  'Delhi Technological University (DTU)',
  'Netaji Subhas University of Technology (NSUT)',
  'PSG College of Technology',
  'College of Engineering Pune (COEP)',
  'BMS College of Engineering',
  'RV College of Engineering',
  'PES University',
  'Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT)',
  'International Institute of Information Technology (IIIT) Hyderabad',
  'International Institute of Information Technology (IIIT) Bangalore',
  'Indraprastha Institute of Information Technology (IIIT) Delhi',
];

// Function to filter colleges based on search query
export const filterColleges = (query: string): string[] => {
  if (!query) return [];
  
  const lowercaseQuery = query.toLowerCase();
  return indianColleges.filter(college => 
    college.toLowerCase().includes(lowercaseQuery)
  );
};

// Function to add a new college to the list
export const addCollege = (collegeName: string): void => {
  const trimmedName = collegeName.trim();
  if (trimmedName && !indianColleges.includes(trimmedName)) {
    indianColleges.push(trimmedName);
    // Sort alphabetically for better UX
    indianColleges.sort();
  }
};

