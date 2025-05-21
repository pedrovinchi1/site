import { create } from "zustand";

// Tipagem dos itens do carrinho
interface CartItem {
  id: string;
  name: string;
  price: number;
  images: string[]; // URLs das imagens
  selectedSize: string;
  quantity: number;
}

// Tipagem do usuário autenticado
interface User {
  id: string;
  name: string;
  email: string;
  address?: string;
  role: string;
  isAuthenticated?: boolean; // Adiciona a propriedade que falta
}

// Tipagem do estado global
interface StoreState {
  cart: CartItem[];
  user: User | null;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setUser: (userData: User) => void;
  logout: () => void;
}

// Criação do hook de estado global usando Zustand
export const useStore = create<StoreState>((set) => ({
  cart: [],
  user: null,

  // Função para adicionar um item ao carrinho
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id && cartItem.selectedSize === item.selectedSize);

      if (existingItem) {
        // Se o item já existe, incrementa a quantidade
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id && cartItem.selectedSize === item.selectedSize
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      }

      // Se o item não existe, adiciona ao carrinho
      return {
        cart: [...state.cart, { ...item, quantity: 1 }],
      };
    }),

  // Função para remover um item do carrinho
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  // Função para atualizar a quantidade de um item no carrinho
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),

  // Função para limpar o carrinho
  clearCart: () =>
    set(() => ({
      cart: [],
    })),

  // Função para definir o usuário logado
  setUser: (userData) =>
    set(() => ({
      user: { ...userData, isAuthenticated: true },
    })),

  // Função para deslogar o usuário
  logout: () =>
    set(() => ({
      user: null,
    })),
}));