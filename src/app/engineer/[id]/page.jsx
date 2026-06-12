"use client";
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Link from 'next/link';
import { Bookmark, X, ChevronLeft, Edit, UploadCloud, Plus, Trash2, Download } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";

export default function EngineerProfilePage() {
  const { id } = useParams();
  const { user } = useAuth();
  const isOwner = user?.uuid === id;

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [engineer, setEngineer] = useState(null);

  // Edit Mode States
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({
    bio: '',
    experiences: [],
    skills: [],
    newProjects: [] // For adding new projects inline
  });
  const [newSkill, setNewSkill] = useState("");
  const [editingPortfolioId, setEditingPortfolioId] = useState(null);
  const [editingPortfolioData, setEditingPortfolioData] = useState(null);

  // Experience Modal States
  const [isAddExpModalOpen, setIsAddExpModalOpen] = useState(false);
  const [newExpData, setNewExpData] = useState({
    company_name: '',
    job_title: '',
    start_date: '',
    end_date: '',
    skills: '',
    image: null,
    imagePreview: null
  });

  const [isEditExpModalOpen, setIsEditExpModalOpen] = useState(false);
  const [publicCvUrl, setPublicCvUrl] = useState(null);
  const [editingExpIndex, setEditingExpIndex] = useState(null);
  const [editingExpData, setEditingExpData] = useState({
    company_name: '',
    job_title: '',
    start_date: '',
    end_date: '',
    skills: '',
    image: null,
    imagePreview: null
  });

  // Custom UI Alerts
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [confirmModal, setConfirmModal] = useState({ show: false, message: '', onConfirm: null });

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  useEffect(() => {
    const fetchEngineer = async () => {
      try {
        const res = await api.get(`/auth/engineers/${id}`);
        setEngineer(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCv = async () => {
      try {
        const res = await api.get(`/auth/engineers/${id}/cv`);
        if (res.data && res.data.cv_url) {
          setPublicCvUrl(res.data.cv_url);
        }
      } catch (err) {
        // 404 or other errors mean no CV is available
      }
    };

    if (id) {
      fetchEngineer();
      fetchCv();
    }
  }, [id]);

  useEffect(() => {
    if (engineer) {
      setEditData({
        bio: engineer.bio || '',
        experiences: engineer.experiences || [],
        skills: engineer.skills ? (Array.isArray(engineer.skills) ? engineer.skills : engineer.skills.split(',').map(s => s.trim())) : [],
        newProjects: [],
        cv: null,
        remove_cv: false
      });
    }
  }, [engineer, isEditMode]);

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("bio", editData.bio);
      if (editData.cv) {
        formData.append("cv", editData.cv);
      } else if (editData.remove_cv) {
        formData.append("remove_cv", 1);
      }
      if (editData.skills.length > 0) {
        editData.skills.forEach((skill) => {
          formData.append("skills[]", skill);
        });
      }
      editData.experiences.forEach((exp, i) => {
        formData.append(`experiences[${i}][company_name]`, exp.company_name || exp.company || 'اسم الشركة');
        formData.append(`experiences[${i}][job_title]`, exp.job_title || exp.role || 'مهندس');
        formData.append(`experiences[${i}][start_date]`, exp.start_date || exp.date || '2020-01-01');
        if (exp.end_date) formData.append(`experiences[${i}][end_date]`, exp.end_date);
        formData.append(`experiences[${i}][skills]`, exp.skills || editData.skills.join(", ") || 'مهارات');
      });

      editData.newProjects?.forEach((proj, i) => {
         formData.append(`portfolios[${i}][project_name]`, proj.name || `مشروع جديد`);
         proj.files?.forEach((file, j) => {
            formData.append(`portfolios[${i}][images][${j}]`, file.file);
         });
      });

      await api.post("/auth/profile/engineer", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      showNotification("تم حفظ البيانات بنجاح!", "success");
      setIsEditMode(false);
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      console.error(err);
      showNotification("حدث خطأ أثناء حفظ البيانات", "error");
    }
  };

  const handleDeletePortfolio = (uuid) => {
    setConfirmModal({
      show: true,
      message: "هل أنت متأكد من حذف هذا المشروع؟",
      onConfirm: async () => {
        try {
          await api.delete(`/auth/profile/engineer/portfolios/${uuid}`);
          setEngineer(prev => ({
            ...prev,
            projects: prev.projects.filter(p => p.uuid !== uuid)
          }));
          showNotification("تم حذف المشروع بنجاح!", "success");
        } catch (err) {
          console.error(err);
          showNotification("حدث خطأ أثناء حذف المشروع", "error");
        } finally {
          setConfirmModal({ show: false, message: '', onConfirm: null });
        }
      }
    });
  };

  const handleUpdatePortfolio = async (uuid) => {
    try {
      const formData = new FormData();
      if (editingPortfolioData.project_name) formData.append('project_name', editingPortfolioData.project_name);
      if (editingPortfolioData.description) formData.append('description', editingPortfolioData.description);
      
      if (editingPortfolioData.newImages && editingPortfolioData.newImages.length > 0) {
        editingPortfolioData.newImages.forEach(file => {
          formData.append('images[]', file.file);
        });
      }

      await api.post(`/auth/profile/engineer/portfolios/${uuid}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      showNotification("تم تحديث المشروع بنجاح!", "success");
      setEditingPortfolioId(null);
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      console.error(err);
      showNotification("حدث خطأ أثناء تحديث المشروع", "error");
    }
  };

  const handleAddExperience = async () => {
    if (!newExpData.company_name || !newExpData.job_title || !newExpData.start_date) {
      showNotification("الرجاء تعبئة الحقول الإلزامية", "error");
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append('company_name', newExpData.company_name);
      formData.append('job_title', newExpData.job_title);
      formData.append('start_date', newExpData.start_date);
      if (newExpData.end_date) formData.append('end_date', newExpData.end_date);
      if (newExpData.skills) formData.append('skills', newExpData.skills);
      if (newExpData.image) formData.append('image', newExpData.image);

      await api.post('/auth/profile/engineer/experiences', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      showNotification("تم إضافة الخبرة بنجاح!", "success");
      setIsAddExpModalOpen(false);
      setNewExpData({ company_name: '', job_title: '', start_date: '', end_date: '', skills: '', image: null, imagePreview: null });
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      console.error(err);
      showNotification("حدث خطأ أثناء إضافة الخبرة", "error");
    }
  };

  const handleUpdateExperience = () => {
    if (!editingExpData.company_name || !editingExpData.job_title || !editingExpData.start_date) {
      showNotification("الرجاء تعبئة الحقول الإلزامية", "error");
      return;
    }
    const newExpList = [...editData.experiences];
    newExpList[editingExpIndex] = {
      ...newExpList[editingExpIndex],
      company_name: editingExpData.company_name,
      job_title: editingExpData.job_title,
      start_date: editingExpData.start_date,
      end_date: editingExpData.end_date,
      skills: editingExpData.skills,
      image: editingExpData.image,
      imagePreview: editingExpData.imagePreview
    };
    setEditData({ ...editData, experiences: newExpList });
    setIsEditExpModalOpen(false);
    showNotification("تم تحديث الخبرة، لا تنس حفظ التغييرات للملف الشخصي", "success");
  };

  const experiences = [
    { company: 'ديكوما (DecoMa)', location: 'السعودية جدة', role: 'مهندس ديكور', date: 'مارس 2022 - أبريل 2024 الخبرة سنتين وشهر' },
    { company: 'ديكوما (DecoMa)', location: 'السعودية جدة', role: 'مهندس ديكور', date: 'مارس 2022 - أبريل 2024 الخبرة سنتين وشهر' },
    { company: 'ديكوما (DecoMa)', location: 'السعودية جدة', role: 'مهندس ديكور', date: 'مارس 2022 - أبريل 2024 الخبرة سنتين وشهر' }
  ];

  const skills = ['النمذجة ثلاثية الأبعاد (3D)', 'التصميم الداخلي', 'أوتوكاد (AutoCAD)', 'متابعة الميزانية والتكاليف'];

  const defaultPortfolioImages = [
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687644-aac4c156628c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1598928506311-c55dd1b31bb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ];

  const portfolioProjects = engineer?.projects?.length > 0 ? engineer.projects : null;
  const portfolioImages = portfolioProjects ? portfolioProjects.map(p => (p.images && p.images[0]) ? p.images[0] : defaultPortfolioImages[0]) : defaultPortfolioImages;

  const displayExperiences = isOwner ? editData.experiences : (engineer?.experiences?.length > 0 ? engineer.experiences : experiences);
  const displaySkills = isOwner ? editData.skills : (engineer?.skills ? (Array.isArray(engineer.skills) ? engineer.skills : engineer.skills.split(',').map(s => s.trim())) : skills);
  const cvPath = engineer?.engineer_profile?.cv_path || engineer?.cv_path || engineer?.cv_url || (isOwner ? user?.engineer_profile?.cv_path || user?.cv_path : null) || publicCvUrl;

  return (
    <div className="min-h-screen bg-[#F9FAFC] flex flex-col font-tajawal">
      <Navbar />

      <div className={`flex-grow ${isEditMode ? 'pb-32' : 'pb-16'}`}>
        {/* Cover Image */}
        <div className="md:w-[90vw] md:h-[444px]  relative mx-auto">
          <img 
            src="/eng-cover.png" 
            alt="Cover" 
            className="w-full h-full "
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full relative">
          
          {/* Profile Header (Avatar + Info + Buttons) */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 -mt-16" dir="rtl">
            
            {/* Right side: Avatar and Name */}
            <div className="flex flex-col" data-aos="fade-up">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-[#D6E4FF] flex items-center justify-center shadow-sm z-10 overflow-hidden" data-aos="zoom-in" data-aos-delay="100">
                {engineer?.avatar ? (
                  <img src={engineer.avatar} className="w-full h-full object-cover" alt="avatar" />
                ) : (
                  <span className="text-5xl text-gray-800 font-light font-sans">{engineer?.name?.[0] || 'U'}</span>
                )}
              </div>
              <div className="mt-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{engineer?.name || "محمد عادل"}</h1>
                <p className="text-sm text-gray-500 max-w-lg">
                  {engineer?.specialization || "مهندس تشطيبات و ديكورات في شقق و الفيلات والفنادق على أعلى مستوى"}
                </p>
              </div>
            </div>

            {/* Left side: Buttons */}
            <div className="flex gap-3 mt-8 md:mt-24 md:mr-auto" data-aos="fade-right" data-aos-delay="200">
              {isOwner ? (
                isEditMode ? (
                  <div className="flex gap-2 items-center">
                    <label className="flex items-center justify-center gap-2 px-6 py-2 border border-[#EB682C] text-[#EB682C] rounded-lg font-bold hover:bg-orange-50 transition-colors bg-white hover:scale-105 active:scale-95 duration-300 cursor-pointer">
                      <UploadCloud className="w-4 h-4" />
                      {editData.cv ? "تم تحديد ملف جديد" : (cvPath && !editData.remove_cv ? "تحديث السيرة الذاتية" : "رفع السيرة الذاتية (CV)")}
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx" 
                        className="hidden" 
                        onChange={e => setEditData({...editData, cv: e.target.files[0], remove_cv: false})}
                      />
                    </label>
                    {((cvPath && !editData.remove_cv) || editData.cv) && (
                      <button
                        onClick={() => setEditData({...editData, cv: null, remove_cv: true})}
                        className="flex items-center justify-center p-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors bg-white"
                        title="حذف السيرة الذاتية"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => setIsEditMode(false)}
                      className="flex items-center justify-center gap-2 px-8 py-2 border border-gray-300 text-gray-600 rounded-lg font-bold hover:bg-gray-50 transition-colors bg-white hover:scale-105 active:scale-95 duration-300"
                    >
                      <X className="w-4 h-4" />
                      إلغاء التعديل
                    </button>
                  </div>
                ) : (
                  <>
                    {cvPath && (
                      <a href={cvPath} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-colors bg-white hover:scale-105 active:scale-95 duration-300">
                        <Download className="w-4 h-4" />
                        تحميل السيرة الذاتية
                      </a>
                    )}
                    <button 
                      onClick={() => setIsEditMode(true)}
                      className="flex items-center justify-center gap-2 px-8 py-2 border border-[#EB682C] text-[#EB682C] rounded-lg font-bold hover:bg-orange-50 transition-colors bg-white hover:scale-105 active:scale-95 duration-300"
                    >
                      <Edit className="w-4 h-4" />
                      تعديل البيانات
                    </button>
                  </>
                )
              ) : (
                <>
                  {cvPath && (
                    <a href={cvPath} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-colors bg-white hover:scale-105 active:scale-95 duration-300">
                      <Download className="w-4 h-4" />
                      تحميل السيرة الذاتية
                    </a>
                  )}
                  <button className="flex items-center justify-center gap-2 px-6 py-2 border border-[#2A5CBA] text-[#2A5CBA] rounded-lg font-bold hover:bg-blue-50 transition-colors bg-white hover:scale-105 active:scale-95 duration-300">
                    <Bookmark className="w-4 h-4" />
                    حفظ المهندس
                  </button>
                  <Link href={`/chat?user=${engineer?.uuid || ''}`}>
                    <button className="flex items-center justify-center px-8 py-2 bg-[#EB682C] text-white rounded-lg font-bold hover:bg-[#d65a22] transition-colors hover:scale-105 active:scale-95 duration-300 shadow-md hover:shadow-lg">
                      بدء المحادثة
                    </button>
                  </Link>
                </>
              )}
            </div>
            
          </div>

          {/* Content Sections */}
          <div className="space-y-6" dir="rtl">
            
            {/* Personal Overview */}
            {(engineer?.bio || isOwner) && (
              <section className={`bg-white rounded-2xl border ${isEditMode ? 'border-[#EB682C] shadow-md ring-2 ring-[#EB682C]/20' : 'border-gray-100 shadow-sm'} p-6 md:p-8 transition-all`}>
                <h2 className="text-[#2A5CBA] font-bold text-lg mb-4 flex items-center justify-between">
                  <span>لمحة شخصية</span>
                  {isEditMode && <span className="text-xs text-[#EB682C] bg-orange-50 px-2 py-1 rounded">وضع التعديل</span>}
                </h2>
                
                {isEditMode ? (
                  <textarea 
                    className="w-full p-4 border border-gray-200 rounded-xl text-sm min-h-[120px] resize-none focus:outline-none focus:border-[#EB682C] text-right bg-gray-50"
                    value={editData.bio}
                    onChange={e => setEditData({...editData, bio: e.target.value})}
                    placeholder="اكتب نبذة تعريفية عنك وعن مجالك..."
                  />
                ) : (
                  <p className="text-sm text-gray-600 leading-relaxed max-w-4xl">
                    {engineer?.bio ? engineer.bio : (isOwner ? "لم تقم بإضافة نبذة تعريفية بعد. اضغط على تعديل البيانات." : "خبرة في الاشراف على اعمال التشطيبات والديكور تشمل التخطيط، اختيار الخامات، ومتابعة التنفيذ وفق معايير الجودة والالتزام الفني، بما يضمن تحقيق نتائج تلبي تطلعات العملاء.")}
                  </p>
                )}
              </section>
            )}

            {/* Experience */}
            <section className={`bg-white rounded-2xl border ${isEditMode ? 'border-[#EB682C] shadow-md ring-2 ring-[#EB682C]/20' : 'border-gray-100 shadow-sm'} p-6 md:p-8 transition-all`}>
              <h2 className="text-[#2A5CBA] font-bold text-xl mb-6 flex items-center justify-between">
                <span>الخبرات</span>
                {isOwner && (
                  <button 
                    onClick={() => setIsAddExpModalOpen(true)}
                    className="text-sm text-[#EB682C] flex items-center gap-1.5 font-bold hover:underline transition-all"
                  >
                    <Plus className="w-4 h-4"/> إضافة خبرة جديدة
                  </button>
                )}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(isEditMode ? editData.experiences : displayExperiences).map((exp, idx) => (
                  <div key={idx} className={`flex gap-4 items-start transition-transform duration-300 relative group ${isEditMode ? 'bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md' : 'hover:-translate-y-1'}`}>
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200">
                      {exp.imagePreview || exp.image_url || exp.image ? (
                        <img src={exp.imagePreview || exp.image_url || exp.image} alt={exp.company_name || exp.company} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#1e293b] flex items-center justify-center">
                           <span className="text-[#e2e8f0] text-xs font-bold font-serif text-center uppercase">
                             {(exp.company_name || exp.company || 'C').substring(0,2)}
                           </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1">{exp.company_name || exp.company}</h3>
                      <p className="text-xs text-gray-500 mb-1">{exp.job_title || exp.role}</p>
                      <p className="text-xs text-gray-400">{exp.start_date || exp.date}</p>
                    </div>

                    {isEditMode && (
                      <div className="absolute top-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => {
                            setEditingExpIndex(idx);
                            setEditingExpData({
                              company_name: exp.company_name || exp.company || '',
                              job_title: exp.job_title || exp.role || '',
                              start_date: exp.start_date || exp.date || '',
                              end_date: exp.end_date || '',
                              skills: exp.skills || '',
                              image: null,
                              imagePreview: exp.imagePreview || exp.image_url || exp.image || null
                            });
                            setIsEditExpModalOpen(true);
                          }}
                          className="p-1.5 bg-blue-50 text-[#2A5CBA] rounded-md hover:bg-[#2A5CBA] hover:text-white transition-colors shadow-sm"
                          title="تعديل"
                        >
                          <Edit className="w-4 h-4"/>
                        </button>
                        <button 
                          onClick={() => setEditData({...editData, experiences: editData.experiences.filter((_, i) => i !== idx)})} 
                          className="p-1.5 bg-red-50 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors shadow-sm"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4"/>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section className={`bg-white rounded-2xl border ${isEditMode ? 'border-[#EB682C] shadow-md ring-2 ring-[#EB682C]/20' : 'border-gray-100 shadow-sm'} p-6 md:p-8 transition-all`}>
              <h2 className="text-[#2A5CBA] font-bold text-lg mb-6 flex items-center justify-between">
                <span>المهارات</span>
                {isEditMode && <span className="text-xs text-[#EB682C] bg-orange-50 px-2 py-1 rounded">اضغط Enter للإضافة</span>}
              </h2>
              
              {isEditMode ? (
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2 relative">
                    <input 
                      type="text" 
                      placeholder="أضف مهارة جديدة واضغط Enter..." 
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#EB682C] bg-gray-50"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newSkill.trim()) {
                          e.preventDefault();
                          setEditData({...editData, skills: [...editData.skills, newSkill.trim()]});
                          setNewSkill("");
                        }
                      }}
                    />
                    <button 
                      onClick={() => {
                        if (newSkill.trim()) {
                          setEditData({...editData, skills: [...editData.skills, newSkill.trim()]});
                          setNewSkill("");
                        }
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#EB682C] text-white px-4 py-1.5 rounded-lg text-sm font-bold"
                    >
                      إضافة
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {editData.skills.map((skill, idx) => (
                      <span key={idx} className="bg-[#fcf5f1] text-[#7c6962] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 border border-[#faebe4]">
                        {skill}
                        <X 
                          className="w-3 h-3 cursor-pointer text-red-400 hover:text-red-600" 
                          onClick={() => setEditData({...editData, skills: editData.skills.filter((_, i) => i !== idx)})} 
                        />
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {displaySkills.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="bg-[#fcf5f1] text-[#7c6962] px-6 py-2 rounded-lg text-sm font-bold border border-[#faebe4] hover:bg-[#EB682C] hover:text-white hover:border-[#EB682C] transition-colors duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                  {displaySkills.length === 0 && <span className="text-gray-400 text-sm">لا توجد مهارات مضافة.</span>}
                </div>
              )}
            </section>

            {/* Portfolio */}
            {(portfolioProjects || isOwner) && (
              <section className={`bg-white rounded-2xl border ${isEditMode ? 'border-[#EB682C] shadow-md ring-2 ring-[#EB682C]/20' : 'border-gray-100 shadow-sm'} p-6 md:p-8 transition-all`}>
                <h2 className="text-[#2A5CBA] font-bold text-lg mb-6 flex items-center justify-between">
                  <span>سابقة الاعمال</span>
                  {isEditMode && (
                    <button 
                      onClick={() => setEditData({...editData, newProjects: [...editData.newProjects, { id: Date.now(), name: '', files: [] }]})}
                      className="text-xs text-[#EB682C] flex items-center gap-1 font-bold hover:underline"
                    >
                      <Plus className="w-3 h-3"/> رفع مشروع جديد
                    </button>
                  )}
                </h2>

                {/* Edit Mode Inline Project Adder */}
                {isEditMode && editData.newProjects.length > 0 && (
                  <div className="mb-8 space-y-4">
                    <h3 className="text-sm font-bold text-gray-700">مشاريع سيتم إضافتها:</h3>
                    {editData.newProjects.map((proj, idx) => (
                      <div key={proj.id} className="border border-[#EB682C]/50 bg-orange-50/30 rounded-xl p-4 relative">
                        <button 
                          onClick={() => setEditData({...editData, newProjects: editData.newProjects.filter(p => p.id !== proj.id)})} 
                          className="absolute top-4 left-4 text-red-500 hover:bg-red-50 p-1 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <input 
                              type="text" 
                              placeholder="اسم المشروع (مثال: فيلا سكنية بجدة)" 
                              className="w-full text-sm mb-3 p-3 border border-gray-200 rounded-lg outline-none focus:border-[#EB682C]" 
                              value={proj.name} 
                              onChange={e => {
                                const arr = [...editData.newProjects];
                                arr[idx].name = e.target.value;
                                setEditData({...editData, newProjects: arr});
                              }} 
                            />
                            
                            <div className="relative border border-dashed border-[#de6d3a] rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-orange-50 transition-colors h-24">
                              <input 
                                type="file" 
                                multiple 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                                onChange={(e) => {
                                  if (!e.target.files.length) return;
                                  const fileArray = Array.from(e.target.files).map(file => ({
                                    file,
                                    preview: URL.createObjectURL(file)
                                  }));
                                  const arr = [...editData.newProjects];
                                  arr[idx].files = [...(arr[idx].files || []), ...fileArray];
                                  setEditData({...editData, newProjects: arr});
                                }}
                              />
                              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mb-1">
                                <UploadCloud className="w-4 h-4 text-[#de6d3a]" />
                              </div>
                              <p className="text-[10px] font-bold text-[#de6d3a]">اضغط لرفع صور المشروع</p>
                            </div>
                          </div>

                          {/* Previews */}
                          {proj.files && proj.files.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 h-[150px] overflow-y-auto pr-2">
                              {proj.files.map((f, fIdx) => (
                                <div key={fIdx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                                  <img src={f.preview} className="w-full h-full object-cover" alt="Preview"/>
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <button 
                                      onClick={() => {
                                        const arr = [...editData.newProjects];
                                        arr[idx].files.splice(fIdx, 1);
                                        setEditData({...editData, newProjects: arr});
                                      }}
                                      className="text-white bg-red-500 rounded-full p-1"
                                    >
                                      <X className="w-3 h-3"/>
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <hr className="border-gray-100" />
                  </div>
                )}

                {portfolioProjects || (!isOwner && portfolioImages) ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolioProjects ? portfolioProjects.map((proj, idx) => {
                      const img = (proj.images && proj.images[0]) ? proj.images[0] : defaultPortfolioImages[0];
                      return (
                      <div 
                        key={proj.uuid || idx} 
                        className={`aspect-[4/3] rounded-xl overflow-hidden group relative border border-gray-100 ${!isEditMode ? 'cursor-pointer' : ''}`}
                        onClick={() => {
                          if (!isEditMode) {
                            setSelectedProjectIndex(idx);
                            setIsProjectModalOpen(true);
                          }
                        }}
                      >
                        <img 
                          src={img} 
                          alt={proj.project_name || `Portfolio item ${idx + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {!isEditMode && <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>}
                        
                        {isEditMode && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-3">
                            <span className="text-sm font-bold truncate px-4">{proj.project_name || "مشروع"}</span>
                            <div className="flex gap-2 z-10">
                              <button 
                                onClick={(e) => { e.stopPropagation(); setEditingPortfolioData({ project_name: proj.project_name || '', description: proj.description || '', newImages: [] }); setEditingPortfolioId(proj.uuid); }}
                                className="bg-[#2A5CBA] hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
                                title="تعديل"
                              >
                                <Edit className="w-4 h-4"/>
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleDeletePortfolio(proj.uuid); }}
                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                                title="حذف"
                              >
                                <Trash2 className="w-4 h-4"/>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}) : portfolioImages.map((img, idx) => (
                      <div 
                        key={idx} 
                        className="aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer relative border border-gray-100"
                        onClick={() => {
                          setSelectedProjectIndex(idx);
                          setIsProjectModalOpen(true);
                        }}
                      >
                        <img 
                          src={img} 
                          alt={`Portfolio item ${idx + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-500 text-sm">لم تقم بإضافة أي مشاريع في سابقة الأعمال الخاصة بك.</p>
                  </div>
                )}
              </section>
            )}

          </div>
        </div>
      </div>

      {/* Floating Save Bar */}
      {isEditMode && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[-0_-10px_30px_rgba(0,0,0,0.05)] z-[60] animate-in slide-in-from-bottom-full flex justify-center gap-4">
          <button 
            onClick={handleSaveProfile}
            className="bg-[#EB682C] text-white px-12 py-3 rounded-xl font-bold hover:bg-[#d65a22] transition-colors shadow-md flex items-center gap-2"
          >
            حفظ جميع التغييرات
          </button>
          <button 
            onClick={() => setIsEditMode(false)}
            className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
          >
            إلغاء
          </button>
        </div>
      )}

      {/* Edit Portfolio Modal */}
      {editingPortfolioId && (
        <div className="fixed inset-0 z-[110] bg-black/50 flex justify-center items-center backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-2xl animate-in zoom-in duration-300" dir="rtl">
            <button onClick={() => setEditingPortfolioId(null)} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"><X className="w-5 h-5"/></button>
            <h3 className="text-[#2A5CBA] text-xl font-bold mb-6">تعديل المشروع</h3>
            
            <input 
              type="text" 
              placeholder="اسم المشروع" 
              className="w-full text-sm mb-4 p-3 border border-gray-200 rounded-xl outline-none focus:border-[#EB682C] focus:ring-1 focus:ring-[#EB682C]/30 bg-gray-50" 
              value={editingPortfolioData?.project_name || ""} 
              onChange={e => setEditingPortfolioData({...editingPortfolioData, project_name: e.target.value})} 
            />
            <textarea 
              placeholder="وصف المشروع" 
              className="w-full text-sm mb-4 p-3 border border-gray-200 rounded-xl outline-none focus:border-[#EB682C] focus:ring-1 focus:ring-[#EB682C]/30 bg-gray-50 min-h-[120px] resize-none" 
              value={editingPortfolioData?.description || ""} 
              onChange={e => setEditingPortfolioData({...editingPortfolioData, description: e.target.value})} 
            />
            
            <div className="relative border border-dashed border-[#de6d3a] rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-orange-50 transition-colors mb-6">
              <input 
                type="file" 
                multiple 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                onChange={(e) => {
                  if (!e.target.files.length) return;
                  const fileArray = Array.from(e.target.files).map(file => ({
                    file,
                    preview: URL.createObjectURL(file)
                  }));
                  setEditingPortfolioData({...editingPortfolioData, newImages: [...(editingPortfolioData.newImages || []), ...fileArray]});
                }}
              />
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                <UploadCloud className="w-5 h-5 text-[#de6d3a]" />
              </div>
              <p className="text-sm font-bold text-[#de6d3a]">اضغط لرفع صور إضافية للمشروع</p>
              <p className="text-xs text-gray-400 mt-1">يمكنك رفع عدة صور</p>
            </div>
            
            {editingPortfolioData?.newImages?.length > 0 && (
              <div className="flex gap-3 overflow-x-auto mb-6 pb-2">
                {editingPortfolioData.newImages.map((img, idx) => (
                  <div key={idx} className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 group">
                    <img src={img.preview} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => {
                        const newArr = [...editingPortfolioData.newImages];
                        newArr.splice(idx, 1);
                        setEditingPortfolioData({...editingPortfolioData, newImages: newArr});
                      }}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                    >
                      <X className="w-4 h-4"/>
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <button 
              onClick={() => handleUpdatePortfolio(editingPortfolioId)} 
              className="w-full bg-[#EB682C] text-white py-3.5 rounded-xl font-bold hover:bg-[#d65a22] transition-colors shadow-md active:scale-[0.98]"
            >
              حفظ التعديلات
            </button>
          </div>
        </div>
      )}

      {/* Project Details Modal (Hidden during Edit Mode) */}
      {isProjectModalOpen && !isEditMode && (
        <div className="fixed inset-0 z-[100] bg-black/70 flex justify-center backdrop-blur-sm overflow-y-auto animate-in fade-in duration-300">
          <div className="w-full max-w-5xl bg-transparent min-h-screen pb-20 relative font-tajawal animate-in slide-in-from-bottom-8 duration-500">
            
            <div className="flex justify-between items-center p-6 md:p-8 sticky top-0 z-10 w-full" dir="rtl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#D6E4FF] flex items-center justify-center shadow-sm overflow-hidden">
                  {engineer?.avatar ? (
                    <img src={engineer.avatar} className="w-full h-full object-cover" alt="avatar" />
                  ) : (
                    <span className="text-xl text-gray-800 font-light font-sans">{engineer?.name?.[0] || 'U'}</span>
                  )}
                </div>
                <div className="text-white">
                  <h3 className="font-bold text-sm">{engineer?.name || "محمد عادل"}</h3>
                  <p className="text-xs text-gray-300">{engineer?.specialization || "مهندس تشطيبات و ديكور"}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsProjectModalOpen(false)}
                className="text-white hover:text-gray-300 transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-4 md:px-8 space-y-2 relative">
              <div className="w-full h-[300px] md:h-[500px] rounded-t-3xl overflow-hidden bg-gray-900 relative">
                 <img src={portfolioImages[selectedProjectIndex]} className="w-full h-full object-cover opacity-90" alt="Project 1" />
              </div>
              
              {portfolioProjects && portfolioProjects[selectedProjectIndex]?.images?.map((img, i) => i > 0 && (
                <div key={i} className="w-full h-[300px] md:h-[500px] overflow-hidden bg-gray-900">
                   <img src={img} className="w-full h-full object-cover opacity-90" alt={`Project Image ${i + 1}`} />
                </div>
              ))}
              
              {!portfolioProjects && (
                <>
                  <div className="w-full h-[300px] md:h-[500px] overflow-hidden bg-gray-900">
                    <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover opacity-90" alt="Project 2" />
                  </div>
                  <div className="w-full h-[300px] md:h-[500px] overflow-hidden bg-gray-900 relative group">
                    <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover opacity-90" alt="Project 3" />
                    <button className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#2A5CBA] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="w-full h-[300px] md:h-[500px] rounded-b-3xl overflow-hidden bg-gray-900">
                    <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover opacity-90" alt="Project 4" />
                  </div>
                </>
              )}

              <div className="bg-[#de7c54] rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center mt-6 shadow-lg">
                <h2 className="text-white text-xl md:text-2xl font-bold mb-1">{portfolioProjects?.[selectedProjectIndex]?.project_name || "اسم المشروع"}</h2>
                <p className="text-white/80 text-xs mb-6">تم نشره {portfolioProjects?.[selectedProjectIndex]?.created_at ? new Date(portfolioProjects[selectedProjectIndex].created_at).toLocaleDateString("ar-EG") : "5 ابريل 2024"}</p>
                <Link href={`/chat?user=${engineer?.uuid || ''}`}>
                  <button className="bg-white text-[#de7c54] px-12 py-3 rounded-full font-bold hover:bg-gray-50 transition-colors shadow-md">
                    بدء المحادثة
                  </button>
                </Link>
              </div>

              <div className="bg-[#3e68b8] rounded-3xl p-6 md:p-8 mt-6">
                <div className="flex justify-end mb-6">
                  <h3 className="text-white font-bold text-lg">سابقة الاعمال</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[0, 1, 2].map((i) => {
                    const idx = (selectedProjectIndex + i + 1) % portfolioImages.length;
                    return (
                      <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 cursor-pointer" onClick={() => setSelectedProjectIndex(idx)}>
                        <img 
                          src={portfolioImages[idx]} 
                          alt="Other Project" 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Add Experience Modal */}
      {isAddExpModalOpen && (
        <div className="fixed inset-0 z-[150] bg-black/50 flex justify-center items-center backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-2xl animate-in zoom-in duration-300" dir="rtl">
            <button onClick={() => setIsAddExpModalOpen(false)} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"><X className="w-5 h-5"/></button>
            <h3 className="text-[#2A5CBA] text-xl font-bold mb-6">إضافة خبرة جديدة</h3>
            
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div>
                <label className="text-xs font-bold text-gray-600 mb-1 block">اسم الشركة *</label>
                <input 
                  type="text" 
                  placeholder="مثال: ديكوما" 
                  className="w-full text-sm p-3 border border-gray-200 rounded-xl outline-none focus:border-[#EB682C] focus:ring-1 focus:ring-[#EB682C]/30 bg-gray-50" 
                  value={newExpData.company_name} 
                  onChange={e => setNewExpData({...newExpData, company_name: e.target.value})} 
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 mb-1 block">المسمى الوظيفي *</label>
                <input 
                  type="text" 
                  placeholder="مثال: مهندس تشطيبات" 
                  className="w-full text-sm p-3 border border-gray-200 rounded-xl outline-none focus:border-[#EB682C] focus:ring-1 focus:ring-[#EB682C]/30 bg-gray-50" 
                  value={newExpData.job_title} 
                  onChange={e => setNewExpData({...newExpData, job_title: e.target.value})} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 mb-1 block">تاريخ البدء *</label>
                  <input 
                    type="date" 
                    className="w-full text-sm p-3 border border-gray-200 rounded-xl outline-none focus:border-[#EB682C] focus:ring-1 focus:ring-[#EB682C]/30 bg-gray-50 text-gray-600" 
                    value={newExpData.start_date} 
                    onChange={e => setNewExpData({...newExpData, start_date: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 mb-1 block">تاريخ الانتهاء</label>
                  <input 
                    type="date" 
                    className="w-full text-sm p-3 border border-gray-200 rounded-xl outline-none focus:border-[#EB682C] focus:ring-1 focus:ring-[#EB682C]/30 bg-gray-50 text-gray-600" 
                    value={newExpData.end_date} 
                    onChange={e => setNewExpData({...newExpData, end_date: e.target.value})} 
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 mb-1 block">المهارات المكتسبة</label>
                <textarea 
                  placeholder="اكتب المهارات..." 
                  className="w-full text-sm p-3 border border-gray-200 rounded-xl outline-none focus:border-[#EB682C] focus:ring-1 focus:ring-[#EB682C]/30 bg-gray-50 min-h-[80px] resize-none" 
                  value={newExpData.skills} 
                  onChange={e => setNewExpData({...newExpData, skills: e.target.value})} 
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 mb-1 block">صورة للخبرة / شهادة (اختياري)</label>
                <div className="relative border border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <input 
                    type="file" 
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                    onChange={(e) => {
                      if (!e.target.files.length) return;
                      const file = e.target.files[0];
                      setNewExpData({...newExpData, image: file, imagePreview: URL.createObjectURL(file)});
                    }}
                  />
                  {newExpData.imagePreview ? (
                    <img src={newExpData.imagePreview} className="h-20 w-auto rounded object-cover" />
                  ) : (
                    <>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                        <UploadCloud className="w-4 h-4 text-gray-500" />
                      </div>
                      <p className="text-[10px] font-bold text-gray-500">اضغط لرفع صورة</p>
                    </>
                  )}
                </div>
              </div>

            </div>
            
            <button 
              onClick={handleAddExperience} 
              className="w-full bg-[#EB682C] text-white py-3.5 rounded-xl font-bold hover:bg-[#d65a22] transition-colors shadow-md active:scale-[0.98] mt-6"
            >
              إضافة الخبرة
            </button>
          </div>
        </div>
      )}

      {/* Edit Experience Modal */}
      {isEditExpModalOpen && (
        <div className="fixed inset-0 z-[150] bg-black/50 flex justify-center items-center backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-2xl animate-in zoom-in duration-300" dir="rtl">
            <button onClick={() => setIsEditExpModalOpen(false)} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"><X className="w-5 h-5"/></button>
            <h3 className="text-[#2A5CBA] text-xl font-bold mb-6">تعديل الخبرة</h3>
            
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div>
                <label className="text-xs font-bold text-gray-600 mb-1 block">اسم الشركة *</label>
                <input 
                  type="text" 
                  placeholder="مثال: ديكوما" 
                  className="w-full text-sm p-3 border border-gray-200 rounded-xl outline-none focus:border-[#EB682C] focus:ring-1 focus:ring-[#EB682C]/30 bg-gray-50" 
                  value={editingExpData.company_name} 
                  onChange={e => setEditingExpData({...editingExpData, company_name: e.target.value})} 
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 mb-1 block">المسمى الوظيفي *</label>
                <input 
                  type="text" 
                  placeholder="مثال: مهندس تشطيبات" 
                  className="w-full text-sm p-3 border border-gray-200 rounded-xl outline-none focus:border-[#EB682C] focus:ring-1 focus:ring-[#EB682C]/30 bg-gray-50" 
                  value={editingExpData.job_title} 
                  onChange={e => setEditingExpData({...editingExpData, job_title: e.target.value})} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 mb-1 block">تاريخ البدء *</label>
                  <input 
                    type="date" 
                    className="w-full text-sm p-3 border border-gray-200 rounded-xl outline-none focus:border-[#EB682C] focus:ring-1 focus:ring-[#EB682C]/30 bg-gray-50 text-gray-600" 
                    value={editingExpData.start_date} 
                    onChange={e => setEditingExpData({...editingExpData, start_date: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 mb-1 block">تاريخ الانتهاء</label>
                  <input 
                    type="date" 
                    className="w-full text-sm p-3 border border-gray-200 rounded-xl outline-none focus:border-[#EB682C] focus:ring-1 focus:ring-[#EB682C]/30 bg-gray-50 text-gray-600" 
                    value={editingExpData.end_date} 
                    onChange={e => setEditingExpData({...editingExpData, end_date: e.target.value})} 
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 mb-1 block">المهارات المكتسبة</label>
                <textarea 
                  placeholder="اكتب المهارات..." 
                  className="w-full text-sm p-3 border border-gray-200 rounded-xl outline-none focus:border-[#EB682C] focus:ring-1 focus:ring-[#EB682C]/30 bg-gray-50 min-h-[80px] resize-none" 
                  value={editingExpData.skills} 
                  onChange={e => setEditingExpData({...editingExpData, skills: e.target.value})} 
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 mb-1 block">صورة للخبرة / شهادة (اختياري)</label>
                <div className="relative border border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <input 
                    type="file" 
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                    onChange={(e) => {
                      if (!e.target.files.length) return;
                      const file = e.target.files[0];
                      setEditingExpData({...editingExpData, image: file, imagePreview: URL.createObjectURL(file)});
                    }}
                  />
                  {editingExpData.imagePreview ? (
                    <img src={editingExpData.imagePreview} className="h-20 w-auto rounded object-cover" />
                  ) : (
                    <>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                        <UploadCloud className="w-4 h-4 text-gray-500" />
                      </div>
                      <p className="text-[10px] font-bold text-gray-500">اضغط لرفع أو تغيير الصورة</p>
                    </>
                  )}
                </div>
              </div>

            </div>
            
            <button 
              onClick={handleUpdateExperience} 
              className="w-full bg-[#EB682C] text-white py-3.5 rounded-xl font-bold hover:bg-[#d65a22] transition-colors shadow-md active:scale-[0.98] mt-6"
            >
              حفظ التعديلات
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {notification.show && (
        <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full text-white font-bold shadow-lg z-[200] animate-in slide-in-from-bottom-5 fade-in duration-300 ${notification.type === 'success' ? 'bg-[#2A5CBA]' : 'bg-red-500'}`}>
          {notification.message}
        </div>
      )}

      {/* Custom Confirm Modal */}
      {confirmModal.show && (
        <div className="fixed inset-0 z-[200] bg-black/50 flex justify-center items-center backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 relative shadow-2xl animate-in zoom-in duration-300 text-center" dir="rtl">
            <h3 className="text-gray-900 text-lg font-bold mb-6">{confirmModal.message}</h3>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={confirmModal.onConfirm}
                className="bg-red-500 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-red-600 transition-colors shadow-md active:scale-95"
              >
                نعم، احذف
              </button>
              <button 
                onClick={() => setConfirmModal({ show: false, message: '', onConfirm: null })}
                className="bg-gray-100 text-gray-700 px-8 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition-colors active:scale-95"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
