import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';

export function CheckoutSuccess() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Pedido Confirmado!
        </h1>
        <p className="text-gray-600 mb-8">
          Obrigado pela sua compra. Recebemos seu pedido e começaremos a processá-lo imediatamente. Você receberá um e-mail de confirmação com os detalhes do seu pedido em breve.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-lg font-semibold mb-4">What's Next?</h2>
          <ul className="text-left text-gray-600 space-y-3">
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-green-500 mr-2">✓</span>
              Email de Confirmação de Pedido Enviado
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-green-500 mr-2">✓</span>
              Detalhes do Pedido Salvos em sua Conta
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-blue-500 mr-2">→</span>
              Processando e embalando seus itens
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-gray-400 mr-2">○</span>
              Envio e entrega
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <Link
            to="/products"
            className="inline-flex items-center justify-center w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Continue Comprando
          </Link>
            <Link
            to="/account/orders"
            className="inline-block text-indigo-600 hover:text-indigo-800"
            >
            Ver Detalhes do Pedido →
            </Link>
        </div>
      </div>
    </div>
  );
}