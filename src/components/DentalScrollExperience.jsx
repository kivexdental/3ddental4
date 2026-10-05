import React, { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import DentalCanvas from './DentalCanvas';
import HeroScene from './HeroScene';
import AboutScene from './AboutScene';
import ServicesScene from './ServicesScene';
import ReviewsScene from './ReviewsScene';
import SectionIndicator from './SectionIndicator';

gsap.registerPlugin(ScrollTrigger);

const DentalScrollExperience = forwardRef(function DentalScrollExperience({
  onBookClick,
  onOpenBookingWithService
}, ref) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  // References to animated scene containers
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const reviewsRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const servicesBgRef = useRef(null);

  const [activeSection, setActiveSection] = useState(1);
  const [currentFrame, setCurrentFrame] = useState(0);

  const stRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia(containerRef);

    // Common timeline trigger logic across all viewports
    const setupTimeline = (isMobile) => {
      const frameTracker = { frame: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=600%',
          pin: sceneRef.current,
          scrub: 1.1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.18) {
              setActiveSection(1);
            } else if (p < 0.54) {
              setActiveSection(2);
            } else if (p < 0.86) {
              setActiveSection(3);
            } else {
              setActiveSection(4);
            }
          }
        }
      });

      stRef.current = tl.scrollTrigger;

      // Initial visual setup
      gsap.set(heroRef.current, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', pointerEvents: 'auto' });
      gsap.set(aboutRef.current, { opacity: 0, y: 45, scale: 0.98, filter: 'blur(8px)', pointerEvents: 'none' });
      gsap.set(servicesRef.current, { opacity: 0, y: 45, scale: 0.96, filter: 'blur(10px)', pointerEvents: 'none' });
      gsap.set(reviewsRef.current, { opacity: 0, y: 45, scale: 0.98, filter: 'blur(8px)', pointerEvents: 'none' });
      gsap.set(servicesBgRef.current, { opacity: 0 });

      const initialCanvasPos = isMobile
        ? { x: '0%', y: '20%', scale: 0.88, opacity: 0.65 }
        : { x: '24%', y: '0%', scale: 1.15, opacity: 1 };

      gsap.set(canvasWrapperRef.current, initialCanvasPos);

      /* ========================================================
       * 1. HERO STATE (0 to 12): Hold Frame 0
       * ======================================================== */
      tl.to({}, { duration: 12 });

      /* ========================================================
       * 2. TRANSITION 0 -> 18 (12 to 26): Hero -> About
       * Frame scrubs 0 -> 18
       * ======================================================== */
      tl.to(frameTracker, {
        frame: 18,
        duration: 14,
        ease: 'power1.inOut',
        onUpdate: () => setCurrentFrame(frameTracker.frame)
      }, 12);

      // Hero leaves
      tl.to(heroRef.current, {
        opacity: 0,
        y: -40,
        scale: 0.96,
        filter: 'blur(8px)',
        duration: 10,
        ease: 'power2.in',
        pointerEvents: 'none'
      }, 12);

      // Canvas repositions for About composition
      const aboutCanvasPos = isMobile
        ? { x: '0%', y: '22%', scale: 0.92, duration: 14, ease: 'power1.inOut' }
        : { x: '22%', y: '2%', scale: 1.18, duration: 14, ease: 'power1.inOut' };

      tl.to(canvasWrapperRef.current, aboutCanvasPos, 12);

      // About enters
      tl.to(aboutRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 12,
        ease: 'power2.out',
        pointerEvents: 'auto'
      }, 15);

      /* ========================================================
       * 3. ABOUT STATE (26 to 34): Hold Frame 18
       * ======================================================== */
      tl.to({}, { duration: 8 });

      /* ========================================================
       * 4. TRANSITION 18 -> 80 (34 to 76): About -> Services
       * Longest transformation range (62 frames)
       * Dental model zooms in dramatically into the teeth macro view
       * ======================================================== */
      tl.to(frameTracker, {
        frame: 80,
        duration: 42,
        ease: 'power1.inOut',
        onUpdate: () => setCurrentFrame(frameTracker.frame)
      }, 34);

      // About leaves
      tl.to(aboutRef.current, {
        opacity: 0,
        y: -40,
        scale: 0.96,
        filter: 'blur(8px)',
        duration: 12,
        ease: 'power2.in',
        pointerEvents: 'none'
      }, 34);

      // Fade in warm oral services backdrop
      tl.to(servicesBgRef.current, {
        opacity: 0.45,
        duration: 32,
        ease: 'power1.inOut'
      }, 36);

      // Canvas zooms in to become full macro backdrop
      const servicesCanvasPos = isMobile
        ? { x: '0%', y: '0%', scale: 1.45, opacity: 0.45, duration: 42, ease: 'power1.inOut' }
        : { x: '0%', y: '0%', scale: 1.65, opacity: 1, duration: 42, ease: 'power1.inOut' };

      tl.to(canvasWrapperRef.current, servicesCanvasPos, 34);

      // Services header & 6 cards enter
      tl.to(servicesRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 20,
        ease: 'power2.out',
        pointerEvents: 'auto'
      }, 54);

      /* ========================================================
       * 5. SERVICES STATE (76 to 84): Hold Frame 80
       * ======================================================== */
      tl.to({}, { duration: 8 });

      /* ========================================================
       * 6. TRANSITION 80 -> 90 (84 to 94): Services -> Reviews
       * Frame scrubs 80 -> 90, revealing completed implant tooth!
       * ======================================================== */
      tl.to(frameTracker, {
        frame: 90,
        duration: 10,
        ease: 'power1.inOut',
        onUpdate: () => setCurrentFrame(frameTracker.frame)
      }, 84);

      // Services leaves
      tl.to(servicesRef.current, {
        opacity: 0,
        y: 35,
        scale: 0.95,
        filter: 'blur(8px)',
        duration: 8,
        ease: 'power2.in',
        pointerEvents: 'none'
      }, 84);

      // Services warm backdrop fades out
      tl.to(servicesBgRef.current, {
        opacity: 0,
        duration: 10,
        ease: 'power1.inOut'
      }, 84);

      // Canvas centers between left text and right reviews
      const reviewsCanvasPos = isMobile
        ? { x: '0%', y: '16%', scale: 0.85, opacity: 0.5, duration: 10, ease: 'power1.inOut' }
        : { x: '6%', y: '0%', scale: 1.05, opacity: 1, duration: 10, ease: 'power1.inOut' };

      tl.to(canvasWrapperRef.current, reviewsCanvasPos, 84);

      // Reviews enters
      tl.to(reviewsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 9,
        ease: 'power2.out',
        pointerEvents: 'auto'
      }, 86);

      /* ========================================================
       * 7. REVIEWS STATE (94 to 100): Hold Frame 90
       * ======================================================== */
      tl.to({}, { duration: 6 });
    };

    // Desktop
    mm.add('(min-width: 1024px)', () => {
      setupTimeline(false);
    });

    // Mobile & Tablet
    mm.add('(max-width: 1023px)', () => {
      setupTimeline(true);
    });

    return () => mm.revert();
  }, []);

  // Jump to section logic for indicator & navigation
  const handleJumpToAnchor = useCallback((anchor) => {
    if (!stRef.current) return;
    const st = stRef.current;
    const startY = st.start;
    const endY = st.end;
    const totalDist = endY - startY;

    let progress = 0;
    if (anchor === 0) progress = 0.04;
    else if (anchor === 18) progress = 0.28;
    else if (anchor === 80) progress = 0.78;
    else if (anchor === 90) progress = 0.96;
    else if (anchor === 'footer') {
      window.scrollTo({ top: endY + window.innerHeight, behavior: 'smooth' });
      return;
    }

    const targetScroll = startY + progress * totalDist;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  }, []);

  useImperativeHandle(ref, () => ({
    jumpToAnchor: handleJumpToAnchor
  }));

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Right Side Vertical Capsule Indicator */}
      <SectionIndicator
        activeSection={activeSection}
        onSelectSection={handleJumpToAnchor}
      />

      {/* Pinned Viewport Container */}
      <div
        ref={sceneRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#F8FAFC]"
      >
        {/* Organic Ambient Studio Lighting & Wave Ribbons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Top-Right Soft Blue Radiant Glow */}
          <div className="absolute -top-32 -right-32 w-[700px] h-[700px] bg-sky-200/40 rounded-full blur-[130px]" />
          {/* Center-Right Warm Dental Halo */}
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-[110px]" />
          {/* Bottom-Left Subtle Aqua Glow */}
          <div className="absolute -bottom-24 -left-24 w-[550px] h-[550px] bg-blue-100/45 rounded-full blur-[110px]" />

          {/* Figma-matching organic fluid curve waves */}
          <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
            <path
              d="M600 -100 C750 200, 850 350, 1100 400 C1300 440, 1450 300, 1500 250"
              stroke="url(#blueWave)"
              strokeWidth="120"
              strokeLinecap="round"
              className="filter blur-2xl"
            />
            <path
              d="M700 700 C900 800, 1150 750, 1400 950"
              stroke="url(#warmWave)"
              strokeWidth="140"
              strokeLinecap="round"
              className="filter blur-3xl"
            />
            <defs>
              <linearGradient id="blueWave" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="warmWave" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFEDD5" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#FEE2E2" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Dynamic Warm Services Backdrop (Blends during 18 -> 80) */}
        <div
          ref={servicesBgRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: 'radial-gradient(ellipse at 50% 55%, rgba(195, 65, 55, 0.45) 0%, rgba(140, 40, 35, 0.6) 50%, rgba(15, 23, 42, 0.75) 100%)'
          }}
        />

        {/* 3D Dental Arch Canvas Layer */}
        <div
          ref={canvasWrapperRef}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        >
          <div
            className="w-[95vw] max-w-[1300px] h-[82vh] max-h-[760px]"
            style={{
              WebkitMaskImage: 'radial-gradient(ellipse 88% 82% at 50% 50%, black 65%, transparent 100%)',
              maskImage: 'radial-gradient(ellipse 88% 82% at 50% 50%, black 65%, transparent 100%)'
            }}
          >
            <DentalCanvas frameIndex={currentFrame} />
          </div>
        </div>

        {/* Interactive Scenes Container - Each Scene is an Absolute Layer */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-12 h-full">
          {/* Frame 0: HERO */}
          <div
            ref={heroRef}
            className="absolute inset-0 flex items-center px-4 sm:px-12"
          >
            <HeroScene
              onBookClick={onBookClick}
              onExploreClick={() => handleJumpToAnchor(80)}
            />
          </div>

          {/* Frame 18: ABOUT US */}
          <div
            ref={aboutRef}
            className="absolute inset-0 flex items-center px-4 sm:px-12"
          >
            <AboutScene
              onLearnMore={() => handleJumpToAnchor(80)}
            />
          </div>

          {/* Frame 80: OUR SERVICES */}
          <div
            ref={servicesRef}
            className="absolute inset-0 flex items-center justify-center px-2 sm:px-6 pt-16 sm:pt-20"
          >
            <ServicesScene
              onSelectService={(serviceName) => onOpenBookingWithService(serviceName)}
            />
          </div>

          {/* Frame 90: GOOGLE REVIEWS */}
          <div
            ref={reviewsRef}
            className="absolute inset-0 flex items-center px-4 sm:px-12"
          >
            <ReviewsScene
              onReadAllReviews={onBookClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default DentalScrollExperience;
