import React from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useStore } from "../store/useStore";
import { removeFromCart, updateCartItemQuantity } from "../api/client";

export function Cart() {
  const { cart, removeFromCart: removeFromStore, updateQuantity: updateStoreQuantity } = useStore();
  // Get token from appropriate source (localStorage, context, etc.)
  const token = localStorage.getItem('token') || ''; // Ensure token is never null
  const total = cart.reduce((sum: number, item: {price: number, quantity: number}) => sum + item.price * item.quantity, 0);

  const handleRemoveFromCart = async (id: string) => {
    try {
      await removeFromCart(id, token); // Chama a API
      removeFromStore(id); // Atualiza o estado local
    } catch (error) {
      console.error("Erro ao remover item:", error);
    }
  };

  const handleUpdateQuantity = async (id: string, quantity: number) => {
    try {
      await updateCartItemQuantity(id, quantity, token); // Chama a API
      updateStoreQuantity(id, quantity); // Atualiza o estado local
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Seu Carrinho Está Vazio</h2>
        <Link to="/products" className="text-red-600 hover:text-red-800">
          Continue Comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.map((item: { id: string; name: string; images: string[]; selectedSize: string; price: number; quantity: number }) => (
            <div key={`${item.id}-${item.selectedSize}`} className="flex items-center border-b py-4">
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="ml-4 flex-grow">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">Tamanho: {item.selectedSize}</p>
                <div className="flex items-center mt-2">
                  <select
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      if (newQuantity > 0) {
                        handleUpdateQuantity(item.id, newQuantity);
                      }
                    }}
                    className="border rounded-md mr-4"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">R${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>R${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Envio</span>
              <span>Grátis</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>R${total.toFixed(2)}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full bg-red-600 text-white text-center py-3 rounded-md mt-6 hover:bg-red-700 transition-colors"
            >
              Continue para o Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}