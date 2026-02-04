
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Mail, ArrowUpRight, ArrowUp, Globe, Coffee } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const monolithRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for footer sections
      gsap.from('.footer-reveal', {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
        }
      });

      // Monolith floating and scale effect
      gsap.to(monolithRef.current, {
        y: -20,
        scale: 1.02,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Atmospheric Particles Animation
      const particles = particlesRef.current?.querySelectorAll('.footer-particle');
      particles?.forEach((particle) => {
        const randomX = Math.random() * 100 - 50;
        const randomDuration = 5 + Math.random() * 10;
        const randomDelay = Math.random() * 5;

        gsap.set(particle, { 
          xPercent: Math.random() * 100, 
          yPercent: 100, 
          opacity: 0,
          scale: 0.5 + Math.random()
        });

        gsap.to(particle, {
          yPercent: -200,
          xPercent: `+=${randomX}`,
          opacity: Math.random() * 0.4 + 0.1,
          duration: randomDuration,
          delay: randomDelay,
          repeat: -1,
          ease: 'power1.out',
          onRepeat: () => {
            gsap.set(particle, { xPercent: Math.random() * 100 });
          }
        });
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-stone-950 pt-48 pb-12 px-6 md:px-24 border-t border-stone-100/5 relative overflow-hidden">
      
      {/* Particle System Layer */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0">
        {[...Array(45)].map((_, i) => (
          <div 
            key={i} 
            className="footer-particle absolute w-1 h-1 bg-orange-500/40 rounded-full blur-[1px]"
            style={{ left: `${Math.random() * 100}%`, bottom: '0' }}
          />
        ))}
      </div>

      {/* Tier 1: The Invitation (Newsletter) */}
      <div className="max-w-[1600px] mx-auto mb-48 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-24">
          <div className="footer-reveal space-y-10 max-w-3xl">
            <div className="flex items-center gap-6">
              <span className="text-orange-500 font-sans text-[10px] tracking-[0.8em] uppercase font-black">Dispatches from the Void</span>
              <div className="flex-1 h-px bg-stone-100/10" />
            </div>
            <h2 className="text-7xl md:text-[9rem] font-serif italic tracking-tighter leading-[0.8] text-stone-100">
              Stay <span className="text-stone-700">Brewed.</span>
            </h2>
            <p className="text-stone-500 font-sans text-xs md:text-sm tracking-[0.2em] uppercase leading-loose max-w-lg">
              Join our inner circle for rare extraction methods, limited roasts, and the philosophy of darkness.
            </p>
          </div>
          
          <div className="footer-reveal w-full lg:w-1/3 pt-12">
            <div className="relative group">
              <label className="block text-[8px] font-bold tracking-[0.5em] text-stone-600 uppercase mb-4 transition-colors group-focus-within:text-orange-500">
                Identification / Email
              </label>
              <div className="relative border-b border-stone-100/10 pb-6 group-focus-within:border-orange-500 transition-all duration-1000">
                <input 
                  type="email" 
                  placeholder="VOID@DOMAIN.COM" 
                  className="bg-transparent w-full text-xs font-sans tracking-[0.5em] outline-none placeholder:text-stone-900 text-stone-100 uppercase"
                />
                <button className="absolute right-0 top-0 text-stone-100 hover:text-orange-500 transition-all flex items-center gap-3 group/btn h-full">
                  <span className="text-[9px] font-black tracking-[0.3em] uppercase opacity-0 -translate-x-4 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-700">Enter Ritual</span>
                  <div className="w-10 h-10 rounded-full border border-stone-100/10 flex items-center justify-center group-hover/btn:border-orange-500 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tier 2: The Directory (Grid) */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-24 gap-x-12 mb-56 relative z-10 border-t border-stone-100/5 pt-24">
        
        {/* Brand Philosophy */}
        <div className="footer-reveal col-span-2 lg:col-span-2 space-y-10">
          <Link to="/" className="text-3xl font-serif font-black tracking-tighter text-stone-100 block">
            BREWINX<span className="text-orange-500">.</span>
          </Link>
          <p className="text-[10px] font-sans tracking-[0.3em] text-stone-500 uppercase leading-relaxed max-w-xs italic">
            "Darkness is not the absence of light, but the presence of depth. We roast for the soul that seeks the profound."
          </p>
          <div className="flex gap-6 text-stone-700">
             <Coffee className="w-5 h-5" />
             <div className="w-px h-5 bg-stone-100/10" />
             <span className="text-[10px] tracking-widest uppercase font-bold">Est. 2024</span>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="footer-reveal space-y-10">
          <h4 className="text-[10px] font-sans tracking-[0.6em] text-orange-500 font-black uppercase">Navigate</h4>
          <ul className="space-y-6 text-[11px] font-sans tracking-[0.4em] text-stone-400 uppercase">
            <li><Link to="/" className="hover:text-stone-100 transition-colors flex items-center gap-2">Home</Link></li>
            <li><Link to="/menu" className="hover:text-stone-100 transition-colors flex items-center gap-2">Collection</Link></li>
            <li><Link to="/about" className="hover:text-stone-100 transition-colors flex items-center gap-2">Alchemy</Link></li>
            <li><Link to="/cart" className="hover:text-stone-100 transition-colors flex items-center gap-2">Ritual</Link></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="footer-reveal space-y-10">
          <h4 className="text-[10px] font-sans tracking-[0.6em] text-orange-500 font-black uppercase">Presence</h4>
          <div className="space-y-6">
            <p className="text-[11px] font-sans tracking-[0.4em] text-stone-400 uppercase leading-relaxed">
              102 Obsidian Lane<br/>
              Manhattan, NY<br/>
              Void District
            </p>
            <a href="#" className="text-[9px] font-bold tracking-[0.3em] text-stone-600 hover:text-orange-500 transition-colors uppercase block">View on Maps</a>
          </div>
        </div>

        {/* Links Column 3 */}
        <div className="footer-reveal space-y-10">
          <h4 className="text-[10px] font-sans tracking-[0.6em] text-orange-500 font-black uppercase">Sync</h4>
          <ul className="space-y-6 text-[11px] font-sans tracking-[0.4em] text-stone-400 uppercase">
            <li><a href="#" className="hover:text-orange-500 transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Spotify</a></li>
          </ul>
        </div>

        {/* Back to Top Component */}
        <div className="footer-reveal flex justify-end items-center col-span-2 lg:col-span-1">
          <button 
            onClick={scrollToTop}
            className="relative w-40 h-40 flex items-center justify-center group"
          >
            {/* Spinning text background */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite] opacity-10 group-hover:opacity-100 group-hover:text-orange-500 transition-all duration-1000">
              <path id="circlePath" fill="none" d="M 10, 50 a 40,40 0 1,1 80,0 40,40 0 1,1 -80,0" />
              <text className="text-[8px] uppercase font-sans tracking-[0.6em] fill-current font-black">
                <textPath href="#circlePath">
                  ASCEND TO ORIGINS • ASCEND TO ORIGINS • 
                </textPath>
              </text>
            </svg>
            <div className="w-16 h-16 rounded-full border border-stone-100/5 flex items-center justify-center bg-stone-900/40 backdrop-blur-sm group-hover:border-orange-500 transition-all duration-700">
              <ArrowUp className="w-6 h-6 text-stone-100 group-hover:text-orange-500 group-hover:-translate-y-1 transition-all duration-500" />
            </div>
          </button>
        </div>
      </div>

      {/* Tier 3: The Monolith (Giant Branding) */}
      <div ref={monolithRef} className="relative select-none pointer-events-none mb-32 z-10">
        <div className="text-[25vw] leading-none font-serif font-black italic tracking-tighter flex justify-center overflow-hidden">
          <span className="text-stone-100 opacity-[0.02]">BREWINX</span>
          {/* Outlined version for depth */}
          <span 
            className="absolute inset-0 flex justify-center text-transparent" 
            style={{ WebkitTextStroke: '1px rgba(245, 245, 244, 0.04)' }}>
            BREWINX
          </span>
        </div>
      </div>

      {/* Footer Bottom Meta */}
      <div className="max-w-[1600px] mx-auto pt-16 flex flex-col md:flex-row justify-between items-center gap-12 border-t border-stone-100/5 relative z-10">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
             <div className="w-2 h-2 bg-orange-500 rounded-full" />
             <p className="text-[9px] font-sans tracking-[0.4em] text-stone-700 uppercase">
               &copy; {new Date().getFullYear()} Brewinx Corp.
             </p>
          </div>
          <p className="text-[9px] font-sans tracking-[0.4em] text-stone-800 uppercase hidden md:block">
            Designed for the Depth.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-12 text-[9px] font-sans tracking-[0.3em] text-stone-700 uppercase">
          <Link to="#" className="hover:text-stone-300 transition-colors">Privacy Protocols</Link>
          <Link to="#" className="hover:text-stone-300 transition-colors">Extraction Rights</Link>
          <Link to="#" className="hover:text-stone-300 transition-colors">Accessibility</Link>
          <div className="flex items-center gap-2 text-stone-800">
            <Globe className="w-3 h-3" />
            <span>GLOBAL / EN</span>
          </div>
        </div>
      </div>

      {/* Atmospheric Ambient Light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-t from-orange-500/5 via-transparent to-transparent pointer-events-none z-0" />
    </footer>
  );
};
