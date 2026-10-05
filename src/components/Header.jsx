import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

export default function Header({ onBookClick, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', target: 0 },
    { name: 'Services', target: 80 },
    { name: 'About', target: 18 },
    { name: 'Doctors', target: 90 },
    { name: 'Technology', target: 80 },
    { name: 'FAQ', target: 'faq' },
    { name: 'Contact', target: 'footer' },
  ];

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (target) => {
    setMobileMenuOpen(false);
    if (onNavigate) onNavigate(target);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-12 py-3 sm:py-4 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick(0)}
          className="flex items-center gap-2 cursor-pointer group select-none py-1"
          role="button"
          tabIndex={0}
          aria-label="DENTALCARE Home"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleNavClick(0);
            }
          }}
        >
          {/* Custom SVG Tooth Logo with sparkle */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 relative flex items-center justify-center text-blue-600 transition-transform group-hover:scale-105 duration-200">
            <svg 
              viewBox="0 0 24 24" 
              className="w-full h-full fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round"
            >
              <path d="M12 2.5C7.5 2.5 4.5 5.5 4.5 9.5C4.5 13.5 6 17.5 7.8 21.5C8.8 19 9.8 16.5 12 16.5C14.2 16.5 15.2 19 16.2 21.5C18 17.5 19.5 13.5 19.5 9.5C19.5 5.5 16.5 2.5 12 2.5Z" />
              <path d="M10 8L11 6L12 8L14 9L12 10L11 12L10 10L8 9Z" className="fill-blue-600 stroke-none opacity-80" />
            </svg>
          </div>
          <span className="text-base sm:text-xl font-extrabold tracking-tight text-[#0A192F] transition-colors group-hover:text-blue-600">
            DENTAL<span className="font-semibold text-blue-600">CARE</span>
          </span>
        </div>

        {/* Center Desktop Navigation */}
        <nav 
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-slate-600"
        >
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.target)}
              className="hover:text-blue-600 transition-colors duration-200 cursor-pointer py-1.5 focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Right CTA Button & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onBookClick}
            aria-label="Book Appointment"
            className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2 sm:py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <span className="hidden sm:inline">Book Appointment</span>
            <span className="sm:hidden">Book Now</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Mobile Hamburger Toggle Button (min 44x44 touch target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-slate-100 pb-4 px-2 space-y-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.target)}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 transition-colors flex items-center justify-between"
            >
              <span>{item.name}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          ))}
          <div className="pt-2 px-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onBookClick) onBookClick();
              }}
              className="w-full py-2.5 bg-[#0066FF] text-white text-xs font-bold rounded-xl shadow-md text-center"
            >
              Schedule Online Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
