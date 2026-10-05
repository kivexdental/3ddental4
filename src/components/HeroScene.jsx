import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

export default function HeroScene({ onBookClick, onExploreClick }) {
  return (
    <div className="w-full max-w-xl lg:max-w-2xl text-left select-none pt-12 sm:pt-0">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
        <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.2em] text-slate-500 uppercase">
          ADVANCED DENTAL CARE
        </span>
      </div>

      {/* Main Heading strictly 3 lines max */}
      <h1 className="text-3xl sm:text-5xl lg:text-[60px] font-extrabold tracking-tight text-[#0A192F] leading-[1.12] mb-4 sm:mb-5">
        A Healthier<br />
        Brighter Smile<br />
        <span className="text-[#0066FF] text-glow-blue">Starts Here</span>
      </h1>

      {/* Supporting Text */}
      <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed max-w-md mb-6 sm:mb-8">
        Expert dental care with modern technology for you and your family.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
        <button
          onClick={onBookClick}
          className="flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs sm:text-base font-semibold rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 transform active:scale-95 cursor-pointer"
        >
          <span>Book Appointment</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        <button
          onClick={onExploreClick}
          className="px-5 sm:px-7 py-2.5 sm:py-3.5 bg-white/90 hover:bg-white text-slate-800 text-xs sm:text-base font-semibold rounded-full border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 transform active:scale-95 cursor-pointer"
        >
          Explore Services
        </button>
      </div>

      {/* Statistics Row */}
      <div className="flex items-center gap-4 sm:gap-8 lg:gap-10 pt-4 border-t border-slate-200/60 max-w-lg">
        <div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0A192F] tracking-tight">10K+</div>
          <div className="text-[11px] sm:text-xs lg:text-sm font-medium text-slate-500 mt-0.5">Happy Patients</div>
        </div>

        <div className="h-7 sm:h-9 w-px bg-slate-200/80"></div>

        <div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0A192F] tracking-tight">15+</div>
          <div className="text-[11px] sm:text-xs lg:text-sm font-medium text-slate-500 mt-0.5">Years Experience</div>
        </div>

        <div className="h-7 sm:h-9 w-px bg-slate-200/80"></div>

        <div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0A192F] tracking-tight flex items-center gap-1 sm:gap-1.5">
            4.9 <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 stroke-amber-400 inline -mt-0.5" />
          </div>
          <div className="text-[11px] sm:text-xs lg:text-sm font-medium text-slate-500 mt-0.5">Patient Rating</div>
        </div>
      </div>
    </div>
  );
}
