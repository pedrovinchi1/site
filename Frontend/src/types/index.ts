export interface ProductImage {
  url: string;
  color: string;
  isDefault?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: ProductImage[];
  category: string;
  sizes: string[];
  colors: string[];
  details: string[];
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  address?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}