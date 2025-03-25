import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Navbar() {
  const { cart, user } = useStore();
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-white">
          LEVƎ⅃ co.
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/products" className="text-white hover:text-white">
              Produtos
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingBag className="h-6 w-6 text-white hover:text-white" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <Link to={user.isAuthenticated ? "/account" : "/login"}>
              <User className="h-6 w-6 text-white hover:text-white" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}