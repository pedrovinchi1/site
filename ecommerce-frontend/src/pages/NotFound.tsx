import React from "react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-4">
      {/* Ícone ou Imagem de Erro */}
      <div className="mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-red-600 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h7.875c.621 0 1.125-.504 1.125-1.125V15m-8.375 4h7.75c.621 0 1.125-.504 1.125-1.125V7m-8.375 10h7.75c.621 0 1.125-.504 1.125-1.125V9"
          />
        </svg>
      </div>

      {/* Título e Mensagem */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Página não encontrada</h1>
      <p className="text-gray-600 mb-8">
        Desculpe, a página que você está procurando não existe ou foi removida.
      </p>

      {/* Botão de Retorno */}
      <Link
        to="/"
        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
      >
        Voltar para a Página Inicial
      </Link>
    </div>
  );
}