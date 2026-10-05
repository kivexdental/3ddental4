import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function AboutScene({ onLearnMore }) {
  return (
    <div className="w-full max-w-xl text-left select-none">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 mb-3">
        <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-slate-500 uppercase">
          ABOUT US
        </span>
      </div>

      {/* Main Heading */}
      <h2 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold tracking-tight text-[#0A192F] leading-[1.12] mb-6">
        Expert Care<br />
        for <span className="text-[#0066FF] text-glow-blue">Every Smile</span>
      </h2>

      {/* Supporting Copy */}
      <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-md mb-8">
        From the smallest details to complete smile care, we focus on your comfort, health and long-lasting results.
      </p>

      {/* Blue Text CTA Link */}
      <div>
        <button
          onClick={onLearnMore}
          className="group inline-flex items-center gap-2.5 text-[#0066FF] hover:text-[#0052CC] font-semibold text-base sm:text-lg transition-colors duration-200 cursor-pointer"
        >
          <span>Learn more about us</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1.5" />
        </button>
      </div>
    </div>
  );
}
