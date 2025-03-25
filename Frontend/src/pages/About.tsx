import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Music, Users, Award } from 'lucide-react';

export function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-black">
        <div className="absolute inset-0 overflow-hidden">
          
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Nossa História</h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            A LEVƎL nasceu da necessidade de representar aqueles que não se encaixam nos padrões.
          </p>
        </div>
      </div>

      {/* Founders Story */}
      <div className="py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Dois amigos, um propósito
              </h2>
              <div className="mt-6 text-gray-500 space-y-6">
                <p className="text-lg">
                  A LEVƎL co. nasceu em 2020, quando Marcos e Lucas, dois amigos de infância de 23 anos, 
                  se viram deslocados em um mundo que parecia não ter sido feito para eles.
                </p>
                <p className="text-base leading-7">
                  Criados ao som de Metallica, Iron Maiden e Nirvana, eles nunca se identificaram com 
                  as marcas convencionais. "Estávamos cansados de vestir roupas que não representavam quem éramos", 
                  conta Marcos. "As camisetas de banda eram legais, mas queríamos algo que pudéssemos usar no dia a dia 
                  sem parecer que tínhamos acabado de sair de um show."
                </p>
                <p className="text-base leading-7">
                  Foi em uma garagem apertada e com apenas R$ 2.000 emprestados que eles estamparam as 
                  primeiras camisetas. O que começou como um hobby rapidamente se transformou em uma missão: 
                  criar uma marca para os jovens que, como eles, carregavam a alma do rock, mas precisavam 
                  navegar pelo mundo corporativo, acadêmico e social.
                </p>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                <img
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="/images/founders.jpg"
                  alt="Fundadores da LEVƎL"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Nossos Valores</h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-500 mx-auto">
              Mais que uma marca de roupas, somos um movimento.
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-red-600 rounded-md shadow-lg">
                        <Music className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Autenticidade</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Acreditamos que o rock and roll e o metal não são apenas gêneros musicais, mas formas de expressão 
                      que celebram a autenticidade. Cada peça que criamos carrega essa essência.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-red-600 rounded-md shadow-lg">
                        <Users className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Comunidade</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Criamos não apenas uma marca, mas um refúgio para aqueles que nunca se encaixaram. 
                      Um lugar onde ser diferente não é apenas aceito, mas celebrado.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-red-600 rounded-md shadow-lg">
                        <Award className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Qualidade</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Assim como as guitarras que amamos, nossas peças são duráveis e confiáveis. 
                      Usamos apenas materiais de alta qualidade, pois acreditamos que a rebeldia também 
                      pode ser elegante e duradora.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center sm:text-4xl">
            Nossa Jornada
          </h2>
          <div className="mt-12 space-y-16">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <div className="flex items-center md:justify-center">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border-4 border-red-600 bg-white flex items-center justify-center">
                      <span className="text-red-600 font-bold">2020</span>
                    </div>
                    <div className="h-16 w-1 bg-red-600 md:hidden"></div>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 md:pl-10">
                <h3 className="text-xl font-bold text-gray-900">O Começo</h3>
                <p className="mt-3 text-base text-gray-500">
                  Em uma garagem, com uma ideia ousada e R$ 2.000 emprestados, começamos 
                  a produzir nossas primeiras camisetas. Vendemos para amigos e em pequenas 
                  feiras alternativas.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <div className="flex items-center md:justify-center">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border-4 border-red-600 bg-white flex items-center justify-center">
                      <span className="text-red-600 font-bold">2021</span>
                    </div>
                    <div className="h-16 w-1 bg-red-600 md:hidden"></div>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 md:pl-10">
                <h3 className="text-xl font-bold text-gray-900">Crescimento Online</h3>
                <p className="mt-3 text-base text-gray-500">
                  Lançamos nossa loja online e começamos a conquistar seguidores nas redes sociais. 
                  Nossa comunidade cresceu e passou a se identificar com os valores da marca.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <div className="flex items-center md:justify-center">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border-4 border-red-600 bg-white flex items-center justify-center">
                      <span className="text-red-600 font-bold">2023</span>
                    </div>
                    <div className="h-16 w-1 bg-red-600 md:hidden"></div>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 md:pl-10">
                <h3 className="text-xl font-bold text-gray-900">Expansão das Linhas</h3>
                <p className="mt-3 text-base text-gray-500">
                  Expandimos para além das camisetas, criando uma linha completa incluindo acessórios, 
                  moletons e produtos para o dia a dia. Começamos a colaborar com bandas independentes.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <div className="flex items-center md:justify-center">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border-4 border-red-600 bg-white flex items-center justify-center">
                      <span className="text-red-600 font-bold">Hoje</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 md:pl-10">
                <h3 className="text-xl font-bold text-gray-900">Um Movimento</h3>
                <p className="mt-3 text-base text-gray-500">
                  Hoje, a LEVƎL co. é mais que uma marca de roupas - é um movimento que representa 
                  todos aqueles que não se encaixam nos padrões. Continuamos crescendo, mas nunca 
                  esquecemos nossas raízes e o motivo pelo qual começamos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Spotlight */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Nossa Comunidade
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-300">
              Somos feitos por e para pessoas como você.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
                <img className="h-48 w-full object-cover" src="/images/community1.jpg" alt="Fan da LEVƎL" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl text-white mb-2">Festival Underground 2023</div>
                  <p className="text-gray-400 text-base">
                    "Foi incrível ver tantas pessoas usando nossas peças no festival. A comunidade LEVƎL tem uma energia única."
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-6">
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
                <img className="h-48 w-full object-cover" src="/images/community2.jpg" alt="Eventos LEVƎL" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl text-white mb-2">No Backstage</div>
                  <p className="text-gray-400 text-base">
                    "As bandas independentes que apoiamos são parte crucial da nossa história e continua inspiração."
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-6">
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
                <img className="h-48 w-full object-cover" src="/images/community3.jpg" alt="Clientes LEVƎL" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl text-white mb-2">Encontro de Colecionadores</div>
                  <p className="text-gray-400 text-base">
                    "Alguns clientes têm todas as nossas edições limitadas. Ver esse tipo de dedicação nos emociona."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Pronto para se juntar ao movimento?</span>
            <span className="block text-red-600">Encontre seu estilo hoje.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Ver Produtos
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}