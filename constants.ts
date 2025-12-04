

export const WHATSAPP_NUMBER = "8801704100775"; 
export const ADDRESS = "Ibrahim Chamber, 95 Motijheel, Dhaka";
export const COMPANY_NAME = "Asterisk Human Resources";

// TODO: Replace with your actual n8n Webhook URL (POST)
export const N8N_WEBHOOK_URL = ""; 

export const TRADE_OTHERS = "অন্যান্য (Others)";

export const DISTRICTS = [
  "Dhaka", "Chattogram", "Comilla", "Noakhali", "Chandpur", "Brahmanbaria", 
  "Feni", "Sylhet", "Bogura", "Tangail", "Mymensingh", "Faridpur", "Barishal", 
  "Khulna", "Rajshahi", "Rangpur", "Other"
];

export const EDUCATION_LEVELS = [
  "অষ্টম শ্রেণি পাস (Class 8)",
  "এসএসসি / ও-লেভেল (SSC/O-Level)",
  "এইচএসসি / এ-লেভেল (HSC/A-Level)",
  "ডিপ্লোমা (Diploma)",
  "ব্যাচেলর / অনার্স (Bachelor)",
  "মাস্টার্স (Masters)"
];

export const TRADES_WP = [
  "জেনারেল ওয়ার্কার (General Worker)",
  "ক্লিনার (Cleaner)",
  "কনস্ট্রাকশন লেবার (Construction General)",
  "ওয়েল্ডার (Welder 3G/4G/6G)",
  "পাইপ ফিটার (Pipe Fitter)",
  "ইলেকট্রিশিয়ান (Electrician)",
  "প্লাম্বার (Plumber)",
  "কার্পেন্টার (Carpenter)",
  "স্টিল ফিক্সার (Steel Fixer)",
  "রাজমিস্ত্রি (Mason)",
  "স্ক্যাফোল্ডার (Scaffolder)",
  "রিগার / সিগন্যালম্যান (Rigger)",
  "ড্রাইভার (Driver Class 3/4)",
  "এক্সকাভেটর অপারেটর (Excavator Operator)"
];

export const TRADES_SERVICE = [
  "ক্লিনার (Cleaner - General)",
  "হাউসকিপিং (Housekeeping)",
  "ওয়েটার / সার্ভিস ক্রু (Waiter)",
  "কিচেন হেল্পার (Kitchen Helper)",
  "বাবুর্চি / শেফ (Cook / Chef)",
  "হোটেল মেইনটেনেন্স (Maintenance)"
];

export const JOINING_TIMES = [
  "জরুরি (Immediately - ASAP)",
  "১ মাসের মধ্যে (Within 1 Month)",
  "২-৩ মাসের মধ্যে (After 2-3 Months)",
  "এখনও নিশ্চিত নই (Not sure yet)"
];

