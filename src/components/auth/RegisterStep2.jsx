export default function RegisterStep2({ accountType, setAccountType, onNext }) {
  const types = [
    "شركات التصنيع",
    "شركات التوريد",
    "شركات المقاولات",
    "مقاولات خدمات وتأجير معدات",
    "مكاتب الاستشارات الهندسية",
    "مقاول من الباطن",
    "مهندس"
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#EB682C] mb-3">اختر نوع حسابك لتكملة بياناتك</h1>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setAccountType(type)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
              accountType === type 
                ? "bg-[#2A5CBA] text-white border-[#2A5CBA]" 
                : "bg-white text-gray-600 border-gray-200 hover:border-[#2A5CBA] hover:text-[#2A5CBA]"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <button 
        onClick={onNext}
        disabled={!accountType}
        className="w-full bg-[#EB682C] text-white py-3.5 rounded-xl font-bold hover:bg-[#d65a22] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        التالي
      </button>
    </div>
  );
}
