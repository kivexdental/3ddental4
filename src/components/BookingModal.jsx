import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Calendar, Clock, User, Phone, Mail, Stethoscope, AlertCircle, Loader2 } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, preselectedService = '' }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: preselectedService || 'General Dentistry',
    doctor: 'Dr. Emily Vance (Guided Implants)',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    notes: ''
  });

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your full name (at least 2 characters).';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      errs.phone = 'Please provide a valid phone number.';
    }
    if (!formData.email.trim() || !formData.email.includes('@') || !formData.email.includes('.')) {
      errs.email = 'Please provide a valid email address.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate real clinical scheduling network roundtrip
    setTimeout(() => {
      setIsSubmitting(false);
      setReferenceCode(`DEMO-3D-${Math.floor(1000 + Math.random() * 9000)}`);
      setSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrors({});
    onClose();
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md transition-all duration-300"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto no-scrollbar transform transition-all duration-300 animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          aria-label="Close appointment modal"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold uppercase tracking-wider mb-2">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Demo Appointment Showcase</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#0A192F] mb-1">Appointment Slot Reserved</h3>
            <p className="text-slate-600 text-sm max-w-sm mb-4">
              Thank you, <span className="font-semibold text-slate-800">{formData.name}</span>! Your demonstration booking is confirmed.
            </p>

            <div className="w-full bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-4 text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-500">Reference:</span>
                <span className="font-mono font-bold text-blue-600">{referenceCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-semibold text-slate-800">{formData.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Clinician:</span>
                <span className="font-semibold text-slate-800">{formData.doctor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Schedule:</span>
                <span className="font-semibold text-slate-800">{formData.date} at {formData.time}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic mb-6">
              * Note: This showcase does not create a real clinic appointment or store patient medical data.
            </p>

            <button
              onClick={handleReset}
              className="w-full py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-sm rounded-xl shadow-lg transition-all"
            >
              Done & Return to Site
            </button>
          </div>
        ) : (
          <div>
            {/* Demo Badge */}
            <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-[11px] font-bold tracking-wider uppercase">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Demo Appointment Flow</span>
            </div>

            <div className="mb-6">
              <span className="text-xs font-bold tracking-[0.2em] text-[#0066FF] uppercase">
                SCHEDULE VISIT
              </span>
              <h3 id="booking-modal-title" className="text-2xl font-extrabold text-[#0A192F] mt-1">
                Book Your Consultation
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Experience gentle, cutting-edge 3D dental diagnostics tailored to your comfort.
              </p>
              <p className="text-[11px] text-slate-400 mt-1 italic">
                * This showcase does not create a real appointment.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors"
                  />
                </div>
                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors"
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="patient@example.com"
                      className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Service & Doctor Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Service
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors"
                  >
                    <option>General Dentistry</option>
                    <option>Dental Implants</option>
                    <option>Orthodontics</option>
                    <option>Cosmetic Dentistry</option>
                    <option>Root Canal Treatment</option>
                    <option>Teeth Whitening</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Specialist Doctor
                  </label>
                  <select
                    value={formData.doctor}
                    onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors"
                  >
                    <option>Dr. Emily Vance (Guided Implants)</option>
                    <option>Dr. Marcus Chen (Orthodontics)</option>
                    <option>Dr. Sarah Lin (Aesthetic Care)</option>
                  </select>
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Time
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors"
                  >
                    <option>09:00 AM</option>
                    <option>10:30 AM</option>
                    <option>01:00 PM</option>
                    <option>03:30 PM</option>
                    <option>05:00 PM</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-3 py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Demo Booking...</span>
                  </>
                ) : (
                  <span>Confirm Showcase Booking</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
