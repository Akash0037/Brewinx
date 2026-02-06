import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { Heart, Trash2, X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { logOut } from '../firebase';
import { PRODUCTS } from '../constants';
import { Product, CartItem } from '../types';

export const Account: React.FC = () => {
  const { user, orders, favorites, toggleFavorite, addToCart } = useApp();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Get favorite products
  const favoriteProducts = PRODUCTS.filter(product => favorites.includes(product.id));

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out' }
      );
    }
  }, [user, navigate]);

  const handleSignOut = async () => {
    await logOut();
    navigate('/');
  };

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    const modal = document.querySelector('.modal-overlay');
    const content = document.querySelector('.modal-content');
    
    gsap.timeline({
      onComplete: () => setSelectedProduct(null)
    })
    .to(content, { opacity: 0, scale: 0.9, filter: 'blur(20px)', duration: 0.5, ease: 'power2.in' })
    .to(modal, { opacity: 0, duration: 0.4 }, '-=0.2');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-16 px-3 md:px-4">
      <div ref={containerRef} className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-8">My Account</h1>

        {/* Profile Section */}
        <div className="bg-stone-900/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8 border border-stone-800">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 text-center sm:text-left">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'Profile'}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-orange-500 flex-shrink-0"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-500/20 flex items-center justify-center border-2 border-orange-500 flex-shrink-0">
                <span className="text-2xl md:text-3xl text-orange-500">
                  {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                </span>
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-xl md:text-2xl font-semibold text-white truncate">
                {user.displayName || 'Coffee Lover'}
              </h2>
              <p className="text-stone-400 text-sm md:text-base truncate">{user.email}</p>
              {user.isGoogleUser && (
                <span className="inline-block mt-2 px-3 py-1 bg-stone-800 rounded-full text-xs text-stone-300">
                  Google Account
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Order History Section */}
        <div className="bg-stone-900/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8 border border-stone-800">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Order History</h3>
          {orders.length === 0 ? (
            <p className="text-stone-400 text-sm md:text-base">No orders yet. Start exploring our menu!</p>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-stone-800/50 rounded-lg md:rounded-xl p-3 md:p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-stone-300 text-sm">Order #{order.id.slice(-6)}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'ready' ? 'bg-blue-500/20 text-blue-400' :
                      order.status === 'preparing' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-stone-700 text-stone-300'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-white font-medium">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''} · ₹{order.total.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Favorites Section */}
        <div className="bg-stone-900/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8 border border-stone-800">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <Heart className="w-4 h-4 md:w-5 md:h-5 text-orange-500" fill="#f97316" />
            <h3 className="text-lg md:text-xl font-semibold text-white">My Favorites</h3>
          </div>
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-6 md:py-8">
              <Heart className="w-10 h-10 md:w-12 md:h-12 text-stone-700 mx-auto mb-3" />
              <p className="text-stone-400 mb-4 text-sm md:text-base">No favorites yet. Add some from our menu!</p>
              <Link 
                to="/menu" 
                className="inline-block px-5 md:px-6 py-2 bg-orange-500 text-stone-950 font-semibold rounded-lg hover:bg-orange-400 transition-colors text-sm md:text-base"
              >
                Explore Menu
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:gap-4">
              {favoriteProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-stone-800/50 rounded-lg md:rounded-xl p-3 md:p-4 flex gap-3 md:gap-4 group cursor-pointer hover:bg-stone-800/70 transition-colors"
                  onClick={() => handleOpenModal(product)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-sm md:text-base truncate group-hover:text-orange-500 transition-colors">{product.name}</h4>
                    <p className="text-stone-400 text-xs md:text-sm truncate">{product.description}</p>
                    <div className="flex items-center justify-between mt-2 gap-2">
                      <p className="text-orange-500 font-semibold text-sm md:text-base">₹{product.price}</p>
                      <button
                        onClick={(e) => { e.stopPropagation(); addToCart({ ...product, quantity: 1 }); }}
                        className="flex items-center gap-1 px-2 md:px-3 py-1 bg-orange-500 text-stone-950 text-[10px] md:text-xs font-semibold rounded-lg hover:bg-orange-400 transition-colors"
                        title="Add to cart"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span className="hidden xs:inline">Add</span>
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="self-start p-1.5 md:p-2 text-stone-500 hover:text-red-500 transition-colors flex-shrink-0"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full py-3 md:py-4 bg-stone-800 hover:bg-stone-700 text-white rounded-lg md:rounded-xl transition-colors duration-300 font-medium text-sm md:text-base"
        >
          Sign Out
        </button>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={handleCloseModal} 
          onAdd={addToCart}
          isFavorite={favorites.includes(selectedProduct.id)}
          onToggleFavorite={() => toggleFavorite(selectedProduct.id)}
        />
      )}
    </div>
  );
};

// Product Detail Modal Component
const ProductModal: React.FC<{ 
  product: Product; 
  onClose: () => void;
  onAdd: (item: CartItem) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}> = ({ product, onClose, onAdd, isFavorite, onToggleFavorite }) => {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentItems = useRef<HTMLDivElement[]>([]);
  const numOptions = product.options ? Object.keys(product.options).length : 0;

  useLayoutEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
      .fromTo(modalRef.current, 
        { scale: 0.95, opacity: 0, y: 40, filter: 'blur(30px)' }, 
        { scale: 1, opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'expo.out' },
        "-=0.2"
      )
      .fromTo(contentItems.current.filter(Boolean), 
        { scale: 0.9, opacity: 0, filter: 'blur(10px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', stagger: 0.08, duration: 0.8, ease: 'power4.out' },
        "-=0.6"
      );
  }, []);

  const handleAdd = () => {
    onAdd({ ...product, quantity, customizations: selections });
    onClose();
  };

  return (
    <div 
      ref={overlayRef}
      className="modal-overlay fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-stone-950/98 backdrop-blur-3xl"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div 
        ref={modalRef}
        className="modal-content relative w-full max-w-5xl max-h-[90vh] bg-stone-900/40 border border-stone-100/10 flex flex-col md:flex-row overflow-hidden"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] p-3 text-stone-100 hover:text-orange-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Product Image */}
        <div className="w-full md:w-1/2 h-[200px] md:h-auto relative overflow-hidden bg-stone-900">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <button
            onClick={onToggleFavorite}
            className="absolute top-4 right-4 p-3 bg-stone-950/40 backdrop-blur-md rounded-full text-stone-100 border border-stone-100/10 hover:bg-orange-500 transition-all active:scale-90"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current text-orange-500' : ''}`} />
          </button>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col overflow-y-auto scrollbar-hide">
          <div ref={el => { if (el) contentItems.current[0] = el; }} className="mb-8">
            <span className="text-orange-500 font-sans text-[10px] tracking-[0.5em] uppercase font-bold opacity-60">{product.category}</span>
            <h2 className="text-3xl md:text-5xl font-serif italic mt-3 leading-none tracking-tighter">{product.name}</h2>
            <p className="mt-4 text-stone-400 text-sm font-sans leading-relaxed">
              {product.description}
            </p>
            <p className="mt-4 text-2xl font-serif text-orange-500">₹{product.price}</p>
          </div>

          {/* Options */}
          <div className="flex-1 space-y-6">
            {product.options && Object.entries(product.options).map(([key, vals], idx) => (
              <div key={key} ref={el => { if (el) contentItems.current[idx + 1] = el; }} className="space-y-3">
                <h4 className="text-[10px] font-sans tracking-[0.4em] uppercase text-stone-500 font-bold">{key}</h4>
                <div className="flex flex-wrap gap-2">
                  {(vals as string[]).map(v => (
                    <button
                      key={v}
                      onClick={() => setSelections(prev => ({ ...prev, [key]: v }))}
                      className={`px-4 py-2 border text-[10px] font-sans tracking-[0.2em] uppercase transition-all duration-300 ${
                        selections[key] === v 
                        ? 'bg-stone-100 border-stone-100 text-stone-950 font-bold' 
                        : 'border-stone-100/10 text-stone-500 hover:border-stone-100/40 hover:text-stone-100'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div ref={el => { if (el) contentItems.current[numOptions + 1] = el; }} className="space-y-3">
              <h4 className="text-[10px] font-sans tracking-[0.4em] uppercase text-stone-500 font-bold">Quantity</h4>
              <div className="flex items-center gap-6 bg-stone-950/40 border border-stone-100/10 w-fit rounded-full px-4 py-2">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="text-stone-400 hover:text-orange-500 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-serif italic min-w-[1.5rem] text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="text-stone-400 hover:text-orange-500 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <div ref={el => { if (el) contentItems.current[numOptions + 2] = el; }} className="mt-8 pt-6 border-t border-stone-100/5 flex items-center justify-between gap-4">
            <div>
              <span className="block text-[10px] font-sans tracking-widest text-stone-600 uppercase">Total</span>
              <div className="text-2xl md:text-3xl font-serif italic">₹{product.price * quantity}</div>
            </div>
            <button 
              onClick={handleAdd}
              className="group relative px-6 md:px-10 py-4 overflow-hidden border border-orange-500 text-orange-500 font-sans font-bold tracking-[0.3em] uppercase text-[9px] hover:text-stone-950 transition-colors flex items-center gap-3"
            >
              <Plus className="w-4 h-4 relative z-10 group-hover:rotate-90 transition-transform duration-500" />
              <span className="relative z-10">Add to Cart</span>
              <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
