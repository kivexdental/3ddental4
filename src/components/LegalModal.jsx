import React, { useState, useEffect } from 'react';
import { X, Shield, FileText, AlertTriangle, Cookie, CalendarCheck } from 'lucide-react';

export default function LegalModal({ isOpen, onClose, initialTab = 'disclaimer' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'disclaimer', label: 'Medical Disclaimer', icon: AlertTriangle },
    { id: 'privacy', label: 'Privacy Policy', icon: Shield },
    { id: 'terms', label: 'Terms of Service', icon: FileText },
    { id: 'cookies', label: 'Cookie Policy', icon: Cookie },
    { id: 'appointment', label: 'Appointment Policy', icon: CalendarCheck },
  ];

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-all"
    >
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0066FF]">
              LEGAL & CLINICAL COMPLIANCE
            </span>
            <h3 id="legal-modal-title" className="text-lg font-extrabold text-[#0A192F]">
              Patient Transparency & Policies
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close legal policy dialog"
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 px-4 bg-white overflow-x-auto no-scrollbar gap-2 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-[#0066FF] border border-blue-200/60'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Policy Content */}
        <div className="p-6 overflow-y-auto text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed max-h-[55vh]">
          {activeTab === 'disclaimer' && (
            <div>
              <h4 className="text-base font-bold text-[#0A192F] mb-2">Medical & Dental Examination Disclaimer</h4>
              <p>
                The information provided on this website (including text, graphics, 3D anatomical animations, before/after case showcases, and educational descriptions) is published strictly for informational, educational, and preview demonstration purposes.
              </p>
              <p className="mt-2 font-semibold text-slate-800">
                This website does not provide formal medical diagnosis, individualized treatment plans, or clinical guarantees.
              </p>
              <p className="mt-2">
                An oral health evaluation, volumetric CBCT scan, and clinical diagnosis by a licensed dental professional are strictly required before any restorative, surgical implant, or orthodontic treatment can be prescribed or undertaken.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div>
              <h4 className="text-base font-bold text-[#0A192F] mb-2">Patient Privacy Statement</h4>
              <p>
                DENTALCARE Clinic is committed to safeguarding patient privacy. As a public-facing website, this portal does not store sensitive personal electronic health records (EHR) or private dental charts online.
              </p>
              <p className="mt-2">
                When you submit appointment inquiry details via our showcase forms, information is processed solely for scheduling communication. We do not sell, rent, or distribute personal contact information to third-party advertisers.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div>
              <h4 className="text-base font-bold text-[#0A192F] mb-2">Terms of Service</h4>
              <p>
                By accessing this website, you agree to comply with all applicable local, national, and healthcare regulatory guidelines. Website graphics, 3D dental models, and custom clinical copy are protected intellectual property.
              </p>
              <p className="mt-2">
                Use of this site is provided on an "as is" and "as available" basis without express warranties regarding uninterrupted availability.
              </p>
            </div>
          )}

          {activeTab === 'cookies' && (
            <div>
              <h4 className="text-base font-bold text-[#0A192F] mb-2">Cookie & Local Storage Policy</h4>
              <p>
                This website uses essential browser storage strictly for functional UI preferences, such as remembering your preview viewport setting and accessibility preferences (e.g. reduced-motion preferences).
              </p>
              <p className="mt-2">
                We do not employ intrusive cross-site tracking cookies. You may disable cookies in your browser settings at any time without impacting core informational browsing.
              </p>
            </div>
          )}

          {activeTab === 'appointment' && (
            <div>
              <h4 className="text-base font-bold text-[#0A192F] mb-2">Appointment & Cancellation Policy</h4>
              <p>
                We value your time and allocate dedicated operatory suites for every scheduled patient. For confirmed clinical visits, we kindly request at least 24 hours advance notice for cancellations or rescheduling.
              </p>
              <p className="mt-2 font-semibold text-[#0066FF]">
                Showcase Note: The online appointment form on this website functions as a demonstration workflow and does not initiate legally binding clinical commitments without telephone confirmation.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 flex justify-end bg-slate-50">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
