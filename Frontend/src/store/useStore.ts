import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface Store {
  cart: CartItem[];
  user: {
    isAuthenticated: boolean;
    email: string | null;
  };
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setUser: (email: string | null) => void;
}

export const useStore = create<Store>((set) => ({
  cart: [],
  user: {
    isAuthenticated: false,
    email: null,
  },
  addToCart: (product, size) =>
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.id === product.id && item.selectedSize === size
      );

      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id && item.selectedSize === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        cart: [...state.cart, { ...product, quantity: 1, selectedSize: size }],
      };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ cart: [] }),
  setUser: (email) =>
    set({
      user: {
        isAuthenticated: !!email,
        email,
      },
    }),
}));