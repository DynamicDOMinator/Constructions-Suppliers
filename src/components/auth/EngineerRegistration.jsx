"use client";
import { useState } from "react";
import { UploadCloud, Check, Trash2, ChevronDown, GripVertical, Plus, ChevronDown as ChevronDownIcon, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function EngineerRegistration({ formData, setFormData, onFinish }) {
  const { isEnglish } = useLanguage();
  const [step, setStep] = useState(1);
  
  // State for skills
  const [skills, setSkills] = useState(isEnglish ? ["Interior Design", "3D Modeling", "AutoCAD", "Budget Tracking"] : ["التصميم الداخلي", "النمذجة ثلاثية الأبعاد (3D)", "أوتوكاد (AutoCAD)", "متابعة الميزانية والتكاليف"]);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  // State for portfolio projects
  const [projects, setProjects] = useState([{ id: 1 }]);
  const [viewingGallery, setViewingGallery] = useState(null);

  const [experienceData, setExperienceData] = useState({
    company_name: "",
    job_title: "",
    start_year: "",
    start_month: "",
    end_year: "",
    end_month: ""
  });

  const addSkill = (e) => {
    if (e.key === "Enter" && newSkill.trim()) {
      e.preventDefault();
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
      setIsAddingSkill(false);
    }
  };

  const stepsData = isEnglish ? [
    { id: 1, title: "Specialization" },
    { id: 2, title: "Experience & Skills" },
    { id: 3, title: "Portfolio" },
  ] : [
    { id: 1, title: "التخصص" },
    { id: 2, title: "الخبرات والمهارات" },
    { id: 3, title: "سابقة الاعمال" },
  ];

  const renderStepper = () => (
    <div className="mb-14 relative w-full px-2">
      <div className={`absolute -top-6 ${isEnglish ? 'left-0' : 'right-0'} text-[#2A5CBA] text-xs font-bold font-tajawal`}>
        {isEnglish ? "Account Info" : "معلومات الحساب"} {Math.round(((step) / 3) * 100)}%
      </div>

      <div className="flex justify-between items-center relative z-10 font-tajawal">
        {/* Background Line */}
        <div className="absolute top-[14px] right-0 left-0 h-[2px] bg-gray-100 -z-10"></div>
        {/* Active Line */}
        <div className={`absolute top-[14px] ${isEnglish ? 'left-0' : 'right-0'} h-[2px] bg-[#2A5CBA] -z-10 transition-all duration-300`} style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
        
        {stepsData.map((s) => {
          const isActive = step === s.id;
          const isCompleted = step > s.id;

          return (
            <div key={s.id} className="flex flex-col items-center relative bg-white">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                isCompleted ? "bg-[#2A5CBA] text-white border-2 border-[#2A5CBA]" : 
                isActive ? "bg-white border-[1.5px] border-[#2A5CBA] text-[#2A5CBA]" : 
                "bg-white border border-gray-200 text-gray-300"
              }`}>
                {isCompleted ? <Check className="w-4 h-4" strokeWidth={3} /> : s.id}
              </div>
              <span className={`absolute top-9 text-[10px] whitespace-nowrap font-bold ${
                isCompleted || isActive ? "text-gray-800" : "text-gray-400"
              }`}>
                {s.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-full relative">
      <div className={`absolute top-0 ${isEnglish ? 'right-0 md:-right-8' : 'left-0 md:-left-8'} text-[#2A5CBA] font-bold cursor-pointer hover:underline text-lg`}>
        {isEnglish ? "Skip" : "تخطي"}
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#EB682C] mb-3">{isEnglish ? "Create your profile" : "أنشئ ملفك التعريفي"}</h1>
      </div>

      {renderStepper()}

      {step === 1 && (
        <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4">
          
          <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
            <label className="text-sm font-bold text-gray-700">{isEnglish ? "Specialization" : "التخصص"}</label>
            <div className="relative">
              <ChevronDownIcon className={`absolute ${isEnglish ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none`} />
              <select 
                className={`w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? 'text-left' : 'text-right'} appearance-none bg-white text-gray-800`} 
                dir={isEnglish ? "ltr" : "rtl"}
                value={formData.specialization || ""}
                onChange={(e) => setFormData({...formData, specialization: e.target.value})}
              >
                <option value="">{isEnglish ? "Select Specialization" : "اختر التخصص"}</option>
                <option value="هندسة مدنية">{isEnglish ? "Civil Engineering" : "هندسة مدنية"}</option>
                <option value="هندسة معمارية">{isEnglish ? "Architectural Engineering" : "هندسة معمارية"}</option>
                <option value="التصميم الداخلي">{isEnglish ? "Interior Design" : "التصميم الداخلي"}</option>
                <option value="هندسة كهربائية">{isEnglish ? "Electrical Engineering" : "هندسة كهربائية"}</option>
                <option value="هندسة ميكانيكية">{isEnglish ? "Mechanical Engineering" : "هندسة ميكانيكية"}</option>
              </select>
            </div>
          </div>

          <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
            <label className="text-sm font-bold text-gray-700">{isEnglish ? "Field of Work" : "مجال العمل"}</label>
            <div className="relative">
              <ChevronDownIcon className={`absolute ${isEnglish ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none`} />
              <select 
                className={`w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? 'text-left' : 'text-right'} appearance-none bg-white text-gray-800`} 
                dir={isEnglish ? "ltr" : "rtl"}
                value={formData.field_of_work || ""}
                onChange={(e) => setFormData({...formData, field_of_work: e.target.value})}
              >
                <option value="">{isEnglish ? "Select Field of Work" : "اختر مجال العمل"}</option>
                <option value="المقاولات العامة">{isEnglish ? "General Contracting" : "المقاولات العامة"}</option>
                <option value="إدارة المشاريع">{isEnglish ? "Project Management" : "إدارة المشاريع"}</option>
                <option value="التشطيبات">{isEnglish ? "Finishing" : "التشطيبات"}</option>
                <option value="الاستشارات">{isEnglish ? "Consulting" : "الاستشارات"}</option>
              </select>
            </div>
          </div>

          <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
            <label className="text-sm font-bold text-gray-700">{isEnglish ? "Brief bio about you" : "نبذة تعريفية عنك"}</label>
            <textarea 
              placeholder={isEnglish ? "Write a brief bio about your work" : "اكتب نبذة تعريفية عن عملك"} 
              className={`w-full p-4 border border-gray-200 rounded-2xl text-sm min-h-[120px] resize-none focus:outline-none focus:border-[#EB682C] ${isEnglish ? 'text-left' : 'text-right'}`}
              value={formData.bio || ""}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
            />
          </div>

          <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
            <label className="text-sm font-bold text-gray-700">{isEnglish ? "CV" : "السيرة الذاتية"}</label>
            <div className="relative border border-dashed border-[#de6d3a] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-orange-50 transition-colors h-40">
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFormData({...formData, cv: e.target.files[0]});
                  }
                }}
              />
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <UploadCloud className="w-6 h-6 text-[#de6d3a]" />
              </div>
              <p className="text-xs font-bold text-gray-600 mb-1">
                {formData.cv ? formData.cv.name : (isEnglish ? "Drag your files here or click to upload" : "اسحب ملفاتك هنا او اضغط لرفع الملفات")}
              </p>
              <p className="text-[10px] text-gray-400">PDF, DOC, DOCX (max. 10MB)</p>
            </div>
          </div>
          
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4">
          
          <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
            <label className="text-sm font-bold text-gray-700">{isEnglish ? "Company Name" : "اسم الشركة"}</label>
            <input 
              type="text" 
              placeholder={isEnglish ? "Company Name" : "اسم الشركة"} 
              className={`w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? 'text-left' : 'text-right'}`}
              value={experienceData.company_name}
              onChange={(e) => setExperienceData({...experienceData, company_name: e.target.value})}
            />
          </div>

          <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
            <label className="text-sm font-bold text-gray-700">{isEnglish ? "Job Title" : "المسمي الوظيفي"}</label>
            <input 
              type="text" 
              placeholder={isEnglish ? "Job Title" : "المسمي الوظيفي"} 
              className={`w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? 'text-left' : 'text-right'}`}
              value={experienceData.job_title}
              onChange={(e) => setExperienceData({...experienceData, job_title: e.target.value})}
            />
          </div>

          <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
            <label className="text-sm font-bold text-gray-700">{isEnglish ? "Start Date" : "تاريخ بداية العمل"}</label>
            <div className="flex flex-row gap-4">
              <div className="relative w-1/2">
                <ChevronDownIcon className={`absolute ${isEnglish ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none`} />
                <select 
                  className={`w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? 'text-left' : 'text-right'} appearance-none bg-white text-gray-500`} 
                  dir={isEnglish ? "ltr" : "rtl"}
                  value={experienceData.start_year}
                  onChange={(e) => setExperienceData({...experienceData, start_year: e.target.value})}
                >
                  <option value="">{isEnglish ? "Year" : "السنة"}</option>
                  {[...Array(20)].map((_, i) => {
                    const year = new Date().getFullYear() - i;
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </select>
              </div>
              <div className="relative w-1/2">
                <ChevronDownIcon className={`absolute ${isEnglish ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none`} />
                <select 
                  className={`w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? 'text-left' : 'text-right'} appearance-none bg-white text-gray-500`} 
                  dir={isEnglish ? "ltr" : "rtl"}
                  value={experienceData.start_month}
                  onChange={(e) => setExperienceData({...experienceData, start_month: e.target.value})}
                >
                  <option value="">{isEnglish ? "Month" : "الشهر"}</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i+1} value={(i+1).toString().padStart(2, '0')}>{i+1}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
            <label className="text-sm font-bold text-gray-700">{isEnglish ? "End Date" : "تاريخ نهاية العمل"}</label>
            <div className="flex flex-row gap-4">
              <div className="relative w-1/2">
                <ChevronDownIcon className={`absolute ${isEnglish ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none`} />
                <select 
                  className={`w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? 'text-left' : 'text-right'} appearance-none bg-white text-gray-500`} 
                  dir={isEnglish ? "ltr" : "rtl"}
                  value={experienceData.end_year}
                  onChange={(e) => setExperienceData({...experienceData, end_year: e.target.value})}
                >
                  <option value="">{isEnglish ? "Year (or leave empty for present)" : "السنة (أو اتركها للآن)"}</option>
                  {[...Array(20)].map((_, i) => {
                    const year = new Date().getFullYear() - i;
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </select>
              </div>
              <div className="relative w-1/2">
                <ChevronDownIcon className={`absolute ${isEnglish ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none`} />
                <select 
                  className={`w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? 'text-left' : 'text-right'} appearance-none bg-white text-gray-500`} 
                  dir={isEnglish ? "ltr" : "rtl"}
                  value={experienceData.end_month}
                  onChange={(e) => setExperienceData({...experienceData, end_month: e.target.value})}
                >
                  <option value="">{isEnglish ? "Month" : "الشهر"}</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i+1} value={(i+1).toString().padStart(2, '0')}>{i+1}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
            <label className="text-sm font-bold text-gray-700">{isEnglish ? "Skills" : "المهارات"}</label>
            <div className="flex flex-wrap items-center gap-3 p-3 border border-gray-200 rounded-2xl min-h-[56px]">
              
              <button 
                type="button"
                onClick={() => setIsAddingSkill(true)}
                className="flex items-center justify-center gap-1 px-4 py-2 border border-dashed border-[#de6d3a] rounded-full text-[#de6d3a] text-[10px] font-bold hover:bg-orange-50 transition-colors shrink-0"
              >
                <Plus className="w-3 h-3" /> {isEnglish ? "Add Skill" : "اضافة مهارة"}
              </button>

              {isAddingSkill && (
                <input 
                  type="text" 
                  autoFocus
                  placeholder={isEnglish ? "Type and press Enter" : "اكتب واضغط Enter"} 
                  className="px-3 py-2 border border-gray-300 rounded-full text-xs outline-none focus:border-[#EB682C]"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={addSkill}
                  onBlur={() => setIsAddingSkill(false)}
                />
              )}

              {skills.map((skill, idx) => (
                <div key={idx} className="bg-[#fff1e6] text-gray-800 px-4 py-2 rounded-full text-[10px] font-bold flex items-center gap-2 shrink-0">
                  {skill}
                </div>
              ))}
              
            </div>
          </div>

        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4">
          
          {projects.map((project, idx) => (
            <div key={project.id} className="flex flex-col gap-4 mb-4">
              <div className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} items-center justify-between border border-gray-200 rounded-2xl p-4 bg-white shadow-sm`}>
                <div className="flex items-center gap-3">
                  <ChevronDown className="w-5 h-5 text-gray-400 cursor-pointer" />
                  <Trash2 
                    className="w-5 h-5 text-red-500 cursor-pointer" 
                    onClick={() => setProjects(projects.filter(p => p.id !== project.id))}
                  />
                </div>
                <div className="flex  items-center gap-2">
                  <GripVertical className="w-4 h-4 text-orange-400" />
                  <span className="font-bold text-sm">{isEnglish ? `Project ${idx + 1}` : `المشروع ${idx === 0 ? "الاول" : idx + 1}`}</span>
                </div>
              </div>

              <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
                <label className="text-sm font-bold text-gray-700">{isEnglish ? "Project Name" : "اسم المشروع"}</label>
                <input 
                  type="text" 
                  placeholder={isEnglish ? "Project Name" : "اسم المشروع"} 
                  className={`w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? 'text-left' : 'text-right'}`} 
                  value={project.name || ""}
                  onChange={(e) => setProjects(projects.map(p => p.id === project.id ? { ...p, name: e.target.value } : p))}
                />
              </div>

              <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
                <label className="text-sm font-bold text-gray-700">{isEnglish ? "Portfolio" : "سابقة الاعمال"}</label>
                <div className={`flex flex-col md:${isEnglish ? 'flex-row-reverse' : 'flex-row'} gap-4 mt-1`}>
                  {/* Right Uploader Box */}
                  <div className={`relative border border-dashed border-[#de6d3a] rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-orange-50 transition-colors h-32 ${project.files?.length > 0 ? 'w-full md:w-1/2' : 'w-full'}`}>
                    <input 
                      type="file" 
                      multiple 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                      onChange={(e) => {
                        const fileArray = Array.from(e.target.files).map(file => ({
                          file,
                          preview: URL.createObjectURL(file)
                        }));
                        setProjects(projects.map(p => p.id === project.id ? { ...p, files: [...(p.files || []), ...fileArray] } : p));
                      }}
                    />
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                      <UploadCloud className="w-5 h-5 text-[#de6d3a]" />
                    </div>
                    <p className="text-[10px] font-bold text-gray-600 mb-1">{isEnglish ? "Drag files here or" : "اسحب ملفاتك هنا او"} <span className="text-[#de6d3a]">{isEnglish ? "click to upload" : "اضغط لرفع الملفات"}</span></p>
                    <p className="text-[8px] text-gray-400">PNG, JPG or PDF</p>
                  </div>

                  {/* Left Gallery Preview */}
                  {project.files?.length > 0 && (
                    <div 
                      className="relative rounded-2xl overflow-hidden h-32 w-full md:w-1/2 flex items-center justify-center bg-gray-800 group cursor-pointer"
                      onClick={() => setViewingGallery(project.id)}
                    >
                      <img src={project.files[0].preview} alt="Gallery" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500" />
                      <div className="relative z-10 text-white font-bold text-2xl drop-shadow-md">
                        +{project.files.length}
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>
          ))}

          <button 
            type="button"
            onClick={() => setProjects([...projects, { id: Date.now() }])}
            className="w-full border-2 border-[#2A5CBA] text-[#2A5CBA] py-4 rounded-2xl font-bold hover:bg-blue-50 transition-colors text-lg flex items-center justify-center gap-2 mt-2"
          >
            <Plus className="w-5 h-5" /> {isEnglish ? "Add Other Projects" : "اضافة مشاريع اخري"}
          </button>
        </div>
      )}

      <div className="flex gap-4 mt-12">
        <button 
          onClick={() => {
            if (step < 3) {
              setStep(step + 1);
            } else {
              // Assemble the final arrays before calling onFinish
              const start_date = (experienceData.start_year && experienceData.start_month) 
                ? `${experienceData.start_year}-${experienceData.start_month}-01` 
                : "2020-01-01";
                
              const finalData = {
                experiences: [
                  {
                    company_name: experienceData.company_name || "اسم الشركة",
                    job_title: experienceData.job_title || "مهندس",
                    start_date: start_date,
                    skills: skills.join(", ")
                  }
                ],
                portfolios: projects.filter(p => p.name && p.name.trim() !== "").map(p => {
                  const { preview, ...rest } = p;
                  return rest;
                })
              };
              onFinish(finalData);
            }
          }}
          className="flex-1 bg-[#de6d3a] text-white py-4 rounded-2xl font-bold hover:bg-[#d65a22] transition-colors text-lg"
        >
          {step === 3 ? (isEnglish ? "Publish" : "نشر") : (isEnglish ? "Next" : "التالي")}
        </button>
        {step > 1 && (
          <button 
            onClick={() => setStep(step - 1)}
            className="flex-1 bg-white border border-gray-200 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-colors text-lg"
          >
            {isEnglish ? "Previous" : "السابق"}
          </button>
        )}
      </div>

      {/* Image Gallery Modal */}
      {viewingGallery && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <button 
                onClick={() => setViewingGallery(null)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-gray-800">{isEnglish ? "Image Gallery" : "معرض الصور"}</h2>
            </div>

            <div className="p-6 overflow-y-auto">
              {(() => {
                const project = projects.find(p => p.id === viewingGallery);
                if (!project || !project.files || project.files.length === 0) {
                  return <p className="text-center text-gray-500 py-10">{isEnglish ? "No images in this project" : "لا توجد صور في هذا المشروع"}</p>;
                }
                return (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {project.files.map((fileObj, fIdx) => (
                      <div key={fIdx} className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm border border-gray-100">
                        <img src={fileObj.preview} alt={`Preview ${fIdx}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            type="button"
                            onClick={() => {
                              const newFiles = [...project.files];
                              newFiles.splice(fIdx, 1);
                              setProjects(projects.map(p => p.id === viewingGallery ? { ...p, files: newFiles } : p));
                              if (newFiles.length === 0) {
                                setViewingGallery(null);
                              }
                            }}
                            className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-transform hover:scale-110"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
