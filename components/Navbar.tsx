
import React, { useRef, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import gsap from 'gsap';

export const Navbar: React.FC = () => {
  const { cart, isMenuOpen, setIsMenuOpen } = useApp();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useLayoutEffect(() => {
    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        clipPath: 'circle(150% at 90% 5%)',
        duration: 0.8,
        ease: 'expo.inOut'
      });
      gsap.fromTo(linksRef.current?.children || [], {
        y: 40,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.4
      });
    } else {
      gsap.to(menuRef.current, {
        clipPath: 'circle(0% at 90% 5%)',
        duration: 0.6,
        ease: 'expo.inOut'
      });
    }
  }, [isMenuOpen]);

  useLayoutEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, setIsMenuOpen]);

  const isActive = (path: string) => location.pathname === path;

  const NavLink: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => {
    const active = isActive(to);
    return (
      <Link 
        to={to} 
        className={`relative py-2 transition-all duration-500 ${active ? 'text-stone-100' : 'hover:text-orange-500'}`}
      >
        <span>{children}</span>
        <div 
          className={`absolute bottom-0 left-0 h-[2px] bg-orange-500 transition-all duration-700 ease-expo origin-left ${
            active ? 'w-full opacity-100' : 'w-0 opacity-0'
          }`}
        />
      </Link>
    );
  };

  const IconLink: React.FC<{ to: string, icon: React.ReactNode, className?: string }> = ({ to, icon, className }) => {
    const active = isActive(to);
    return (
      <Link 
        to={to} 
        className={`relative p-2 group flex flex-col items-center ${className}`}
      >
        <div className={`transition-colors duration-500 ${active ? 'text-orange-500' : 'text-stone-100 group-hover:text-orange-500'}`}>
          {icon}
        </div>
        <div 
          className={`absolute -bottom-1 h-[2px] bg-orange-500 transition-all duration-700 ease-expo origin-center ${
            active ? 'w-4 opacity-100' : 'w-0 opacity-0'
          }`}
        />
      </Link>
    );
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 h-20 px-6 md:px-12 flex items-center justify-between backdrop-blur-xl border-b border-stone-100/10">
        <Link to="/" className="text-2xl font-serif font-bold tracking-tighter text-stone-100">
          BREWINX
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12 text-[10px] font-sans font-bold tracking-[0.4em] uppercase text-stone-100/60">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <IconLink 
            to="/login" 
            className="hidden md:flex"
            icon={<User className="w-5 h-5" />} 
          />
          
          <div className="shopping-cart-icon relative">
            <IconLink 
              to="/cart" 
              icon={<ShoppingCart className="w-5 h-5" />} 
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-stone-950 text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full pointer-events-none">
                {cartCount}
              </span>
            )}
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-1 text-stone-100 hover:text-orange-500 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div 
        ref={menuRef}
        className="fixed inset-0 z-[60] bg-stone-950 flex flex-col items-center justify-center md:hidden"
        style={{ clipPath: 'circle(0% at 90% 5%)' }}
      >
        <button 
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-7 right-6 text-stone-100 hover:text-orange-500 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        <div ref={linksRef} className="flex flex-col items-center gap-10 text-4xl font-serif italic text-stone-100 text-center">
          <Link to="/" className={`transition-colors ${isActive('/') ? 'text-orange-500 underline underline-offset-8 decoration-1' : 'hover:text-orange-500'}`}>The Descent</Link>
          <Link to="/menu" className={`transition-colors ${isActive('/menu') ? 'text-orange-500 underline underline-offset-8 decoration-1' : 'hover:text-orange-500'}`}>The Collection</Link>
          <Link to="/about" className={`transition-colors ${isActive('/about') ? 'text-orange-500 underline underline-offset-8 decoration-1' : 'hover:text-orange-500'}`}>The Alchemy</Link>
          <Link to="/cart" className={`transition-colors ${isActive('/cart') ? 'text-orange-500 underline underline-offset-8 decoration-1' : 'hover:text-orange-500'}`}>The Ritual</Link>
          <Link to="/login" className={`text-sm mt-6 font-sans uppercase tracking-[0.4em] font-bold transition-all ${isActive('/login') ? 'text-orange-500 opacity-100' : 'opacity-60 hover:opacity-100 hover:text-orange-500'}`}>Identity / Login</Link>
        </div>
      </div>
    </>
  );
};
