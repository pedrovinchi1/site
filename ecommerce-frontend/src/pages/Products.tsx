import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { getProducts } from "../api/client";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string; // URLs separadas por vírgula
  category: string;
}

const categories = [
  { id: "1", name: "Dia a Dia", slug: "Camiseta" },
  { id: "2", name: "Oversized", slug: "Oversized" },
  { id: "3", name: "Linha Esporte", slug: "Esporte" },
  { id: "4", name: "Capinhas de Celular", slug: "Capinha" },
  { id: "5", name: "Chinelos", slug: "Chinelo" },
  { id: "6", name: "Bonés", slug: "Cone" },
  { id: "7", name: "Eco Bag", slug: "Eco" },
];

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async (category?: string, pageNum: number = 1) => {
    try {
      const response = await getProducts();
      
      // Filter by category if specified
      let filteredProducts = category 
        ? response.filter((p: Product) => p.category === category) 
        : response;
      
      // Apply pagination
      const startIndex = (pageNum - 1) * 12;
      const endIndex = startIndex + 12;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      if (paginatedProducts.length > 0) {
        setProducts((prev) => [...prev, ...paginatedProducts]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false); // Não há mais produtos para carregar
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Carregar produtos iniciais
    fetchProducts(selectedCategory || undefined);
  }, [selectedCategory]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        if (hasMore) {
          fetchProducts(selectedCategory || undefined, page);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedCategory, page, hasMore]);

  if (loading) {
    return <p className="text-center py-10">Carregando produtos...</p>;
  }

  if (!products || products.length === 0) {
    return <p className="text-center py-10">Nenhum produto encontrado.</p>;
  }

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
                  setProducts([]); // Limpar produtos ao trocar de categoria
                  setHasMore(true); // Resetar o estado de carregamento
                }}
                className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                  selectedCategory === category.slug
                    ? "bg-red-100 text-red-700"
                    : "hover:bg-gray-100"
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
            <span>{selectedCategory || "Todas as Categorias"}</span>
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
                    setProducts([]); // Limpar produtos ao trocar de categoria
                    setHasMore(true); // Resetar o estado de carregamento
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
            {products.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.images.split(",")[0]}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">R${product.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500">{product.category}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {!hasMore && (
            <p className="text-center py-4 text-gray-500">Você viu todos os produtos.</p>
          )}
        </div>
      </div>
    </div>
  );
}