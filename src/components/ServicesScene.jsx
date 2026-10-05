import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ServicesScene({ onSelectService }) {
  const services = [
    {
      id: 1,
      title: 'General Dentistry',
      desc: 'Routine checkups and preventive care.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 stroke-[#0066FF] fill-none stroke-2 stroke-linecap-round stroke-linejoin-round">
          <path d="M12 2C7.5 2 4.5 5.5 4.5 9.5C4.5 13.5 6 17.5 7.8 21.5C8.8 19 9.8 16.5 12 16.5C14.2 16.5 15.2 19 16.2 21.5C18 17.5 19.5 13.5 19.5 9.5C19.5 5.5 16.5 2.5 12 2.5Z" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Dental Implants',
      desc: 'Restore your smile with long-lasting solutions.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 stroke-[#0066FF] fill-none stroke-2 stroke-linecap-round stroke-linejoin-round">
          <circle cx="12" cy="7" r="4" />
          <path d="M9 11v4" />
          <path d="M15 11v4" />
          <path d="M10 15h4" />
          <path d="M12 15v6" />
          <path d="M10 19h4" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Orthodontics',
      desc: 'Straighten your teeth with modern treatments.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 stroke-[#0066FF] fill-none stroke-2 stroke-linecap-round stroke-linejoin-round">
          <rect x="3" y="6" width="18" height="12" rx="3" />
          <path d="M3 12h18" />
          <path d="M7 6v12" />
          <path d="M12 6v12" />
          <path d="M17 6v12" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Cosmetic Dentistry',
      desc: 'Enhance your smile with aesthetic treatments.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 stroke-[#0066FF] fill-none stroke-2 stroke-linecap-round stroke-linejoin-round">
          <path d="M12 3L14 9L20 11L14 13L12 19L10 13L4 11L10 9Z" />
        </svg>
      )
    },
    {
      id: 5,
      title: 'Root Canal Treatment',
      desc: 'Save your natural teeth with advanced care.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 stroke-[#0066FF] fill-none stroke-2 stroke-linecap-round stroke-linejoin-round">
          <path d="M12 2C8 2 5 6 5 10c0 4 2 8 3.5 12 1-2.5 1.5-5 3.5-5s2.5 2.5 3.5 5c1.5-4 3.5-8 3.5-12 0-4-3-8-7-8z" />
          <path d="M12 6v5" />
          <path d="M10 13l2 2 2-2" />
        </svg>
      )
    },
    {
      id: 6,
      title: 'Teeth Whitening',
      desc: 'Brighter smiles with safe procedures.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 stroke-[#0066FF] fill-none stroke-2 stroke-linecap-round stroke-linejoin-round">
          <path d="M12 2C7.5 2 4.5 5.5 4.5 9.5C4.5 13.5 6 17.5 7.8 21.5C8.8 19 9.8 16.5 12 16.5C14.2 16.5 15.2 19 16.2 21.5C18 17.5 19.5 13.5 19.5 9.5C19.5 5.5 16.5 2.5 12 2.5Z" />
          <path d="M18 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" className="fill-[#0066FF] stroke-none" />
        </svg>
      )
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 select-none max-h-[85vh] overflow-y-auto no-scrollbar py-6">
      {/* Top Header Row: Left Title + Right Description */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div>
          <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.2em] text-white/90 uppercase drop-shadow-sm">
            OUR SERVICES
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mt-1 drop-shadow-md">
            Complete Dental Care<br className="hidden sm:inline" /> Under One Roof
          </h2>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-white/90 font-medium max-w-md leading-relaxed drop-shadow-sm">
          From preventive care to advanced treatments, we offer comprehensive dental services for all ages.
        </p>
      </div>

      {/* 6 Frosted Bento Cards in Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 grid-flow-dense">
        {services.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectService && onSelectService(item.title)}
            className="group relative bg-white/70 hover:bg-white/85 backdrop-blur-xl border border-white/85 hover:border-white rounded-2xl p-4 sm:p-6 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Card Top: Icon + Arrow Button */}
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/90 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  {item.icon}
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 shadow-sm flex items-center justify-center text-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white transition-all duration-200">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-[#0A192F] mb-1 group-hover:text-[#0066FF] transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
