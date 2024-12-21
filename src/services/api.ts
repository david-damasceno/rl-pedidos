import { Pedido } from '@/types/pedido';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Remove trailing slash and colon from URL if present
const normalizeUrl = (url: string) => {
  return url.replace(/[:\/]$/, '');
};

export const api = {
  async createPedido(pedidoData: Omit<Pedido, 'id'>) {
    const baseUrl = normalizeUrl(API_BASE_URL);
    const response = await fetch(`${baseUrl}/api/pedidos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedidoData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create pedido');
    }
    
    return response.json();
  },

  async getPedidos() {
    const baseUrl = normalizeUrl(API_BASE_URL);
    const response = await fetch(`${baseUrl}/api/pedidos`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch pedidos');
    }
    
    return response.json();
  },

  async getPedidosByVendedor(vendedorId: number) {
    const baseUrl = normalizeUrl(API_BASE_URL);
    const response = await fetch(`${baseUrl}/api/pedidos/vendedor/${vendedorId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch pedidos');
    }
    
    return response.json();
  },

  async updatePedidoStatus(id: number, status: string) {
    const baseUrl = normalizeUrl(API_BASE_URL);
    const response = await fetch(`${baseUrl}/api/pedidos/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update pedido status');
    }
    
    return response.json();
  }
};