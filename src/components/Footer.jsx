import React from 'react';
import { Phone, Mail, MapPin, ArrowUp, ShieldCheck, AlertCircle } from 'lucide-react';

export default function Footer({ onScrollTop, onOpenLegal }) {
  return (
    <footer id="footer" className="w-full bg-white border-t border-slate-200/80 pt-16 pb-12 px-6 sm:px-12 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 text-blue-600">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current stroke-2">
                  <path d="M12 2.5C7.5 2.5 4.5 5.5 4.5 9.5C4.5 13.5 6 17.5 7.8 21.5C8.8 19 9.8 16.5 12 16.5C14.2 16.5 15.2 19 16.2 21.5C18 17.5 19.5 13.5 19.5 9.5C19.5 5.5 16.5 2.5 12 2.5Z" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-[#0A192F]">
                DENTAL<span className="text-[#0066FF]">CARE</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Precision clinical dentistry and compassionate patient care utilizing next-generation 3D imaging and biocompatible dental implants.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Accepting New Patients
            </div>
          </div>

          {/* Clinical Specialties */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A192F] mb-4">
              Specialties
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 font-medium">
              <li className="hover:text-blue-600 transition-colors">Guided Implant Surgery</li>
              <li className="hover:text-blue-600 transition-colors">Clear Aligners & Orthodontics</li>
              <li className="hover:text-blue-600 transition-colors">Microscopic Endodontics</li>
              <li className="hover:text-blue-600 transition-colors">Digital Smile Design & Veneers</li>
              <li className="hover:text-blue-600 transition-colors">Preventative Hygiene & Care</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A192F] mb-4">
              Clinic Location
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                <span>450 Medical Plaza Parkway, Suite 300, Los Angeles, CA 90024</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <a href="tel:+18004247645" className="hover:text-blue-600 transition-colors">+1 (800) 424-SMILE</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <a href="mailto:care@dentalcareclinic.com" className="hover:text-blue-600 transition-colors">care@dentalcareclinic.com</a>
              </li>
            </ul>
          </div>

          {/* Hours & Policies */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A192F] mb-4">
              Hours of Care
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 mb-6">
              <li className="flex justify-between">
                <span>Mon – Thu</span>
                <span className="font-semibold text-slate-800">8:00 AM – 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Friday</span>
                <span className="font-semibold text-slate-800">8:00 AM – 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="font-semibold text-slate-800">9:00 AM – 2:00 PM</span>
              </li>
              <li className="flex justify-between text-slate-400">
                <span>Sunday</span>
                <span>Emergency Only</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Policies Navigation Row */}
        <div className="py-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-medium">
            <button
              onClick={() => onOpenLegal && onOpenLegal('disclaimer')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Medical Disclaimer
            </button>
            <button
              onClick={() => onOpenLegal && onOpenLegal('privacy')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegal && onOpenLegal('terms')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onOpenLegal && onOpenLegal('cookies')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Cookie Policy
            </button>
            <button
              onClick={() => onOpenLegal && onOpenLegal('appointment')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Appointment Policy
            </button>
          </div>

          <button
            onClick={onScrollTop}
            aria-label="Back to top of page"
            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} DENTALCARE Clinic. All healthcare rights reserved. Public patient information showcase.</p>
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            <span>WCAG 2.2 Accessible • HIPAA Compliant Standards</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
