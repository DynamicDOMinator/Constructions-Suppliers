"use client";
import { ChevronDown, X } from "lucide-react";

export default function TeamManagementPage() {
  const teamMembers = [
    {
      id: 1,
      name: "محمد عادل مرسال",
      email: "MohamedAdel123@gmail.com",
      role: "الادمن",
      isYou: true,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 2,
      name: "احمد محمد حسن",
      email: "MohamedAdel123@gmail.com",
      role: "عضو",
      isYou: false,
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 3,
      name: "محمود محمد احمد",
      email: "MohamedAdel123@gmail.com",
      role: "عضو",
      isYou: false,
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  return (
    <div className="font-tajawal max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Header section */}
      <div className="text-right">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">إدارة الفريق</h1>
        <p className="text-sm text-gray-500">لتنظيم الأعضاء ومتابعة صلاحياتهم داخل المنصة</p>
      </div>

      {/* Upgrade Banner */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 flex justify-between items-center shadow-sm">
        <div className="text-right flex-1">
          <h2 className="text-lg font-bold text-gray-900 mb-1">لا توجد اشتراكات</h2>
          <p className="text-sm text-gray-500">ارتق بحسابك للوصول الى مستوى أعلى مع الميزات</p>
        </div>
        <button className="bg-[#EB682C] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-[#d65a22] transition-colors whitespace-nowrap">
          ترقية الاشتراك
        </button>
      </div>

      {/* Invite Member Section */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
        <div className="flex  flex-col gap-2 mb-2 text-right">
          <label className="text-sm font-bold text-gray-700">البريد الإلكتروني</label>
        </div>
        <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-4">
          
          <button className="w-full md:w-auto bg-[#EB682C] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#d65a22] transition-colors whitespace-nowrap">
            أرسل دعوة انضمام
          </button>

          <div className="flex-1 flex flex-col md:flex-row justify-end items-center gap-4 w-full">
            <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-900 px-4 py-3 rounded-xl cursor-pointer w-full md:w-auto">
              <ChevronDown className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-bold mx-2">عضو</span>
            </div>

            <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#2A5CBA] px-4 py-3 rounded-xl cursor-pointer w-full md:w-auto">
              <ChevronDown className="w-4 h-4" />
              <span className="text-sm font-bold mx-2">الصلاحيات</span>
            </div>

            <div className="relative w-full md:max-w-md">
              <input 
                type="email" 
                placeholder="Mahmoudfatouh123@gmail.com" 
                className="w-full h-12 px-10 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-left bg-gray-50/50"
                dir="ltr"
              />
              <X className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:text-gray-600" />
            </div>
          </div>

        </div>
      </div>

      {/* Team Members List */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
        <h2 className="text-lg font-bold text-gray-500 mb-8 text-right">الأعضاء</h2>
        
        <div className="flex  flex-col gap-6">
          {teamMembers.map((member, idx) => (
            <div key={member.id}>
              <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-4">
                
                {/* Left side (Role) */}
                <div className="w-full md:w-auto flex  justify-start">
                  {member.role === "الادمن" ? (
                    <div className="flex items-center gap-2 text-gray-700 px-4 py-2 w-full md:w-auto justify-end md:justify-start">
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-bold">الادمن</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-900 px-4 py-2 rounded-lg cursor-pointer w-full md:w-auto justify-end md:justify-start">
                      <ChevronDown className="w-4 h-4 text-orange-400" />
                      <span className="text-sm font-bold">عضو</span>
                    </div>
                  )}
                </div>

                {/* Right side (Profile info) */}
                <div className="flex  items-center gap-4 text-right">
                  <div>
                    <div className="flex justify-end items-center gap-2 mb-1">
                      {member.isYou && (
                        <span className="bg-orange-200 text-orange-900 text-xs px-2 py-0.5 rounded font-bold">
                          أنت
                        </span>
                      )}
                      <h3 className="font-bold text-gray-900">{member.name}</h3>
                    </div>
                    <p className="text-sm text-gray-400">{member.email}</p>
                  </div>
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-gray-100">
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                </div>

              </div>
              
              {/* Divider except for last item */}
              {idx < teamMembers.length - 1 && (
                <div className="w-full h-px bg-gray-50 my-6"></div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
