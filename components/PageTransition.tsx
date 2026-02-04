
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export const PageTransition: React.FC = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayLocation(location);
        }
      });

      // Intro: Top and bottom panels slide in to meet at the center
      tl.set(containerRef.current, { visibility: 'visible' })
        .to(topPanelRef.current, {
          y: '0%',
          duration: 0.8,
          ease: 'expo.inOut'
        }, 'start')
        .to(bottomPanelRef.current, {
          y: '0%',
          duration: 0.8,
          ease: 'expo.inOut'
        }, 'start')
        // The Peak: Text reveal in the center
        .fromTo(textRef.current?.children || [], {
          opacity: 0,
          y: 20,
          rotateX: 45,
          filter: 'blur(10px)'
        }, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          stagger: 0.05,
          duration: 0.6,
          ease: 'power3.out'
        }, '-=0.3')
        // Brief pause at the peak to hold the branding
        .to({}, { duration: 0.5 })
        // Outro: Split transition - Top half goes upside, bottom half goes downside
        .to(textRef.current?.children || [], {
          opacity: 0,
          y: -20,
          filter: 'blur(10px)',
          stagger: 0.02,
          duration: 0.4
        })
        .to(topPanelRef.current, {
          y: '-100%',
          duration: 0.9,
          ease: 'expo.inOut'
        }, 'split')
        .to(bottomPanelRef.current, {
          y: '100%',
          duration: 0.9,
          ease: 'expo.inOut'
        }, 'split')
        .set(containerRef.current, { visibility: 'hidden' });
    }
  }, [location, displayLocation]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ visibility: 'hidden' }}
    >
      {/* Top Half Panel */}
      <div 
        ref={topPanelRef}
        className="absolute top-0 left-0 w-full h-[50vh] bg-stone-950 border-b border-stone-100/5 transform -translate-y-full"
      />
      {/* Bottom Half Panel */}
      <div 
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 w-full h-[50vh] bg-stone-950 border-t border-stone-100/5 transform translate-y-full"
      />
      
      {/* Centered Assembly Text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div ref={textRef} className="flex gap-2">
          {"BREWINX".split("").map((letter, i) => (
            <span key={i} className="text-stone-100 text-6xl md:text-9xl font-serif font-bold tracking-[0.15em]">
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};