import React, { useState, useEffect } from 'react';
import { Monitor, Tablet, Smartphone, Maximize2, X, ChevronDown } from 'lucide-react';

/**
 * KIVEX Technology Preview Toolbar
 * Permanent KIVEX Technology branding lockup.
 * Device modes: PC (1280px) | Tablet (768px) | Phone (390px) | Fullscreen (100%)
 * Close button (×) hides toolbar. Floating KIVEX circular control reopens toolbar.
 * Strictly adheres to website-toolbar skill specifications.
 */
export default function KivexToolbar({
  activeMode = 'fullscreen',
  onModeChange,
  onCloseToolbar
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const deviceModes = [
    { id: 'pc', label: 'PC', icon: Monitor, width: '1280px' },
    { id: 'tablet', label: 'Tablet', icon: Tablet, width: '768px' },
    { id: 'phone', label: 'Phone', icon: Smartphone, width: '390px' },
    { id: 'fullscreen', label: 'Fullscreen', icon: Maximize2, width: '100%' },
  ];

  // Close mobile menu on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <aside 
      aria-label="KIVEX Preview Application Toolbar"
      className="relative z-[9999] w-full bg-[#F5EFE5] border-b border-[#E3DAC9] text-[#1E293B] shadow-sm select-none"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Permanent KIVEX Technology Branding Unit on the LEFT */}
        <div className="flex items-center">
          <div className="flex items-baseline tracking-tight" title="KIVEX Technology Preview System">
            <span className="font-extrabold text-base sm:text-lg tracking-wider text-[#2D5FC7]">
              KIVEX
            </span>
            <span className="font-semibold text-xs sm:text-sm tracking-normal text-[#E8B62A] ml-1.5">
              Technology
            </span>
          </div>
        </div>

        {/* Center / Right Desktop Device View Controls */}
        <nav 
          aria-label="Device Viewport Switcher" 
          className="hidden sm:flex items-center gap-1.5 bg-[#EAE2D5]/80 p-1 rounded-full border border-[#DED4C4]"
        >
          {deviceModes.map((mode) => {
            const Icon = mode.icon;
            const isActive = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => onModeChange && onModeChange(mode.id)}
                aria-pressed={isActive}
                aria-label={`Switch to ${mode.label} preview mode`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#2D5FC7] text-white shadow-sm ring-1 ring-[#2D5FC7]'
                    : 'text-[#475569] hover:text-[#0F172A] hover:bg-black/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#64748B]'}`} />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Device View Trigger */}
        <div className="sm:hidden relative">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Open KIVEX Device View Selector"
            className="flex items-center gap-1.5 px-2.5 py-1 bg-[#EAE2D5] text-[#2D5FC7] text-xs font-semibold rounded-lg border border-[#DED4C4]"
          >
            <span>{deviceModes.find(m => m.id === activeMode)?.label || 'View'}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {/* Expanded Device View Interface with KIVEX Technology branding */}
          {isMobileMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#F5EFE5] rounded-xl shadow-xl border border-[#DED4C4] p-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-2 py-1.5 border-b border-[#E3DAC9] mb-1">
                <span className="font-extrabold text-xs text-[#2D5FC7]">KIVEX</span>
                <span className="font-semibold text-[11px] text-[#E8B62A] ml-1">Technology</span>
              </div>
              <div className="flex flex-col gap-1">
                {deviceModes.map((mode) => {
                  const Icon = mode.icon;
                  const isActive = activeMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => {
                        onModeChange && onModeChange(mode.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                        isActive
                          ? 'bg-[#2D5FC7] text-white font-semibold'
                          : 'text-[#334155] hover:bg-black/5'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5" />
                        {mode.label}
                      </span>
                      <span className="text-[10px] opacity-70">{mode.width}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Far Right: Cross / Close Button (×) */}
        <div className="flex items-center">
          <button
            onClick={onCloseToolbar}
            title="Hide KIVEX preview toolbar"
            aria-label="Hide KIVEX preview toolbar"
            className="p-1.5 rounded-full text-[#475569] hover:text-[#0F172A] hover:bg-[#EAE2D5] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
