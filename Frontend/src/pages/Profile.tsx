import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { User, Settings, ShoppingBag, Clock, LogOut, CreditCard, Heart, MapPin, ChevronRight, Check, Truck } from 'lucide-react';

export function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useStore();
  const [activeTab, setActiveTab] = useState('account');
  const [successMessage, setSuccessMessage] = useState('');

  // Dados do usuário - normalmente você obteria isso do seu estado global ou backend
  const [userData, setUserData] = useState({
    name: 'João Silva',
    email: user.email || 'joao.silva@exemplo.com',
    phone: '(11) 98765-4321',
    address: 'Rua Exemplo, 123',
    number: '123',
    complement: 'Apto 45',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01001-000',
  });

  // Dados fictícios para histórico de pedidos
  const orderHistory = [
    {
      id: 'ORD-2023-001',
      date: '15/11/2023',
      status: 'Entregue',
      total: 189.90,
      items: [
        { name: 'Camiseta Flaming Adaga', size: 'M', quantity: 1, price: 89.90 },
        { name: 'Boné Snapback', size: 'Único', quantity: 1, price: 59.90 },
      ],
      trackingCode: 'BR1234567890XX'
    },
    {
      id: 'ORD-2023-002',
      date: '03/12/2023',
      status: 'Em processamento',
      total: 129.80,
      items: [
        { name: 'Camiseta Level Rock', size: 'G', quantity: 2, price: 64.90 },
      ],
      trackingCode: null
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você enviaria os dados atualizados para o backend
    
    // Simulação de sucesso
    setSuccessMessage('Informações atualizadas com sucesso!');
    
    // Limpar mensagem após 3 segundos
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleLogout = () => {
    // Limpar dados do usuário
    setUser(null);
    navigate('/login');
  };

  // Renderizar seção de dados da conta
  const renderAccountSection = () => (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-6 text-gray-900 flex items-center">
            <User className="mr-2 h-5 w-5 text-red-600" />
            Informações Pessoais
          </h3>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-6 text-gray-900 flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-red-600" />
            Endereço de Entrega
          </h3>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Endereço
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
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
                  value={userData.number}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="complement" className="block text-sm font-medium text-gray-700">
                  Complemento
                </label>
                <input
                  type="text"
                  id="complement"
                  name="complement"
                  value={userData.complement}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
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
                  value={userData.neighborhood}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  Cidade
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={userData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
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
                  value={userData.state}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                >
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
              
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                  CEP
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={userData.zipCode}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition-colors"
          >
            Salvar Alterações
          </button>
        </div>
      </form>

      {/* Opção para alterar senha */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-6 text-gray-900 flex items-center">
          <Settings className="mr-2 h-5 w-5 text-red-600" />
          Segurança
        </h3>
        
        <a 
          href="#" 
          className="inline-flex items-center text-red-600 hover:text-red-700"
          onClick={(e) => {
            e.preventDefault();
            // Implementar lógica para alterar senha
          }}
        >
          Alterar senha
          <ChevronRight className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  );

  // Renderizar seção de histórico de pedidos
  const renderOrderHistory = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-6 text-gray-900 flex items-center">
          <ShoppingBag className="mr-2 h-5 w-5 text-red-600" />
          Meus Pedidos
        </h3>
        
        {orderHistory.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Você ainda não realizou nenhum pedido.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orderHistory.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200">
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium">Pedido #{order.id}</h4>
                      <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                        order.status === 'Entregue' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'Em processamento'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      <Clock className="inline-block h-4 w-4 mr-1 -mt-1" />
                      {order.date}
                    </p>
                  </div>
                  
                  <div className="mt-3 sm:mt-0">
                    <a 
                      href={`#order-${order.id}`} 
                      className="text-red-600 hover:text-red-700 text-sm font-medium inline-flex items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        // Implementar visualização detalhada do pedido
                      }}
                    >
                      Ver detalhes
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Tamanho: {item.size} • Qtd: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">R$ {item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">R$ {order.total.toFixed(2)}</span>
                  </div>
                  
                  {order.trackingCode && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm flex items-center">
                        <Truck className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="text-gray-600 mr-2">Código de rastreamento:</span>
                        <span className="font-medium">{order.trackingCode}</span>
                      </p>
                    </div>
                  )}
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-2">
                    <button 
                      className="text-sm bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition-colors"
                      onClick={() => {
                        // Implementar ação de comprar novamente
                      }}
                    >
                      Comprar Novamente
                    </button>
                    
                    {order.status === 'Entregue' && (
                      <button 
                        className="text-sm border border-gray-300 text-gray-700 py-1 px-3 rounded-md hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          // Implementar ação de solicitar devolução
                        }}
                      >
                        Solicitar Devolução
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar com navegação */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-20">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg">
                  {userData.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {userData.name}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {userData.email}
                  </p>
                </div>
              </div>
            </div>
            
            <nav className="space-y-1 p-3">
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'account' 
                    ? 'bg-red-50 text-red-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User className={`mr-3 h-5 w-5 ${
                  activeTab === 'account' ? 'text-red-500' : 'text-gray-400'
                }`} />
                Meus Dados
              </button>
              
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'orders' 
                    ? 'bg-red-50 text-red-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ShoppingBag className={`mr-3 h-5 w-5 ${
                  activeTab === 'orders' ? 'text-red-500' : 'text-gray-400'
                }`} />
                Meus Pedidos
              </button>
              
              <button
                onClick={() => setActiveTab('favorites')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'favorites' 
                    ? 'bg-red-50 text-red-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Heart className={`mr-3 h-5 w-5 ${
                  activeTab === 'favorites' ? 'text-red-500' : 'text-gray-400'
                }`} />
                Favoritos
              </button>
              
              <button
                onClick={() => setActiveTab('payments')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'payments' 
                    ? 'bg-red-50 text-red-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <CreditCard className={`mr-3 h-5 w-5 ${
                  activeTab === 'payments' ? 'text-red-500' : 'text-gray-400'
                }`} />
                Métodos de Pagamento
              </button>
            </nav>
            
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <LogOut className="mr-2 h-4 w-4 text-gray-500" />
                Sair
              </button>
            </div>
          </div>
        </div>
        
        {/* Conteúdo principal */}
        <div className="lg:col-span-3">
          {/* Mensagem de sucesso */}
          {successMessage && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <p className="text-green-700">{successMessage}</p>
              </div>
            </div>
          )}
          
          {/* Título da seção ativa */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {activeTab === 'account' && 'Meus Dados'}
            {activeTab === 'orders' && 'Meus Pedidos'}
            {activeTab === 'favorites' && 'Meus Favoritos'}
            {activeTab === 'payments' && 'Métodos de Pagamento'}
          </h2>
          
          {/* Conteúdo baseado na tab ativa */}
          {activeTab === 'account' && renderAccountSection()}
          {activeTab === 'orders' && renderOrderHistory()}
          {activeTab === 'favorites' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center py-12">
              <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum favorito encontrado</h3>
              <p className="text-gray-500">Você ainda não adicionou produtos aos favoritos.</p>
            </div>
          )}
          {activeTab === 'payments' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center py-12">
              <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum método de pagamento salvo</h3>
              <p className="text-gray-500">Adicione métodos de pagamento para agilizar suas compras.</p>
              <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
                Adicionar Método de Pagamento
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}