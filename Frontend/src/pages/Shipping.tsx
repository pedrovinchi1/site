import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Package, MapPin, Clock, Search, Info, HelpCircle, Calculator } from 'lucide-react';

export function Shipping() {
  const [cepInput, setCepInput] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatedResult, setCalculatedResult] = useState<null | {
    cep: string;
    prazo: string;
    valor: string;
    tempoEstimado: string;
  }>(null);

  const handleCepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de cálculo de frete
    const prazo = Math.floor(Math.random() * 5) + 5; // 5 a 10 dias
    const valor = cepInput.startsWith('0') ? 0 : Math.floor(Math.random() * 20) + 15; // R$15 a R$35
    
    setCalculatedResult({
      cep: cepInput,
      prazo: `${prazo} dias úteis`,
      valor: valor === 0 ? 'Grátis' : `R$ ${valor.toFixed(2)}`,
      tempoEstimado: `${prazo + 7} dias úteis (incluindo produção)`
    });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-black py-24">
        <div className="absolute inset-0 overflow-hidden">

        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Informações de Envio
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Saiba tudo sobre como seus produtos LEVƎ⅃ chegam até você
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto py-4" aria-label="Sections">
            <a href="#calculadora" className="text-gray-500 hover:text-red-600 flex items-center whitespace-nowrap px-3 py-2 text-sm font-medium">
              <Calculator className="mr-2 h-5 w-5" />
              Calculadora de Frete
            </a>
            <a href="#prazos" className="text-gray-500 hover:text-red-600 flex items-center whitespace-nowrap px-3 py-2 text-sm font-medium">
              <Clock className="mr-2 h-5 w-5" />
              Prazos de Entrega
            </a>
            <a href="#metodos" className="text-gray-500 hover:text-red-600 flex items-center whitespace-nowrap px-3 py-2 text-sm font-medium">
              <Truck className="mr-2 h-5 w-5" />
              Métodos de Envio
            </a>
            <a href="#rastreamento" className="text-gray-500 hover:text-red-600 flex items-center whitespace-nowrap px-3 py-2 text-sm font-medium">
              <Search className="mr-2 h-5 w-5" />
              Rastreamento
            </a>
            <a href="#faq" className="text-gray-500 hover:text-red-600 flex items-center whitespace-nowrap px-3 py-2 text-sm font-medium">
              <HelpCircle className="mr-2 h-5 w-5" />
              Perguntas Frequentes
            </a>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introdução */}
        <div className="prose prose-lg max-w-none mb-16">
          <p>
            Na LEVƎ⅃ co., nos esforçamos para garantir que seus produtos cheguem até você com segurança
            e no menor tempo possível. Trabalhamos com os melhores parceiros de logística para oferecer um 
            serviço de entrega eficiente em todo o Brasil.
          </p>
          <p>
            Todas as nossas peças são produzidas sob demanda após a confirmação do pedido, 
            garantindo qualidade e personalização. Por isso, temos um prazo de produção de até 
            7 dias úteis antes do envio.
          </p>
        </div>

        {/* Calculadora de Frete */}
        <section id="calculadora" className="mb-16 scroll-mt-20">
          <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calculator className="mr-3 h-6 w-6 text-red-600" />
              Calcule o Frete
            </h2>
            
            <div className="max-w-xl">
              <p className="text-gray-600 mb-6">
                Calcule o valor e prazo de entrega para o seu CEP. Lembre-se que compras acima de R$350 
                têm frete grátis para todo o Brasil!
              </p>
              
              <form onSubmit={handleCepSubmit} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex-grow">
                  <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-1">
                    CEP
                  </label>
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    placeholder="00000-000"
                    value={cepInput}
                    onChange={(e) => setCepInput(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
                <div className="sm:self-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Calcular
                  </button>
                </div>
              </form>
              
              {calculatedResult && (
                <div className="mt-6 p-4 bg-white rounded-md border border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-2">Resultado para o CEP {calculatedResult.cep}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="border-r border-gray-200 pr-4">
                      <p className="text-sm text-gray-500">Prazo de Entrega</p>
                      <p className="font-semibold">{calculatedResult.prazo}</p>
                    </div>
                    <div className="border-r border-gray-200 px-4">
                      <p className="text-sm text-gray-500">Valor do Frete</p>
                      <p className={`font-semibold ${calculatedResult.valor === 'Grátis' ? 'text-green-600' : ''}`}>
                        {calculatedResult.valor}
                      </p>
                    </div>
                    <div className="pl-4">
                      <p className="text-sm text-gray-500">Tempo Total Estimado</p>
                      <p className="font-semibold">{calculatedResult.tempoEstimado}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Prazos de Entrega */}
        <section id="prazos" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Clock className="mr-3 h-6 w-6 text-red-600" />
            Prazos de Entrega
          </h2>
          
          <div className="prose prose-lg max-w-none mb-8">
            <p>
              Os prazos de entrega variam de acordo com a região do país e método de envio escolhido.
              Abaixo você encontra uma estimativa por região:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-semibold text-lg">Capitais e Regiões Metropolitanas</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Sudeste</span>
                      <span className="font-medium">2-4 dias úteis</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Sul</span>
                      <span className="font-medium">3-5 dias úteis</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Centro-Oeste</span>
                      <span className="font-medium">4-6 dias úteis</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Nordeste</span>
                      <span className="font-medium">5-7 dias úteis</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Norte</span>
                      <span className="font-medium">6-10 dias úteis</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-semibold text-lg">Interior e Áreas Remotas</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Sudeste</span>
                      <span className="font-medium">3-6 dias úteis</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Sul</span>
                      <span className="font-medium">4-7 dias úteis</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Centro-Oeste</span>
                      <span className="font-medium">5-8 dias úteis</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Nordeste</span>
                      <span className="font-medium">6-10 dias úteis</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Norte</span>
                      <span className="font-medium">8-15 dias úteis</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
            <div className="flex">
              <Info className="h-6 w-6 text-yellow-500 flex-shrink-0 mr-3" />
              <div>
                <p className="text-sm text-yellow-700">
                  Importante: Os prazos acima são estimados e consideram apenas o tempo de transporte após a 
                  finalização da produção. Adicione 7 dias úteis para o prazo total, que inclui a confecção 
                  dos seus produtos.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Métodos de Envio */}
        <section id="metodos" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Truck className="mr-3 h-6 w-6 text-red-600" />
            Métodos de Envio
          </h2>
          
          <div className="prose prose-lg max-w-none mb-8">
            <p>
              Trabalhamos com diferentes transportadoras para garantir a melhor experiência de entrega. 
              No momento do checkout, você poderá escolher entre as opções disponíveis para seu endereço.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <Truck className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-lg">Envio Padrão</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Entrega em todo o Brasil</li>
                <li>• Rastreamento completo</li>
                <li>• Prazos conforme tabela acima</li>
                <li className="text-green-600 font-medium">• Grátis para compras acima de R$350</li>
              </ul>
              <p className="mt-4 text-sm text-gray-500">
                *A maioria das entregas é feita através dos Correios ou transportadoras parceiras.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <Package className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-lg">Envio Expresso</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Disponível para capitais</li>
                <li>• Entrega em 1-3 dias úteis após produção</li>
                <li>• Rastreamento em tempo real</li>
                <li>• Valor adicional calculado no checkout</li>
              </ul>
              <p className="mt-4 text-sm text-gray-500">
                *Sujeito à disponibilidade na sua região.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-lg">Retirada em Loja</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Disponível apenas em São Paulo - SP</li>
                <li>• Sem custo de envio</li>
                <li>• Retirada após 7 dias úteis (produção)</li>
                <li>• Aviso por email quando disponível</li>
              </ul>
              <p className="mt-4 text-sm text-gray-500">
                *Por favor, aguarde nosso email de confirmação antes de se dirigir à loja.
              </p>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
              <Truck className="mr-2 h-5 w-5" />
              Política de Frete Grátis
            </h3>
            <p className="text-green-700 mb-3">
              Todos os pedidos acima de R$350 têm frete grátis para qualquer lugar do Brasil!
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center text-green-700 font-medium hover:text-green-600"
            >
              Conheça nossos produtos
              <svg className="ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </section>
        
        {/* Rastreamento */}
        <section id="rastreamento" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Search className="mr-3 h-6 w-6 text-red-600" />
            Rastreamento de Pedido
          </h2>
          
          <div className="prose prose-lg max-w-none mb-8">
            <p>
              Você pode acompanhar o status do seu pedido a qualquer momento. Enviamos atualizações 
              automáticas por e-mail em cada etapa do processo, desde a confirmação do pagamento até 
              a entrega.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 mb-8">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-semibold text-lg">Como rastrear seu pedido</h3>
            </div>
            <div className="p-6">
              <ol className="space-y-6">
                <li className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-bold mr-4">1</span>
                  <div>
                    <h4 className="font-medium mb-1">Acesse sua conta</h4>
                    <p className="text-gray-600">Faça login em sua conta LEVƎ⅃ co. para ver todos os seus pedidos.</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-bold mr-4">2</span>
                  <div>
                    <h4 className="font-medium mb-1">Encontre seu pedido</h4>
                    <p className="text-gray-600">Na seção "Meus Pedidos", localize o pedido que deseja rastrear.</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-bold mr-4">3</span>
                  <div>
                    <h4 className="font-medium mb-1">Consulte as atualizações</h4>
                    <p className="text-gray-600">Clique em "Detalhes" para ver o status atual e o histórico do seu pedido.</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-bold mr-4">4</span>
                  <div>
                    <h4 className="font-medium mb-1">Código de rastreamento</h4>
                    <p className="text-gray-600">Quando seu pedido for despachado, um código de rastreamento será disponibilizado. Você pode usá-lo para acompanhar a entrega diretamente no site da transportadora.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="sm:flex-1">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Precisa de ajuda com seu pedido?</h3>
              <p className="text-gray-600">
                Se você tiver qualquer dúvida sobre o status da sua entrega, nossa equipe está pronta para ajudar.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                to="/contact"
                className="inline-block px-5 py-3 border border-gray-300 rounded-md font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Fale Conosco
              </Link>
            </div>
          </div>
        </section>
        
        {/* FAQ */}
        <section id="faq" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <HelpCircle className="mr-3 h-6 w-6 text-red-600" />
            Perguntas Frequentes
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                className="flex justify-between items-center w-full px-6 py-4 text-left font-medium"
                onClick={() => {}} // No futuro, podemos implementar um toggle para mostrar/esconder a resposta
              >
                <span>Quanto tempo leva para meu pedido ser enviado?</span>
                <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="px-6 pb-4">
                <p className="text-gray-600">
                  Todos os nossos produtos são fabricados sob demanda. Após a confirmação do pagamento, 
                  levamos até 7 dias úteis para produzir seu pedido antes de enviá-lo. Depois disso, 
                  o prazo de entrega depende da sua localização e do método de envio escolhido.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                className="flex justify-between items-center w-full px-6 py-4 text-left font-medium"
                onClick={() => {}}
              >
                <span>Como consigo frete grátis?</span>
                <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="px-6 pb-4">
                <p className="text-gray-600">
                  Oferecemos frete grátis para todo o Brasil em compras acima de R$350. 
                  O desconto é aplicado automaticamente no checkout quando o valor total 
                  dos produtos atingir este valor.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                className="flex justify-between items-center w-full px-6 py-4 text-left font-medium"
                onClick={() => {}}
              >
                <span>O que acontece se meu endereço estiver incorreto?</span>
                <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="px-6 pb-4">
                <p className="text-gray-600">
                  É muito importante que você verifique seu endereço antes de finalizar a compra. 
                  Caso o endereço esteja incorreto e a entrega não possa ser concluída, o pedido 
                  será devolvido para nós. Neste caso, entraremos em contato e você poderá optar 
                  por um novo envio (com possíveis custos adicionais) ou reembolso.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                className="flex justify-between items-center w-full px-6 py-4 text-left font-medium"
                onClick={() => {}}
              >
                <span>Vocês enviam para outros países?</span>
                <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="px-6 pb-4">
                <p className="text-gray-600">
                  No momento, nossos envios são realizados apenas para endereços no Brasil. 
                  Estamos trabalhando para expandir nossas operações internacionalmente no futuro.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                className="flex justify-between items-center w-full px-6 py-4 text-left font-medium"
                onClick={() => {}}
              >
                <span>E se meu pacote for extraviado?</span>
                <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="px-6 pb-4">
                <p className="text-gray-600">
                  Caso seu pacote seja extraviado durante o transporte, entre em contato conosco 
                  imediatamente. Abriremos uma investigação junto à transportadora e, após confirmação 
                  do extravio, providenciaremos uma nova produção e envio ou o reembolso integral, 
                  de acordo com sua preferência.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}