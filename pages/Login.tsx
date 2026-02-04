
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
    <div className="min-h-screen bg-stone-950 flex items-center justify-center relative overflow-hidden px-6 pt-20">
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

      <div ref={formRef} className="relative z-10 w-full max-w-lg p-8 md:p-14 bg-stone-900/30 backdrop-blur-3xl border border-stone-100/5 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
        <header className="text-center mb-10 md:mb-14">
          <span className="text-orange-500 font-sans text-[10px] tracking-[0.5em] uppercase font-bold opacity-80">
            {isLogin ? 'Welcome Back' : 'Join the Ritual'}
          </span>
          <h1 className="text-4xl md:text-6xl font-serif italic mt-4 text-stone-100 tracking-tight">
            {isLogin ? 'Access' : 'Initiate'}
          </h1>
        </header>

        {/* Toggle Switch */}
        <div className="flex mb-12 bg-stone-950/50 p-1 border border-stone-100/5 relative rounded-none">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 text-[10px] font-sans tracking-[0.3em] uppercase transition-all duration-500 relative z-10 ${isLogin ? 'text-stone-950 font-bold' : 'text-stone-500'}`}
          >
            Access
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 text-[10px] font-sans tracking-[0.3em] uppercase transition-all duration-500 relative z-10 ${!isLogin ? 'text-stone-950 font-bold' : 'text-stone-500'}`}
          >
            Initiate
          </button>
          <div 
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-stone-100 transition-transform duration-700 ease-expo ${isLogin ? 'translate-x-1' : 'translate-x-[calc(100%-4px)]'}`}
          />
        </div>

        <form className="space-y-12" onSubmit={handleEmailAuth}>
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-sans tracking-wider">
              {error}
            </div>
          )}

          {/* Success Message */}
          {user && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-sans tracking-wider text-center">
              Welcome, {user.displayName || user.email}! Redirecting...
            </div>
          )}

          {!isLogin && (
            <div className="relative group">
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-transparent border-b-2 border-stone-100/10 py-4 text-stone-100 font-sans focus:outline-none focus:border-orange-500 focus:shadow-[0_15px_40px_-15px_rgba(249,115,22,0.5)] transition-all peer placeholder-transparent"
                placeholder="Full Name"
                id="name"
              />
              <label htmlFor="name" className="absolute left-0 top-4 text-[10px] uppercase tracking-widest text-stone-500 font-sans transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-orange-500 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-orange-500">
                Full Name
              </label>
            </div>
          )}

          <div className="relative group">
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-transparent border-b-2 border-stone-100/10 py-4 text-stone-100 font-sans focus:outline-none focus:border-orange-500 focus:shadow-[0_15px_40px_-15px_rgba(249,115,22,0.5)] transition-all peer placeholder-transparent"
              placeholder="Email Address"
              id="email"
            />
            <label htmlFor="email" className="absolute left-0 top-4 text-[10px] uppercase tracking-widest text-stone-500 font-sans transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-orange-500 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-orange-500">
              Identity Email
            </label>
          </div>

          <div className="relative group">
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-transparent border-b-2 border-stone-100/10 py-4 text-stone-100 font-sans focus:outline-none focus:border-orange-500 focus:shadow-[0_15px_40px_-15px_rgba(249,115,22,0.5)] transition-all peer placeholder-transparent"
              placeholder="Passcode"
              id="password"
            />
            <label htmlFor="password" className="absolute left-0 top-4 text-[10px] uppercase tracking-widest text-stone-500 font-sans transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-orange-500 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-orange-500">
              Ritual Passcode
            </label>
          </div>

          <div className="flex flex-col gap-6 pt-6">
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-orange-500 text-stone-950 font-sans font-bold tracking-[0.4em] uppercase text-[10px] hover:bg-stone-100 transition-all shadow-[0_10px_30px_rgba(249,115,22,0.3)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : isLogin ? 'Access the Void' : 'Begin Extraction'}
            </button>
            
            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-px bg-stone-100/5" />
              <span className="text-[8px] font-sans uppercase tracking-[0.3em] text-stone-600">OR</span>
              <div className="flex-1 h-px bg-stone-100/5" />
            </div>

            {/* Google Login Button */}
            <button 
              type="button"
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full py-4 border border-stone-100/10 bg-stone-950/40 text-stone-100 font-sans tracking-[0.3em] uppercase text-[10px] flex items-center justify-center gap-4 hover:bg-stone-100 hover:text-stone-950 transition-all group active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 transition-colors" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.188 1.188-2.684 2.112-5.912 2.112-4.148 0-7.58-3.356-7.58-7.58s3.432-7.58 7.58-7.58c2.252 0 3.848.884 5.068 2.052l2.308-2.308c-1.96-1.832-4.516-2.924-7.376-2.924-6.224 0-11.28 5.056-11.28 11.28s5.056 11.28 11.28 11.28c3.412 0 6.008-1.128 8.128-3.336 2.112-2.112 2.78-5.116 2.78-7.664 0-.48-.04-.96-.12-1.42h-10.8z"/>
              </svg>
              Continue with Google
            </button>

            {isLogin && (
              <button className="mt-2 text-center text-[10px] font-sans tracking-[0.2em] uppercase text-stone-500 hover:text-orange-500 transition-colors">
                Lost Identity?
              </button>
            )}
          </div>
        </form>

        <div className="mt-12 text-center border-t border-stone-100/5 pt-8">
          <p className="text-[10px] font-sans text-stone-500 tracking-widest uppercase mb-4">
            {isLogin ? 'New to Brewinx?' : 'Already Initiated?'}
          </p>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="font-serif italic text-lg text-stone-100 hover:text-orange-500 transition-colors"
          >
            {isLogin ? 'Initiate a New Ritual' : 'Access your Existence'}
          </button>
        </div>
      </div>
    </div>
  );
};
