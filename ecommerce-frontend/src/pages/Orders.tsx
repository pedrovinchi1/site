import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { getOrderById, getOrders } from "../api/client";

interface Order {
  id: string;
  date: string;
  status: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    images: string[];
  }[];
  total: number;
}

export function Orders() {
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
        setError("Erro ao buscar pedidos. Tente novamente mais tarde.");
        console.error("Erro ao buscar pedidos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Você ainda não possui nenhum pedido.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Meus Pedidos</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">Pedido #{order.id}</p>
                  <p className="text-sm text-gray-500">Realizado em {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">R${order.total.toFixed(2)}</p>
                  <p
                    className={`text-sm ${
                      order.status === "Entregue"
                        ? "text-green-500"
                        : order.status === "Em transporte"
                        ? "text-blue-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>
                    </div>
                    <p className="text-gray-900 font-medium">R${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-right">
                <Link
                  to={`/orders/${order.id}`}
                  className="text-red-600 hover:text-red-500 font-medium"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}