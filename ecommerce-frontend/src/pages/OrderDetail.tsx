import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../api/client";

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

export function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) {
        setError("ID do pedido não fornecido.");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken") || "";
        const response = await getOrderById(id, token);
        setOrder(response.data);
      } catch (err) {
        setError("Erro ao buscar detalhes do pedido. Tente novamente mais tarde.");
        console.error("Erro ao buscar detalhes do pedido:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error || "Pedido não encontrado."}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Detalhes do Pedido</h1>

        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="flex justify-between items-center">
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
        </div>
      </div>
    </div>
  );
}