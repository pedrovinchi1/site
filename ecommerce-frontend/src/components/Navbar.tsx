import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, User } from "lucide-react";
import { useStore } from "../store/useStore";

export function Navbar() {
  const { cart, user } = useStore();
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = user?.id != null; // Adjust based on your User type

  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white">
            LEVƎ⅃ co.
          </Link>

          {/* Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-white hover:text-gray-300 transition-colors">
              Produtos
            </Link>
            <Link to="/cart" aria-label="Carrinho de compras" className="relative">
              <ShoppingBag className="h-6 w-6 text-white hover:text-gray-300 transition-colors" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transform translate-x-1/2 -translate-y-1/2">
                  {cartItemsCount}
                </span>
              )}
            <Link to={isLoggedIn ? "/account" : "/login"} aria-label="Minha conta">
              <User className="h-6 w-6 text-white hover:text-gray-300 transition-colors" />
            </Link>
            </Link>
          </div>

          {/* Menu Hambúrguer (Mobile) */}
          <div className="flex md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Dropdown (Mobile) */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 right-0 bg-black p-4 space-y-4">
            <Link to="/products" className="text-white block hover:text-gray-300 transition-colors">
              Produtos
            </Link>
            <Link to="/cart" aria-label="Carrinho de compras" className="relative block">
              <ShoppingBag className="h-6 w-6 text-white hover:text-gray-300 transition-colors" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transform translate-x-1/2 -translate-y-1/2">
                  {cartItemsCount}
                </span>
              )}
            <Link to={isLoggedIn ? "/account" : "/login"} aria-label="Minha conta" className="block">
              <User className="h-6 w-6 text-white hover:text-gray-300 transition-colors" />
            </Link>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}