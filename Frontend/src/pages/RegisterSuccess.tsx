import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, User } from 'lucide-react';

export function RegisterSuccess() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Conta Criada com Sucesso!
        </h1>
        <p className="text-gray-600 mb-8">
          Bem-vindo à LEVƎ⅃ co.! Sua conta foi criada e você já pode começar a comprar.
          Enviamos um email de confirmação para o seu endereço de email.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-lg font-semibold mb-4">O que fazer agora?</h2>
          <ul className="text-left text-gray-600 space-y-3">
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-green-500 mr-2">✓</span>
              Explorar nossa coleção de produtos
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-green-500 mr-2">✓</span>
              Completar seu perfil com preferências
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-blue-500 mr-2">→</span>
              Conferir nossas novidades e promoções
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <Link
            to="/products"
            className="inline-flex items-center justify-center w-full bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Começar a Comprar
          </Link>
          <Link
            to="/profile"
            className="inline-flex items-center justify-center w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
          >
            <User className="h-5 w-5 mr-2" />
            Gerenciar Conta
          </Link>
        </div>
      </div>
    </div>
  );
}