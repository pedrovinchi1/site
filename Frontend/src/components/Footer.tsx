import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">LEVƎ⅃ co.</h3>
            <p className="text-sm">Nascidos Para Representar</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="hover:text-white">Produtos</Link></li>
              <li><Link to="/About" className="hover:text-white">Conhehça Nossa História</Link></li>

            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Atendimento ao Cliente</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="hover:text-white">Contato</Link></li>
              <li><Link to="/shipping" className="hover:text-white">Envio</Link></li>
              <li><Link to="/returns" className="hover:text-white">Devoluções</Link></li>
              <li><Link to="/faq" className="hover:text-white">Perguntas Frequentes</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Siga-nos</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <Facebook size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <Instagram size={24} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <img src="/tiktok-svgrepo-com.svg" alt="TikTok" width="24" height="24" className="fill-current" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} LEVƎ⅃ co. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}