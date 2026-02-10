
import React, { useState, useLayoutEffect, useRef } from 'react';
import { X, Plus, Minus, Heart, Zap } from 'lucide-react';
import gsap from 'gsap';
import { Flip } from 'gsap/dist/Flip';
import { PRODUCTS } from '../constants.ts';
import { Product, Category, CartItem } from '../types.ts';
import { useApp } from '../context/AppContext.tsx';
import { Footer } from '../components/Footer.tsx';

gsap.registerPlugin(Flip);

// Extension of the product type for menu-specific display
interface MenuProduct extends Product {
  intensity?: number;
  notes?: string[];
}

// Product-specific notes based on name and category
const getProductNotes = (product: Product): string[] => {
  const notesMap: Record<string, string[]> = {
    // Specialty
    'Brewinx Noir': ['Charcoal', 'Oak', 'Cacao'],
    'Velvet Caramel Latte': ['Caramel', 'Silky', 'Sweet'],
    'Hazelnut Affogato': ['Hazelnut', 'Gelato', 'Rich'],
    'Lavender Honey Cold Brew': ['Lavender', 'Honey', 'Floral'],
    'Maple Cinnamon Cortado': ['Maple', 'Cinnamon', 'Spiced'],
    // Hot
    'Espresso': ['Bold', 'Crema', 'Intense'],
    'Cappuccino': ['Foamy', 'Balanced', 'Classic'],
    'Latte': ['Smooth', 'Creamy', 'Mild'],
    'Americano': ['Clean', 'Bold', 'Simple'],
    'Mocha': ['Chocolate', 'Rich', 'Indulgent'],
    'Macchiato': ['Marked', 'Strong', 'Espresso'],
    'Flat White': ['Velvety', 'Microfoam', 'Smooth'],
    // Cold
    'Cold Brew': ['Smooth', 'Refreshing', 'Bold'],
    'Iced Coffee': ['Chilled', 'Crisp', 'Refreshing'],
    'Iced Americano': ['Bold', 'Icy', 'Clean'],
    'Iced Vietnamese Coffee': ['Sweet', 'Creamy', 'Bold'],
    'Iced Caramel Macchiato': ['Caramel', 'Vanilla', 'Layered'],
    'Iced Shaken Espresso': ['Frothy', 'Shaken', 'Intense'],
    'Whipped Coffee (Dalgona)': ['Whipped', 'Creamy', 'Viral'],
    // Bakery
    'Butter Croissant': ['Flaky', 'Buttery', 'Fresh'],
    'Blueberry Muffin': ['Fruity', 'Moist', 'Sweet'],
    'Glazed Donut': ['Sweet', 'Fluffy', 'Glazed'],
    'Breakfast Sandwich': ['Savory', 'Hearty', 'Warm'],
    'Chocolate Chip Cookie': ['Chewy', 'Chocolate', 'Warm'],
    'Fudge Brownie': ['Fudgy', 'Rich', 'Decadent'],
  };
  
  return notesMap[product.name] || (product.category === 'Specialty' ? ['Premium', 'Crafted'] : ['Classic', 'Fresh']);
};

const getProductIntensity = (product: Product): number => {
  if (product.category === 'Specialty') return 9;
  if (product.category === 'Hot') return 7;
  if (product.category === 'Cold') return 6;
  return 4; // Bakery
};

const MENU_PRODUCTS: MenuProduct[] = PRODUCTS.map(p => ({
  ...p,
  intensity: getProductIntensity(p),
  notes: getProductNotes(p),
}));

