import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sobre a Empresa */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">LEVƎ⅃ co.</h3>
            <p className="text-sm">Nascidos Para Representar</p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="hover:text-white">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  Conheça Nossa História
                </Link>
              </li>
            </ul>
          </div>

          {/* Atendimento ao Cliente */}
          <div>
            <h4 className="font-semibold mb-4">Atendimento ao Cliente</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-white">
                  Envio
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-white">
                  Devoluções
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white">
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="font-semibold mb-4">Siga-nos</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-transform hover:scale-110"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-transform hover:scale-110"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-transform hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="hover:text-white"
                >
                  <path d="M9 19c0 3.87 6 3.87 6 0M12 5v14M18 13.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Direitos Autorais */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} LEVƎ⅃ co. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}