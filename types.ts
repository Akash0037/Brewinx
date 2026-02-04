
export type Category = 'Hot' | 'Cold' | 'Specialty' | 'Bakery';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  options?: {
    milk?: string[];
    sweetness?: string[];
    temperature?: string[];
  };
}

export interface CartItem extends Product {
  quantity: number;
  customizations?: Record<string, string>;
}

export interface AppContextType {
  cart: CartItem[];
  favorites: string[]; // Store product IDs
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  toggleFavorite: (id: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}