export const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart, favorites, toggleFavorite } = useApp();
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const categories: (Category | 'All')[] = ['All', 'Hot', 'Cold', 'Specialty', 'Bakery'];
  const filteredProducts = activeCategory === 'All' 
    ? MENU_PRODUCTS 
    : MENU_PRODUCTS.filter(p => p.category === activeCategory);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.menu-header-item', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'expo.out'
      });
      
      // Grid entrance
      gsap.from('.product-card', {
        y: 60,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: 'power3.out',
        delay: 0.4
      });
    });
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const state = Flip.getState('.product-card');
    Flip.from(state, {
      duration: 0.8,
      scale: true,
      ease: 'expo.inOut',
      stagger: 0.02,
      onEnter: elements => gsap.fromTo(elements, 
        { opacity: 0, scale: 0.95 }, 
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      ),
      onLeave: elements => gsap.to(elements, 
        { opacity: 0, scale: 0.9, duration: 0.4 }
      )
    });
  }, [activeCategory]);

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

  return (
    <div className="bg-stone-950 pt-24 md:pt-48 min-h-screen text-stone-100 px-4 sm:px-6 md:px-16 pb-0">
      <header ref={headerRef} className="mb-12 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12">
        <div className="space-y-2 md:space-y-4">
          <span className="menu-header-item block text-orange-500 font-sans text-[8px] md:text-[10px] tracking-[0.5em] md:tracking-[0.8em] uppercase font-bold opacity-60">The Collection</span>
          <h1 className="menu-header-item text-4xl sm:text-5xl md:text-[10rem] font-serif italic tracking-tighter leading-[0.85]">Rituals of<br/>Extraction</h1>
        </div>
        
        <nav className="menu-header-item flex flex-wrap gap-1.5 md:gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 sm:px-6 md:px-8 py-2 md:py-3 text-[9px] md:text-[10px] font-sans tracking-[0.2em] md:tracking-[0.3em] uppercase transition-all duration-700 overflow-hidden ${
                activeCategory === cat 
                ? 'text-stone-950' 
                : 'text-stone-500 hover:text-stone-100'
              }`}
            >
              <span className="relative z-10">{cat}</span>
              {activeCategory === cat && (
                <div className="absolute inset-0 bg-stone-100 rounded-full" />
              )}
            </button>
          ))}
        </nav>
      </header>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-8 md:gap-x-12 gap-y-12 sm:gap-y-16 md:gap-y-24 mb-20 md:mb-40">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product as MenuProduct} 
            isFav={favorites.includes(product.id)}
            onToggleFav={() => toggleFavorite(product.id)}
            onAddToCart={() => addToCart({ ...product, quantity: 1 })}
            onOpen={() => handleOpenModal(product)}
          />
        ))}
      </div>

      <Footer />

      {selectedProduct && (
        <CustomizationModal 
          product={selectedProduct} 
          onClose={handleCloseModal} 
          onAdd={addToCart}
        />
      )}
    </div>
  );
};

const ProductCard: React.FC<{
  product: MenuProduct;
  isFav: boolean;
  onToggleFav: () => void;
  onAddToCart: () => void;
  onOpen: () => void;
}> = ({ product, isFav, onToggleFav, onAddToCart, onOpen }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    gsap.to(imgRef.current, {
      x: -x * 40,
      y: -y * 40,
      scale: 1.15,
      duration: 1.2,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imgRef.current, {
      x: 0,
      y: 0,
      scale: 1.05,
      duration: 1.5,
      ease: 'expo.out'
    });
  };

  return (
    <div ref={cardRef} className="product-card group flex flex-col">
      <div 
        className="relative aspect-[4/5] overflow-hidden bg-stone-900/50 cursor-pointer border border-stone-100/5 shadow-2xl"
        onClick={onOpen}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img 
          ref={imgRef}
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover grayscale brightness-[0.6] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-105"
        />
        
        {/* Overlay Badges */}
        <div className="absolute inset-x-3 sm:inset-x-6 top-3 sm:top-6 flex justify-between items-start pointer-events-none">
          <div className="flex flex-col gap-1.5 sm:gap-2">
            {product.notes?.map((note, i) => (
              <span key={i} className="px-2 sm:px-3 py-0.5 sm:py-1 bg-stone-950/40 backdrop-blur-md text-[7px] sm:text-[8px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-stone-300 border border-stone-100/10 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" style={{ transitionDelay: `${i * 50}ms` }}>
                {note}
              </span>
            ))}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFav(); }}
            className="pointer-events-auto p-2 sm:p-3 bg-stone-950/40 backdrop-blur-md rounded-full text-stone-100 border border-stone-100/10 hover:bg-orange-500 transition-all active:scale-90"
          >
            <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isFav ? 'fill-current text-stone-950' : ''}`} />
          </button>
        </div>

        {/* Quick Add Section */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8 flex justify-between items-end bg-gradient-to-t from-stone-950/80 to-transparent">
          <div className="space-y-3 sm:space-y-4 w-full">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-[8px] sm:text-[9px] tracking-widest uppercase text-stone-400">Intensity</span>
              <div className="flex-1 h-0.5 bg-stone-100/10 relative overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-orange-500/60 transition-all duration-1000 ease-expo"
                  style={{ width: `${(product.intensity || 5) * 10}%` }}
                />
              </div>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
              className="w-full h-10 sm:h-12 md:h-14 bg-stone-100 text-stone-950 flex items-center justify-center gap-2 sm:gap-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-expo hover:bg-orange-500"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-[8px] sm:text-[9px] md:text-[10px] font-sans font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase">Add to Ritual</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 sm:mt-6 md:mt-10 flex justify-between items-start gap-2">
        <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif italic tracking-tighter group-hover:text-orange-500 transition-colors duration-700 truncate">{product.name}</h3>
          <p className="text-[8px] sm:text-[9px] font-sans tracking-[0.3em] sm:tracking-[0.5em] text-stone-600 uppercase">{product.category}</p>
        </div>
        <div className="text-lg sm:text-xl md:text-2xl font-serif flex flex-col items-end flex-shrink-0">
          <span className="text-stone-400/40 text-[8px] sm:text-[10px] font-sans tracking-widest uppercase mb-0.5 sm:mb-1">Cost</span>
          ₹{product.price}
        </div>
      </div>
    </div>
  );
};

