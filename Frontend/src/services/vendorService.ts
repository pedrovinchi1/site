// Importação dos tipos
interface Vendor {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  notificationPreference: 'email' | 'whatsapp';
}

// Database simulada
const mockVendors: Record<string, Vendor> = {
  'V001': {
    id: 'V001',
    name: 'Têxtil Brasil',
    email: 'contato@textilbrasil.com.br',
    whatsapp: '(11) 98765-4321',
    notificationPreference: 'whatsapp'
  },
  'V002': {
    id: 'V002',
    name: 'Acessórios Premium',
    email: 'vendas@acessoriospremium.com.br',
    whatsapp: '(11) 97654-3210',
    notificationPreference: 'email'
  },
  'V003': {
    id: 'V003',
    name: 'Eco Produtos',
    email: 'contato@ecoprodutos.com.br',
    whatsapp: '(11) 96543-2109',
    notificationPreference: 'whatsapp'
  },
  'V004': {
    id: 'V004',
    name: 'Moda Inverno',
    email: 'vendas@modainverno.com.br',
    whatsapp: '(11) 95432-1098',
    notificationPreference: 'email'
  }
};

/**
 * Notifica um fornecedor sobre um novo pedido
 * @param orderId ID do pedido
 * @param vendorId ID do fornecedor
 * @returns Objeto com informações sobre o envio
 */
export const notifyVendor = async (orderId: string, vendorId: string) => {
  // Simula um atraso de requisição
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Verifica se o fornecedor existe
  const vendor = mockVendors[vendorId];
  if (!vendor) {
    throw new Error('Fornecedor não encontrado');
  }
  
  // Determina o método de notificação com base na preferência do fornecedor
  const notificationMethod = vendor.notificationPreference;
  
  // Simula o envio da notificação
  if (notificationMethod === 'email') {
    console.log(`Email enviado para ${vendor.email} sobre o pedido ${orderId}`);
    // Aqui você implementaria a integração com um serviço de email
  } else {
    console.log(`WhatsApp enviado para ${vendor.whatsapp} sobre o pedido ${orderId}`);
    // Aqui você implementaria a integração com a API do WhatsApp
  }
  
  // Retorna informações sobre o envio
  return {
    success: true,
    method: notificationMethod,
    to: notificationMethod === 'email' ? vendor.email : vendor.whatsapp,
    orderId,
    vendorId,
    timestamp: new Date().toISOString()
  };
};

/**
 * Obtém um fornecedor pelo ID
 * @param vendorId ID do fornecedor
 * @returns Dados do fornecedor
 */
export const getVendor = async (vendorId: string) => {
  // Simula um atraso de requisição
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const vendor = mockVendors[vendorId];
  if (!vendor) {
    throw new Error('Fornecedor não encontrado');
  }
  
  return vendor;
};