import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { CreditCard, Info, MapPin, QrCode } from "lucide-react";
import { createOrder } from "../api/client";

export function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart, user } = useStore();
  const total = cart.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0);

  // Estado para controlar se usa endereço cadastrado ou novo
  const [useRegisteredAddress, setUseRegisteredAddress] = useState(true);

  // Estado para controlar o método de pagamento selecionado
  const [paymentMethod, setPaymentMethod] = useState("credit");

  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
    pixKey: "",
  });

  // Estado de carregamento
  const [isLoading, setIsLoading] = useState(false);

  // Função para atualizar os dados do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Função para validar os detalhes do cartão
  const validateCardDetails = () => {
    if (!/^\d{16}$/.test(formData.cardNumber)) {
      alert("Número do cartão inválido.");
      return false;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      alert("Data de validade inválida.");
      return false;
    }
    if (!/^\d{3}$/.test(formData.cvv)) {
      alert("CVV inválido.");
      return false;
    }
    return true;
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validação específica para cartão de crédito/débito
      if ((paymentMethod === "credit" || paymentMethod === "debit") && !validateCardDetails()) {
        setIsLoading(false);
        return;
      }

      // Obter token do usuário
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Usuário não autenticado.");
      }

      // Criar objeto de pedido
      const orderData = {
        shippingAddress: formData,
        paymentMethod: paymentMethod,
        items: cart.map((item: { id: string | number; quantity: number; selectedSize: string }) => ({
          productId: item.id,
          quantity: item.quantity,
          size: item.selectedSize,
        })),
      };

      // Enviar pedido ao backend
      await createOrder(orderData, token);

      // Limpar carrinho e redirecionar para a página de sucesso
      clearCart();
      navigate("/checkout/success");
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      navigate("/checkout/failure");
    } finally {
      setIsLoading(false);
    }
  };

  // Endereço registrado do usuário (exemplo)
  const registeredAddress = {
    address: user?.address || "Rua Exemplo, 123",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    zipCode: "01001-000",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Seção de Endereço */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-red-600" />
              Informações de Envio
            </h2>

            {/* Opções de endereço */}
            <div className="mb-6">
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    id="registered-address"
                    name="addressType"
                    type="radio"
                    checked={useRegisteredAddress}
                    onChange={() => setUseRegisteredAddress(true)}
                    className="h-4 w-4 text-red-600 focus:ring-red-500"
                  />
                  <label htmlFor="registered-address" className="ml-2 block text-sm font-medium text-gray-700">
                    Usar endereço cadastrado
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="new-address"
                    name="addressType"
                    type="radio"
                    checked={!useRegisteredAddress}
                    onChange={() => setUseRegisteredAddress(false)}
                    className="h-4 w-4 text-red-600 focus:ring-red-500"
                  />
                  <label htmlFor="new-address" className="ml-2 block text-sm font-medium text-gray-700">
                    Usar novo endereço
                  </label>
                </div>
              </div>
            </div>

            {/* Exibir endereço cadastrado */}
            {useRegisteredAddress ? (
              <div className="bg-gray-50 p-4 rounded-md mb-4 border border-gray-200">
                <p className="font-medium">{user?.name || ""}</p>
                <p className="text-gray-600">{registeredAddress.address}</p>
                <p className="text-gray-600">
                  {registeredAddress.neighborhood}, {registeredAddress.city} - {registeredAddress.state}
                </p>
                <p className="text-gray-600">CEP: {registeredAddress.zipCode}</p>
              </div>
            ) : (
              /* Formulário para novo endereço */
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Endereço
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                      Número
                    </label>
                    <input
                      type="text"
                      id="number"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="complement" className="block text-sm font-medium text-gray-700">
                      Complemento
                    </label>
                    <input
                      type="text"
                      id="complement"
                      name="complement"
                      value={formData.complement}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">
                      Bairro
                    </label>
                    <input
                      type="text"
                      id="neighborhood"
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      Cidade
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      Estado
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    CEP
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {/* Seção de Pagamento */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-red-600" />
              Forma de Pagamento
            </h2>

            {/* Tabs de métodos de pagamento */}
            <div className="mb-6">
              <div className="flex border-b">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("credit")}
                  className={`flex-1 py-2 px-4 text-center border-b-2 font-medium text-sm ${
                    paymentMethod === "credit"
                      ? "border-red-500 text-red-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Cartão de Crédito
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("debit")}
                  className={`flex-1 py-2 px-4 text-center border-b-2 font-medium text-sm ${
                    paymentMethod === "debit"
                      ? "border-red-500 text-red-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Cartão de Débito
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("pix")}
                  className={`flex-1 py-2 px-4 text-center border-b-2 font-medium text-sm ${
                    paymentMethod === "pix"
                      ? "border-red-500 text-red-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  PIX
                </button>
              </div>
            </div>

            {/* Formulário de Cartão de Crédito/Débito */}
            {(paymentMethod === "credit" || paymentMethod === "debit") && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                    Número do Cartão
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="0000 0000 0000 0000"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">
                    Nome no Cartão
                  </label>
                  <input
                    type="text"
                    id="cardholderName"
                    name="cardholderName"
                    value={formData.cardholderName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                      Data de Validade
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/AA"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    />
                  </div>
                </div>

                {paymentMethod === "credit" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Parcelamento
                    </label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      defaultValue="1"
                    >
                      <option value="1">À vista - R$ {total.toFixed(2)}</option>
                      <option value="2">2x sem juros - R$ {(total / 2).toFixed(2)}</option>
                      <option value="3">3x sem juros - R$ {(total / 3).toFixed(2)}</option>
                      <option value="4">4x sem juros - R$ {(total / 4).toFixed(2)}</option>
                      <option value="5">5x sem juros - R$ {(total / 5).toFixed(2)}</option>
                      <option value="6">6x sem juros - R$ {(total / 6).toFixed(2)}</option>
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* Opção de PIX */}
            {paymentMethod === "pix" && (
              <div className="text-center space-y-4">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 inline-block">
                  <QrCode className="h-48 w-48 mx-auto text-gray-800" />
                  <p className="mt-2 text-sm text-gray-600">Escaneie o QR Code para pagar</p>
                </div>

                <div className="text-left">
                  <p className="block text-sm font-medium text-gray-700 mb-2">Ou copie a chave PIX:</p>
                  <div className="flex">
                    <input
                      type="text"
                      readOnly
                      className="block w-full rounded-l-md border-gray-300 bg-gray-50"
                      value="00020126580014BR.GOV.BCB.PIX0136a629534e-7e14-43ff-af5f-4631f7a4524"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-100 rounded-r-md border border-gray-300 hover:bg-gray-200"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "00020126580014BR.GOV.BCB.PIX0136a629534e-7e14-43ff-af5f-4631f7a4524"
                        );
                        alert("Chave PIX copiada!");
                      }}
                    >
                      Copiar
                    </button>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 text-left">
                  <div className="flex">
                    <Info className="h-5 w-5 text-yellow-400 flex-shrink-0 mr-2" />
                    <div>
                      <p className="text-sm text-yellow-800">
                        O pagamento será processado automaticamente. Após concluir a transferência, sua compra
                        será confirmada em até 1 minuto.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Botão de Finalização */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Processando..." : `Finalizar Pedido - R$ ${total.toFixed(2)}`}
          </button>
        </form>

          {/* Resumo do Pedido */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            {cart.map((item: {
              id: string | number;
              selectedSize: string;
              images: string[];
              name: string;
              price: number;
              quantity: number;
            }) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden mr-4">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Tamanho: {item.selectedSize} × {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}

            <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Frete</span>
                <span className="text-green-600">Grátis</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}