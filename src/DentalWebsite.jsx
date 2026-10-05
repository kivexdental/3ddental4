import React, { useRef, useState } from 'react';
import Header from './components/Header';
import DentalScrollExperience from './components/DentalScrollExperience';
import TechnologyBanner from './components/TechnologyBanner';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import LegalModal from './components/LegalModal';

export default function DentalWebsite() {
  const scrollRef = useRef(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [legalModalState, setLegalModalState] = useState({ isOpen: false, tab: 'disclaimer' });

  const handleOpenBooking = (service = '') => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  const handleOpenLegal = (tab = 'disclaimer') => {
    setLegalModalState({ isOpen: true, tab });
  };

  const handleNavigate = (target) => {
    if (target === 'footer') {
      const footer = document.getElementById('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (target === 'faq') {
      const faq = document.getElementById('faq');
      if (faq) {
        faq.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (scrollRef.current) {
      scrollRef.current.jumpToAnchor(target);
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="relative w-full min-h-screen bg-[#F8FAFC] text-[#0F172A] overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* Fixed Navigation Header */}
      <Header
        onBookClick={() => handleOpenBooking()}
        onNavigate={handleNavigate}
      />

      {/* Main Pinned GSAP 3D Scroll Experience (Hero -> About -> Services -> Reviews) */}
      <DentalScrollExperience
        ref={scrollRef}
        onBookClick={() => handleOpenBooking()}
        onOpenBookingWithService={(serviceName) => handleOpenBooking(serviceName)}
      />

      {/* Clinical Excellence & 3D Scanning Technology Banner */}
      <TechnologyBanner
        onBookClick={() => handleOpenBooking()}
      />

      {/* Interactive Before / After Smile Transformation Slider */}
      <BeforeAfterSlider
        onConsultClick={() => handleOpenBooking('Cosmetic Dentistry')}
      />

      {/* Frequently Asked Patient Questions (Accessible Accordion) */}
      <FAQSection />

      {/* Modern Healthcare Minimalist Footer with Legal Triggers */}
      <Footer
        onScrollTop={handleScrollTop}
        onOpenLegal={handleOpenLegal}
      />

      {/* Booking Appointment Showcase Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedService={selectedService}
      />

      {/* Healthcare Compliance & Legal Disclaimers Modal */}
      <LegalModal
        isOpen={legalModalState.isOpen}
        onClose={() => setLegalModalState(prev => ({ ...prev, isOpen: false }))}
        initialTab={legalModalState.tab}
      />
    </main>
  );
}
