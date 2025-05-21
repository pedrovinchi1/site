import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { XCircle, RefreshCw, ArrowLeft } from "lucide-react";

export function CheckoutFailure() {
  const navigate = useNavigate();
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  useEffect(() => {
    // Simulação de busca de detalhes do erro no backend
    const fetchErrorDetails = async () => {
      try {
        const response = await axios.get("/payment/error-details");
        setErrorDetails(response.data.message);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      }
    };

    fetchErrorDetails();
  }, []);

  const handleTryAgain = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Ícone Principal */}
        <div className="mb-8">
          <XCircle className="h-16 w-16 text-red-500 mx-auto animate-pulse" />
        </div>

        {/* Título e Mensagem */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Pagamento Falhou</h1>
        <p className="text-gray-600 mb-8">
          Desculpe, mas não conseguimos processar seu pagamento. Não se preocupe - seu carrinho ainda está salvo e
          você pode tentar novamente.
        </p>

        {/* Detalhes do Erro */}
        {errorDetails && (
          <p className="text-red-600 mb-4">{errorDetails}</p>
        )}

        {/* Problemas Comuns */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-lg font-semibold mb-4">Problemas Comuns</h2>
          <ul className="text-left text-gray-600 space-y-3">
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-gray-400 mr-2">•</span>
              Fundos insuficientes na conta
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-gray-400 mr-2">•</span>
              Informações do cartão incorretas
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-gray-400 mr-2">•</span>
              Cartão expirado ou inválido
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-gray-400 mr-2">•</span>
              Transação recusada pelo banco
            </li>
          </ul>
        </div>

        {/* Botões de Ação */}
        <div className="space-y-4">
          <button
            onClick={handleTryAgain}
            className="inline-flex items-center justify-center w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Tentar Novamente
          </button>
          <Link
            to="/cart"
            className="inline-flex items-center justify-center w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar ao Carrinho
          </Link>
          <p className="text-sm text-gray-500">
            Precisa de ajuda?{' '}
            <a href="/contact" className="text-indigo-600 hover:text-indigo-800">
              Contate nossa equipe de suporte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}