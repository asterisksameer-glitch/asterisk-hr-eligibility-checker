export enum JobCategory {
  UNSKILLED = 'Unskill / General Worker (Work Permit)',
  CONSTRUCTION = 'Construction / PCM / Shipyard (Work Permit)',
  SERVICE = 'Hotel / Restaurant / Cleaning (Work Permit)',
  SPASS = 'Skilled Technician / Supervisor (S-Pass)',
  TRANSFER = 'Already in Singapore (Transfer / U-Turn)'
}

export enum WizardStep {
  CATEGORY = 0,
  BASIC_INFO = 1,
  QUALIFICATIONS = 2,
  SPECIFIC_DETAILS = 3,
  FINAL_DETAILS = 4,
  SUCCESS = 5,
  FAIL = 6
}

export type Language = 'bn' | 'en';

export interface FileData {
  name: string;
  type: string;
  base64: string;
}

export interface UserState {
  // Step 0
  category: JobCategory | null;
  
  // Step 1: Basic Info
  fullName: string;
  age: string;
  gender: 'Male' | 'Female' | '';
  district: string;

  // Step 2: Qualifications
  hasPassport: boolean | null; // "Machine readable passport?"
  passportValidity: 'less_2' | 'more_2' | ''; // "Validity > 2 years?"
  education: string;
  englishLevel: 'Basic' | 'Good' | 'None' | '';

  // Step 3: Specifics
  // WP Specifics
  trade?: string;
  customTrade?: string; // For "Others" option
  experienceYears?: string;
  experienceLocation?: 'Bangladesh' | 'Abroad' | 'None' | '';
  singaporeHistory?: boolean | null;
  medicalCondition?: boolean | null; // "Ki kono serious rog ache?"
  policeIssues?: boolean | null;
  
  // S-Pass Specifics
  fieldOfStudy?: string;
  currentJobTitle?: string;
  certifications?: string;
  computerSkills?: boolean | null;
  
  // Transfer Specifics
  currentStatus?: 'In Singapore' | 'Back in BD';
  lastPassType?: 'Work Permit' | 'S-Pass' | 'Employment Pass' | '';
  lastSalary?: string;

  // Step 4: Final
  joiningTime: string;
  referralSource: string;
  cvFile?: FileData | null;
  passportFile?: FileData | null;
}