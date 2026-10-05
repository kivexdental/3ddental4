import React from 'react';

/**
 * Vertical Section Indicator matching Figma design:
 * Top number (01, 02, 03, 04) + vertical dots tracking active frame.
 */
export default function SectionIndicator({ activeSection = 1, onSelectSection }) {
  const sections = [
    { id: 1, label: '01', anchor: 0 },
    { id: 2, label: '02', anchor: 18 },
    { id: 3, label: '03', anchor: 80 },
    { id: 4, label: '04', anchor: 90 },
  ];

  const formattedNum = String(activeSection).padStart(2, '0');

  return (
    <div className="fixed right-6 sm:right-10 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3 select-none">
      {/* Dynamic Active Number */}
      <span className="text-xs sm:text-sm font-bold tracking-widest text-[#0A192F] transition-all duration-300">
        {formattedNum}
      </span>

      {/* Capsule Container for Vertical Dots */}
      <div className="w-5 py-4 px-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-md flex flex-col items-center gap-3">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection && onSelectSection(sec.anchor)}
              title={`Jump to Section ${sec.label}`}
              className="group relative flex items-center justify-center p-1 cursor-pointer focus:outline-none"
            >
              <span
                className={`w-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'h-4 bg-[#0066FF] shadow-sm shadow-blue-500/50'
                    : 'h-1.5 bg-slate-300 group-hover:bg-slate-400 group-hover:scale-125'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
