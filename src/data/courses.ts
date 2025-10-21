// List of common courses and programs offered in Indian colleges
export const indianCourses = [
  // Engineering
  'Computer Science Engineering',
  'Computer Science and Engineering',
  'Information Technology',
  'Electronics and Communication Engineering',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Aerospace Engineering',
  'Biotechnology Engineering',
  'Automobile Engineering',
  'Industrial Engineering',
  'Production Engineering',
  'Instrumentation Engineering',
  'Petroleum Engineering',
  'Mining Engineering',
  'Metallurgical Engineering',
  'Agricultural Engineering',
  'Environmental Engineering',
  'Marine Engineering',
  
  // Computer & IT
  'Computer Applications',
  'Information Science',
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'Cyber Security',
  'Cloud Computing',
  'Software Engineering',
  
  // Science
  'Physics',
  'Chemistry',
  'Mathematics',
  'Statistics',
  'Microbiology',
  'Biotechnology',
  'Biochemistry',
  'Botany',
  'Zoology',
  'Environmental Science',
  'Geology',
  'Applied Sciences',
  
  // Commerce
  'Commerce',
  'Business Studies',
  'Accounting and Finance',
  'Economics',
  'Banking and Insurance',
  'Taxation',
  'Cost Accounting',
  
  // Management
  'Business Administration',
  'Master of Business Administration (MBA)',
  'Bachelor of Business Administration (BBA)',
  'Hotel Management',
  'Hospital Management',
  'Event Management',
  'Retail Management',
  'Marketing Management',
  'Human Resource Management',
  'Finance Management',
  'Operations Management',
  'International Business',
  
  // Arts & Humanities
  'English Literature',
  'Hindi Literature',
  'History',
  'Political Science',
  'Sociology',
  'Psychology',
  'Philosophy',
  'Geography',
  'Economics',
  'Journalism',
  'Mass Communication',
  
  // Medical & Health
  'Medicine (MBBS)',
  'Dental Surgery (BDS)',
  'Ayurveda (BAMS)',
  'Homeopathy (BHMS)',
  'Nursing',
  'Pharmacy',
  'Physiotherapy',
  'Occupational Therapy',
  'Medical Laboratory Technology',
  'Radiology',
  'Public Health',
  
  // Law
  'Law (LLB)',
  'Integrated Law (BA LLB)',
  'Integrated Law (BBA LLB)',
  'Integrated Law (BCom LLB)',
  'Corporate Law',
  'Criminal Law',
  
  // Design & Arts
  'Fashion Design',
  'Interior Design',
  'Graphic Design',
  'Product Design',
  'Industrial Design',
  'Animation',
  'Fine Arts',
  'Applied Arts',
  'Visual Communication',
  'Film Making',
  'Photography',
  
  // Architecture
  'Architecture',
  'Urban Planning',
  'Landscape Architecture',
  
  // Agriculture
  'Agriculture',
  'Agricultural Engineering',
  'Horticulture',
  'Forestry',
  'Veterinary Science',
  'Fisheries Science',
  
  // Education
  'Bachelor of Education (B.Ed)',
  'Master of Education (M.Ed)',
  'Physical Education',
  'Elementary Education',
  
  // Others
  'Library Science',
  'Social Work',
  'Travel and Tourism',
  'Aviation',
  'Culinary Arts',
  'Sports Management',
  'Fashion Technology',
  'Textile Design',
];

// Function to filter courses based on search query
export const filterCourses = (query: string): string[] => {
  if (!query) return [];
  
  const lowercaseQuery = query.toLowerCase();
  return indianCourses.filter(course => 
    course.toLowerCase().includes(lowercaseQuery)
  );
};

// Function to add a new course to the list
export const addCourse = (courseName: string): void => {
  const trimmedName = courseName.trim();
  if (trimmedName && !indianCourses.includes(trimmedName)) {
    indianCourses.push(trimmedName);
    // Sort alphabetically for better UX
    indianCourses.sort();
  }
};

