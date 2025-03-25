import React, { useState } from 'react';
import { Phone, Mail, Instagram, Facebook, MapPin, Send, Check, AlertCircle } from 'lucide-react';

export function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simular envio do formulário (em uma aplicação real, você faria uma requisição ao backend)
    try {
      // Simulação de um atraso de rede
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Verificação de sucesso (em um app real seria a resposta do backend)
      if (Math.random() > 0.2) { // 80% chance de sucesso para fins de demo
        setFormStatus('success');
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error("Falha ao enviar mensagem. Por favor, tente novamente.");
      }
    } catch (error) {
      setFormStatus('error');
      setErrorMessage(error instanceof Error ? error.message : "Ocorreu um erro desconhecido");
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-black py-24">
        <div className="absolute inset-0 overflow-hidden">
          
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Entre em Contato
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Estamos aqui para ouvir você. Sua opinião é importante para nós.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulário de Contato */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envie-nos uma mensagem</h2>
            
            {formStatus === 'success' ? (
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6">
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium text-green-800">Mensagem enviada!</h3>
                    <p className="mt-2 text-green-700">
                      Obrigado pelo seu contato. Responderemos o mais breve possível.
                    </p>
                    <button 
                      className="mt-4 text-green-600 font-medium hover:text-green-500 focus:outline-none"
                      onClick={() => setFormStatus('idle')}
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {formStatus === 'error' && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mr-2" />
                      <p className="text-red-700">{errorMessage}</p>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Assunto
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="pedido">Informações sobre pedido</option>
                    <option value="produto">Dúvidas sobre produto</option>
                    <option value="devolucao">Devoluções e trocas</option>
                    <option value="parceria">Propostas de parceria</option>
                    <option value="outro">Outro assunto</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                    formStatus === 'submitting' ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
          
          {/* Informações de Contato */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Informações de Contato</h2>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">WhatsApp</h3>
                    <p className="mt-1 text-gray-600">
                      Atendimento rápido via WhatsApp Business
                    </p>
                    <a 
                      href="https://wa.me/5511999999999" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                    >
                      Iniciar Conversa
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="mt-1 text-gray-600">
                      Para assuntos que não são urgentes
                    </p>
                    <a href="mailto:contato@levelco.com.br" className="mt-1 text-red-600 hover:text-red-500">
                      contato@levelco.com.br
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Localização</h3>
                    <p className="mt-1 text-gray-600">
                      São Paulo - SP, Brasil
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Redes Sociais</h3>
                  <div className="flex space-x-5">
                    <a 
                      href="https://instagram.com/levelco" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <span className="sr-only">Instagram</span>
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a 
                      href="https://facebook.com/levelco" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <span className="sr-only">Facebook</span>
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a 
                      href="https://tiktok.com/@levelco" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <span className="sr-only">TikTok</span>
                      <img src="/tiktok-svgrepo-com.svg" alt="TikTok" width="24" height="24" className="opacity-70 hover:opacity-100" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Horário de Atendimento</h3>
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <dl className="space-y-3 text-gray-600">
                  <div className="flex justify-between">
                    <dt className="font-medium">Segunda à Sexta</dt>
                    <dd>8h às 18h</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Sábado</dt>
                    <dd>9h às 13h</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Domingo e Feriados</dt>
                    <dd>Fechado</dd>
                  </div>
                </dl>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-3">FAQ</h3>
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <p className="text-gray-600 mb-3">
                  Confira nossa seção de perguntas frequentes antes de entrar em contato:
                </p>
                <a 
                  href="/faq" 
                  className="inline-flex items-center font-medium text-red-600 hover:text-red-500"
                >
                  Ver Perguntas Frequentes
                  <svg className="ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}