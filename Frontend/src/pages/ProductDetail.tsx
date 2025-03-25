import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Truck, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';

const products: Product[] = [
  {
    id: '1',
    name: 'Flaming Adaga',
    price: 29.99,
    description: 'Essential cotton t-shirt',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
        color: 'Branco',
        isDefault: true
      },
      {
        url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990',
        color: 'Preto'
      },
      {
        url: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820',
        color: 'Cinza'
      }
    ],
    category: 'Camiseta',
    sizes: ['P', 'M', 'G', 'GG', 'XG'],
    colors: ['Branco', 'Preto', 'Cinza'],
    details: [
      '100% Premium Cotton',
      'Regular fit',
      'Crew neck',
      'Machine washable'
    ],
    weight: 0.2,
    dimensions: {
      length: 28,
      width: 20,
      height: 2
    }
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    price: 79.99,
    description: 'Modern slim fit denim',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
        color: 'Blue',
        isDefault: true
      },
      {
        url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
        color: 'Black'
      },
      {
        url: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f',
        color: 'Gray'
      }
    ],
    category: 'Jeans',
    sizes: ['30', '32', '34', '36'],
    colors: ['Blue', 'Black', 'Gray'],
    details: [
      '98% Cotton, 2% Elastane',
      'Slim fit',
      'Five-pocket styling',
      'Machine washable'
    ],
    weight: 0.5,
    dimensions: {
      length: 40,
      width: 30,
      height: 3
    }
  },
];

const shippingMethods = [
  { id: 'express', name: 'Entrega Expressa', price: 15.99, days: '1-2' },
  { id: 'standard', name: 'Entrega Padrão', price: 5.99, days: '3-5' },
  { id: 'free', name: 'Frete Grátis', price: 0, days: '7-10' },
];

const paymentMethods = [
  { id: 'credit', name: 'Crédito', icon: CreditCard },
  { id: 'debit', name: 'Débito', icon: CreditCard },
  { id: 'pix', name: 'PIX', icon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <rect x="7" y="7" width="3" height="3" />
      <rect x="14" y="7" width="3" height="3" />
      <rect x="7" y="14" width="3" height="3" />
      <rect x="14" y="14" width="3" height="3" />
    </svg>
  ) },
];

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const addToCart = useStore(state => state.addToCart);

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedShipping, setSelectedShipping] = useState(shippingMethods[0]);
  const [zipCode, setZipCode] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return <div>Produto não Encontrado</div>;
  }

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addToCart(product, selectedSize);
    }
  };

  const calculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally make an API call to calculate shipping
    // For now, we'll just show the shipping methods
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    const colorImageIndex = product.images.findIndex(img => img.color === color);
    if (colorImageIndex !== -1) {
      setCurrentImageIndex(colorImageIndex);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="relative">
          <div className="relative aspect-square">
            <img
              src={product.images[currentImageIndex].url}
              alt={`${product.name} - ${product.images[currentImageIndex].color}`}
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          
          {/* Thumbnail Navigation */}
          <div className="flex gap-2 mt-4 justify-center">
            {product.images.map((image, index) => (
              <button
                key={image.color}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                  currentImageIndex === index
                    ? 'border-red-600'
                    : 'border-transparent'
                }`}
              >
                <img
                  src={image.url}
                  alt={`${product.name} - ${image.color}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold mb-6">R${product.price}</p>
          
          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Cores</h3>
            <div className="flex gap-2">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`px-4 py-2 border rounded-md ${
                    selectedColor === color
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Tamanhos</h3>
            <div className="flex gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize || !selectedColor}
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-400 mb-8"
          >
            Adicionar ao Carrinho
          </button>

          {/* Shipping Calculator */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Truck className="h-5 w-5 mr-2" />
              Calcular Frete
            </h3>
            <form onSubmit={calculateShipping} className="flex gap-4">
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Digite seu CEP"
                className="flex-1 rounded-md border-gray-300"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              >
                Calcular
              </button>
            </form>

            {/* Shipping Methods */}
            <div className="mt-4 space-y-2">
              {shippingMethods.map(method => (
                <label
                  key={method.id}
                  className={`flex items-center justify-between p-3 border rounded-md cursor-pointer ${
                    selectedShipping.id === method.id
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-300'
                  }`}
                >
                  <div>
                    <input
                      type="radio"
                      name="shipping"
                      checked={selectedShipping.id === method.id}
                      onChange={() => setSelectedShipping(method)}
                      className="mr-2"
                    />
                    <span>{method.name}</span>
                    <span className="text-gray-500 text-sm ml-2">
                      ({method.days} business days)
                    </span>
                  </div>
                  <span className="font-semibold">
                    {method.price === 0 ? 'FREE' : `R$${method.price}`}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Métodos de Pagamento</h3>
            <div className="grid grid-cols-3 gap-4">
              {paymentMethods.map(method => (
                <div
                  key={method.id}
                  className="flex items-center justify-center p-4 border rounded-md"
                >
                  <method.icon className="h-6 w-6 mr-2" />
                  <span>{method.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Detalhes do Produto</h3>
            <ul className="list-disc list-inside space-y-2">
              {product.details.map((detail, index) => (
                <li key={index} className="text-gray-600">{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}