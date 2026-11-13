"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { ALL_COUNTRIES } from "@/lib/countries";

export default function CountryCodePicker({
  selectedCountry,
  onSelect,
  isEnglish = false,
  className = "",
}) {
  const [showCountries, setShowCountries] = useState(false);
  const countryPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryPickerRef.current && !countryPickerRef.current.contains(event.target)) {
        setShowCountries(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowCountries(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const country = selectedCountry || ALL_COUNTRIES[0];

  return (
    <div ref={countryPickerRef} className={`relative h-full shrink-0 ${className}`}>
      <button
        type="button"
        className={`h-full px-4 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors select-none ${
          isEnglish
            ? "border-r border-gray-200 rounded-l-xl"
            : "border-l border-gray-200 rounded-r-xl"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setShowCountries((prev) => !prev);
        }}
        aria-expanded={showCountries}
      >
        <span className="text-sm font-bold text-gray-700" dir="ltr">
          {country.code}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
            showCountries ? "rotate-180" : ""
          }`}
        />
        <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-100 flex items-center justify-center bg-gray-50 shrink-0">
          <img
            src={country.flagUrl}
            alt={country.name}
            className="w-full h-full object-cover"
          />
        </div>
      </button>

      {/* Dropdown Menu - Identical to Register */}
      {showCountries && (
        <div
          className={`absolute top-[108%] ${
            isEnglish ? "left-0" : "right-0"
          } w-52 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50 max-h-60 overflow-y-auto font-tajawal animate-in fade-in zoom-in-95 duration-150`}
        >
          {ALL_COUNTRIES.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between px-4 py-3 hover:bg-orange-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${
                country.code === item.code ? "bg-orange-50/70 font-bold" : ""
              }`}
              onClick={() => {
                onSelect(item);
                setShowCountries(false);
              }}
            >
              <span className="text-sm font-bold text-gray-700" dir="ltr">
                {item.code}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-700 font-medium">
                  {isEnglish ? item.nameEn : item.name}
                </span>
                <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                  <img
                    src={item.flagUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
