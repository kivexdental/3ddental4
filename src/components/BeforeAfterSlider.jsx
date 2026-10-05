import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, ArrowLeftRight, CheckCircle2 } from 'lucide-react';

/**
 * Interactive Before / After Smile Transformation Showcase
 * Fully touch-enabled, accessible keyboard slider, responsive split-screen.
 * Demonstrates clinical dental outcomes while preserving public-site boundaries.
 */
export default function BeforeAfterSlider({ onConsultClick }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  // Mouse handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    isDragging.current = true;
    updatePosition(e.clientX);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  // Touch handlers
  const handleTouchStart = (e) => {
    isDragging.current = true;
    updatePosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    updatePosition(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  // Keyboard accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPos((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <section className="relative w-full bg-[#F8FAFC] py-20 px-4 sm:px-8 lg:px-12 border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 select-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0066FF] text-xs font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CLINICAL TRANSFORMATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0A192F] leading-tight">
            Witness the Power of<br />
            <span className="text-[#0066FF]">Precision Smile Design</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Drag or slide to compare the pre-treatment baseline with the finished biocompatible monolithic restoration.
          </p>
        </div>

        {/* Split Comparison Frame */}
        <div className="relative max-w-4xl mx-auto bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-200/90">
          <div
            ref={containerRef}
            tabIndex={0}
            role="slider"
            aria-label="Before and after smile comparison slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPos)}
            onKeyDown={handleKeyDown}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] rounded-2xl overflow-hidden cursor-ew-resize select-none focus:outline-none focus:ring-4 focus:ring-blue-500/20"
          >
            {/* "AFTER" Layer (Full Background) */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 flex flex-col items-center justify-center p-6 text-white text-center">
              <div className="w-24 h-24 rounded-full bg-blue-500/10 border border-blue-400/30 flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" className="w-12 h-12 stroke-sky-300 fill-none stroke-[1.8] stroke-linecap-round stroke-linejoin-round">
                  <path d="M12 2.5C7.5 2.5 4.5 5.5 4.5 9.5C4.5 13.5 6 17.5 7.8 21.5C8.8 19 9.8 16.5 12 16.5C14.2 16.5 15.2 19 16.2 21.5C18 17.5 19.5 13.5 19.5 9.5C19.5 5.5 16.5 2.5 12 2.5Z" />
                  <path d="M10 8L11 6L12 8L14 9L12 10L11 12L10 10L8 9Z" className="fill-sky-300 stroke-none" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
                Post-Restoration Smile
              </h3>
              <p className="text-xs sm:text-sm text-sky-200 max-w-sm">
                Custom milled monolithic zirconia crowns aligned with sub-millimeter digital surgical guides.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold backdrop-blur-sm">
                  100% Biocompatible
                </span>
                <span className="px-3 py-1 bg-sky-500/20 text-sky-200 border border-sky-400/30 rounded-full text-xs font-semibold">
                  Aesthetic Shade BL2
                </span>
              </div>
            </div>

            {/* "BEFORE" Layer (Clipped by slider position) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden bg-gradient-to-br from-slate-800 via-neutral-900 to-stone-900 flex flex-col items-center justify-center p-6 text-white text-center"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="w-[320px] sm:w-[480px] md:w-[600px] flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-amber-500/10 border border-amber-400/20 flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" className="w-12 h-12 stroke-amber-200 fill-none stroke-[1.8] stroke-linecap-round stroke-linejoin-round">
                    <path d="M12 2.5C7.5 2.5 4.5 5.5 4.5 9.5C4.5 13.5 6 17.5 7.8 21.5C8.8 19 9.8 16.5 12 16.5C14.2 16.5 15.2 19 16.2 21.5C18 17.5 19.5 13.5 19.5 9.5C19.5 5.5 16.5 2.5 12 2.5Z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
                  Pre-Treatment Baseline
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-sm">
                  Severe incisal enamel wear, moderate crowding, and chronic interproximal discoloration.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold backdrop-blur-sm">
                    Enamel Attrition
                  </span>
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-200 border border-amber-400/30 rounded-full text-xs font-semibold">
                    Shade A3.5
                  </span>
                </div>
              </div>
            </div>

            {/* Split Handle Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white shadow-xl border-2 border-[#0066FF] flex items-center justify-center text-[#0066FF] transition-transform group-hover:scale-110">
                <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 pointer-events-none px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
              Before
            </div>
            <div className="absolute top-4 right-4 pointer-events-none px-3 py-1 rounded-full bg-blue-600/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
              After (3D Makeover)
            </div>
          </div>

          {/* Clinical Case Footer Note */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Full arch digital rehabilitation completed in 2 clinical sessions.</span>
            </div>
            {onConsultClick && (
              <button
                onClick={onConsultClick}
                className="text-xs font-bold text-[#0066FF] hover:text-[#0052CC] transition-colors cursor-pointer"
              >
                Discuss your smile options →
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
