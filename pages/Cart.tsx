
import React, { useState } from 'react';
import { Minus, Plus, Trash2, ArrowRight, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Link, useNavigate } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, placeOrder, user } = useApp();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    placeOrder();
    setOrderPlaced(true);
    setTimeout(() => {
      navigate('/account');
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-stone-950 pt-48 flex flex-col items-center px-6">
        <CheckCircle className="w-20 h-20 text-green-500 mb-8" />
        <h1 className="text-4xl md:text-6xl font-serif italic text-stone-100 mb-4 text-center">Order Placed Successfully!</h1>
        <p className="text-stone-500 text-center mb-8">Redirecting to your orders...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-stone-950 pt-48 flex flex-col items-center px-6">
        <h1 className="text-6xl md:text-8xl font-serif italic text-stone-100 mb-12 text-center">The Altar is Empty.</h1>
        <Link 
          to="/menu"
          className="group relative px-12 py-5 border border-stone-100/20 text-stone-100 font-sans tracking-[0.3em] uppercase text-xs overflow-hidden"
        >
          <span className="relative z-10">Return to The Collection</span>
          <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-stone-950 pt-32 min-h-screen text-stone-100 px-6 md:px-12 pb-24">
      <header className="mb-16">
        <span className="text-orange-500 font-sans text-xs tracking-[0.5em] uppercase">Order Summary</span>
        <h1 className="text-6xl md:text-8xl font-serif mt-4">Your Ritual</h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-1 space-y-8">
          {cart.map(item => (
            <div key={item.id} className="group flex flex-col md:flex-row gap-8 pb-8 border-b border-stone-100/5 items-center">
              <div className="w-32 h-40 bg-stone-900 overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500" />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-serif italic">{item.name}</h3>
                <p className="text-xs font-sans tracking-widest text-stone-500 uppercase mt-2">
                  {Object.entries(item.customizations || {}).map(([k, v]) => `${k}: ${v}`).join(' • ') || 'Standard Brew'}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-6 mt-6">
                  <div className="flex items-center border border-stone-100/10 rounded-full px-4 py-2 gap-6">
                    <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-orange-500"><Minus className="w-4 h-4" /></button>
                    <span className="text-sm font-sans w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-orange-500"><Plus className="w-4 h-4" /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-stone-500 hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="text-2xl font-serif">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-[400px]">
          <div className="sticky top-32 p-10 bg-stone-900/50 backdrop-blur-xl border border-stone-100/10">
            <h3 className="text-xl font-serif italic mb-8">Summary</h3>
            <div className="space-y-4 font-sans text-xs tracking-widest uppercase opacity-60">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Alchemy Tax (8%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-stone-100/10 flex justify-between text-stone-100 text-lg opacity-100">
                <span className="font-serif italic">Total</span>
                <span className="font-serif italic">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handlePlaceOrder}
              className="w-full mt-10 py-5 bg-orange-500 text-stone-950 font-sans font-bold tracking-[0.3em] uppercase text-xs flex items-center justify-center gap-4 hover:bg-stone-100 transition-colors"
            >
              {user ? 'Finalize Extraction' : 'Login to Order'}
              <ArrowRight className="w-4 h-4" />
            </button>
            
            {!user && (
              <p className="mt-4 text-orange-500/80 text-[10px] font-sans text-center uppercase tracking-widest">
                Please login to place your order
              </p>
            )}
            
            <p className="mt-6 text-[10px] font-sans opacity-30 text-center uppercase tracking-widest leading-relaxed">
              *By finalizing, you acknowledge the high-extraction rituals performed by Brewinx.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};