const CustomizationModal: React.FC<{ 
  product: Product; 
  onClose: () => void;
  onAdd: (item: CartItem) => void;
}> = ({ product, onClose, onAdd }) => {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const bloomItems = useRef<HTMLDivElement[]>([]);
  // Stable count of options for ref indexing to avoid overwrite issues
  const numOptions = product.options ? Object.keys(product.options).length : 0;

  useLayoutEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
      .fromTo(modalRef.current, 
        { scale: 0.95, opacity: 0, y: 40, filter: 'blur(30px)' }, 
        { scale: 1, opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'expo.out' },
        "-=0.2"
      )
      .fromTo(bloomItems.current, 
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
      className="modal-overlay fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-12 bg-stone-950/98 backdrop-blur-3xl"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div 
        ref={modalRef}
        className="modal-content relative w-full max-w-7xl h-[95vh] sm:h-[90vh] md:h-[80vh] bg-stone-900/40 border border-stone-100/10 flex flex-col md:flex-row overflow-hidden rounded-lg md:rounded-none"
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-6 sm:right-6 md:top-8 md:right-8 z-[110] p-2 sm:p-3 md:p-4 text-stone-100 hover:text-orange-500 transition-colors bg-stone-950/50 md:bg-transparent rounded-full"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </button>

        <div className="w-full md:w-1/2 h-[30%] sm:h-[35%] md:h-full relative overflow-hidden bg-stone-900 flex-shrink-0">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-12 lg:p-24 flex flex-col flex-1 overflow-y-auto scrollbar-hide" data-lenis-prevent>
          {/* Fix: Callback ref must return void, and using stable indices for GSAP */}
          <div ref={el => { if (el) bloomItems.current[0] = el; }} className="mb-8 sm:mb-12 md:mb-20">
            <span className="text-orange-500 font-sans text-[10px] sm:text-xs tracking-[0.5em] sm:tracking-[0.8em] uppercase font-bold opacity-60">Fine-Tune Ritual</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-serif italic mt-3 sm:mt-4 md:mt-6 leading-none tracking-tighter">{product.name}</h2>
            <p className="mt-4 sm:mt-6 md:mt-8 text-stone-500 text-[10px] sm:text-xs md:text-sm font-sans tracking-wider sm:tracking-widest uppercase leading-relaxed sm:leading-loose max-w-sm">
              {product.description}
            </p>
          </div>

          <div className="flex-1 space-y-8 sm:space-y-12 md:space-y-16">
            {product.options && Object.entries(product.options).map(([key, vals], idx) => (
              /* Fix: Callback ref must return void, and using stable indices for GSAP */
              <div key={key} ref={el => { if (el) bloomItems.current[idx + 1] = el; }} className="space-y-4 sm:space-y-6 md:space-y-8">
                <h4 className="text-[9px] sm:text-[10px] font-sans tracking-[0.4em] sm:tracking-[0.6em] uppercase text-stone-600 font-bold">{key}</h4>
                <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                  {(vals as string[]).map(v => (
                    <button
                      key={v}
                      onClick={() => setSelections(prev => ({ ...prev, [key]: v }))}
                      className={`px-4 sm:px-6 md:px-10 py-2 sm:py-3 md:py-4 border text-[9px] sm:text-[10px] font-sans tracking-[0.3em] sm:tracking-[0.4em] uppercase transition-all duration-500 relative overflow-hidden group ${
                        selections[key] === v 
                        ? 'bg-stone-100 border-stone-100 text-stone-950 font-bold' 
                        : 'border-stone-100/10 text-stone-500 hover:border-stone-100/40 hover:text-stone-100'
                      }`}
                    >
                      <span className="relative z-10">{v}</span>
                      {selections[key] !== v && (
                        <div className="absolute inset-0 bg-stone-100 translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-5" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity Selector Section */}
            {/* Fix: Callback ref must return void, and using stable indices for GSAP */}
            <div ref={el => { if (el) bloomItems.current[numOptions + 1] = el; }} className="space-y-4 sm:space-y-6 md:space-y-8">
              <h4 className="text-[9px] sm:text-[10px] font-sans tracking-[0.4em] sm:tracking-[0.6em] uppercase text-stone-600 font-bold">Volume</h4>
              <div className="flex items-center gap-6 sm:gap-8 md:gap-10 bg-stone-950/40 border border-stone-100/10 w-fit rounded-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="text-stone-400 hover:text-orange-500 transition-colors p-1"
                >
                  <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <span className="text-lg sm:text-xl font-serif italic min-w-[1.5rem] text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="text-stone-400 hover:text-orange-500 transition-colors p-1"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Fix: Callback ref must return void, and using stable indices for GSAP */}
          <div ref={el => { if (el) bloomItems.current[numOptions + 2] = el; }} className="mt-8 sm:mt-12 md:mt-20 pt-6 sm:pt-8 md:pt-12 border-t border-stone-100/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div className="space-y-1">
              <span className="block text-[9px] sm:text-[10px] font-sans tracking-wider sm:tracking-widest text-stone-600 uppercase">Total Intensity</span>
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-serif italic">₹{product.price * quantity}</div>
            </div>
            <button 
              onClick={handleAdd}
              className="group relative w-full sm:w-auto px-6 sm:px-10 md:px-16 py-4 sm:py-5 md:py-7 overflow-hidden border border-orange-500 text-orange-500 font-sans font-bold tracking-[0.3em] sm:tracking-[0.5em] md:tracking-[0.6em] uppercase text-[9px] md:text-[10px] hover:text-stone-950 transition-colors flex items-center justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5 relative z-10 group-hover:rotate-90 transition-transform duration-500" />
              <span className="relative z-10">Add to Ritual</span>
              <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-expo" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
