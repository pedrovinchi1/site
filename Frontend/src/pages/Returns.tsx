import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, ShieldCheck, Truck, AlertTriangle, CheckCircle, Package, HelpCircle } from 'lucide-react';

export function Returns() {
  const [activeTab, setActiveTab] = useState('direito');

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-black py-24">
        <div className="absolute inset-0 overflow-hidden">
          
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Política de Devoluções
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Conheça seus direitos e nossos procedimentos para trocas e devoluções
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="border-b border-gray-200 sticky top-0 bg-white z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto py-4" aria-label="Tabs">
            <button 
              onClick={() => setActiveTab('direito')}
              className={`${
                activeTab === 'direito' 
                  ? 'border-red-500 text-red-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <ShieldCheck className="mr-2 h-5 w-5" />
              Direito de Arrependimento
            </button>
            
            <button 
              onClick={() => setActiveTab('defeito')}
              className={`${
                activeTab === 'defeito' 
                  ? 'border-red-500 text-red-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <AlertTriangle className="mr-2 h-5 w-5" />
              Produtos com Defeito
            </button>
            
            <button 
              onClick={() => setActiveTab('processo')}
              className={`${
                activeTab === 'processo' 
                  ? 'border-red-500 text-red-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Processo de Devolução
            </button>
            
            <button 
              onClick={() => setActiveTab('reembolso')}
              className={`${
                activeTab === 'reembolso' 
                  ? 'border-red-500 text-red-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              Reembolsos
            </button>
            
            <button 
              onClick={() => setActiveTab('duvidas')}
              className={`${
                activeTab === 'duvidas' 
                  ? 'border-red-500 text-red-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <HelpCircle className="mr-2 h-5 w-5" />
              Dúvidas Frequentes
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Direito de Arrependimento Section */}
        <div className={activeTab === 'direito' ? 'block' : 'hidden'}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <ShieldCheck className="mr-3 h-7 w-7 text-red-600" />
              Direito de Arrependimento
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p>
                De acordo com o <strong>Art. 49 do Código de Defesa do Consumidor</strong>, o cliente tem 
                até <strong>7 (sete) dias corridos</strong> para desistir da compra realizada pela internet,
                contados a partir da data de recebimento do produto.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 my-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Condições para o Direito de Arrependimento</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>O produto deve estar em sua embalagem original, com todos os acessórios e manuais.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Deve estar sem sinais de uso, com etiquetas e tags originais anexadas.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Não pode apresentar qualquer tipo de personalização feita após a entrega.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>A solicitação deve ser feita dentro do prazo legal de 7 dias corridos.</span>
                  </li>
                </ul>
              </div>
              
              <p>
                O direito de arrependimento é garantido por lei, sem necessidade de justificativa. 
                Todos os valores pagos, incluindo o frete, serão devolvidos integralmente.
              </p>
              
              <h3>Exceções ao Direito de Arrependimento</h3>
              <p>
                De acordo com a legislação brasileira, alguns produtos personalizados ou produzidos sob encomenda 
                específica do cliente podem ter restrições quanto ao direito de arrependimento. 
                Na LEVƎL co., isso se aplica a:
              </p>
              
              <ul>
                <li>Peças com estampas personalizadas com nome ou frase solicitada pelo cliente</li>
                <li>Produtos customizados por pedido especial</li>
              </ul>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Importante: Mesmo para produtos personalizados, caso apresentem defeito de fabricação, 
                      o cliente tem direito à troca ou devolução conforme o Código de Defesa do Consumidor.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Produtos com Defeito Section */}
        <div className={activeTab === 'defeito' ? 'block' : 'hidden'}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertTriangle className="mr-3 h-7 w-7 text-red-600" />
              Produtos com Defeito
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p>
                De acordo com o <strong>Art. 26 do Código de Defesa do Consumidor</strong>, 
                o prazo para reclamar por defeitos aparentes ou de fácil constatação é de:
              </p>
              
              <ul>
                <li><strong>30 dias</strong> para produtos não duráveis</li>
                <li><strong>90 dias</strong> para produtos duráveis</li>
              </ul>
              
              <p>
                Esses prazos são contados a partir da entrega efetiva do produto. 
                As peças de vestuário da LEVƎL co. são consideradas produtos duráveis.
              </p>
              
              <h3>Tipos de Defeitos</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-lg mb-3">Defeito de Fabricação</h4>
                  <ul className="space-y-2">
                    <li>Costura malfeita ou desfiada</li>
                    <li>Manchas ou falhas no tecido</li>
                    <li>Botões ou zíperes com mau funcionamento</li>
                    <li>Descostura sem uso indevido</li>
                    <li>Estampas com falhas ou que descascam facilmente</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-lg mb-3">Não Caracterizam Defeito</h4>
                  <ul className="space-y-2">
                    <li>Danos causados por uso inadequado</li>
                    <li>Desgaste natural após uso prolongado</li>
                    <li>Alterações feitas pelo cliente</li>
                    <li>Lavagem em desacordo com as instruções</li>
                    <li>Armazenamento inadequado</li>
                  </ul>
                </div>
              </div>
              
              <h3>O Que Oferecemos em Caso de Defeito</h3>
              <p>
                Em caso de constatação de defeito de fabricação, o consumidor pode optar por uma das três alternativas, 
                conforme previsto no Art. 18 do CDC:
              </p>
              
              <ol>
                <li><strong>Substituição do produto</strong> por outro da mesma espécie, em perfeitas condições de uso</li>
                <li><strong>Restituição imediata da quantia paga</strong>, monetariamente atualizada, sem prejuízo de eventuais perdas e danos</li>
                <li><strong>Abatimento proporcional do preço</strong> (em casos onde as opções acima não sejam possíveis)</li>
              </ol>
              
              <div className="bg-green-50 p-6 rounded-lg border border-green-200 my-6">
                <h4 className="font-semibold text-lg text-green-800 mb-3">Nosso Compromisso</h4>
                <p className="text-green-700">
                  Na LEVƎL co., comprometemo-nos a resolver qualquer problema de defeito de fabricação
                  no menor tempo possível. Daremos prioridade à substituição do produto caso esteja disponível
                  em nosso estoque, ou realizaremos o reembolso integral caso seja a preferência do cliente ou 
                  não tenhamos o produto em estoque.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Processo de Devolução Section */}
        <div className={activeTab === 'processo' ? 'block' : 'hidden'}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <RefreshCw className="mr-3 h-7 w-7 text-red-600" />
              Processo de Devolução
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Para garantir que sua solicitação de devolução seja processada de forma rápida e eficiente, 
                siga os passos abaixo:
              </p>
              
              <div className="my-10 relative">
                <div className="absolute left-5 border-l-2 border-red-200 h-full"></div>
                
                <div className="relative mb-12">
                  <div className="flex items-center mb-4">
                    <div className="absolute left-5 -ml-[13px] bg-red-600 rounded-full h-6 w-6 flex items-center justify-center shadow-md">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <h3 className="ml-12 text-xl font-semibold text-gray-900">Inicie a Solicitação</h3>
                  </div>
                  <div className="ml-12">
                    <p>
                      Acesse sua conta na LEVƎL co. e vá até "Meus Pedidos". Encontre o pedido que 
                      deseja devolver e clique em "Solicitar Devolução". Alternativamente, você pode 
                      entrar em contato com nosso Atendimento ao Cliente pelo e-mail ou WhatsApp.
                    </p>
                    <div className="flex mt-4">
                      <Link 
                        to="/contact" 
                        className="inline-flex items-center text-red-600 hover:text-red-700"
                      >
                        Ir para Contato
                        <svg className="ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="relative mb-12">
                  <div className="flex items-center mb-4">
                    <div className="absolute left-5 -ml-[13px] bg-red-600 rounded-full h-6 w-6 flex items-center justify-center shadow-md">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <h3 className="ml-12 text-xl font-semibold text-gray-900">Análise da Solicitação</h3>
                  </div>
                  <div className="ml-12">
                    <p>
                      Nossa equipe analisará sua solicitação em até 48 horas úteis. 
                      Em caso de devolução por arrependimento, verificaremos se está dentro do prazo legal 
                      de 7 dias. Em caso de defeito, poderemos solicitar fotos para verificação.
                    </p>
                  </div>
                </div>
                
                <div className="relative mb-12">
                  <div className="flex items-center mb-4">
                    <div className="absolute left-5 -ml-[13px] bg-red-600 rounded-full h-6 w-6 flex items-center justify-center shadow-md">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <h3 className="ml-12 text-xl font-semibold text-gray-900">Envio do Produto</h3>
                  </div>
                  <div className="ml-12">
                    <p>
                      Após a aprovação, você receberá por e-mail as instruções para envio do produto, 
                      que poderá ocorrer de duas formas:
                    </p>
                    <ul className="space-y-3 mt-4">
                      <li className="flex items-start">
                        <Package className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Coleta no endereço:</span> Em caso de defeito de fabricação, 
                          agendaremos uma coleta no seu endereço sem custos.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Truck className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Postagem pelo cliente:</span> Em caso de devolução por 
                          arrependimento, você deverá enviar o produto pelos Correios ou transportadora. 
                          O custo do frete de retorno será reembolsado junto com o valor do produto.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex items-center mb-4">
                    <div className="absolute left-5 -ml-[13px] bg-red-600 rounded-full h-6 w-6 flex items-center justify-center shadow-md">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <h3 className="ml-12 text-xl font-semibold text-gray-900">Recebimento e Finalização</h3>
                  </div>
                  <div className="ml-12">
                    <p>
                      Após recebermos o produto devolvido, realizaremos uma análise para confirmar que 
                      as condições da devolução foram atendidas. Em até 5 dias úteis após essa verificação, 
                      processaremos a troca ou o reembolso conforme solicitado.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 my-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Dicas para Embalagem</h3>
                <p className="mb-4">
                  Para garantir que seu produto chegue em perfeitas condições ao nosso centro de distribuição, 
                  siga estas orientações ao embalar:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Use a embalagem original ou uma caixa/envelope resistente</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Proteja o produto com papel ou plástico-bolha se necessário</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Inclua dentro da embalagem uma cópia do número do pedido ou da solicitação de devolução</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Certifique-se de que o pacote está bem fechado com fita adesiva</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reembolsos Section */}
        <div className={activeTab === 'reembolso' ? 'block' : 'hidden'}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="mr-3 h-7 w-7 text-red-600" />
              Reembolsos
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Após a aprovação da devolução e o recebimento do produto em nosso centro de distribuição, 
                realizaremos o reembolso conforme a forma de pagamento original:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-lg mb-3">Cartão de Crédito</h4>
                  <p className="text-gray-700 mb-2">
                    O estorno será solicitado à operadora do cartão em até 5 dias úteis após a aprovação da devolução.
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Prazo para visualização:</span> O valor estornado aparecerá na fatura em 
                    1 a 2 ciclos de fechamento, dependendo da operadora do cartão.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-lg mb-3">PIX ou Transferência Bancária</h4>
                  <p className="text-gray-700 mb-2">
                    O reembolso será processado em até 5 dias úteis após a aprovação da devolução.
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Informações necessárias:</span> Solicitaremos seus dados bancários 
                    para processar o reembolso diretamente em sua conta.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <h4 className="font-semibold text-lg mb-3">Boleto Bancário</h4>
                <p className="text-gray-700 mb-2">
                  Em caso de pagamento por boleto, o reembolso será feito via transferência bancária 
                  ou PIX em até 7 dias úteis após a aprovação da devolução.
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Informações necessárias:</span> Solicitaremos seus dados bancários 
                  para processar o reembolso.
                </p>
              </div>
              
              <h3>O Que é Reembolsado?</h3>
              
              <ul>
                <li>
                  <strong>Direito de Arrependimento:</strong> Valor integral do produto + frete pago na compra.
                </li>
                <li>
                  <strong>Defeito de Fabricação:</strong> Valor integral do produto + todos os fretes envolvidos 
                  (tanto de ida quanto de retorno).
                </li>
                <li>
                  <strong>Produtos em Promoção:</strong> Valor efetivamente pago pelo produto, 
                  considerando descontos aplicados.
                </li>
              </ul>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Importante: Cupons de desconto utilizados na compra não são reembolsáveis em 
                      dinheiro, mas disponibilizaremos um novo cupom de mesmo valor para uso em 
                      compras futuras, com validade de 90 dias.
                    </p>
                  </div>
                </div>
              </div>
              
              <h3>Acompanhamento do Reembolso</h3>
              <p>
                Você receberá atualizações por e-mail sobre o status do seu reembolso. 
                Também é possível acompanhar o processo acessando "Meus Pedidos" na sua conta no site.
              </p>
              
              <p>
                Caso o reembolso não seja visualizado nos prazos informados acima, entre em contato 
                com nosso Atendimento ao Cliente com o número do protocolo de devolução.
              </p>
            </div>
          </div>
        </div>
        
        {/* Dúvidas Frequentes Section */}
        <div className={activeTab === 'duvidas' ? 'block' : 'hidden'}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <HelpCircle className="mr-3 h-7 w-7 text-red-600" />
              Dúvidas Frequentes
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <button
                  className="flex justify-between items-center w-full px-6 py-4 text-left font-medium"
                  onClick={() => {}} // No futuro, podemos implementar um toggle para mostrar/esconder a resposta
                >
                  <span>Posso trocar um produto por outro modelo ou tamanho?</span>
                  <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-600">
                    Sim, é possível trocar por outro modelo ou tamanho, desde que esteja dentro do prazo de 7 dias e o 
                    produto esteja nas condições exigidas pela política de trocas. Se o novo produto tiver valor superior, 
                    será necessário pagar a diferença. Se for de valor inferior, realizaremos o reembolso do valor excedente.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <button
                  className="flex justify-between items-center w-full px-6 py-4 text-left font-medium"
                  onClick={() => {}}
                >
                  <span>E se o produto que eu quero trocar estiver esgotado?</span>
                  <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-600">
                    Caso o produto desejado para troca esteja esgotado, oferecemos duas opções: você pode escolher 
                    outro produto de valor equivalente ou receber o reembolso do valor pago pelo item original. 
                    Nossa equipe de atendimento poderá informar sobre previsões de reabastecimento, caso prefira aguardar.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <button
                  className="flex justify-between items-center w-full px-6 py-4 text-left font-medium"
                  onClick={() => {}}
                >
                  <span>O que acontece se eu descobrir um defeito após o prazo de 7 dias?</span>
                  <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-600">
                    Os produtos da LEVƎL co. são considerados bens duráveis e, conforme o Código de Defesa do Consumidor, 
                    você tem até 90 dias para reclamar por defeitos de fabricação. Mesmo após o prazo de 7 dias do 
                    direito de arrependimento, caso identifique um defeito de fabricação, entre em contato conosco 
                    com fotos e descrição do problema para análise.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <button
                  className="flex justify-between items-center w-full px-6 py-4 text-left font-medium"
                  onClick={() => {}}
                >
                  <span>Preciso da embalagem original para fazer a devolução?</span>
                  <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-600">
                    Para devoluções por arrependimento, é recomendado que o produto seja devolvido na embalagem 
                    original, mas não é obrigatório. O importante é que o produto esteja bem protegido para o 
                    transporte e em perfeitas condições. Para defeitos de fabricação, a embalagem original não é necessária.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <button
                  className="flex justify-between items-center w-full px-6 py-4 text-left font-medium"
                  onClick={() => {}}
                >
                  <span>Como faço para rastrear minha devolução?</span>
                  <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-600">
                    Ao postar o produto para devolução, você receberá o código de rastreamento que pode ser 
                    acompanhado no site dos Correios ou da transportadora utilizada. Também enviamos 
                    atualizações por e-mail sobre o status da sua devolução, desde o momento em que 
                    recebemos o produto até a conclusão do processo.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Ainda tem dúvidas?</h3>
                <p className="text-gray-600 mb-4">
                  Se você não encontrou resposta para sua pergunta, entre em contato com nossa 
                  equipe de atendimento. Estamos disponíveis para ajudar!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    Fale Conosco
                  </Link>
                  <Link
                    to="/faq"
                    className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 rounded-md text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Ver todas as FAQs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legislação Base */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Legislação Aplicável</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                Nossa política de devoluções está em conformidade com o Código de Defesa do Consumidor 
                (Lei nº 8.078, de 11 de setembro de 1990), especialmente:
              </p>
              <ul>
                <li><strong>Artigo 49</strong> - Direito de arrependimento para compras realizadas fora do estabelecimento comercial</li>
                <li><strong>Artigo 26</strong> - Prazos para reclamação por vícios aparentes ou de fácil constatação</li>
                <li><strong>Artigo 18</strong> - Responsabilidade por vícios de qualidade do produto</li>
              </ul>
              <p>
                Para mais informações sobre seus direitos como consumidor, consulte o 
                <a href="https://www.gov.br/pt-br/orgaos/ministerio-da-justica-e-seguranca-publica" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700"> 
                  site oficial do Ministério da Justiça
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}