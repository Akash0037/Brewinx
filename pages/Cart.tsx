
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
      <div className="min-h-screen bg-stone-950 pt-28 sm:pt-36 md:pt-48 flex flex-col items-center px-4 sm:px-6">
        <CheckCircle className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-green-500 mb-6 sm:mb-8" />
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-serif italic text-stone-100 mb-3 sm:mb-4 text-center">Order Placed Successfully!</h1>
        <p className="text-stone-500 text-sm sm:text-base text-center mb-6 sm:mb-8">Redirecting to your orders...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-stone-950 pt-28 sm:pt-36 md:pt-48 flex flex-col items-center px-4 sm:px-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-serif italic text-stone-100 mb-8 sm:mb-12 text-center">The Altar is Empty.</h1>
        <Link 
          to="/menu"
          className="group relative px-6 sm:px-8 md:px-12 py-4 sm:py-5 border border-stone-100/20 text-stone-100 font-sans tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-xs overflow-hidden"
        >
          <span className="relative z-10">Return to The Collection</span>
          <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-stone-950 pt-24 sm:pt-28 md:pt-32 min-h-screen text-stone-100 px-4 sm:px-6 md:px-12 pb-16 sm:pb-20 md:pb-24">
      <header className="mb-8 sm:mb-12 md:mb-16">
        <span className="text-orange-500 font-sans text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] uppercase">Order Summary</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif mt-2 sm:mt-3 md:mt-4">Your Ritual</h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 md:gap-16">
        {/* Cart Items */}
        <div className="flex-1 space-y-6 sm:space-y-8">
          {cart.map(item => (
            <div key={item.id} className="group flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 pb-6 sm:pb-8 border-b border-stone-100/5">
              {/* Product Image */}
              <div className="w-full sm:w-24 md:w-32 h-36 sm:h-32 md:h-40 bg-stone-900 overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500" />
              </div>
              
              {/* Product Details */}
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-serif italic">{item.name}</h3>
                  <p className="text-[10px] sm:text-xs font-sans tracking-wider sm:tracking-widest text-stone-500 uppercase mt-1 sm:mt-2">
                    {Object.entries(item.customizations || {}).map(([k, v]) => `${k}: ${v}`).join(' • ') || 'Standard Brew'}
                  </p>
                  
                  {/* Quantity Controls - Mobile */}
                  <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-4 sm:mt-6">
                    <div className="flex items-center border border-stone-100/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 gap-4 sm:gap-6">
                      <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-orange-500 p-1">
                        <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                      <span className="text-xs sm:text-sm font-sans w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-orange-500 p-1">
                        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-stone-500 hover:text-red-500 transition-colors p-1">
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-xl sm:text-2xl font-serif text-center sm:text-right mt-2 sm:mt-0">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-[350px] xl:w-[400px]">
          <div className="lg:sticky lg:top-32 p-6 sm:p-8 md:p-10 bg-stone-900/50 backdrop-blur-xl border border-stone-100/10 rounded-lg lg:rounded-none">
            <h3 className="text-lg sm:text-xl font-serif italic mb-6 sm:mb-8">Summary</h3>
            <div className="space-y-3 sm:space-y-4 font-sans text-[10px] sm:text-xs tracking-wider sm:tracking-widest uppercase opacity-60">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Alchemy Tax (8%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="pt-3 sm:pt-4 border-t border-stone-100/10 flex justify-between text-stone-100 text-base sm:text-lg opacity-100">
                <span className="font-serif italic">Total</span>
                <span className="font-serif italic">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handlePlaceOrder}
              className="w-full mt-8 sm:mt-10 py-4 sm:py-5 bg-orange-500 text-stone-950 font-sans font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-xs flex items-center justify-center gap-3 sm:gap-4 hover:bg-stone-100 transition-colors active:scale-[0.98]"
            >
              {user ? 'Finalize Extraction' : 'Login to Order'}
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            
            {!user && (
              <p className="mt-3 sm:mt-4 text-orange-500/80 text-[9px] sm:text-[10px] font-sans text-center uppercase tracking-wider sm:tracking-widest">
                Please login to place your order
              </p>
            )}
            
            <p className="mt-4 sm:mt-6 text-[9px] sm:text-[10px] font-sans opacity-30 text-center uppercase tracking-wider sm:tracking-widest leading-relaxed">
              *By finalizing, you acknowledge the high-extraction rituals performed by Brewinx.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};