export const TRANSLATIONS = {
  bn: {
    // Common
    next: "পরবর্তী ধাপ",
    back: "পেছনে",
    result: "ফলাফল দেখুন",
    submit_wa: "হোয়াটসঅ্যাপে সিভি পাঠান",
    check_again: "নতুন করে চেক করুন",
    start_again: "আবার চেক করুন",
    yes: "হ্যাঁ",
    no: "না",
    yes_long: "জি, আছে (Yes)",
    no_long: "না, নেই (No)",
    govt_approved: "সরকারি অনুমোদিত",
    dhaka_to_sg: "ঢাকা টু সিঙ্গাপুর",

    // Step: Category
    cat_title: "কাজের ধরন নির্বাচন করুন",
    cat_sub: "আপনার উপযুক্ত ক্যাটাগরি বেছে নিন",
    cat_unskilled: "আনস্কিল্ড / জেনারেল ওয়ার্কার",
    cat_unskilled_sub: "ফ্যাক্টরি বা সাধারণ শ্রমিক (Work Permit)",
    cat_construction: "কনস্ট্রাকশন / শিপইয়ার্ড",
    cat_construction_sub: "নির্মাণ বা পিসিএম কাজ (Work Permit)",
    cat_service: "হোটেল / ক্লিনিং / সার্ভিস",
    cat_service_sub: "সার্ভিস সেক্টরের কাজ (Work Permit)",
    cat_spass: "স্কিলড / সুপারভাইজার (S-Pass)",
    cat_spass_sub: "টেকনিশিয়ান বা ইঞ্জিনিয়ারিং পদ",
    cat_transfer: "ট্রান্সফার / ইউ-টার্ন",
    cat_transfer_sub: "যারা বর্তমানে সিঙ্গাপুরে আছেন",
    
    // Step: Basic Info
    basic_title: "ব্যক্তিগত তথ্য",
    basic_sub: "আপনার প্রাথমিক তথ্যগুলো দিন",
    label_name: "আপনার পুরো নাম?",
    label_name_sub: "পাসপোর্ট / এনআইডি অনুযায়ী",
    ph_name: "নাম লিখুন...",
    label_age: "আপনার বয়স?",
    ph_age: "উদাহরণ: 26",
    label_gender: "লিঙ্গ?",
    opt_male: "পুরুষ (Male)",
    opt_female: "মহিলা (Female)",
    label_district: "আপনার নিজ জেলা কোনটি?",
    opt_select_district: "জেলা নির্বাচন করুন",

    // Step: Qualifications
    qual_title: "যোগ্যতা যাচাই",
    qual_sub: "আপনার শিক্ষাগত ও অন্যান্য যোগ্যতা",
    label_passport: "মেশিন রিডেবল পাসপোর্ট আছে?",
    label_validity: "পাসপোর্টের মেয়াদ কত দিন বাকি?",
    opt_select_validity: "মেয়াদ নির্বাচন করুন",
    opt_validity_more: "২ বছরের বেশি",
    opt_validity_less: "২ বছরের কম",
    label_edu: "সর্বোচ্চ শিক্ষাগত যোগ্যতা?",
    opt_select_edu: "যোগ্যতা নির্বাচন করুন",
    label_english: "ইংরেজিতে কথা বলতে পারেন?",
    opt_eng_basic: "মোটামুটি",
    opt_eng_good: "ভালো পারি",
    opt_eng_none: "পারি না",

    // Step: Specifics
    spec_title: "কাজের বিবরণ",
    spec_sub: "অভিজ্ঞতা এবং অন্যান্য তথ্য",
    label_trade: "কোন কাজের অভিজ্ঞতা আছে?",
    label_trade_sub: "ট্রেড নির্বাচন করুন",
    opt_select_trade: "ট্রেড তালিকা",
    label_custom_trade: "কাজের নাম লিখুন",
    ph_custom_trade: "যেমন: ফোরক্লিপ্ট ড্রাইভার",
    label_exp: "এই কাজে কত দিনের অভিজ্ঞতা?",
    opt_select_exp: "অভিজ্ঞতার সময়কাল",
    opt_exp_fresh: "নতুন (Fresh / No Experience)",
    opt_exp_6m: "৬ মাস +",
    opt_exp_1y: "১-২ বছর",
    opt_exp_3y: "৩ বছরের বেশি",
    label_sg_history: "আগে কি সিঙ্গাপুরে কাজ করেছেন?",
    label_medical: "বড় কোনো শারীরিক সমস্যা আছে?",
    label_medical_sub: "(যেমন: হার্ট, টিবি, অপারেশন)",
    label_police: "পুলিশ কেস বা আইনি সমস্যা?",
    label_police_sub: "(ডিপোর্ট বা ওভারস্টে রেকর্ড)",
    
    // SPASS Specifics
    label_study_field: "পড়াশোনার বিষয়?",
    label_study_field_sub: "Major Subject",
    ph_study_field: "যেমন: মেকানিক্যাল, ইলেকট্রিক্যাল, আইটি",
    label_job_title: "বর্তমান চাকরির পদবি?",
    label_job_title_sub: "Job Title",
    ph_job_title: "যেমন: সাইট সুপারভাইজার, ইঞ্জিনিয়ার",
    label_computer: "কম্পিউটার চালাতে পারেন?",
    opt_yes_simple: "হ্যাঁ (Yes)",
    opt_no_simple: "না (No)",

    // Transfer Specifics
    label_status: "বর্তমান অবস্থা?",
    label_status_sub: "Current Status",
    opt_select: "সিলেক্ট করুন",
    opt_status_sg: "সিঙ্গাপুরে আছেন (ট্রান্সফার)",
    opt_status_bd: "বাংলাদেশে আছেন (রিটার্ন / U-Turn)",
    label_visa: "সর্বশেষ ভিসার ধরণ?",
    label_visa_sub: "Previous Visa",
    opt_visa_select: "ভিসার ধরণ",
    opt_visa_wp: "ওয়ার্ক পারমিট (Work Permit)",
    opt_visa_sp: "এস-পাস (S-Pass)",
    opt_visa_ep: "এমপ্লয়মেন্ট পাস (EP)",

    // Step: Final
    final_title: "শেষ ধাপ",
    final_sub: "আবেদন জমা দেওয়ার শেষ পর্যায়",
    label_joining: "কবে থেকে কাজ শুরু করতে পারবেন?",
    label_joining_sub: "Joining Time",
    opt_select_time: "সময় নির্বাচন করুন",
    label_ref: "আমাদের কথা কার মাধ্যমে জেনেছেন?",
    opt_select_ref: "মাধ্যম নির্বাচন করুন",
    opt_ref_fb: "ফেইসবুক (Facebook)",
    opt_ref_friend: "বন্ধু বা এজেন্ট (Friend/Agent)",
    opt_ref_office: "অফিস ভিজিট (Office)",
    opt_ref_online: "অনলাইন / গুগল (Online)",
    
    // Files
    label_upload_cv: "বায়োডাটা / সিভি আপলোড (অপশনাল)",
    label_upload_passport: "পাসপোর্ট কপি আপলোড (অপশনাল)",
    btn_upload: "ফাইল বাছুন",
    file_selected: "ফাইল সিলেক্ট করা হয়েছে",
    err_file_size: "ফাইল সাইজ খুব বড় (সর্বোচ্চ 5MB)",

    // Success
    success_title: "অভিনন্দন! আপনি যোগ্য।",
    success_msg: "আপনার দেওয়া তথ্য অনুযায়ী আপনি",
    success_next: "পরবর্তী করণীয়:",
    success_instruction: "ফাইল প্রসেসিং শুরু করতে এখনি হোয়াটসঅ্যাপে আপনার বায়োডাটা এবং ডকুমেন্টস পাঠান।",
    
    // Fail
    fail_title: "বর্তমানে যোগ্য নন",
    fail_note: "যদি আপনার এই সমস্যাটি সমাধান হয় (যেমন পাসপোর্ট নবায়ন বা বয়স পূর্ণ হওয়া), তবে আবার চেষ্টা করুন।",

    // Errors
    err_age_min: "দুঃখিত, চাকরির আবেদনের জন্য আপনার বয়স অন্তত ১৮ বছর হতে হবে।",
    err_age_wp_max: "দুঃখিত, ওয়ার্ক পারমিট ক্যাটাগরির জন্য বয়স সীমা সাধারণত ৪৫ বছর।",
    err_age_sp_max: "দুঃখিত, এই ক্যাটাগরির জন্য বয়স সীমা সাধারণত ৫০ বছর।",
    err_passport_none: "সিঙ্গাপুর ভিসার জন্য বৈধ পাসপোর্ট থাকা বাধ্যতামূলক।",
    err_passport_validity: "ভিসা প্রসেসিংয়ের জন্য পাসপোর্টের মেয়াদ অন্তত ২ বছর থাকা প্রয়োজন।",
    err_spass_edu: "এস-পাস (প্রফেশনাল) পদের জন্য সাধারণত ডিপ্লোমা বা ডিগ্রি থাকা প্রয়োজন। আপনি চাইলে ওয়ার্ক পারমিট ক্যাটাগরিতে চেষ্টা করতে পারেন।",
    err_medical: "সিঙ্গাপুর জনশক্তি মন্ত্রণালয়ের (MOM) নিয়ম অনুযায়ী গুরুতর মেডিকেল সমস্যা থাকলে ভিসা বাতিল হতে পারে।",
    err_police: "পুলিশ কেস, ওভারস্টে বা ডিপোর্ট রেকর্ড থাকলে সাধারণত নতুন ভিসা অনুমোদন হয় না।"
  },
  en: {
    // Common
    next: "Next Step",
    back: "Back",
    result: "See Result",
    submit_wa: "Send CV on WhatsApp",
    check_again: "Check Again",
    start_again: "Check Again",
    yes: "Yes",
    no: "No",
    yes_long: "Yes, I have (Yes)",
    no_long: "No, I don't (No)",
    govt_approved: "Govt. Approved",
    dhaka_to_sg: "Dhaka to Singapore",

    // Step: Category
    cat_title: "Select Job Category",
    cat_sub: "Choose the option that fits you best",
    cat_unskilled: "Unskilled / General Worker",
    cat_unskilled_sub: "Factory or General Labor (Work Permit)",
    cat_construction: "Construction / Shipyard",
    cat_construction_sub: "Building or PCM work (Work Permit)",
    cat_service: "Hotel / Cleaning / Service",
    cat_service_sub: "Service Sector jobs (Work Permit)",
    cat_spass: "Skilled / Supervisor (S-Pass)",
    cat_spass_sub: "Technician or Engineering roles",
    cat_transfer: "Transfer / U-Turn",
    cat_transfer_sub: "Already in Singapore",
    
    // Step: Basic Info
    basic_title: "Personal Information",
    basic_sub: "Provide your basic details",
    label_name: "Full Name?",
    label_name_sub: "As per Passport / NID",
    ph_name: "Enter name...",
    label_age: "Your Age?",
    ph_age: "Example: 26",
    label_gender: "Gender?",
    opt_male: "Male",
    opt_female: "Female",
    label_district: "Home District?",
    opt_select_district: "Select District",

    // Step: Qualifications
    qual_title: "Qualifications Check",
    qual_sub: "Education and other skills",
    label_passport: "Do you have a Machine Readable Passport?",
    label_validity: "Passport Validity Remaining?",
    opt_select_validity: "Select Validity",
    opt_validity_more: "More than 2 years",
    opt_validity_less: "Less than 2 years",
    label_edu: "Highest Education?",
    opt_select_edu: "Select Qualification",
    label_english: "Can you speak English?",
    opt_eng_basic: "Basic / A little",
    opt_eng_good: "Yes, Fluent",
    opt_eng_none: "No",

    // Step: Specifics
    spec_title: "Job Details",
    spec_sub: "Experience and other details",
    label_trade: "Do you have work experience?",
    label_trade_sub: "Select Trade",
    opt_select_trade: "Trade List",
    label_custom_trade: "Specify Trade?",
    ph_custom_trade: "e.g. Forklift Driver",
    label_exp: "How much experience in this field?",
    opt_select_exp: "Experience Duration",
    opt_exp_fresh: "Fresh / No Experience",
    opt_exp_6m: "6 Months +",
    opt_exp_1y: "1-2 Years",
    opt_exp_3y: "3 Years +",
    label_sg_history: "Worked in Singapore before?",
    label_medical: "Any serious medical condition?",
    label_medical_sub: "(e.g. Heart, TB, Surgery)",
    label_police: "Any Police Case or Legal Issues?",
    label_police_sub: "(Deport or Overstay record)",
    
    // SPASS Specifics
    label_study_field: "Field of Study?",
    label_study_field_sub: "Major Subject",
    ph_study_field: "e.g. Mechanical, Electrical, IT",
    label_job_title: "Current Job Title?",
    label_job_title_sub: "Job Title",
    ph_job_title: "e.g. Site Supervisor, Engineer",
    label_computer: "Can you use a computer?",
    opt_yes_simple: "Yes",
    opt_no_simple: "No",

    // Transfer Specifics
    label_status: "Current Status?",
    label_status_sub: "Current Status",
    opt_select: "Select",
    opt_status_sg: "In Singapore (Transfer)",
    opt_status_bd: "Back in BD (Return / U-Turn)",
    label_visa: "Last Visa Type?",
    label_visa_sub: "Previous Visa",
    opt_visa_select: "Visa Type",
    opt_visa_wp: "Work Permit",
    opt_visa_sp: "S-Pass",
    opt_visa_ep: "Employment Pass (EP)",

    // Step: Final
    final_title: "Final Step",
    final_sub: "Finalize application",
    label_joining: "When can you join?",
    label_joining_sub: "Joining Time",
    opt_select_time: "Select Time",
    label_ref: "How did you hear about us?",
    opt_select_ref: "Select Source",
    opt_ref_fb: "Facebook",
    opt_ref_friend: "Friend / Agent",
    opt_ref_office: "Office Visit",
    opt_ref_online: "Online / Google",

    // Files
    label_upload_cv: "Upload Bio-data / CV (Optional)",
    label_upload_passport: "Upload Passport Copy (Optional)",
    btn_upload: "Choose File",
    file_selected: "File Selected",
    err_file_size: "File too large (Max 5MB)",

    // Success
    success_title: "Congratulations! You are Eligible.",
    success_msg: "Based on your data, you are provisionally selected for",
    success_next: "Next Steps:",
    success_instruction: "To start file processing, send your biodata and documents on WhatsApp now.",
    
    // Fail
    fail_title: "Currently Not Eligible",
    fail_note: "If this issue is resolved (e.g. Passport renewal or Age limit reached), please try again.",

    // Errors
    err_age_min: "Sorry, you must be at least 18 years old to apply.",
    err_age_wp_max: "Sorry, the age limit for Work Permit category is usually 45 years.",
    err_age_sp_max: "Sorry, the age limit for this category is usually 50 years.",
    err_passport_none: "A valid passport is mandatory for a Singapore visa.",
    err_passport_validity: "Passport must be valid for at least 2 years for visa processing.",
    err_spass_edu: "S-Pass (Professional) roles usually require a Diploma or Degree. You may try the Work Permit category.",
    err_medical: "Per MOM regulations, serious medical conditions may lead to visa cancellation.",
    err_police: "New visas are generally not approved if there are records of police cases, overstaying, or deportation."
  }
};