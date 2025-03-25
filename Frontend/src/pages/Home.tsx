import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Truck, BadgeCheck, Clock } from 'lucide-react';

export function Home() {
  // Categorias populares
  const categories = [
    { name: 'Dia a Dia', image: '/images/category-casual.jpg', slug: 'casual' },
    { name: 'Linha Esporte', image: '/images/category-sport.jpg', slug: 'esporte' },
    { name: 'Capinhas', image: '/images/category-phone.jpg', slug: 'capinha' },
    { name: 'Bonés', image: '/images/category-cap.jpg', slug: 'bones' },
  ];

  // Produtos em destaque
  const featuredProducts = [
    { 
      id: '1', 
      name: 'Camiseta Flaming Adaga', 
      price: 89.90, 
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'
    },
    { 
      id: '2', 
      name: 'Regata Urban Style', 
      price: 69.90, 
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990'
    },
    { 
      id: '3', 
      name: 'Boné Snapback', 
      price: 59.90, 
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820'
    },
  ];

  return (
    <div>
      {/* Hero Section - Mantendo o original com pequenas melhorias */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src="/images/logos/LOGO2.png"
            alt="LEVƎ⅃ co."
            className="w-full h-screen object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div className="relative min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Bem Vindos à LEVƎ⅃ co.
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Nascidos Para Representar
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/products"
                className="bg-white text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Compre Agora
              </Link>
              <Link
                to="/About"
                className="bg-transparent text-white border border-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Conheça Nossa História
              </Link>
            </div>
            
            <div className="absolute bottom-10 left-0 right-0 text-center">
              <button 
                onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}
                className="text-white animate-bounce"
              >
                <span className="sr-only">Rolar para baixo</span>
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vantagens da loja */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
              <Truck className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Frete Grátis</h3>
              <p className="text-gray-600">Em compras acima de R$350 para todo o Brasil</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
              <BadgeCheck className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Qualidade Garantida</h3>
              <p className="text-gray-600">Produtos premium com materiais de alta qualidade</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
              <Clock className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">Seu pedido será produzido em até 7 dias úteis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categorias em destaque */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Categorias em Destaque</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore nossas coleções exclusivas para expressar seu estilo único
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link key={index} to={`/products?category=${category.slug}`} className="group">
                <div className="relative overflow-hidden rounded-lg h-64">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                    <span className="inline-flex items-center text-sm text-white group-hover:underline">
                      Ver produtos <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Produtos em destaque */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Destaques da Semana</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Confira os produtos mais vendidos da nossa coleção
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-80 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-red-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-900 font-bold">R$ {product.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/products" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              Ver Todos os Produtos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Depoimentos */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Carlos Silva</h4>
                  <div className="flex text-yellow-400">
                    {'★★★★★'.split('').map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Ótima qualidade das camisetas! O tecido é super confortável e o design é único. 
                Já comprei várias peças e sempre recebo elogios."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Ana Souza</h4>
                  <div className="flex text-yellow-400">
                    {'★★★★★'.split('').map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Adoro a linha esportiva! As peças são super confortáveis para treinar e o 
                design é estiloso. A entrega foi rápida e o atendimento excelente."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Rafael Mendes</h4>
                  <div className="flex text-yellow-400">
                    {'★★★★'.split('').map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "As capinhas de celular são muito resistentes e os designs são incríveis. 
                Já tenho três diferentes e todas mantêm a qualidade mesmo após meses de uso."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Instagram Feed */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Siga-nos no Instagram</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              @levelco
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <a key={i} href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block aspect-square overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-${1570000000000 + i * 1000}`} 
                  alt="Instagram post" 
                  className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}