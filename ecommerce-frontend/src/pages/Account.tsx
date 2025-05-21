import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { getOrders } from "../api/client";

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
}

export function Account() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getOrders(user.id); // Substitua pelo ID do usuário autenticado
        setOrders(response.data);
      } catch (err) {
        setError("Erro ao buscar dados da conta. Tente novamente mais tarde.");
        console.error("Erro ao buscar dados da conta:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Redirecionando para login...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Minha Conta</h1>

        {/* Informações da Conta */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações da Conta</h2>
          <p className="text-gray-700">
            <strong>Nome:</strong> {user.name || "Não informado"}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {user.email}
          </p>
          <Link to="/account/edit" className="text-red-600 hover:text-red-500 mt-4 inline-block">
            Editar informações
          </Link>
        </div>

        {/* Histórico de Pedidos */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Histórico de Pedidos</h2>
          {orders.length === 0 ? (
            <p className="text-gray-500">Você ainda não possui nenhum pedido.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-900 font-medium">Pedido #{order.id}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()} - {order.status}
                    </p>
                  </div>
                  <p className="text-gray-900 font-medium">R${order.total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Endereços Salvos */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Endereços Salvos</h2>
          <p className="text-gray-700">Rua Exemplo, 123 - Bairro Fictício, São Paulo - SP, 00000-000</p>
          <Link to="/account/addresses" className="text-red-600 hover:text-red-500 mt-4 inline-block">
            Gerenciar endereços
          </Link>
        </div>
      </div>
    </div>
  );
}