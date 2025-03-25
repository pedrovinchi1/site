import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, CreditCard, Truck, RefreshCw, User, Info, Search, HelpCircle } from 'lucide-react';

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});
  const [filteredQuestions, setFilteredQuestions] = useState<any[]>([]);

  // Categorias de perguntas
  const categories = [
    { id: 'all', name: 'Todas as Perguntas', icon: <HelpCircle className="h-5 w-5" /> },
    { id: 'products', name: 'Produtos', icon: <ShoppingBag className="h-5 w-5" /> },
    { id: 'orders', name: 'Pedidos e Pagamentos', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'shipping', name: 'Envio e Entrega', icon: <Truck className="h-5 w-5" /> },
    { id: 'returns', name: 'Trocas e Devoluções', icon: <RefreshCw className="h-5 w-5" /> },
    { id: 'account', name: 'Conta e Privacidade', icon: <User className="h-5 w-5" /> },
    { id: 'about', name: 'Sobre a Marca', icon: <Info className="h-5 w-5" /> },
  ];

  // Banco de perguntas e respostas
  const allQuestions = [
    // Produtos
    {
      id: 'product-1',
      category: 'products',
      question: 'Quais materiais são utilizados nas camisetas?',
      answer: 'Nossas camisetas são produzidas com algodão 100% de alta qualidade (gramatura 180g/m²), garantindo conforto e durabilidade. Para as estampas, utilizamos técnicas de serigrafia de alta qualidade que não desbotam facilmente com as lavagens.'
    },
    {
      id: 'product-2',
      category: 'products',
      question: 'Como escolher o tamanho correto?',
      answer: 'Cada produto possui uma tabela de medidas específica que pode ser encontrada na página do produto. Recomendamos que você meça uma peça semelhante que você já possui e compare com nossas medidas para encontrar o tamanho ideal. Se ainda tiver dúvidas, entre em contato conosco.'
    },
    {
      id: 'product-3',
      category: 'products',
      question: 'As cores dos produtos são exatamente como mostradas no site?',
      answer: 'Nos esforçamos para apresentar imagens que representem os produtos com a maior fidelidade possível. No entanto, pode haver pequenas variações devido a configurações de monitor, iluminação nas fotos e processos de produção. Caso tenha dúvidas sobre uma cor específica, entre em contato conosco antes de finalizar sua compra.'
    },
    {
      id: 'product-4',
      category: 'products',
      question: 'Vocês produzem camisetas em tamanhos especiais?',
      answer: 'Atualmente, oferecemos tamanhos do PP ao 3G em nossa linha padrão. Para tamanhos especiais ou personalizações específicas, entre em contato conosco através da página de contato para verificarmos a possibilidade de atender ao seu pedido.'
    },
    {
      id: 'product-5',
      category: 'products',
      question: 'Como devo lavar e cuidar dos produtos?',
      answer: 'Para preservar a qualidade e durabilidade das nossas peças, recomendamos lavar à mão ou na máquina com água fria e ciclo suave. Evite o uso de alvejantes e amaciantes. Seque à sombra e evite usar secadora. As estampas devem ser passadas pelo avesso ou com um pano entre o ferro e a estampa.'
    },

    // Pedidos e Pagamentos
    {
      id: 'order-1',
      category: 'orders',
      question: 'Quais formas de pagamento são aceitas?',
      answer: 'Aceitamos cartões de crédito, cartões de débito e pagamentos via PIX. Os cartões de crédito podem ser parcelados em até 6x sem juros para compras acima de R$180.'
    },
    {
      id: 'order-2',
      category: 'orders',
      question: 'É seguro fazer compras no site?',
      answer: 'Sim, nosso site utiliza criptografia SSL para proteger suas informações. Além disso, não armazenamos dados sensíveis como números de cartão de crédito. Para pagamentos, trabalhamos com gateways confiáveis que seguem os padrões mais rígidos de segurança.'
    },
    {
      id: 'order-3',
      category: 'orders',
      question: 'Posso alterar meu pedido após confirmar a compra?',
      answer: 'Alterações como tamanho, cor ou quantidade só podem ser feitas nas primeiras 24 horas após a confirmação da compra e desde que o pedido ainda não tenha entrado em produção. Entre em contato conosco imediatamente caso precise fazer alguma alteração.'
    },
    {
      id: 'order-4',
      category: 'orders',
      question: 'Como faço para acompanhar o status do meu pedido?',
      answer: 'Você pode acompanhar o status do seu pedido acessando sua conta no site e indo até a seção "Meus Pedidos". Também enviamos atualizações por e-mail em cada etapa do processo, desde a confirmação até a entrega.'
    },
    {
      id: 'order-5',
      category: 'orders',
      question: 'Vocês emitem nota fiscal?',
      answer: 'Sim, emitimos nota fiscal para todas as compras. A nota fiscal é enviada por e-mail após a confirmação do pagamento e também pode ser acessada na sua área de cliente, na seção "Meus Pedidos".'
    },

    // Envio e Entrega
    {
      id: 'shipping-1',
      category: 'shipping',
      question: 'Quanto tempo leva para meu pedido ser enviado?',
      answer: 'Todos os nossos produtos são fabricados sob demanda. Após a confirmação do pagamento, levamos até 7 dias úteis para produzir seu pedido antes de enviá-lo. Depois disso, o prazo de entrega depende da sua localização e do método de envio escolhido.'
    },
    {
      id: 'shipping-2',
      category: 'shipping',
      question: 'Como consigo frete grátis?',
      answer: 'Oferecemos frete grátis para todo o Brasil em compras acima de R$350. O desconto é aplicado automaticamente no checkout quando o valor total dos produtos atingir este valor.'
    },
    {
      id: 'shipping-3',
      category: 'shipping',
      question: 'O que acontece se meu endereço estiver incorreto?',
      answer: 'É muito importante que você verifique seu endereço antes de finalizar a compra. Caso o endereço esteja incorreto e a entrega não possa ser concluída, o pedido será devolvido para nós. Neste caso, entraremos em contato e você poderá optar por um novo envio (com possíveis custos adicionais) ou reembolso.'
    },
    {
      id: 'shipping-4',
      category: 'shipping',
      question: 'Vocês enviam para outros países?',
      answer: 'No momento, nossos envios são realizados apenas para endereços no Brasil. Estamos trabalhando para expandir nossas operações internacionalmente no futuro.'
    },
    {
      id: 'shipping-5',
      category: 'shipping',
      question: 'E se meu pacote for extraviado?',
      answer: 'Caso seu pacote seja extraviado durante o transporte, entre em contato conosco imediatamente. Abriremos uma investigação junto à transportadora e, após confirmação do extravio, providenciaremos uma nova produção e envio ou o reembolso integral, de acordo com sua preferência.'
    },

    // Trocas e Devoluções
    {
      id: 'return-1',
      category: 'returns',
      question: 'Qual é a política de trocas e devoluções?',
      answer: 'Aceitamos trocas e devoluções em até 7 dias corridos após o recebimento do produto, desde que a peça esteja sem uso, com etiquetas originais e em perfeitas condições. Para iniciar uma solicitação de troca ou devolução, acesse a seção "Meus Pedidos" na sua conta ou entre em contato conosco.'
    },
    {
      id: 'return-2',
      category: 'returns',
      question: 'Quem paga pelo frete de retorno nas trocas?',
      answer: 'Em caso de troca por tamanho incorreto ou por preferência do cliente, o frete de retorno é de responsabilidade do comprador. Porém, se a troca for necessária devido a defeito de fabricação ou envio de item errado, nós cobrimos todas as despesas de frete.'
    },
    {
      id: 'return-3',
      category: 'returns',
      question: 'Como funciona o processo de reembolso?',
      answer: 'O reembolso é processado após recebermos e verificarmos o produto devolvido. O valor é estornado na mesma forma de pagamento utilizada na compra. Para cartões de crédito, o prazo para o valor aparecer na fatura depende da operadora do cartão (geralmente 1 a 2 faturas). Para PIX ou débito, o reembolso é processado em até 10 dias úteis.'
    },
    {
      id: 'return-4',
      category: 'returns',
      question: 'O que devo fazer se receber um produto com defeito?',
      answer: 'Se você receber um produto com defeito, tire fotos claras do problema e entre em contato conosco em até 7 dias após o recebimento. Nossa equipe analisará o caso e, sendo confirmado o defeito de fabricação, providenciaremos a troca ou reembolso conforme sua preferência, sem custos adicionais.'
    },
    {
      id: 'return-5',
      category: 'returns',
      question: 'Posso trocar um produto por outro modelo diferente?',
      answer: 'Sim, é possível trocar por outro modelo, desde que esteja dentro do prazo de 7 dias e o produto esteja nas condições exigidas pela política de trocas. Se o novo produto tiver valor superior, será necessário pagar a diferença. Se for de valor inferior, realizaremos o reembolso do valor excedente.'
    },

    // Conta e Privacidade
    {
      id: 'account-1',
      category: 'account',
      question: 'É necessário criar uma conta para fazer compras?',
      answer: 'Recomendamos criar uma conta para uma experiência mais completa, permitindo acompanhar pedidos e facilitar compras futuras. No entanto, também oferecemos a opção de compra como visitante, sem necessidade de cadastro.'
    },
    {
      id: 'account-2',
      category: 'account',
      question: 'Como vocês protegem meus dados pessoais?',
      answer: 'Levamos a privacidade dos nossos clientes muito a sério. Utilizamos criptografia SSL em todo o site e seguimos práticas rigorosas de segurança da informação. Seus dados são utilizados apenas para processar pedidos e melhorar sua experiência de compra, nunca sendo compartilhados com terceiros para fins de marketing. Para mais detalhes, consulte nossa Política de Privacidade.'
    },
    {
      id: 'account-3',
      category: 'account',
      question: 'Esqueci minha senha, como recuperá-la?',
      answer: 'Na página de login, clique em "Esqueci minha senha" e siga as instruções enviadas para seu e-mail cadastrado. Por segurança, enviamos um link temporário que permite criar uma nova senha.'
    },
    {
      id: 'account-4',
      category: 'account',
      question: 'Como posso atualizar meus dados cadastrais?',
      answer: 'Acesse sua conta e vá até a seção "Minha Conta" ou "Perfil". Lá você poderá editar suas informações pessoais, endereço e preferências de comunicação a qualquer momento.'
    },
    {
      id: 'account-5',
      category: 'account',
      question: 'É possível desativar minha conta?',
      answer: 'Sim, você pode solicitar a desativação da sua conta através da página de contato. Note que isso não apaga automaticamente seus dados relacionados a pedidos anteriores, que são mantidos conforme exigido pela legislação. Para solicitar a exclusão completa dos seus dados, entre em contato direto conosco.'
    },

    // Sobre a Marca
    {
      id: 'about-1',
      category: 'about',
      question: 'Qual é a história da LEVƎL co.?',
      answer: 'A LEVƎL co. nasceu em 2020, fundada por dois amigos que compartilhavam a paixão pelo rock e sentiam falta de marcas que representassem sua identidade. Começamos produzindo camisetas em uma garagem e hoje oferecemos uma linha completa de produtos que conectam estilo urbano e a cultura do rock. Conheça mais sobre nossa história na página "Sobre Nós".'
    },
    {
      id: 'about-2',
      category: 'about',
      question: 'Onde são fabricados os produtos?',
      answer: 'Todos os nossos produtos são fabricados no Brasil, em parceria com fornecedores cuidadosamente selecionados que compartilham nossos valores de qualidade e responsabilidade. A produção sob demanda nos permite reduzir desperdícios e manter o foco na qualidade de cada peça.'
    },
    {
      id: 'about-3',
      category: 'about',
      question: 'A LEVƎL co. tem loja física?',
      answer: 'Atualmente operamos principalmente online, mas temos um showroom em São Paulo onde é possível retirar pedidos. Ocasionalmente, participamos de feiras e eventos relacionados ao universo do rock e da moda alternativa. Siga-nos nas redes sociais para ficar por dentro dos próximos eventos.'
    },
    {
      id: 'about-4',
      category: 'about',
      question: 'Como posso me tornar um revendedor dos produtos LEVƎL?',
      answer: 'Para informações sobre revenda e parcerias comerciais, envie um e-mail para parcerias@levelco.com.br com seus dados e proposta. Nossa equipe entrará em contato para discutir as possibilidades.'
    },
    {
      id: 'about-5',
      category: 'about',
      question: 'Vocês fazem coleções limitadas ou colaborações com artistas?',
      answer: 'Sim! Regularmente lançamos coleções limitadas e colaborações com artistas, bandas independentes e talentos do cenário alternativo. Estas edições especiais são anunciadas primeiro aos nossos assinantes de newsletter e seguidores nas redes sociais, então fique ligado para não perder os lançamentos.'
    },
  ];

  // Toggle para expandir/recolher respostas
  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // Filtrar perguntas quando a categoria ou busca mudar
  useEffect(() => {
    let filtered = allQuestions;
    
    // Filtro por categoria
    if (activeCategory !== 'all') {
      filtered = filtered.filter(q => q.category === activeCategory);
    }
    
    // Filtro por busca
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(q => 
        q.question.toLowerCase().includes(query) || 
        q.answer.toLowerCase().includes(query)
      );
    }
    
    setFilteredQuestions(filtered);
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-black py-24">
        <div className="absolute inset-0 overflow-hidden">

        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Perguntas Frequentes
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre nossos produtos e serviços
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Barra de busca */}
        <div className="mb-12">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="Buscar pergunta ou palavra-chave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearchQuery('')}
                >
                  <span className="text-gray-400 hover:text-gray-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Barra lateral com categorias */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Categorias</h2>
            <nav className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center px-3 py-2 rounded-md w-full text-left ${
                    activeCategory === category.id
                      ? 'bg-red-100 text-red-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-3">{category.icon}</span>
                  <span>{category.name}</span>
                  {activeCategory === category.id && (
                    <span className="ml-auto bg-red-200 text-red-800 py-0.5 px-2 rounded-full text-xs">
                      {filteredQuestions.length}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* Contato adicional */}
            <div className="mt-10 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Não encontrou o que procurava?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Nossa equipe está pronta para responder qualquer dúvida que você possa ter.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none"
              >
                Fale Conosco
              </Link>
            </div>
          </div>

          {/* Lista de perguntas */}
          <div className="lg:col-span-3">
            {searchQuery && (
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm text-gray-500">
                  {filteredQuestions.length} {filteredQuestions.length === 1 ? 'resultado' : 'resultados'} para "{searchQuery}"
                </p>
              </div>
            )}

            {filteredQuestions.length === 0 ? (
              <div className="text-center py-10">
                <HelpCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhuma pergunta encontrada</h3>
                <p className="mt-1 text-gray-500">
                  Tente ajustar sua busca ou selecionar outra categoria.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-600 bg-red-100 hover:bg-red-200"
                  >
                    Limpar filtros
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Título da categoria selecionada */}
                {activeCategory !== 'all' && (
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {categories.find(c => c.id === activeCategory)?.name}
                  </h2>
                )}

                {/* Accordion de perguntas */}
                {filteredQuestions.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <button
                      className="flex justify-between items-center w-full px-6 py-4 text-left font-medium focus:outline-none"
                      onClick={() => toggleQuestion(item.id)}
                    >
                      <span className="pr-6">{item.question}</span>
                      <svg 
                        className={`h-6 w-6 text-gray-500 transform ${expandedQuestions[item.id] ? 'rotate-180' : ''} transition-transform duration-200`}
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    <div 
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        expandedQuestions[item.id] ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      <div className="px-6 pb-6 text-gray-600 border-t border-gray-100 pt-4">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Feedback no final da página */}
            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="sm:flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-1">Esta página foi útil?</h3>
                <p className="text-gray-600">Ajude-nos a melhorar nossa base de conhecimento.</p>
              </div>
              <div className="flex space-x-4">
                <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <svg className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  Sim
                </button>
                <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <svg className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905a3.61 3.61 0 01.608-2.006L17 11v-9m-7 10h-2M7 4h10" />
                  </svg>
                  Não
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}