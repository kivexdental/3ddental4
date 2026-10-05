import React from 'react';
import { ShieldCheck, Cpu, Sparkles, ArrowRight, Award } from 'lucide-react';

export default function TechnologyBanner({ onBookClick }) {
  const highlights = [
    {
      title: 'Sub-Millimeter CBCT 3D Scanning',
      desc: 'Complete digital volumetric analysis with 90% less radiation exposure than traditional radiography.'
    },
    {
      title: 'Precision Guided Surgical Implants',
      desc: 'Computer-guided placement ensures biological integration and aesthetic symmetry.'
    },
    {
      title: 'Same-Day Monolithic Crowns',
      desc: 'High-strength biocompatible zirconia crafted right in our clinical operatory suite.'
    }
  ];

  return (
    <section className="relative w-full bg-white py-24 px-6 sm:px-12 border-t border-slate-100 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#0066FF] uppercase">
                CLINICAL EXCELLENCE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0A192F] leading-tight">
              Where Dental Science<br />Meets Human Artistry
            </h2>
          </div>
          <p className="text-base text-slate-600 max-w-md leading-relaxed">
            Every procedure is backed by peer-reviewed clinical protocols, high-magnification dental microscopy, and genuine patient-first comfort.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {highlights.map((h, i) => (
            <div key={i} className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200/80 hover:border-blue-500/40 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-[#0066FF] flex items-center justify-center font-bold text-sm mb-5">
                0{i + 1}
              </div>
              <h3 className="text-lg font-bold text-[#0A192F] mb-2">{h.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>

        {/* Action Callout */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0A192F] to-[#1E293B] p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
              PRIORITY CONSULTATIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mt-1">Ready to transform your smile?</h3>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-lg">
              Book a comprehensive 3D diagnostic evaluation today with our senior dental surgical team.
            </p>
          </div>
          <button
            onClick={onBookClick}
            className="flex items-center gap-2 px-8 py-4 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold rounded-full shadow-lg shadow-blue-500/30 transition-all transform active:scale-95 shrink-0 cursor-pointer"
          >
            <span>Book Appointment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
