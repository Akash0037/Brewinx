
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
    toppings?: string[];
  };
}

export interface CartItem extends Product {
  quantity: number;
  customizations?: Record<string, string>;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  createdAt: Date;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isGoogleUser: boolean;
}

export interface AppContextType {
  cart: CartItem[];
  favorites: string[];
  orders: Order[];
  user: UserProfile | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  toggleFavorite: (id: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  setUser: (user: UserProfile | null) => void;
  placeOrder: () => void;
  clearCart: () => void;
}
