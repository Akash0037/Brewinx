
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { signInWithGoogle, signInWithEmail, signUpWithEmail, onAuthChange, User } from '../firebase';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);
  const glow3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Redirect to home after successful login
        setTimeout(() => navigate('/'), 1500);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    // Entrance animation for the form
    if (formRef.current) {
      gsap.fromTo(formRef.current, 
        { opacity: 0, y: 30, filter: 'blur(10px)' }, 
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out' }
      );
    }

    // Dynamic, atmospheric pulse and float for background glows
    const ctx = gsap.context(() => {
      // Glow 1: Primary Orange Pulse
      gsap.to(glow1Ref.current, {
        scale: 1.4,
        opacity: 0.12,
        x: '+=30',
        y: '-=20',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Glow 2: Secondary Pale Orange Pulse
      gsap.to(glow2Ref.current, {
        scale: 1.5,
        opacity: 0.06,
        x: '-=40',
        y: '+=30',
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5
      });

      // Glow 3: Center-Bottom Ambient Glow
      gsap.to(glow3Ref.current, {
        scale: 1.3,
        opacity: 0.04,
        y: '-=50',
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2
      });
    });

    return () => ctx.revert();
  }, [isLogin]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-stone-950 flex items-center justify-center relative overflow-hidden px-4 pt-16">
      {/* Enhanced Atmospheric Glow Elements */}
      <div 
        ref={glow1Ref}
        className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none will-change-transform" 
      />
      <div 
        ref={glow2Ref}
        className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-orange-200/5 rounded-full blur-[150px] pointer-events-none will-change-transform" 
      />
      <div 
        ref={glow3Ref}
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none will-change-transform" 
      />

      <div ref={formRef} className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-stone-900/30 backdrop-blur-3xl border border-stone-100/5 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
        
        {/* Left Side - Welcome Message */}
        <div className="hidden lg:flex flex-col justify-center p-10 xl:p-12 bg-gradient-to-br from-stone-900/50 to-stone-950/80 border-r border-stone-100/5 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500/0 via-orange-500/50 to-orange-500/0" />
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-orange-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 space-y-5">
            <span className="text-orange-500 font-sans text-[9px] tracking-[0.5em] uppercase font-bold">
              Brewinx Coffee
            </span>
            
            <h2 className="text-4xl xl:text-5xl font-serif italic text-stone-100 tracking-tight leading-tight">
              Where Every<br />
              <span className="text-orange-400">Sip Tells</span><br />
              a Story
            </h2>
            
            <div className="w-12 h-[2px] bg-orange-500/40" />
            
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Login to save your orders, track your favorite brews, and unlock exclusive member perks.
            </p>
            
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-stone-300 text-sm">Save & track your orders</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-stone-300 text-sm">Create your favorites list</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <span className="text-stone-300 text-sm">Exclusive member rewards</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-6 md:p-8">
          <header className="text-center mb-6">
            <span className="text-orange-500 font-sans text-[9px] tracking-[0.5em] uppercase font-bold opacity-80">
              {isLogin ? 'Welcome Back' : 'Join the Ritual'}
            </span>
            <h1 className="text-3xl md:text-4xl font-serif italic mt-2 text-stone-100 tracking-tight">
              {isLogin ? 'Access' : 'Initiate'}
            </h1>
            {/* Mobile only message */}
            <p className="lg:hidden text-stone-500 text-xs mt-2 max-w-xs mx-auto">
              Login to save your orders and unlock exclusive perks
            </p>
          </header>

        {/* Toggle Switch */}
        <div className="flex mb-6 bg-stone-950/50 p-1 border border-stone-100/5 relative rounded-none">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-[9px] font-sans tracking-[0.3em] uppercase transition-all duration-500 relative z-10 ${isLogin ? 'text-stone-950 font-bold' : 'text-stone-500'}`}
          >
            Access
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-[9px] font-sans tracking-[0.3em] uppercase transition-all duration-500 relative z-10 ${!isLogin ? 'text-stone-950 font-bold' : 'text-stone-500'}`}
          >
            Initiate
          </button>
          <div 
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-stone-100 transition-transform duration-700 ease-expo ${isLogin ? 'translate-x-1' : 'translate-x-[calc(100%-4px)]'}`}
          />
        </div>

        <form className="space-y-6" onSubmit={handleEmailAuth}>
          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-sans tracking-wider">
              {error}
            </div>
          )}

          {/* Success Message */}
          {user && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-sans tracking-wider text-center">
              Welcome, {user.displayName || user.email}! Redirecting...
            </div>
          )}

          {!isLogin && (
            <div className="relative group">
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-transparent border-b-2 border-stone-100/10 py-3 text-stone-100 font-sans focus:outline-none focus:border-orange-500 focus:shadow-[0_15px_40px_-15px_rgba(249,115,22,0.5)] transition-all peer placeholder-transparent"
                placeholder="Full Name"
                id="name"
              />
              <label htmlFor="name" className="absolute left-0 top-3 text-[9px] uppercase tracking-widest text-stone-500 font-sans transition-all pointer-events-none peer-focus:-top-3 peer-focus:text-orange-500 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-orange-500">
                Full Name
              </label>
            </div>
          )}

          <div className="relative group">
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-transparent border-b-2 border-stone-100/10 py-3 text-stone-100 font-sans focus:outline-none focus:border-orange-500 focus:shadow-[0_15px_40px_-15px_rgba(249,115,22,0.5)] transition-all peer placeholder-transparent"
              placeholder="Email Address"
              id="email"
            />
            <label htmlFor="email" className="absolute left-0 top-3 text-[9px] uppercase tracking-widest text-stone-500 font-sans transition-all pointer-events-none peer-focus:-top-3 peer-focus:text-orange-500 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-orange-500">
              Identity Email
            </label>
          </div>

          <div className="relative group">
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-transparent border-b-2 border-stone-100/10 py-3 text-stone-100 font-sans focus:outline-none focus:border-orange-500 focus:shadow-[0_15px_40px_-15px_rgba(249,115,22,0.5)] transition-all peer placeholder-transparent"
              placeholder="Passcode"
              id="password"
            />
            <label htmlFor="password" className="absolute left-0 top-3 text-[9px] uppercase tracking-widest text-stone-500 font-sans transition-all pointer-events-none peer-focus:-top-3 peer-focus:text-orange-500 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-orange-500">
              Ritual Passcode
            </label>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-orange-500 text-stone-950 font-sans font-bold tracking-[0.4em] uppercase text-[9px] hover:bg-stone-100 transition-all shadow-[0_10px_30px_rgba(249,115,22,0.3)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : isLogin ? 'Access the Void' : 'Begin Extraction'}
            </button>
            
            <div className="flex items-center gap-4 my-1">
              <div className="flex-1 h-px bg-stone-100/5" />
              <span className="text-[8px] font-sans uppercase tracking-[0.3em] text-stone-600">OR</span>
              <div className="flex-1 h-px bg-stone-100/5" />
            </div>

            {/* Google Login Button */}
            <button 
              type="button"
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full py-3 border border-stone-100/10 bg-stone-950/40 text-stone-100 font-sans tracking-[0.3em] uppercase text-[9px] flex items-center justify-center gap-3 hover:bg-stone-100 hover:text-stone-950 transition-all group active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 transition-colors" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.188 1.188-2.684 2.112-5.912 2.112-4.148 0-7.58-3.356-7.58-7.58s3.432-7.58 7.58-7.58c2.252 0 3.848.884 5.068 2.052l2.308-2.308c-1.96-1.832-4.516-2.924-7.376-2.924-6.224 0-11.28 5.056-11.28 11.28s5.056 11.28 11.28 11.28c3.412 0 6.008-1.128 8.128-3.336 2.112-2.112 2.78-5.116 2.78-7.664 0-.48-.04-.96-.12-1.42h-10.8z"/>
              </svg>
              Continue with Google
            </button>

            {isLogin && (
              <button className="text-center text-[9px] font-sans tracking-[0.2em] uppercase text-stone-500 hover:text-orange-500 transition-colors">
                Lost Identity?
              </button>
            )}
          </div>
        </form>

        <div className="mt-6 text-center border-t border-stone-100/5 pt-4">
          <p className="text-[9px] font-sans text-stone-500 tracking-widest uppercase mb-2">
            {isLogin ? 'New to Brewinx?' : 'Already Initiated?'}
          </p>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="font-serif italic text-base text-stone-100 hover:text-orange-500 transition-colors"
          >
            {isLogin ? 'Initiate a New Ritual' : 'Access your Existence'}
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};
