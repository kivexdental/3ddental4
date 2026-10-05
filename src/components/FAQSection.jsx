import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What makes 3D guided implant surgery different from traditional implants?',
      a: 'Computer-guided implant surgery utilizes pre-operative high-resolution 3D CBCT imaging to create a sub-millimeter surgical stent. This eliminates guesswork, minimizes surgical incisions, significantly reduces postoperative swelling, and enables precision aesthetic crown placement.'
    },
    {
      q: 'Is the 3D CBCT diagnostic scan safe for routine evaluation?',
      a: 'Yes. Our cutting-edge cone beam CT scanner uses ultra-low dose pulsed radiation protocols, emitting up to 90% less radiation than standard hospital CT units while providing 360-degree volumetric bone and nerve mapping.'
    },
    {
      q: 'Do you offer painless sedation options for anxious patients?',
      a: 'Absolutely. We provide gentle local anesthesia with computer-assisted delivery, mild nitrous oxide inhalation, and conscious oral sedation to ensure complete anxiety-free comfort throughout your visit.'
    },
    {
      q: 'How quickly can custom crowns or veneers be designed and placed?',
      a: 'With our in-office CAD/CAM digital scanners and high-precision milling unit, single monolithic zirconia crowns and ceramic restorations can often be crafted, glazed, and permanently bonded in just 1 to 2 clinical visits.'
    },
    {
      q: 'What dental insurance plans and financing options are accepted?',
      a: 'We accept most major PPO dental insurance providers and submit all claims electronically on your behalf. For out-of-pocket balances, we partner with flexible 0% interest healthcare financing options like CareCredit.'
    },
    {
      q: 'How do you handle urgent dental emergencies?',
      a: 'Our clinic maintains an on-call emergency dental triage line for patients experiencing acute dental pain, facial trauma, or dislodged restorations, with reserved emergency slots available daily.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="relative w-full bg-white py-20 px-4 sm:px-8 lg:px-12 border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14 select-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0066FF] text-xs font-bold tracking-widest uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>PATIENT QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0A192F] leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Everything you need to know about our advanced 3D procedures, safety protocols, and patient care.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `faq-content-${idx}`;
            const headerId = `faq-header-${idx}`;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/90 overflow-hidden bg-[#F8FAFC] transition-colors"
              >
                <button
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0A192F] hover:text-[#0066FF] transition-colors cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#0066FF]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className="px-5 sm:px-7 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-200"
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
