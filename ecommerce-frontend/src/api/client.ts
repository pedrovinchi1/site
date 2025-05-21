import axios, { AxiosInstance } from "axios";

// Configuração do cliente HTTP
const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api", // Substitua pelo URL do seu backend
  timeout: 10000, // Timeout de 10 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

// Função para adicionar o token de autenticação ao cabeçalho
const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

// Funções para autenticação
export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/token", { username: email, password });
    return response.data; // Retorna o token JWT
  } catch (error) {
    throw new Error("Erro ao fazer login. Verifique suas credenciais.");
  }
};

export const register = async (userData: any) => {
  try {
    const response = await apiClient.post("/users/", userData);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao registrar usuário.");
  }
};

// Funções para produtos
export const getProducts = async (params?: any) => {
  try {
    const response = await apiClient.get("/products/", { params });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar produtos.");
  }
};

export const getProductById = async (productId: string) => {
  try {
    const response = await apiClient.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar detalhes do produto.");
  }
};

// Funções para o carrinho
export const addToCart = async (productId: string, quantity: number, size: string, token: string) => {
  try {
    setAuthToken(token);
    const response = await apiClient.post("/cart", { productId, quantity, size });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao adicionar item ao carrinho.");
  }
};

export const removeFromCart = async (productId: string, token: string) => {
  try {
    setAuthToken(token);
    const response = await apiClient.delete(`/cart/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao remover item do carrinho.");
  }
};

export const updateCartItemQuantity = async (productId: string, quantity: number, token: string) => {
  try {
    setAuthToken(token);
    const response = await apiClient.put(`/cart/${productId}`, { quantity });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao atualizar quantidade do item no carrinho.");
  }
};

// Funções para pedidos
export const createOrder = async (orderData: any, token: string) => {
  try {
    setAuthToken(token);
    const response = await apiClient.post("/orders", orderData);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao criar pedido.");
  }
};

export const getOrders = async (token: string) => {
  try {
    setAuthToken(token);
    const response = await apiClient.get("/orders");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar pedidos.");
  }
};

export const getOrderById = async (orderId: string, token: string) => {
  try {
    setAuthToken(token);
    const response = await apiClient.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar detalhes do pedido.");
  }
};

// Funções para categorias
export const getCategories = async () => {
  try {
    const response = await apiClient.get("/categories/");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar categorias.");
  }
};

// Funções para reviews
export const getReviews = async (productId: string) => {
  try {
    const response = await apiClient.get(`/reviews/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar avaliações.");
  }
};

export const addReview = async (productId: string, reviewData: any, token: string) => {
  try {
    setAuthToken(token);
    const response = await apiClient.post(`/reviews/${productId}`, reviewData);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao adicionar avaliação.");
  }
};

export async function calculateShippingAPI(zipCode: string) {
  // Simulação de chamada à API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ 
        success: true, 
        message: `Frete calculado com sucesso para o CEP ${zipCode}!`,
        zipCode 
      });
    }, 1000);
  });
}

export async function getPaymentMethods() {
  // Simulação de chamada à API
  return [
    { id: "credit", name: "Crédito", icon: "CreditCard" },
    { id: "debit", name: "Débito", icon: "CreditCard" },
    { id: "pix", name: "PIX", icon: "PixIcon" },
  ];
}
export async function getShippingMethods() {
  // Simulação de chamada à API
  return [
    { id: "standard", name: "Entrega Padrão", days: "3-5", price: 0 },
    { id: "express", name: "Entrega Expressa", days: "1-2", price: 15 },
    { id: "same_day", name: "Entrega no Mesmo Dia", days: "Hoje", price: 25 }
  ];
}