import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ChevronDown } from 'lucide-react';
import { Product } from '../types';

const categories: { id: string; name: string; slug: string }[] = [
  { id: '1', name: 'Dia a Dia', slug: 'Camiseta' },
  { id: '2', name: 'Oversized', slug: 'Oversized' },
  { id: '3', name: 'Linha Esporte', slug: 'Esporte' },
  { id: '4', name: 'Capinhas de Celular', slug: 'Capinha' },
  { id: '5', name: 'Chinelos', slug: 'Chinelo' },
  { id: '6', name: 'Bonés', slug: 'Cone' },
  { id: '7', name: 'Eco Bag', slug: 'Eco' },


];

const products: Product[] = [
  {
    id: '1',
    name: 'Flaming Adaga',
    price: 89.90,
    description: 'Camiseta Flaming Adaga',
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
      '100% Algodão Premium',
      'Caimento Regular',
      'Gola redonda',
      'Lavável à máquina'
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
    name: 'Flaming Adaga',
    price: 89.90,
    description: 'Camiseta Flaming Adaga',
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
      '100% Algodão Premium',
      'Caimento Regular',
      'Gola redonda',
      'Lavável à máquina'
    ],
    weight: 0.2,
    dimensions: {
      length: 28,
      width: 20,
      height: 2
    }
  },
];

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const productsPerPage = 12;

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  useEffect(() => {
    const loadMoreProducts = () => {
      const newProducts = filteredProducts.slice(0, page * productsPerPage);
      setVisibleProducts(newProducts);
    };

    loadMoreProducts();
  }, [page, selectedCategory]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Categories Sidebar - Desktop */}
        <div className="hidden md:block w-64">
          <h2 className="text-lg font-semibold mb-4">Categorias</h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.slug);
                  setPage(1);
                }}
                className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                  selectedCategory === category.slug
                    ? 'bg-red-100 text-red-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Dropdown - Mobile */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="w-full flex items-center justify-between px-4 py-2 bg-white border rounded-md shadow-sm"
          >
            <span>{selectedCategory || 'Todas as Categorias'}</span>
            <ChevronDown className="h-5 w-5" />
          </button>
          {showCategories && (
            <div className="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.slug);
                    setShowCategories(false);
                    setPage(1);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {visibleProducts.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.images.find(img => img.isDefault)?.url || product.images[0].url}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">R${product.price}</span>
                    <span className="text-sm text-gray-500">{product.category}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}