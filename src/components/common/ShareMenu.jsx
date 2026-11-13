"use client";
import { useState, useEffect, useRef } from "react";
import { Share2, Mail, Link2, Check } from "lucide-react";
import { FaWhatsapp, FaXTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { useLanguage } from "@/context/LanguageContext";

/**
 * ShareMenu - Interactive sharing dropdown matching platform colors & user reference.
 * Supports: WhatsApp, X (Twitter), Facebook, LinkedIn, Email, and Copy Link.
 */
export default function ShareMenu({
  title = "",
  description = "",
  url = "",
  align = "auto", // "auto" | "start" | "end"
  direction = "up", // "up" | "down"
  variant = "button", // "button" | "inline" | "icon"
  className = "",
  showColon = false,
}) {
  const { isEnglish } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Compute final full URL to share
  const getFullShareUrl = () => {
    if (typeof window === "undefined") return url || "https://prosental.com";
    if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
      return url;
    }
    if (url) {
      return `${window.location.origin}${url.startsWith("/") ? "" : "/"}${url}`;
    }
    return window.location.href;
  };

  const shareText = title ? `${title}` : (isEnglish ? "Check this out on Prosental" : "تصفح هذا العرض على منصة بروسنتال");

  const handleShareClick = (platform, e) => {
    e.preventDefault();
    e.stopPropagation();

    const fullUrl = getFullShareUrl();
    const encodedUrl = encodeURIComponent(fullUrl);
    const encodedText = encodeURIComponent(shareText);

    let shareLink = "";

    switch (platform) {
      case "whatsapp":
        shareLink = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
        break;
      case "x":
        shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "email":
        shareLink = `mailto:?subject=${encodedText}&body=${encodeURIComponent(
          (description ? `${description}\n\n` : "") + fullUrl
        )}`;
        break;
      case "copy":
        if (navigator?.clipboard?.writeText) {
          navigator.clipboard.writeText(fullUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
          }).catch(() => {
            // Fallback for older browsers
            const textarea = document.createElement("textarea");
            textarea.value = fullUrl;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
          });
        }
        return;
      default:
        break;
    }

    if (shareLink) {
      window.open(shareLink, "_blank", "noopener,noreferrer,width=650,height=550");
      setIsOpen(false);
    }
  };

  const shareOptions = [
    {
      id: "facebook",
      label: "Facebook",
      icon: FaFacebookF,
      bg: "bg-[#1877F2]",
      hoverBg: "hover:bg-[#1877F2]/10",
      textColor: "text-[#1877F2]",
    },
    {
      id: "x",
      label: "X",
      icon: FaXTwitter,
      bg: "bg-black",
      hoverBg: "hover:bg-black/10",
      textColor: "text-gray-900",
    },
    {
      id: "email",
      label: isEnglish ? "Email" : "Email",
      icon: Mail,
      bg: "bg-[#EB682C]",
      hoverBg: "hover:bg-[#EB682C]/10",
      textColor: "text-[#EB682C]",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: FaLinkedinIn,
      bg: "bg-[#0A66C2]",
      hoverBg: "hover:bg-[#0A66C2]/10",
      textColor: "text-[#0A66C2]",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: FaWhatsapp,
      bg: "bg-[#25D366]",
      hoverBg: "hover:bg-[#25D366]/10",
      textColor: "text-[#25D366]",
      highlight: true,
    },
    {
      id: "copy",
      label: copied ? (isEnglish ? "Copied!" : "تم النسخ!") : (isEnglish ? "Copy Link" : "Copy Link"),
      icon: copied ? Check : Link2,
      bg: copied ? "bg-emerald-600" : "bg-[#2A5CBA]",
      hoverBg: copied ? "hover:bg-emerald-50" : "hover:bg-[#2A5CBA]/10",
      textColor: copied ? "text-emerald-600" : "text-[#2A5CBA]",
      active: copied,
    },
  ];

  // Alignment classes
  const getDropdownPos = () => {
    const isUp = direction === "up";
    const posVertical = isUp ? "bottom-full mb-2" : "top-full mt-2";
    
    let posHorizontal = "";
    if (align === "start") {
      posHorizontal = isEnglish ? "left-0" : "right-0";
    } else if (align === "end") {
      posHorizontal = isEnglish ? "right-0" : "left-0";
    } else {
      // Auto: center on trigger or fit within screen
      posHorizontal = isEnglish ? "left-0 md:-left-4" : "right-0 md:-right-4";
    }

    return `${posVertical} ${posHorizontal}`;
  };

  const labelText = isEnglish ? (showColon ? "Share:" : "Share") : (showColon ? "شارك:" : "شارك");

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-right select-none ${className}`}
      onClick={(e) => {
        // Prevent click bubbling to parent links or cards
        e.stopPropagation();
      }}
    >
      {/* Trigger Button */}
      {variant === "inline" ? (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-gray-700 hover:text-[#EB682C] transition-colors cursor-pointer group"
          title={isEnglish ? "Share" : "شارك"}
          aria-expanded={isOpen}
        >
          <Share2 className="w-4 h-4 text-gray-600 group-hover:text-[#EB682C] transition-colors" />
          <span>{labelText}</span>
        </button>
      ) : variant === "icon" ? (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-orange-50/50 hover:border-[#EB682C] text-gray-600 hover:text-[#EB682C] flex items-center justify-center transition-all shadow-xs cursor-pointer group"
          title={isEnglish ? "Share" : "شارك"}
          aria-expanded={isOpen}
        >
          <Share2 className="w-4 h-4 transition-transform group-hover:scale-110" />
        </button>
      ) : (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          className={`py-2.5 px-3 rounded-xl border border-gray-200 bg-white hover:bg-orange-50/50 hover:border-[#EB682C] text-gray-700 hover:text-[#EB682C] text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer group shrink-0 ${
            isOpen ? "border-[#EB682C] text-[#EB682C] ring-2 ring-[#EB682C]/10" : ""
          }`}
          title={isEnglish ? "Share" : "شارك"}
          aria-expanded={isOpen}
        >
          <Share2 className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#EB682C] transition-colors" />
          <span>{labelText}</span>
        </button>
      )}

      {/* Share Dropdown Popup */}
      {isOpen && (
        <div
          className={`absolute z-50 w-64 md:w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 transition-all animate-in fade-in zoom-in-95 duration-150 ${getDropdownPos()}`}
          dir="ltr" // Keeping social icons & labels aligned nicely as shown in reference
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-[#EB682C]" />
              {isEnglish ? "Share via" : "مشاركة عبر"}
            </span>
            {copied && (
              <span className="text-[11px] font-bold text-emerald-600 animate-in fade-in">
                {isEnglish ? "Link copied!" : "تم نسخ الرابط!"}
              </span>
            )}
          </div>

          {/* 2-Column Grid of Share Buttons (Matching Reference Image) */}
          <div className="grid grid-cols-2 gap-2">
            {shareOptions.map((opt) => {
              const IconComponent = opt.icon;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={(e) => handleShareClick(opt.id, e)}
                  className={`flex items-center gap-2 p-2 rounded-xl border border-gray-100 hover:border-gray-200 transition-all text-left group cursor-pointer ${
                    opt.active
                      ? "bg-emerald-50 border-emerald-200"
                      : "bg-white hover:bg-gray-50/80"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg ${opt.bg} flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-105`}
                  >
                    <IconComponent className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span
                    className={`text-xs font-bold truncate ${
                      opt.active ? "text-emerald-700" : "text-gray-700 group-hover:text-gray-950"
                    }`}
                  >
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

