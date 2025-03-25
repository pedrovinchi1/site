import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useStore } from '../store/useStore';

const AdminLayout = ({ children }) => {
  const { user, setUser } = useStore();
  
  const handleLogout = () => {
    setUser(null);
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/admin" className="flex items-center">
            <span className="text-2xl font-bold text-red-600">LEVƎL</span>
            <span className="ml-2 text-xl font-semibold text-gray-800">Admin</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="bg-red-100 rounded-full h-8 w-8 flex items-center justify-center text-red-600 mr-2">
                <User className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-gray-700">{user?.name || 'Administrador'}</span>
            </div>
            
            <button 
              onClick={handleLogout}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} LEVƎL Store. Todos os direitos reservados.</p>
            <div className="text-sm text-gray-500">
              <span>Versão 1.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;