
import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Wind } from 'lucide-react';
import { Footer } from '../components/Footer.tsx';

gsap.registerPlugin(ScrollTrigger);

export const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Text Assembly
      const chars = document.querySelectorAll('.hero-title span');
      gsap.from(chars, {
        y: 100,
        opacity: 0,
        rotateX: -90,
        stagger: 0.05,
        duration: 1.5,
        ease: 'expo.out'
      });

      gsap.from('.hero-subtext', {
        opacity: 0,
        y: 20,
        duration: 1.5,
        delay: 0.8,
        ease: 'power2.out'
      });

      // 2. Hero Image Parallax
      gsap.to('.hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 3. Horizontal Scroll Section
      const horizontalItems = gsap.utils.toArray('.horizontal-item');
      if (horizontalItems.length > 0) {
        gsap.to(horizontalItems, {
          xPercent: -100 * (horizontalItems.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalSectionRef.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + (horizontalScrollRef.current?.offsetWidth || 0),
            invalidateOnRefresh: true,
          }
        });
      }

      // 4. Parallax effects for images inside horizontal items
      gsap.utils.toArray('.parallax-img').forEach((img: any) => {
        gsap.to(img, {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

      // 5. Final Reveal Animation
      gsap.from('.final-reveal', {
        opacity: 0,
        y: 50,
        duration: 1.5,
        scrollTrigger: {
          trigger: '.final-reveal',
          start: 'top 80%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-stone-950 min-h-screen text-stone-100 overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=60&w=1200" 
            className="hero-bg w-full h-full object-cover opacity-50 scale-110"
            alt="Brewinx Hero"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-transparent to-stone-950" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="hero-title font-serif font-bold tracking-tighter leading-none perspective-[1000px] flex justify-center flex-nowrap" style={{ fontSize: 'clamp(3rem, 15vw, 16rem)' }}>
            { "BREWINX".split("").map((c, i) => (
              <span key={i} className="inline-block origin-bottom">{c}</span>
            ))}
          </h1>
          <div className="hero-subtext mt-8 space-y-4">
            <p className="text-[10px] md:text-sm uppercase tracking-[1em] text-orange-400 font-black">Alchemy of the Dark</p>
            <div className="w-16 md:w-24 h-[1px] bg-stone-800 mx-auto" />
            <p className="text-stone-500 font-light italic text-xs md:text-base max-w-xs md:max-w-md mx-auto">Where precision meets the primitive soul of the bean.</p>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="w-px h-12 bg-gradient-to-b from-orange-500/0 via-orange-500 to-orange-500/0 animate-bounce" />
          <span className="text-[8px] uppercase tracking-[0.6em] text-stone-600 font-bold">Initiate Descent</span>
        </div>
      </section>

      {/* Horizontal Storytelling Gallery */}
      <section ref={horizontalSectionRef} className="relative h-screen overflow-hidden bg-stone-900/20 border-y border-stone-100/5">
        <div ref={horizontalScrollRef} className="flex h-full w-[300vw]">
          
          {/* Item 1: The Terroir */}
          <div className="horizontal-item w-screen h-full flex items-center justify-center px-6 md:px-20 relative">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center max-w-7xl">
                <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl border border-stone-100/5">
                  <img src="https://img.freepik.com/premium-photo/close-up-falling-steaming-coffee-beans-selective-focus-concept-coffee-roasting-high-quality-products-vertical-view_193819-3500.jpg" className="parallax-img w-full h-full object-cover scale-125" alt="Terroir" loading="lazy" decoding="async" />
                </div>
                <div className="parallax-text space-y-4 md:space-y-8 text-center md:text-left">
                  <span className="text-orange-500 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">01. The Terroir</span>
                  <h2 className="text-5xl md:text-8xl font-serif italic tracking-tighter">Deep Roots.</h2>
                  <p className="text-stone-400 text-sm md:text-lg font-light leading-relaxed tracking-wide">High-altitude volcanic soil gives our beans a mineral complexity that standard roasts simply cannot reach. The struggle is where the flavor lives.</p>
                </div>
             </div>
          </div>

          {/* Item 2: The Roast */}
          <div className="horizontal-item w-screen h-full flex items-center justify-center px-6 md:px-20 bg-stone-950">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center max-w-7xl">
                <div className="order-2 md:order-1 parallax-text space-y-4 md:space-y-8 text-center md:text-right">
                  <span className="text-orange-500 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">02. The Roast</span>
                  <h2 className="text-5xl md:text-8xl font-serif italic tracking-tighter">Fire & Time.</h2>
                  <p className="text-stone-400 text-sm md:text-lg font-light leading-relaxed tracking-wide">Our master roasters listen for the 'first crack' like a conductor listens for a symphony. Precision down to the millisecond.</p>
                </div>
                <div className="order-1 md:order-2 relative aspect-square md:aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl border border-stone-100/5">
                  <img src="https://images.pexels.com/photos/15389642/pexels-photo-15389642/free-photo-of-spices-in-bowl-in-machine.png?auto=compress&cs=tinysrgb&dpr=1&w=500" className="parallax-img w-full h-full object-cover scale-125" alt="Roast" loading="lazy" decoding="async" />
                </div>
             </div>
          </div>

          {/* Item 3: The Pour */}
          <div className="horizontal-item w-screen h-full flex items-center justify-center px-6 md:px-20">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center max-w-7xl">
                <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl border border-stone-100/5">
                  <img src="https://img.freepik.com/premium-photo/black-coffee-cup-with-hot-coffee-smoke-rustic-wood-dark-food-style-photo-selective-focus_309761-4586.jpg?w=360" className="parallax-img w-full h-full object-cover scale-125" alt="Pour" loading="lazy" decoding="async" />
                </div>
                <div className="parallax-text space-y-4 md:space-y-8 text-center md:text-left">
                  <span className="text-orange-500 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">03. The Pour</span>
                  <h2 className="text-5xl md:text-8xl font-serif italic tracking-tighter">Final Ritual.</h2>
                  <p className="text-stone-400 text-sm md:text-lg font-light leading-relaxed tracking-wide">The water temperature is held at exactly 93°C. The bloom is allowed 45 seconds. Perfection is not an accident; it's a requirement.</p>
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-40 md:py-60 px-6 relative overflow-hidden flex flex-col items-center text-center">
        <div className="final-reveal space-y-10 md:space-y-12 max-w-4xl">
           <div className="flex justify-center mb-6">
             <div className="flex flex-col items-center">
                <span className="text-stone-100 font-serif text-4xl md:text-6xl tracking-[0.8em] uppercase font-bold pl-[0.8em]">Brewinx</span>
                <div className="w-12 h-[1px] bg-orange-500/40 mt-4" />
             </div>
           </div>
           <h2 className="text-5xl md:text-[10rem] font-serif leading-none tracking-tighter italic">Ready for <br /><span className="text-orange-200">the Ritual?</span></h2>
           <p className="text-sm md:text-xl text-stone-500 font-light italic">Your sensory journey begins at the first sip.</p>
           <div className="pt-8 md:pt-12">
             <Link 
               to="/menu" 
               className="group relative inline-flex items-center gap-6 px-10 md:px-14 py-5 md:py-7 bg-stone-100 text-stone-950 font-black uppercase tracking-[0.4em] text-[10px] rounded-full overflow-hidden transition-all duration-700 hover:bg-orange-500 hover:text-white"
             >
               <span className="relative z-10">Explore the Menu</span>
               <ChevronRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2 relative z-10" />
               <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-expo" />
             </Link>
           </div>
        </div>

        {/* Floating Atmospheric Particles */}
        <div className="absolute inset-0 pointer-events-none -z-10">
           <Wind className="absolute top-1/4 left-1/4 w-24 md:w-32 h-24 md:h-32 text-orange-500/5 animate-pulse" />
           <Wind className="absolute bottom-1/4 right-1/4 w-32 md:w-40 h-32 md:h-40 text-orange-500/5 animate-pulse" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
