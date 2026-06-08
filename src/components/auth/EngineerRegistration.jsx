import { useState } from "react";
import { UploadCloud, Check, Trash2, ChevronDown, GripVertical, Plus, ChevronDown as ChevronDownIcon } from "lucide-react";

export default function EngineerRegistration({ onFinish }) {
  const [step, setStep] = useState(1);
  
  // State for skills
  const [skills, setSkills] = useState(["التصميم الداخلي", "النمذجة ثلاثية الأبعاد (3D)", "أوتوكاد (AutoCAD)", "متابعة الميزانية والتكاليف"]);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  // State for portfolio projects
  const [projects, setProjects] = useState([{ id: 1 }]);

  const addSkill = (e) => {
    if (e.key === "Enter" && newSkill.trim()) {
      e.preventDefault();
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
      setIsAddingSkill(false);
    }
  };

  const stepsData = [
    { id: 1, title: "التخصص" },
    { id: 2, title: "الخبرات والمهارات" },
    { id: 3, title: "سابقة الاعمال" },
  ];

  const renderStepper = () => (
    <div className="mb-14 relative w-full px-2">
      <div className="absolute -top-6 right-0 text-[#2A5CBA] text-xs font-bold font-tajawal">
        معلومات الحساب {Math.round(((step) / 3) * 100)}%
      </div>

      <div className="flex justify-between items-center relative z-10 font-tajawal">
        {/* Background Line */}
        <div className="absolute top-[14px] right-0 left-0 h-[2px] bg-gray-100 -z-10"></div>
        {/* Active Line */}
        <div className="absolute top-[14px] right-0 h-[2px] bg-[#2A5CBA] -z-10 transition-all duration-300" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
        
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
      <div className="absolute top-0 left-0 md:-left-8 text-[#2A5CBA] font-bold cursor-pointer hover:underline text-lg">
        تخطي
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#EB682C] mb-3">أنشئ ملفك التعريفي</h1>
      </div>

      {renderStepper()}

      {step === 1 && (
        <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4">
          
          <div className="flex flex-col gap-2 text-right">
            <label className="text-sm font-bold text-gray-700">التخصص</label>
            <div className="relative">
              <ChevronDownIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <select className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right appearance-none bg-white text-gray-500" dir="rtl">
                <option>التخصص</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-right">
            <label className="text-sm font-bold text-gray-700">مجال العمل</label>
            <div className="relative">
              <ChevronDownIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <select className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right appearance-none bg-white text-gray-500" dir="rtl">
                <option>مجال العمل</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-right">
            <label className="text-sm font-bold text-gray-700">نبذة تعريفية عنك</label>
            <textarea placeholder="اكتب نبذة تعريفية عن عملك" className="w-full p-4 border border-gray-200 rounded-2xl text-sm min-h-[120px] resize-none focus:outline-none focus:border-[#EB682C] text-right"></textarea>
          </div>

          <div className="flex flex-col gap-2 text-right">
            <label className="text-sm font-bold text-gray-700">السيرة الذاتية</label>
            <div className="border border-dashed border-[#de6d3a] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-orange-50 transition-colors h-40">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <UploadCloud className="w-6 h-6 text-[#de6d3a]" />
              </div>
              <p className="text-xs font-bold text-gray-600 mb-1">اسحب ملفاتك هنا او <span className="text-[#de6d3a]">اضغط لرفع الملفات</span></p>
              <p className="text-[10px] text-gray-400">SPNG, JPG or PDF (max. 800x400px)</p>
            </div>
          </div>
          
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4">
          
          <div className="flex flex-col gap-2 text-right">
            <label className="text-sm font-bold text-gray-700">اسم الشركة</label>
            <input type="text" placeholder="اسم الشركة" className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
          </div>

          <div className="flex flex-col gap-2 text-right">
            <label className="text-sm font-bold text-gray-700">المسمي الوظيفي</label>
            <input type="text" placeholder="مجال العمل" className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
          </div>

          <div className="flex flex-col gap-2 text-right">
            <label className="text-sm font-bold text-gray-700">تاريخ بداية العمل</label>
            <div className="flex flex-row gap-4">
              <div className="relative w-1/2">
                <ChevronDownIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right appearance-none bg-white text-gray-500" dir="rtl">
                  <option>السنة</option>
                </select>
              </div>
              <div className="relative w-1/2">
                <ChevronDownIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right appearance-none bg-white text-gray-500" dir="rtl">
                  <option>الشهر</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-right">
            <label className="text-sm font-bold text-gray-700">تاريخ نهاية العمل</label>
            <div className="flex flex-row gap-4">
              <div className="relative w-1/2">
                <ChevronDownIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right appearance-none bg-white text-gray-500" dir="rtl">
                  <option>السنة</option>
                </select>
              </div>
              <div className="relative w-1/2">
                <ChevronDownIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right appearance-none bg-white text-gray-500" dir="rtl">
                  <option>الشهر</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-right">
            <label className="text-sm font-bold text-gray-700">المهارات</label>
            <div className="flex flex-wrap items-center gap-3 p-3 border border-gray-200 rounded-2xl min-h-[56px]">
              
              <button 
                type="button"
                onClick={() => setIsAddingSkill(true)}
                className="flex items-center justify-center gap-1 px-4 py-2 border border-dashed border-[#de6d3a] rounded-full text-[#de6d3a] text-[10px] font-bold hover:bg-orange-50 transition-colors shrink-0"
              >
                <Plus className="w-3 h-3" /> اضافة مهارة
              </button>

              {isAddingSkill && (
                <input 
                  type="text" 
                  autoFocus
                  placeholder="اكتب واضغط Enter" 
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
              <div className="flex flex-row-reverse items-center justify-between border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
                <div className="flex items-center gap-3">
                  <ChevronDown className="w-5 h-5 text-gray-400 cursor-pointer" />
                  <Trash2 
                    className="w-5 h-5 text-red-500 cursor-pointer" 
                    onClick={() => setProjects(projects.filter(p => p.id !== project.id))}
                  />
                </div>
                <div className="flex  items-center gap-2">
                  <GripVertical className="w-4 h-4 text-orange-400" />
                  <span className="font-bold text-sm">المشروع {idx === 0 ? "الاول" : idx + 1}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-right">
                <label className="text-sm font-bold text-gray-700">اسم المشروع</label>
                <input type="text" placeholder="اسم المشروع" className="w-full h-14 px-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#EB682C] text-right" />
              </div>

              <div className="flex flex-col gap-2 text-right">
                <label className="text-sm font-bold text-gray-700">سابقة الاعمال</label>
                <div className="flex flex-col md:flex-row gap-4 mt-1">
                  
                  {/* Right Uploader Box */}
                  <div className="border border-dashed border-[#de6d3a] rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-orange-50 transition-colors h-32 w-full md:w-1/2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                      <UploadCloud className="w-5 h-5 text-[#de6d3a]" />
                    </div>
                    <p className="text-[10px] font-bold text-gray-600 mb-1">اسحب ملفاتك هنا او <span className="text-[#de6d3a]">اضغط لرفع الملفات</span></p>
                    <p className="text-[8px] text-gray-400">SPNG, JPG or PDF (max. 800x400px)</p>
                  </div>

                  {/* Left Gallery Preview */}
                  <div className="relative rounded-2xl overflow-hidden h-32 w-full md:w-1/2 flex items-center justify-center bg-gray-800 group cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="Gallery" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500" />
                    <div className="relative z-10 text-white font-bold text-2xl drop-shadow-md">+20</div>
                  </div>

                </div>
              </div>

            </div>
          ))}

          <button 
            type="button"
            onClick={() => setProjects([...projects, { id: Date.now() }])}
            className="w-full border-2 border-[#2A5CBA] text-[#2A5CBA] py-4 rounded-2xl font-bold hover:bg-blue-50 transition-colors text-lg flex items-center justify-center gap-2 mt-2"
          >
            <Plus className="w-5 h-5" /> اضافة مشاريع اخري
          </button>
        </div>
      )}

      <div className="flex gap-4 mt-12">
        <button 
          onClick={() => {
            if (step < 3) setStep(step + 1);
            else onFinish();
          }}
          className="flex-1 bg-[#de6d3a] text-white py-4 rounded-2xl font-bold hover:bg-[#d65a22] transition-colors text-lg"
        >
          {step === 3 ? "نشر" : "التالي"}
        </button>
        {step > 1 && (
          <button 
            onClick={() => setStep(step - 1)}
            className="flex-1 bg-white border border-gray-200 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-colors text-lg"
          >
            السابق
          </button>
        )}
      </div>
    </div>
  );
}
