
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Footer } from '../components/Footer.tsx';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Deep Parallax Hero
      gsap.to('.parallax-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-about',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.to(heroTextRef.current, {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-about',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Sensory Triptych
      gsap.utils.toArray('.triptych-img').forEach((img: any, i) => {
        gsap.to(img, {
          y: i % 2 === 0 ? -100 : 100,
          ease: 'none',
          scrollTrigger: {
            trigger: '.triptych-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

      // Floating Particles
      const particles = particlesRef.current?.querySelectorAll('.p-dot');
      particles?.forEach(dot => {
        gsap.to(dot, {
          y: '-=200',
          x: '+=random(-50, 50)',
          opacity: 0,
          duration: 'random(3, 6)',
          repeat: -1,
          ease: 'power1.out',
          delay: 'random(0, 5)'
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-stone-950 text-stone-100 overflow-hidden">
      {/* Deep Parallax Hero */}
      <section className="hero-about relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="parallax-bg absolute inset-0 z-0 bg-cover bg-center opacity-30 scale-125"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2000&auto=format&fit=crop")' }}
        />
        <h1 
          ref={heroTextRef}
          className="relative z-10 text-8xl md:text-[12rem] font-serif font-bold italic tracking-tighter"
        >
          The Alchemy
        </h1>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 md:px-24 flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-1/2">
          <span className="text-orange-500 font-sans text-xs tracking-[0.5em] uppercase">The Vision</span>
          <h2 className="text-4xl md:text-6xl font-serif mt-6 leading-tight italic">
            Coffee is not a drink.<br/>It is an extraction of time.
          </h2>
          <p className="mt-8 text-stone-400 font-sans leading-relaxed max-w-lg">
            At Brewinx, we treat every bean as a relic. Our mission is to bridge the gap between ancient ritual and modern precision, creating an atmosphere where darkness is embraced to reveal the nuanced brilliance of the brew.
          </p>
        </div>
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
          <div className="h-80 bg-stone-900 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="Ritual" />
          </div>
          <div className="h-80 bg-stone-900 overflow-hidden mt-12">
            <img src="https://images.unsplash.com/photo-1512568437330-80351aabd446?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="Pour" />
          </div>
        </div>
      </section>

      {/* Sensory Triptych */}
      <section className="triptych-section py-32 px-6 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
          <div className="triptych-img w-full md:w-1/4 aspect-[2/3] bg-stone-900 overflow-hidden mt-20">
            <img src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover brightness-50" alt="Atmosphere" />
          </div>
          <div className="triptych-img w-full md:w-1/3 aspect-[3/4] bg-stone-900 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover brightness-50" alt="Process" />
          </div>
          <div className="triptych-img w-full md:w-1/4 aspect-[2/3] bg-stone-900 overflow-hidden mt-40">
            <img src="https://images.unsplash.com/photo-1507133750040-4a8f5700e35f?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover brightness-50" alt="Vibe" />
          </div>
        </div>
      </section>

      {/* Particles Section Transitioning into Footer */}
      <section ref={particlesRef} className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <div 
              key={i} 
              className="p-dot absolute w-1.5 h-1.5 bg-orange-500/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `-${Math.random() * 20}%`
              }}
            />
          ))}
        </div>

        <span className="text-orange-500 font-sans text-xs tracking-[0.5em] uppercase mb-6 block">Our Essence</span>
        <h3 className="text-5xl md:text-8xl font-serif mb-12 italic">Elegance in Every Extraction.</h3>
      </section>

      <Footer />
    </div>
  );
};
