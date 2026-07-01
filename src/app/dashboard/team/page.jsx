"use client";
import { useState, useEffect } from "react";
import { ChevronDown, X, Check, Users, Shield, Edit2, Trash2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import api from "@/lib/axios";
import Popup from "@/components/Popup";

export default function TeamManagementPage() {
  const { isEnglish } = useLanguage();

  const [permissionsList, setPermissionsList] = useState([]);
  const [roles, setRoles] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  const [loading, setLoading] = useState(true);
  
  // Tabs: 'member' or 'role'
  const [activeTab, setActiveTab] = useState("member");

  // Member Form States
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitePassword, setInvitePassword] = useState("");
  const [invitePhone, setInvitePhone] = useState("");
  const [selectedRoleUuid, setSelectedRoleUuid] = useState("");
  const [inviting, setInviting] = useState(false);

  // Role Form States
  const [roleName, setRoleName] = useState("");
  const [checkedPermissions, setCheckedPermissions] = useState({});
  const [creatingRole, setCreatingRole] = useState(false);
  const [editingRoleUuid, setEditingRoleUuid] = useState(null);

  const [popupState, setPopupState] = useState({ isOpen: false, type: "", title: "", message: "", onConfirm: null });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [permRes, rolesRes, teamRes] = await Promise.all([
        api.get("/auth/company/roles/permissions"),
        api.get("/auth/company/roles"),
        api.get("/auth/team")
      ]);

      const perms = permRes.data?.data || [];
      setPermissionsList(perms);

      const fetchedRoles = rolesRes.data?.data || [];
      setRoles(fetchedRoles);

      // Always validate selectedRoleUuid against the fresh list.
      // If the current value is missing or no longer in the list (stale UUID), reset to first role.
      if (fetchedRoles.length > 0) {
        const isStillValid = fetchedRoles.some(r => r.uuid === selectedRoleUuid);
        if (!selectedRoleUuid || !isStillValid) {
          setSelectedRoleUuid(fetchedRoles[0].uuid);
        }
      } else {
        setSelectedRoleUuid("");
      }

      setTeamMembers(teamRes.data?.data || []);

      // If not currently editing a role, initialize empty permissions
      if (!editingRoleUuid) {
        const initialPerms = {};
        perms.forEach(p => initialPerms[p.key] = false);
        setCheckedPermissions(initialPerms);
      }

    } catch (error) {
      console.error("Failed to fetch team data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionToggle = (key) => {
    setCheckedPermissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveRole = async () => {
    if (!roleName) {
      return showPopup("تنبيه", "الرجاء إدخال اسم الصلاحية/الدور", "alert");
    }

    setCreatingRole(true);
    try {
      const rolePayload = { name: roleName, ...checkedPermissions };
      
      if (editingRoleUuid) {
        await api.patch(`/auth/company/roles/${editingRoleUuid}`, rolePayload);
        showPopup("نجاح", "تم تحديث الدور بنجاح", "success");
      } else {
        await api.post("/auth/company/roles", rolePayload);
        showPopup("نجاح", "تم إنشاء الدور بنجاح", "success");
      }
      
      // Reset form
      setRoleName("");
      setEditingRoleUuid(null);
      const resetPerms = {};
      permissionsList.forEach(p => resetPerms[p.key] = false);
      setCheckedPermissions(resetPerms);

      fetchData(); // Refresh roles list
    } catch (error) {
      console.error("Failed to save role:", error);
      showPopup("خطأ", error.response?.data?.message || "حدث خطأ أثناء حفظ الدور", "danger");
    } finally {
      setCreatingRole(false);
    }
  };

  const handleEditRole = (role) => {
    setRoleName(role.name);
    setEditingRoleUuid(role.uuid);
    
    const newPerms = {};
    permissionsList.forEach(p => {
      newPerms[p.key] = !!role[p.key];
    });
    setCheckedPermissions(newPerms);
    setActiveTab("role"); // Ensure we are on the role tab
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteRole = async (uuid) => {
    if (!window.confirm(isEnglish ? "Are you sure you want to delete this role?" : "هل أنت متأكد من حذف هذا الدور؟")) {
      return;
    }

    try {
      await api.delete(`/auth/company/roles/${uuid}`);
      showPopup("نجاح", "تم حذف الدور بنجاح", "success");
      
      if (editingRoleUuid === uuid) {
        // Reset form if we were editing the deleted role
        setRoleName("");
        setEditingRoleUuid(null);
        const resetPerms = {};
        permissionsList.forEach(p => resetPerms[p.key] = false);
        setCheckedPermissions(resetPerms);
      }
      
      fetchData();
    } catch (error) {
      console.error("Failed to delete role:", error);
      showPopup("خطأ", error.response?.data?.message || "حدث خطأ أثناء حذف الدور", "danger");
    }
  };

  const handleCancelEditRole = () => {
    setRoleName("");
    setEditingRoleUuid(null);
    const resetPerms = {};
    permissionsList.forEach(p => resetPerms[p.key] = false);
    setCheckedPermissions(resetPerms);
  };

  const handleInvite = async () => {
    if (!inviteName || !inviteEmail || !invitePassword || !invitePhone) {
      return showPopup("تنبيه", "الرجاء إكمال جميع الحقول", "alert");
    }

    // Validate selectedRoleUuid against the CURRENT roles list (prevents stale UUID)
    const validRole = roles.find(r => r.uuid === selectedRoleUuid);
    const roleUuidToSend = validRole?.uuid || roles[0]?.uuid || "";

    if (!roleUuidToSend) {
      return showPopup("تنبيه", "الرجاء اختيار دور صالح", "alert");
    }

    // Sync the dropdown if we fell back to the first role
    if (roleUuidToSend !== selectedRoleUuid) {
      setSelectedRoleUuid(roleUuidToSend);
    }

    console.log("[Team] Sending role_uuid:", roleUuidToSend);

    setInviting(true);
    try {
      const teamPayload = {
        name: inviteName,
        email: inviteEmail,
        password: invitePassword,
        role_uuid: roleUuidToSend,
        phone: invitePhone
      };

      await api.post("/auth/team", teamPayload);

      showPopup("نجاح", "تم إضافة العضو بنجاح.", "success");
      setInviteName("");
      setInviteEmail("");
      setInvitePassword("");
      setInvitePhone("");
      fetchData(); // Refresh members
    } catch (error) {
      console.error("Failed to invite:", error);
      showPopup("خطأ", error.response?.data?.message || "حدث خطأ أثناء إضافة العضو", "danger");
    } finally {
      setInviting(false);
    }
  };


  const handleRoleChange = async (memberUuid, newRoleUuid) => {
    try {
      await api.patch(`/auth/team/${memberUuid}`, { role_uuid: newRoleUuid });
      showPopup("نجاح", "تم تحديث دور العضو بنجاح", "success");
      fetchData();
    } catch (error) {
      console.error("Failed to update member role:", error);
      showPopup("خطأ", error.response?.data?.message || "حدث خطأ أثناء تحديث دور العضو", "danger");
      fetchData();
    }
  };

  const showPopup = (title, message, type) => {
    setPopupState({
      isOpen: true,
      title: isEnglish ? title : title,
      message: message,
      type: type,
      onConfirm: () => setPopupState({ ...popupState, isOpen: false })
    });
  };

  return (
    <div className="font-tajawal max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4" dir={isEnglish ? 'ltr' : 'rtl'}>
      
      {/* Header section */}
      <div className={isEnglish ? 'text-left' : 'text-right'}>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{isEnglish ? 'Team Management' : 'إدارة الفريق'}</h1>
        <p className="text-sm text-gray-500">{isEnglish ? 'Organize members and track their permissions within the platform' : 'لتنظيم الأعضاء ومتابعة صلاحياتهم داخل المنصة'}</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-white rounded-xl shadow-sm border border-gray-100 p-1 w-full md:w-fit mb-6">
        <button
          onClick={() => setActiveTab("member")}
          className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-colors ${activeTab === "member" ? "bg-[#EB682C] text-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
        >
          <Users className="w-4 h-4" />
          {isEnglish ? 'Members' : 'الأعضاء'}
        </button>
        <button
          onClick={() => setActiveTab("role")}
          className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-colors ${activeTab === "role" ? "bg-[#EB682C] text-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
        >
          <Shield className="w-4 h-4" />
          {isEnglish ? 'Roles & Permissions' : 'الأدوار والصلاحيات'}
        </button>
      </div>

      {/* Dynamic Form Section */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
        
        {activeTab === "member" ? (
          /* Add Member Form */
          <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200">
            <h2 className={`text-lg font-bold text-gray-900 ${isEnglish ? 'text-left' : 'text-right'}`}>
              {isEnglish ? 'Create New Member' : 'بيانات العضو الجديد'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
                <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Name' : 'الاسم'}</label>
                <input 
                  type="text" 
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder={isEnglish ? "e.g. Ahmed Ali" : "مثال: أحمد علي"} 
                  className={`w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? 'text-left' : 'text-right'} bg-gray-50/50`}
                />
              </div>

              <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
                <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Email Address' : 'البريد الإلكتروني'}</label>
                <input 
                  type="email" 
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="user@example.com" 
                  className={`w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-left bg-gray-50/50`}
                  dir="ltr"
                />
              </div>

              <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
                <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Password' : 'كلمة المرور'}</label>
                <input 
                  type="password" 
                  value={invitePassword}
                  onChange={(e) => setInvitePassword(e.target.value)}
                  placeholder="********" 
                  className={`w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-left bg-gray-50/50`}
                  dir="ltr"
                />
              </div>

              <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
                <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Phone Number' : 'رقم الهاتف'}</label>
                <input 
                  type="tel" 
                  value={invitePhone}
                  onChange={(e) => setInvitePhone(e.target.value)}
                  placeholder="+966xxxxxxxxx" 
                  className={`w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] text-left bg-gray-50/50`}
                  dir="ltr"
                />
              </div>

              <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
                <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Assign Role' : 'تعيين الدور'}</label>
                <div className="relative">
                  <select
                    value={selectedRoleUuid}
                    onChange={(e) => setSelectedRoleUuid(e.target.value)}
                    className={`w-full h-12 px-4 appearance-none border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? 'text-left' : 'text-right'} bg-gray-50/50`}
                  >
                    <option value="" disabled>{isEnglish ? 'Select a role' : 'اختر دوراً'}</option>
                    {roles.map((role) => (
                      <option key={role.uuid} value={role.uuid}>{role.name}</option>
                    ))}
                  </select>
                  <ChevronDown className={`w-4 h-4 text-gray-400 absolute ${isEnglish ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 pointer-events-none`} />
                </div>
              </div>
            </div>

            <div className={`flex ${isEnglish ? 'justify-end' : 'justify-start'} mt-4`}>
              <button 
                onClick={handleInvite}
                disabled={inviting || roles.length === 0}
                className="w-full md:w-auto bg-[#EB682C] text-white px-10 py-3.5 rounded-xl font-bold hover:bg-[#d65a22] transition-colors whitespace-nowrap disabled:opacity-50"
              >
                {inviting ? (isEnglish ? 'Adding...' : 'جاري الإضافة...') : (isEnglish ? 'Add Member' : 'إضافة العضو')}
              </button>
            </div>
            {roles.length === 0 && !loading && (
              <p className={`text-sm text-red-500 mt-2 ${isEnglish ? 'text-right' : 'text-left'}`}>
                {isEnglish ? 'Please create a role first before adding a member.' : 'الرجاء إنشاء دور أولاً قبل إضافة عضو.'}
              </p>
            )}
          </div>
        ) : (
          /* Manage Roles Form */
          <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200">
            <h2 className={`text-lg font-bold text-gray-900 ${isEnglish ? 'text-left' : 'text-right'}`}>
              {editingRoleUuid ? (isEnglish ? 'Edit Role' : 'تعديل الدور') : (isEnglish ? 'Create New Role' : 'بيانات الدور الجديد')}
            </h2>
            
            <div className={`flex flex-col gap-2 ${isEnglish ? 'text-left' : 'text-right'} max-w-md`}>
              <label className="text-sm font-bold text-gray-700">{isEnglish ? 'Role Name' : 'اسم الدور'}</label>
              <input 
                type="text" 
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder={isEnglish ? "e.g. Sales Manager" : "مثال: مدير المبيعات"} 
                className={`w-full h-12 px-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#EB682C] ${isEnglish ? 'text-left' : 'text-right'} bg-gray-50/50`}
              />
            </div>

            <div className="mt-4 border-t border-gray-50 pt-6">
              <h3 className={`text-md font-bold text-gray-900 mb-2 ${isEnglish ? 'text-left' : 'text-right'}`}>
                {isEnglish ? "Granted Permissions" : "الصلاحيات الممنوحة"}
              </h3>
              <p className={`text-sm text-gray-500 mb-6 ${isEnglish ? 'text-left' : 'text-right'}`}>
                {isEnglish ? "Select the permissions this role will have." : "اختر الصلاحيات التي سيحصل عليها هذا الدور."}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8" dir={isEnglish ? 'ltr' : 'rtl'}>
                {permissionsList.map(perm => (
                  <label key={perm.key} className={`flex items-center gap-3 cursor-pointer ${isEnglish ? 'flex-row' : 'flex-row-reverse justify-end'}`}>
                    <span className="text-sm text-gray-700 font-medium">{perm.label}</span>
                    <div className={`w-5 h-5 rounded border ${checkedPermissions[perm.key] ? 'bg-[#2A5CBA] border-[#2A5CBA]' : 'border-gray-300'} flex items-center justify-center transition-colors shrink-0`}>
                      {checkedPermissions[perm.key] && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={!!checkedPermissions[perm.key]}
                      onChange={() => handlePermissionToggle(perm.key)}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className={`flex ${isEnglish ? 'justify-end' : 'justify-start'} mt-4 gap-4`}>
              {editingRoleUuid && (
                <button 
                  onClick={handleCancelEditRole}
                  disabled={creatingRole}
                  className="w-full md:w-auto bg-gray-100 text-gray-700 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-200 transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  {isEnglish ? 'Cancel' : 'إلغاء'}
                </button>
              )}
              <button 
                onClick={handleSaveRole}
                disabled={creatingRole}
                className="w-full md:w-auto bg-[#EB682C] text-white px-10 py-3.5 rounded-xl font-bold hover:bg-[#d65a22] transition-colors whitespace-nowrap disabled:opacity-50"
              >
                {creatingRole ? (isEnglish ? 'Saving...' : 'جاري الحفظ...') : (editingRoleUuid ? (isEnglish ? 'Update Role' : 'تحديث الدور') : (isEnglish ? 'Create Role' : 'إنشاء الدور'))}
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Dynamic List Section (Members or Roles) */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
        <h2 className={`text-lg font-bold text-gray-500 mb-8 ${isEnglish ? 'text-left' : 'text-right'}`}>
          {activeTab === "member" ? (isEnglish ? 'Members' : 'الأعضاء') : (isEnglish ? 'Available Roles' : 'الأدوار المتاحة')}
        </h2>
        
        <div className="flex flex-col gap-6">
          {loading ? (
             <div className="py-8 text-center text-gray-500 font-bold">{isEnglish ? 'Loading...' : 'جاري التحميل...'}</div>
          ) : activeTab === "member" ? (
            /* Members List */
            teamMembers.length === 0 ? (
               <div className="py-8 text-center text-gray-500 font-bold">{isEnglish ? 'No members found.' : 'لا يوجد أعضاء.'}</div>
            ) : teamMembers.map((member, idx) => (
              <div key={member.uuid || idx}>
                <div className={`flex  flex-col ${isEnglish ? 'md:flex-row' : 'md:flex-row-reverse'} justify-between items-center gap-4`}>
                  
                  {/* Left side (Role) */}
                  <div className={`w-full md:w-auto flex ${isEnglish ? 'justify-end' : 'justify-start'}`}>
                    {roles.length > 0 ? (
                      <div className="relative">
                        <select
                          value={member.role?.uuid || ""}
                          onChange={(e) => handleRoleChange(member.uuid, e.target.value)}
                          className={`appearance-none flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-900 px-4 py-2 pr-8 pl-8 rounded-lg w-full md:w-auto text-sm font-bold focus:outline-none cursor-pointer ${isEnglish ? 'text-left' : 'text-right'}`}
                        >
                          <option value="" disabled>{member.role?.name || (isEnglish ? 'Member' : 'عضو')}</option>
                          {roles.map(r => (
                            <option key={r.uuid} value={r.uuid}>{r.name}</option>
                          ))}
                        </select>
                        <ChevronDown className={`w-4 h-4 text-orange-400 absolute ${isEnglish ? 'right-2' : 'left-2'} top-1/2 -translate-y-1/2 pointer-events-none`} />
                        <Shield className={`w-4 h-4 text-orange-400 absolute ${isEnglish ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 pointer-events-none`} />
                      </div>
                    ) : (
                      <div className={`flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-900 px-4 py-2 rounded-lg w-full md:w-auto ${isEnglish ? 'justify-start md:justify-end' : 'justify-end md:justify-start'}`}>
                        <Shield className="w-4 h-4 text-orange-400" />
                        <span className="text-sm font-bold">{member.role?.name || (isEnglish ? 'Member' : 'عضو')}</span>
                      </div>
                    )}
                  </div>

                  {/* Right side (Profile info) */}
                  <div className={`flex items-center ${isEnglish ? 'flex-row' : 'flex-row-reverse'} gap-4 ${isEnglish ? 'text-left' : 'text-right'} w-full md:w-auto`}>
                    <div>
                      <div className={`flex ${isEnglish ? 'justify-start' : 'justify-start'} items-center gap-2 mb-1`}>
                        <h3 className="font-bold text-gray-900">{member.name || (member.email ? member.email.split('@')[0] : '')}</h3>
                      </div>
                      <p className="text-sm text-gray-400">{member.email}</p>
                    </div>
                    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center bg-gray-50">
                      {member.avatar ? (
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl font-bold text-gray-400 uppercase">
                          {(member.name || member.email || '?').charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>

                </div>
                
                {/* Divider except for last item */}
                {idx < teamMembers.length - 1 && (
                  <div className="w-full h-px bg-gray-50 my-6"></div>
                )}
              </div>
            ))
          ) : (
            /* Roles List */
            roles.length === 0 ? (
               <div className="py-8 text-center text-gray-500 font-bold">{isEnglish ? 'No roles found.' : 'لا توجد أدوار.'}</div>
            ) : roles.map((role, idx) => (
              <div key={role.uuid}>
                <div className={`flex flex-col ${isEnglish ? 'md:flex-row' : 'md:flex-row-reverse'} justify-between items-center gap-4`}>
                  
                  {/* Left side (Actions) */}
                  <div className={`w-full md:w-auto flex items-center gap-2 ${isEnglish ? 'justify-end' : 'justify-start'}`}>
                    <button 
                      onClick={() => handleEditRole(role)}
                      className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#2A5CBA] px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span className="text-sm font-bold">{isEnglish ? 'Edit' : 'تعديل'}</span>
                    </button>
                    <button 
                      onClick={() => handleDeleteRole(role.uuid)}
                      className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm font-bold">{isEnglish ? 'Delete' : 'حذف'}</span>
                    </button>
                  </div>

                  {/* Right side (Role info) */}
                  <div className={`flex items-center ${isEnglish ? 'flex-row' : 'flex-row-reverse'} gap-4 ${isEnglish ? 'text-left' : 'text-right'} w-full md:w-auto`}>
                    <div>
                      <div  className={`flex ${isEnglish ? 'justify-start' : 'justify-end'} items-center gap-2 mb-1`}>
                        <h3 className="font-bold text-gray-900">{role.name}</h3>
                      </div>
                      <p className="text-sm text-gray-400">
                        {isEnglish ? `${role.team_members_count || 0} Members assigned` : `${role.team_members_count || 0} عضو معين`}
                      </p>
                    </div>
                    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center bg-orange-50 text-[#EB682C]">
                      <Shield className="w-6 h-6" />
                    </div>
                  </div>

                </div>
                
                {/* Divider except for last item */}
                {idx < roles.length - 1 && (
                  <div className="w-full h-px bg-gray-50 my-6"></div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <Popup
        isOpen={popupState.isOpen}
        type={popupState.type}
        title={popupState.title}
        message={popupState.message}
        onConfirm={popupState.onConfirm}
        onCancel={() => setPopupState({ ...popupState, isOpen: false })}
      />
    </div>
  );
}
