

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WizardLayout } from './components/WizardLayout';
import { Button } from './components/Button';
import { JobCategory, UserState, WizardStep, Language, FileData } from './types';
import { 
  WHATSAPP_NUMBER, 
  DISTRICTS, 
  EDUCATION_LEVELS, 
  TRADES_WP, 
  TRADES_SERVICE,
  TRADE_OTHERS,
  JOINING_TIMES,
  TRANSLATIONS,
  N8N_WEBHOOK_URL
} from './constants';
import { 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  RotateCcw, 
  User, 
  Briefcase, 
  Hammer,
  Plane, 
  AlertTriangle,
  MessageCircle,
  Building2,
  Globe,
  Stethoscope,
  ShieldAlert,
  UploadCloud,
  FileText
} from 'lucide-react';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('bn');
  const [step, setStep] = useState<WizardStep>(WizardStep.CATEGORY);
  const [failReasonKey, setFailReasonKey] = useState<string>('');
  
  const t = TRANSLATIONS[language];

  const [userData, setUserData] = useState<UserState>({
    category: null,
    fullName: '',
    age: '',
    gender: 'Male', // Defaulting to Male
    district: '',
    hasPassport: null,
    passportValidity: '',
    education: '',
    englishLevel: '',
    joiningTime: '',
    referralSource: '',
    customTrade: '',
    cvFile: null,
    passportFile: null,
  });

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const updateData = (field: keyof UserState, value: any) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategorySelect = (category: JobCategory) => {
    updateData('category', category);
    setStep(WizardStep.BASIC_INFO);
  };

  const handleBack = () => {
    switch (step) {
      case WizardStep.BASIC_INFO:
        setStep(WizardStep.CATEGORY);
        break;
      case WizardStep.QUALIFICATIONS:
        setStep(WizardStep.BASIC_INFO);
        break;
      case WizardStep.SPECIFIC_DETAILS:
        setStep(WizardStep.QUALIFICATIONS);
        break;
      case WizardStep.FINAL_DETAILS:
        setStep(WizardStep.SPECIFIC_DETAILS);
        break;
      default:
        break;
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, field: 'cvFile' | 'passportFile') => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Size check (e.g., 5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert(t.err_file_size);
      return;
    }

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });

      const fileData: FileData = {
        name: file.name,
        type: file.type,
        base64: base64
      };

      updateData(field, fileData);
    } catch (error) {
      console.error("Error reading file", error);
    }
  };

  const validateBasicInfo = () => {
    const ageNum = parseInt(userData.age);
    if (!userData.fullName || !userData.age || !userData.district) return;
    
    // Age Validation Logic
    const isWP = userData.category === JobCategory.UNSKILLED || 
                 userData.category === JobCategory.CONSTRUCTION || 
                 userData.category === JobCategory.SERVICE;
    
    const minAge = 18;
    const maxAgeWP = 45;
    const maxAgeSP = 50;

    if (ageNum < minAge) {
      setFailReasonKey("err_age_min");
      setStep(WizardStep.FAIL);
      return;
    }

    if (isWP && ageNum > maxAgeWP) {
      setFailReasonKey("err_age_wp_max");
      setStep(WizardStep.FAIL);
      return;
    }

    if (!isWP && ageNum > maxAgeSP) {
      setFailReasonKey("err_age_sp_max");
      setStep(WizardStep.FAIL);
      return;
    }

    setStep(WizardStep.QUALIFICATIONS);
  };

  const validateQualifications = () => {
    // Passport Logic
    if (userData.hasPassport === false) {
      setFailReasonKey("err_passport_none");
      setStep(WizardStep.FAIL);
      return;
    }

    if (userData.passportValidity === 'less_2') {
      setFailReasonKey("err_passport_validity");
      setStep(WizardStep.FAIL);
      return;
    }

    // S-Pass Education Logic
    if (userData.category === JobCategory.SPASS) {
        // Checking against Bengali strings in constants.ts
        // Lower edu indices: 0, 1, 2 i.e. Class 8, SSC, HSC
        // EDUCATION_LEVELS: 0=Class 8, 1=SSC, 2=HSC
        const lowerEdu = [EDUCATION_LEVELS[0], EDUCATION_LEVELS[1], EDUCATION_LEVELS[2]];
        if (lowerEdu.includes(userData.education)) {
             setFailReasonKey("err_spass_edu");
             setStep(WizardStep.FAIL);
             return;
        }
    }

    setStep(WizardStep.SPECIFIC_DETAILS);
  };

  const validateSpecifics = () => {
    // Medical Check
    if (userData.medicalCondition === true) {
       setFailReasonKey("err_medical");
       setStep(WizardStep.FAIL);
       return;
    }
    
    // Police/Ban Check
    if (userData.policeIssues === true) {
        setFailReasonKey("err_police");
        setStep(WizardStep.FAIL);
        return;
    }

    setStep(WizardStep.FINAL_DETAILS);
  };

  const handleFinalSubmit = () => {
    // Send data to n8n webhook
    if (N8N_WEBHOOK_URL) {
      const payload = {
        name: userData.fullName,
        category: userData.category,
        trade: userData.trade === TRADE_OTHERS ? userData.customTrade : userData.trade,
        age: userData.age,
        district: userData.district,
        education: userData.education,
        englishLevel: userData.englishLevel,
        singaporeHistory: userData.singaporeHistory,
        availability: userData.joiningTime,
        eligibilityResult: 'Eligible',
        language: language,
        submittedAt: new Date().toISOString(),
        rawUserData: {
            ...userData,
            // Only send metadata about files to keep payload light, 
            // OR send the full base64 if your n8n flow expects it.
            // Here we send the full object including files.
        }
      };

      fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => {
        console.error("Failed to send webhook data", err);
      });
    }

    setStep(WizardStep.SUCCESS);
  };

  const getWhatsAppLink = () => {
    // Build a rich message (Keeping it in English/Hybrid as it's for the agent)
    let msg = `*Eligible Candidate Application*\n\n`;
    msg += `*Category:* ${userData.category}\n`;
    msg += `*Name:* ${userData.fullName}\n`;
    msg += `*Age:* ${userData.age}\n`;
    msg += `*District:* ${userData.district}\n`;
    msg += `*Education:* ${userData.education}\n`;
    
    if (userData.trade) {
       const tradeVal = userData.trade === TRADE_OTHERS ? `${userData.customTrade} (Other)` : userData.trade;
       msg += `*Trade:* ${tradeVal}\n`;
    }
    if (userData.experienceYears) msg += `*Exp:* ${userData.experienceYears}\n`;
    if (userData.currentStatus) msg += `*Status:* ${userData.currentStatus}\n`;
    if (userData.fieldOfStudy) msg += `*Study Field:* ${userData.fieldOfStudy}\n`;
    
    msg += `\n*Joining:* ${userData.joiningTime}\n`;
    
    if (userData.cvFile) msg += `✅ CV Uploaded\n`;
    if (userData.passportFile) msg += `✅ Passport Uploaded\n`;

    const encoded = encodeURIComponent(msg);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  };

  // --- RENDER HELPERS ---

  const renderLabel = (text: string, sub?: string) => (
    <label className="block text-sm font-semibold text-slate-800 mb-2">
      {text} {sub && <span className="text-slate-500 font-normal text-xs ml-1">({sub})</span>}
    </label>
  );

  // Common input styles with explicit white background and dark text for mobile compatibility
  const inputClasses = "w-full p-3 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-royal-500 focus:border-royal-500 outline-none";

  const renderFileUpload = (
      label: string, 
      field: 'cvFile' | 'passportFile', 
      currentFile: FileData | null | undefined
    ) => (
      <div className="mb-4">
         <label className="block text-sm font-semibold text-slate-800 mb-2">{label}</label>
         <div className="relative">
             <input
                type="file"
                id={`file-${field}`}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => handleFileChange(e, field)}
             />
             <label 
                htmlFor={`file-${field}`}
                className="flex items-center justify-between w-full p-3 border border-dashed border-slate-300 rounded-lg bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors"
             >
                <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded shadow-sm">
                        {currentFile ? <FileText className="w-5 h-5 text-emerald-600" /> : <UploadCloud className="w-5 h-5 text-slate-400" />}
                    </div>
                    <div className="text-sm">
                        {currentFile ? (
                            <span className="text-emerald-700 font-medium">{currentFile.name}</span>
                        ) : (
                            <span className="text-slate-500">{t.btn_upload}</span>
                        )}
                    </div>
                </div>
                {currentFile && <CheckCircle className="w-5 h-5 text-emerald-500" />}
             </label>
         </div>
      </div>
  );

  // --- VIEW LOGIC ---

  const renderCategoryStep = () => (
    <div className="space-y-6">
       <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">{t.cat_title}</h2>
        <p className="text-slate-500">{t.cat_sub}</p>
      </div>
      <div className="grid gap-3">
        {[
          { id: JobCategory.UNSKILLED, icon: User, label: t.cat_unskilled, sub: t.cat_unskilled_sub },
          { id: JobCategory.CONSTRUCTION, icon: Hammer, label: t.cat_construction, sub: t.cat_construction_sub },
          { id: JobCategory.SERVICE, icon: Building2, label: t.cat_service, sub: t.cat_service_sub },
          { id: JobCategory.SPASS, icon: Briefcase, label: t.cat_spass, sub: t.cat_spass_sub },
          { id: JobCategory.TRANSFER, icon: Plane, label: t.cat_transfer, sub: t.cat_transfer_sub },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleCategorySelect(item.id as JobCategory)}
            className="w-full flex items-center p-4 border border-slate-200 rounded-xl hover:border-royal-500 hover:bg-royal-50 transition-all text-left group bg-slate-50"
          >
            <div className="bg-white p-3 rounded-lg mr-4 shadow-sm group-hover:text-royal-600 transition-colors">
              <item.icon className="w-6 h-6 text-slate-600 group-hover:text-royal-600" />
            </div>
            <div>
              <div className="font-semibold text-slate-900 text-lg">{item.label}</div>
              <div className="text-sm text-slate-500">{item.sub}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderBasicInfoStep = () => (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-slate-900">{t.basic_title}</h2>
        <p className="text-slate-500 text-sm">{t.basic_sub}</p>
      </div>

      <div>
        {renderLabel(t.label_name, t.label_name_sub)}
        <input 
          type="text" 
          value={userData.fullName}
          onChange={e => updateData('fullName', e.target.value)}
          className={inputClasses}
          placeholder={t.ph_name}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          {renderLabel(t.label_age)}
          <input 
            type="number" 
            value={userData.age}
            onChange={e => updateData('age', e.target.value)}
            className={inputClasses}
            placeholder={t.ph_age}
          />
        </div>
        <div>
          {renderLabel(t.label_gender)}
          <select 
            value={userData.gender}
            onChange={e => updateData('gender', e.target.value)}
            className={inputClasses}
          >
            <option value="Male">{t.opt_male}</option>
            <option value="Female">{t.opt_female}</option>
          </select>
        </div>
      </div>

      <div>
        {renderLabel(t.label_district)}
        <select 
          value={userData.district}
          onChange={e => updateData('district', e.target.value)}
          className={inputClasses}
        >
          <option value="">{t.opt_select_district}</option>
          {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div className="pt-4 flex gap-3">
        <Button variant="outline" onClick={handleBack} className="w-1/3">
           <ArrowLeft className="w-4 h-4 mr-1" /> {t.back}
        </Button>
        <Button 
          fullWidth 
          onClick={validateBasicInfo} 
          disabled={!userData.fullName || !userData.age || !userData.district}
        >
          {t.next} <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderQualificationsStep = () => (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-slate-900">{t.qual_title}</h2>
        <p className="text-slate-500 text-sm">{t.qual_sub}</p>
      </div>

      {/* Passport */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
         {renderLabel(t.label_passport)}
         <div className="grid grid-cols-2 gap-3 mt-2">
            <button 
              onClick={() => updateData('hasPassport', true)}
              className={`p-3 rounded-lg border text-sm font-medium transition-all ${userData.hasPassport === true ? 'bg-royal-600 text-white border-royal-600' : 'bg-white text-slate-600 border-slate-200'}`}
            >
              {t.yes_long}
            </button>
            <button 
              onClick={() => updateData('hasPassport', false)}
              className={`p-3 rounded-lg border text-sm font-medium transition-all ${userData.hasPassport === false ? 'bg-royal-600 text-white border-royal-600' : 'bg-white text-slate-600 border-slate-200'}`}
            >
              {t.no_long}
            </button>
         </div>
         
         {userData.hasPassport === true && (
           <div className="mt-4 animate-fade-in">
              {renderLabel(t.label_validity)}
              <select 
                value={userData.passportValidity}
                onChange={e => updateData('passportValidity', e.target.value)}
                className={inputClasses}
              >
                <option value="">{t.opt_select_validity}</option>
                <option value="more_2">{t.opt_validity_more}</option>
                <option value="less_2">{t.opt_validity_less}</option>
              </select>
           </div>
         )}
      </div>

      {/* Education */}
      <div>
        {renderLabel(t.label_edu)}
        <select 
            value={userData.education}
            onChange={e => updateData('education', e.target.value)}
            className={inputClasses}
        >
          <option value="">{t.opt_select_edu}</option>
          {EDUCATION_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      {/* English */}
      <div>
        {renderLabel(t.label_english)}
        <div className="grid grid-cols-3 gap-2 mt-2">
           {['Basic', 'Good', 'None'].map((lvl) => (
             <button
               key={lvl}
               onClick={() => updateData('englishLevel', lvl)}
               className={`p-2 rounded-lg border text-sm font-medium transition-all ${userData.englishLevel === lvl ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-400'}`}
             >
               {lvl === 'Basic' && t.opt_eng_basic}
               {lvl === 'Good' && t.opt_eng_good}
               {lvl === 'None' && t.opt_eng_none}
             </button>
           ))}
        </div>
      </div>

      <div className="pt-4 flex gap-3">
        <Button variant="outline" onClick={handleBack} className="w-1/3">
           <ArrowLeft className="w-4 h-4 mr-1" /> {t.back}
        </Button>
        <Button 
          fullWidth 
          onClick={validateQualifications} 
          disabled={userData.hasPassport === null || !userData.education || !userData.englishLevel || (userData.hasPassport && !userData.passportValidity)}
        >
          {t.next} <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderSpecificDetailsStep = () => {
    const isWP = userData.category === JobCategory.UNSKILLED || 
                 userData.category === JobCategory.CONSTRUCTION || 
                 userData.category === JobCategory.SERVICE;
    const isSP = userData.category === JobCategory.SPASS;
    const isTransfer = userData.category === JobCategory.TRANSFER;

    // Determine trade list and append "Others"
    let tradeList = [];
    if (userData.category === JobCategory.SERVICE) {
        tradeList = TRADES_SERVICE;
    } else {
        tradeList = TRADES_WP;
    }

    return (
      <div className="space-y-5">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-slate-900">{t.spec_title}</h2>
          <p className="text-slate-500 text-sm">{t.spec_sub}</p>
        </div>

        {/* Work Permit Logic */}
        {isWP && (
            <>
                <div>
                    {renderLabel(t.label_trade, t.label_trade_sub)}
                    <select 
                        value={userData.trade}
                        onChange={e => updateData('trade', e.target.value)}
                        className={inputClasses}
                    >
                        <option value="">{t.opt_select_trade}</option>
                        {tradeList.map(tr => <option key={tr} value={tr}>{tr}</option>)}
                        <option value={TRADE_OTHERS}>{TRADE_OTHERS}</option>
                    </select>

                    {userData.trade === TRADE_OTHERS && (
                        <div className="mt-3 animate-fade-in">
                            {renderLabel(t.label_custom_trade)}
                            <input 
                                type="text"
                                value={userData.customTrade || ''}
                                onChange={e => updateData('customTrade', e.target.value)}
                                className={inputClasses}
                                placeholder={t.ph_custom_trade}
                            />
                        </div>
                    )}
                </div>

                <div>
                    {renderLabel(t.label_exp)}
                    <select 
                        value={userData.experienceYears}
                        onChange={e => updateData('experienceYears', e.target.value)}
                        className={inputClasses}
                    >
                        <option value="">{t.opt_select_exp}</option>
                        <option value="Fresh">{t.opt_exp_fresh}</option>
                        <option value="6 Months +">{t.opt_exp_6m}</option>
                        <option value="1-2 Years">{t.opt_exp_1y}</option>
                        <option value="3 Years +">{t.opt_exp_3y}</option>
                    </select>
                </div>

                {/* Yes/No Checkboxes for Medical/History */}
                <div className="space-y-3 pt-2">
                   <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
                      <span className="text-sm font-medium text-slate-800">{t.label_sg_history}</span>
                      <div className="flex gap-2">
                         <button onClick={() => updateData('singaporeHistory', true)} className={`px-3 py-1 rounded border text-sm font-bold ${userData.singaporeHistory === true ? 'bg-royal-600 text-white' : 'bg-white'}`}>{t.yes}</button>
                         <button onClick={() => updateData('singaporeHistory', false)} className={`px-3 py-1 rounded border text-sm font-bold ${userData.singaporeHistory === false ? 'bg-royal-600 text-white' : 'bg-white'}`}>{t.no}</button>
                      </div>
                   </div>

                   <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
                      <div className="flex items-center gap-2">
                          <Stethoscope className="w-5 h-5 text-red-500" />
                          <span className="text-sm font-medium text-slate-800">{t.label_medical} <br/><span className="text-xs text-slate-500 font-normal">{t.label_medical_sub}</span></span>
                      </div>
                      <div className="flex gap-2">
                         <button onClick={() => updateData('medicalCondition', true)} className={`px-3 py-1 rounded border text-sm font-bold ${userData.medicalCondition === true ? 'bg-red-600 text-white' : 'bg-white'}`}>{t.yes}</button>
                         <button onClick={() => updateData('medicalCondition', false)} className={`px-3 py-1 rounded border text-sm font-bold ${userData.medicalCondition === false ? 'bg-green-600 text-white' : 'bg-white'}`}>{t.no}</button>
                      </div>
                   </div>
                   
                   <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
                      <div className="flex items-center gap-2">
                          <ShieldAlert className="w-5 h-5 text-orange-500" />
                          <span className="text-sm font-medium text-slate-800">{t.label_police} <br/><span className="text-xs text-slate-500 font-normal">{t.label_police_sub}</span></span>
                      </div>
                      <div className="flex gap-2">
                         <button onClick={() => updateData('policeIssues', true)} className={`px-3 py-1 rounded border text-sm font-bold ${userData.policeIssues === true ? 'bg-red-600 text-white' : 'bg-white'}`}>{t.yes}</button>
                         <button onClick={() => updateData('policeIssues', false)} className={`px-3 py-1 rounded border text-sm font-bold ${userData.policeIssues === false ? 'bg-green-600 text-white' : 'bg-white'}`}>{t.no}</button>
                      </div>
                   </div>
                </div>
            </>
        )}

        {/* S-Pass Logic */}
        {isSP && (
            <>
                 <div>
                    {renderLabel(t.label_study_field, t.label_study_field_sub)}
                    <input 
                        type="text"
                        value={userData.fieldOfStudy || ''}
                        onChange={e => updateData('fieldOfStudy', e.target.value)}
                        className={inputClasses}
                        placeholder={t.ph_study_field}
                    />
                </div>
                <div>
                    {renderLabel(t.label_job_title, t.label_job_title_sub)}
                    <input 
                        type="text"
                        value={userData.currentJobTitle || ''}
                        onChange={e => updateData('currentJobTitle', e.target.value)}
                        className={inputClasses}
                        placeholder={t.ph_job_title}
                    />
                </div>
                 <div>
                    {renderLabel(t.label_computer)}
                     <div className="flex gap-4 mt-2">
                         <button onClick={() => updateData('computerSkills', true)} className={`flex-1 py-2 rounded-lg border text-sm font-bold ${userData.computerSkills === true ? 'bg-royal-600 text-white' : 'bg-white'}`}>{t.opt_yes_simple}</button>
                         <button onClick={() => updateData('computerSkills', false)} className={`flex-1 py-2 rounded-lg border text-sm font-bold ${userData.computerSkills === false ? 'bg-royal-600 text-white' : 'bg-white'}`}>{t.opt_no_simple}</button>
                      </div>
                </div>
            </>
        )}
        
        {/* Transfer Logic */}
         {isTransfer && (
            <>
                 <div>
                    {renderLabel(t.label_status, t.label_status_sub)}
                    <select 
                        value={userData.currentStatus || ''}
                        onChange={e => updateData('currentStatus', e.target.value)}
                        className={inputClasses}
                    >
                         <option value="">{t.opt_select}</option>
                         <option value="In Singapore">{t.opt_status_sg}</option>
                         <option value="Back in BD">{t.opt_status_bd}</option>
                    </select>
                </div>
                <div>
                    {renderLabel(t.label_visa, t.label_visa_sub)}
                     <select 
                        value={userData.lastPassType || ''}
                        onChange={e => updateData('lastPassType', e.target.value)}
                        className={inputClasses}
                    >
                         <option value="">{t.opt_visa_select}</option>
                         <option value="Work Permit">{t.opt_visa_wp}</option>
                         <option value="S-Pass">{t.opt_visa_sp}</option>
                         <option value="Employment Pass">{t.opt_visa_ep}</option>
                    </select>
                </div>
            </>
        )}

        <div className="pt-4 flex gap-3">
             <Button variant="outline" onClick={handleBack} className="w-1/3">
                 <ArrowLeft className="w-4 h-4 mr-1" /> {t.back}
             </Button>
             <Button 
                fullWidth 
                onClick={validateSpecifics}
                // Basic validation: ensure critical dropdowns are picked
                disabled={
                    (isWP && (!userData.trade || (userData.trade === TRADE_OTHERS && !userData.customTrade) || !userData.experienceYears || userData.medicalCondition === null)) ||
                    (isSP && (!userData.fieldOfStudy || !userData.currentJobTitle)) ||
                    (isTransfer && (!userData.currentStatus))
                }
             >
              {t.next} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
        </div>
      </div>
    );
  };

  const renderFinalDetailsStep = () => (
      <div className="space-y-5">
         <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-slate-900">{t.final_title}</h2>
            <p className="text-slate-500 text-sm">{t.final_sub}</p>
         </div>
         
         <div>
            {renderLabel(t.label_joining, t.label_joining_sub)}
            <select 
                value={userData.joiningTime}
                onChange={e => updateData('joiningTime', e.target.value)}
                className={inputClasses}
            >
                <option value="">{t.opt_select_time}</option>
                {JOINING_TIMES.map(tm => <option key={tm} value={tm}>{tm}</option>)}
            </select>
        </div>

        <div>
            {renderLabel(t.label_ref)}
            <select 
                value={userData.referralSource}
                onChange={e => updateData('referralSource', e.target.value)}
                className={inputClasses}
            >
                <option value="">{t.opt_select_ref}</option>
                <option value="Facebook">{t.opt_ref_fb}</option>
                <option value="Friend/Agent">{t.opt_ref_friend}</option>
                <option value="Office">{t.opt_ref_office}</option>
                <option value="Online">{t.opt_ref_online}</option>
            </select>
        </div>

        <div className="pt-4 border-t border-slate-100">
            {renderFileUpload(t.label_upload_cv, 'cvFile', userData.cvFile)}
            {renderFileUpload(t.label_upload_passport, 'passportFile', userData.passportFile)}
        </div>

        <div className="pt-4 flex gap-3">
             <Button variant="outline" onClick={handleBack} className="w-1/3">
                 <ArrowLeft className="w-4 h-4 mr-1" /> {t.back}
             </Button>
             <Button 
                fullWidth 
                onClick={handleFinalSubmit}
                disabled={!userData.joiningTime}
             >
              {t.result} <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
        </div>
      </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-6 py-2">
        <div className="inline-flex p-4 bg-green-100 rounded-full animate-bounce-short">
            <CheckCircle className="w-16 h-16 text-green-600" />
        </div>
        
        <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            {t.success_title}
            </h2>
            <p className="text-slate-600">
            {t.success_msg} <br/>
            <strong className="text-royal-700">{userData.category}</strong>
            </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-5 text-left border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-2 text-sm uppercase tracking-wide">
            {t.success_next}
            </h3>
            <p className="text-sm text-slate-600 mb-4">
                {t.success_instruction}
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
                <Globe className="w-4 h-4" />
                <span>Asterisk Human Resources</span>
            </div>
        </div>

        <a 
            href={getWhatsAppLink()} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full"
        >
            <Button variant="secondary" fullWidth className="py-4 text-lg shadow-lg shadow-green-200">
            <MessageCircle className="w-6 h-6 mr-2" />
            {t.submit_wa}
            </Button>
        </a>
        
        <button 
            onClick={() => setStep(WizardStep.CATEGORY)}
            className="text-sm text-slate-400 hover:text-slate-600 underline mt-4"
        >
            {t.check_again}
        </button>
    </div>
  );

  const renderFail = () => (
    <div className="text-center space-y-6 py-8">
        <div className="inline-flex p-4 bg-red-100 rounded-full">
            <AlertTriangle className="w-12 h-12 text-red-600" />
        </div>
        <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">{t.fail_title}</h2>
            <p className="text-slate-600 max-w-sm mx-auto leading-relaxed">
                {/* Dynamically lookup error message based on current language */}
                {failReasonKey && (t as any)[failReasonKey]}
            </p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 text-sm text-orange-800">
            {t.fail_note}
        </div>
        <Button variant="outline" onClick={() => setStep(WizardStep.CATEGORY)} fullWidth>
            <RotateCcw className="w-4 h-4 mr-2" /> {t.start_again}
        </Button>
    </div>
  );

  const getStepContent = () => {
      switch (step) {
          case WizardStep.CATEGORY: return renderCategoryStep();
          case WizardStep.BASIC_INFO: return renderBasicInfoStep();
          case WizardStep.QUALIFICATIONS: return renderQualificationsStep();
          case WizardStep.SPECIFIC_DETAILS: return renderSpecificDetailsStep();
          case WizardStep.FINAL_DETAILS: return renderFinalDetailsStep();
          case WizardStep.SUCCESS: return renderSuccess();
          case WizardStep.FAIL: return renderFail();
          default: return null;
      }
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50">
      <Header 
        language={language} 
        onToggleLanguage={() => setLanguage(prev => prev === 'bn' ? 'en' : 'bn')} 
      />
      <WizardLayout currentStep={step}>
        {getStepContent()}
      </WizardLayout>
      <Footer />
    </div>
  );
};

export default App;