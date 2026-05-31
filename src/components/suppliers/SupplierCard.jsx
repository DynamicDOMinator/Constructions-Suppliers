import Link from "next/link";

export default function SupplierCard({ id, status, title, category, description, city, isSubcontractor }) {
  // Determine badge color based on status
  let badgeColor = "bg-blue-500"; // default to متميز (Premium)
  if (status === "اساسي") badgeColor = "bg-[#EB682C]";
  if (status === "متقدم") badgeColor = "bg-[#4CAF50]";

  return (
    <Link href={`/suppliers/${id}`} className="block group">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col cursor-pointer" dir="rtl">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4 items-start">
            {/* Logo */}
            <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 shrink-0">
              <span className="font-bold text-gray-500 text-lg">SPC</span>
            </div>
            {/* Title & Category */}
            <div className="pt-1 text-right">
              <h3 className="font-bold text-gray-900 text-base">{title}</h3>
              <p className="text-gray-500 text-xs mt-1">{category}</p>
            </div>
          </div>
          
          {/* Status Badge */}
          <span className={`${badgeColor} text-white px-4 py-1 rounded-full text-xs font-bold shrink-0`}>
            {status}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-xs leading-relaxed mb-6 text-right">
          {description}
        </p>

        {/* Info Rows */}
        <div className="flex flex-col gap-3 mb-6 mt-auto">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">المدينة : المنطقة</span>
            <span className="font-bold text-gray-700">{city}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">مقاول من الباطن</span>
            <span className="font-bold text-gray-700">{isSubcontractor ? "1" : "0"}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-[#EB682C] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#d65a22] transition-colors">
          طلب تسعير
        </button>

      </div>
    </Link>
  );
}
