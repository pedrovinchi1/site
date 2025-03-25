import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ChevronRight, ChevronLeft, Check, User, MapPin } from 'lucide-react';

export function Register() {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  // Form data for step 1 (Account)
  const [accountData, setAccountData] = useState({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  // Form data for step 2 (Shipping)
  const [shippingData, setShippingData] = useState({
    name: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountData({
      ...accountData,
      [e.target.name]: e.target.value,
    });
    // Clear errors when user types
    setError('');
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });
  };

  const validateStep1 = () => {
    if (!accountData.email || !accountData.confirmEmail || 
        !accountData.password || !accountData.confirmPassword) {
      setError('Por favor, preencha todos os campos');
      return false;
    }
    
    if (accountData.email !== accountData.confirmEmail) {
      setError('Os emails não coincidem');
      return false;
    }
    
    if (accountData.password !== accountData.confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }
    
    if (accountData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevious = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Aqui você faria a integração com o Supabase para criar o usuário
      // Por exemplo:
      // const { data, error } = await supabase.auth.signUp({
      //   email: accountData.email,
      //   password: accountData.password,
      //   options: {
      //     data: {
      //       name: shippingData.name,
      //       address: shippingData.address,
      //       // ... outros dados
      //     }
      //   }
      // });
      
      // Simulando criação bem-sucedida
      setUser(accountData.email);
      
      // Redirecionar para a página de sucesso ou login
      navigate('/register/success');
    } catch (error) {
      setError('Erro ao criar conta. Por favor, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-8">
        
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > 1 ? <Check className="h-6 w-6" /> : <User className="h-6 w-6" />}
              </div>
              <span className="text-sm mt-2 font-medium text-gray-700">Conta</span>
            </div>
            
            <div className="flex-1 h-1 mx-4 bg-gray-200">
              <div 
                className="h-full bg-red-600 transition-all duration-300" 
                style={{ width: step === 1 ? '0%' : '100%' }}
              ></div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                <MapPin className="h-6 w-6" />
              </div>
              <span className="text-sm mt-2 font-medium text-gray-700">Endereço</span>
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-8">
          {step === 1 ? 'Crie sua conta' : 'Informações de envio'}
        </h2>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* Step 1: Account Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={accountData.email}
                  onChange={handleAccountChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700">
                  Confirmar Email
                </label>
                <input
                  type="email"
                  id="confirmEmail"
                  name="confirmEmail"
                  value={accountData.confirmEmail}
                  onChange={handleAccountChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={accountData.password}
                  onChange={handleAccountChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  A senha deve ter pelo menos 6 caracteres
                </p>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={accountData.confirmPassword}
                  onChange={handleAccountChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
              
              <button
                type="button"
                onClick={handleNext}
                className="w-full flex items-center justify-center bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors"
              >
                Próximo
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          )}
          
          {/* Step 2: Shipping Information */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={shippingData.name}
                  onChange={handleShippingChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
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
                    value={shippingData.address}
                    onChange={handleShippingChange}
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
                    value={shippingData.number}
                    onChange={handleShippingChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="complement" className="block text-sm font-medium text-gray-700">
                  Complemento (opcional)
                </label>
                <input
                  type="text"
                  id="complement"
                  name="complement"
                  value={shippingData.complement}
                  onChange={handleShippingChange}
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
                  value={shippingData.neighborhood}
                  onChange={handleShippingChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
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
                    value={shippingData.city}
                    onChange={handleShippingChange}
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
                    value={shippingData.state}
                    onChange={handleShippingChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
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
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    CEP
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={shippingData.zipCode}
                    onChange={handleShippingChange}
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
                    value={shippingData.phone}
                    onChange={handleShippingChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex-1 flex items-center justify-center border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="mr-2 h-5 w-5" />
                  Anterior
                </button>
                
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors"
                >
                  Criar Conta
                </button>
              </div>
            </div>
          )}
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}