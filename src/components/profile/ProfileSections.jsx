"use client";
import { useState } from "react";
import { MapPin } from "lucide-react";
import ProductDetailsPopup from "./ProductDetailsPopup";
import { useLanguage } from "@/context/LanguageContext";

export default function ProfileSections({ supplier }) {
  const { isEnglish } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const bio = supplier?.company_profile?.bio || (isEnglish ? "No additional company information available." : "لا توجد معلومات إضافية عن الشركة.");
  const locationText = supplier?.company_profile?.location || (isEnglish ? "Location not specified" : "الموقع غير محدد");
  const mapLink = supplier?.company_profile?.google_maps_link || "#";
  const facebook = supplier?.socials?.facebook;
  const instagram = supplier?.socials?.instagram;
  const snapchat = supplier?.socials?.snapchat;
  const tiktok = supplier?.socials?.tiktok;
  const brands = supplier?.brands || [];
  const products = supplier?.products || [];
  const services = supplier?.services || [];
  const equipments = supplier?.equipments || [];

  return (
    <div className="w-full bg-[#F8FAFC] pb-24 mt-10 px-6 md:px-24" dir={isEnglish ? "ltr" : "rtl"} data-aos="fade-up">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
        
        {/* Section 1: Company Information */}
        <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className={`text-xl font-bold text-[#2A5CBA] mb-4 font-tajawal ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? "Company Information" : "معلومات عن الشركة"}</h2>
          <p className="text-gray-600 text-sm leading-loose">
            {bio}
          </p>
        </section>

        {/* Section 2: Location and Socials */}
        <section className={`flex ${isEnglish ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-6`}>
          {/* Socials */}
          {(facebook || instagram || snapchat || tiktok) && (
            <div className={`flex-1 bg-white border border-gray-100 rounded-2xl p-3 shadow-sm flex flex-col ${isEnglish ? 'items-start' : 'items-start'} justify-center`}>
              <h2 className={`text-xl font-bold text-[#2A5CBA] mb-6 font-tajawal ${isEnglish ? 'text-left w-full' : 'text-right w-full'}`}>{isEnglish ? "Social Media" : "التواصل الاجتماعي"}</h2>
              <div className="flex items-center gap-4">
                {facebook && (
                  <a href={facebook} target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#EB682C] text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                  </a>
                )}
                {instagram && (
                  <a href={instagram} target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#EB682C] text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                )}
                {snapchat && (
                  <a href={snapchat} target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#EB682C] text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.015 0c-3.153 0-5.467 1.93-5.467 4.673 0 1.25.753 2.502 1.976 3.428-1.468.204-3.136.141-4.708-.433-.615-.226-.889-.047-1.02.164-.266.425.295 1.542 1.636 2.593 1.096.86 2.52 1.488 4.041 1.764-1.298 1.144-2.81 2.254-4.512 3.32-.423.264-.476.621-.301.905.275.449 1.109.524 2.26.19 2.01-.58 4.256-1.745 6.448-3.322.253.153.513.3.778.441-.122 1.222-1.01 2.37-2.612 3.467-.349.239-.333.606-.118.887.275.36 1.065.342 2.148-.052 1.544-.563 3.013-1.631 4.394-3.238 1.381 1.607 2.85 2.675 4.394 3.238 1.083.394 1.873.412 2.148.052.215-.281.231-.648-.118-.887-1.602-1.097-2.49-2.245-2.612-3.467.265-.141.525-.288.778-.441 2.192 1.577 4.438 2.742 6.448 3.322 1.151.334 1.985.259 2.26-.19.175-.284.122-.641-.301-.905-1.702-1.066-3.214-2.176-4.512-3.32 1.521-.276 2.945-.904 4.041-1.764 1.341-1.051 1.902-2.168 1.636-2.593-.131-.211-.405-.39-1.02-.164-1.572.574-3.24.637-4.708.433 1.223-.926 1.976-2.178 1.976-3.428C17.482 1.93 15.168 0 12.015 0z"/></svg>
                  </a>
                )}
                {tiktok && (
                  <a href={tiktok} target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#EB682C] text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.13 4.48-2.92 5.91-1.7 1.36-4.04 1.83-6.14 1.25-2.58-.7-4.47-3.04-4.83-5.69-.36-2.62.77-5.32 2.87-6.83 1.79-1.29 4.15-1.55 6.18-.73.13.06.26.13.39.19v4.28c-.34-.14-.7-.24-1.07-.3-1.18-.18-2.45.02-3.37.78-.96.79-1.4 2.1-1.14 3.3.26 1.17 1.27 2.14 2.45 2.37 1.24.24 2.61-.06 3.5-1.03.95-1.02 1.31-2.49 1.28-3.92-.04-4.99-.02-9.98-.02-14.97-.01-.31-.01-.63-.02-.95z"/></svg>
                  </a>
                )}
              </div>
            </div>
          )}
          
          {/* Location */}
          <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-3 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
             <h2 className={`text-xl font-bold text-[#2A5CBA] mb-4 font-tajawal relative z-10 w-full ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? "Company Location" : "موقع الشركة"}</h2>
             <div className="flex items-center justify-between gap-2 mb-4 relative z-10 w-full text-sm text-gray-600">
               <div className="flex items-center gap-1">
                 <MapPin className="w-5 h-5 text-green-600 shrink-0" />
                 <span>{locationText}</span>
               </div>
               
               <div className="w-[40%] h-[80px] bg-gray-200 rounded-xl overflow-hidden relative border border-gray-300 shrink-0">
                 <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" alt="Map" className="w-full h-full object-cover opacity-50" />
                 <div className="absolute inset-0 flex items-center justify-center">
                   {mapLink && mapLink !== "#" ? (
                     <a href={mapLink} target="_blank" rel="noreferrer" className="bg-[#EB682C] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md hover:bg-orange-600 transition-colors">
                       {isEnglish ? "Location on Map" : "الموقع على الخريطة"}
                     </a>
                   ) : (
                     <button className="bg-gray-400 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md cursor-not-allowed">
                       {isEnglish ? "Map not available" : "الخريطة غير متوفرة"}
                     </button>
                   )}
                 </div>
               </div>
             </div>
          </div>
        </section>

        {/* Section 3: Brands */}
        {brands && brands.length > 0 && (
          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className={`text-xl font-bold text-[#2A5CBA] mb-6 font-tajawal ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? "Brands" : "العلامات التجارية"}</h2>
            <div className="flex flex-wrap items-center gap-6">
              {brands.map(brand => (
                <div key={brand.id} className="font-bold text-lg text-gray-800 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                  {brand.brand_name}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Products */}
        {products && products.length > 0 && (
          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className={`text-xl font-bold text-[#2A5CBA] mb-6 font-tajawal ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? "Products" : "المنتجات"}</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              {products.map((product) => (
                <div key={product.uuid} className="flex flex-col md:flex-row items-start gap-6 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-full md:w-48 h-32 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                    {product.images && product.images.length > 0 ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain p-2 mix-blend-multiply" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">{isEnglish ? "No image" : "لا توجد صورة"}</div>
                    )}
                  </div>
                  <div className={`flex-1 ${isEnglish ? 'text-left' : 'text-right'}`}>
                    <h3 className="font-bold text-gray-900 text-lg mb-1 font-tajawal">{product.name}</h3>
                    {product.model && <p className="text-gray-500 text-sm mb-2">{isEnglish ? "Model:" : "موديل:"} {product.model}</p>}
                    <p className="text-gray-500 text-xs mb-4 line-clamp-2">{product.description || (isEnglish ? "No description" : "لا يوجد وصف")}</p>
                    <div className={`flex flex-wrap items-center justify-between gap-4 mt-auto ${isEnglish ? 'flex-row' : 'flex-row'}`}>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{product.price ? `${product.price} ${isEnglish ? "SAR" : "ريال"}` : (isEnglish ? "Price not specified" : "السعر غير محدد")}</span>
                      </div>
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="bg-[#EB682C] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-[#d65a22] transition-colors"
                      >
                        {isEnglish ? "View Details" : "عرض التفاصيل"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 6: Services */}
        {services && services.length > 0 && (
          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className={`text-xl font-bold text-[#2A5CBA] mb-6 font-tajawal ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? "Services" : "الخدمات"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, idx) => (
                <div key={idx} className={`flex ${isEnglish ? 'flex-row' : 'flex-row-reverse'} items-start gap-4 p-4 border border-gray-50 rounded-xl`}>
                  <div className={`flex-1 ${isEnglish ? 'text-left' : 'text-right'}`}>
                    <h3 className="font-bold text-gray-900 text-base mb-2 font-tajawal">{service.name}</h3>
                    <p className="text-gray-500 text-xs mb-4 leading-relaxed line-clamp-2">{service.description || (isEnglish ? "No description for service" : "لا يوجد وصف للخدمة")}</p>
                    <button className="w-full bg-[#EB682C] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#d65a22] transition-colors">
                      {isEnglish ? "Request Pricing" : "طلب عرض تسعير"}
                    </button>
                  </div>
                  <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                    {service.images && service.images.length > 0 ? (
                      <img src={service.images[0]} alt={service.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">{isEnglish ? "No image" : "لا صورة"}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 7: Equipments */}
        {equipments && equipments.length > 0 && (
          <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className={`text-xl font-bold text-[#2A5CBA] mb-6 font-tajawal ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? "Equipment" : "المعدات"}</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              {equipments.map((equipment) => (
                <div key={equipment.uuid || equipment.id} className="flex flex-col md:flex-row items-start gap-6 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-full md:w-48 h-32 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                    {equipment.images && equipment.images.length > 0 ? (
                      <img src={equipment.images[0]} alt={equipment.name} className="w-full h-full object-contain p-2 mix-blend-multiply" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">{isEnglish ? "No image" : "لا توجد صورة"}</div>
                    )}
                  </div>
                  <div className={`flex-1 ${isEnglish ? 'text-left' : 'text-right'}`}>
                    <h3 className="font-bold text-gray-900 text-lg mb-1 font-tajawal">{equipment.name}</h3>
                    {equipment.model && <p className="text-gray-500 text-sm mb-2">{isEnglish ? "Model:" : "موديل:"} {equipment.model}</p>}
                    <p className="text-gray-500 text-xs mb-4 line-clamp-2">{equipment.description || (isEnglish ? "No description" : "لا يوجد وصف")}</p>
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{equipment.price ? `${equipment.price} ${isEnglish ? "SAR" : "ريال"}` : (isEnglish ? "Price not specified" : "السعر غير محدد")}</span>
                      </div>
                      <button className="bg-[#EB682C] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-[#d65a22] transition-colors">
                        {isEnglish ? "Request Equipment" : "طلب المعدة"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
      
      <ProductDetailsPopup 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct}
        supplierId={supplier?.uuid || supplier?.id}
      />
    </div>
  );
}
