import { Pedido } from '@/types/pedido';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const api = {
  async createPedido(pedidoData: Omit<Pedido, 'id'>) {
    const response = await fetch(`${API_BASE_URL}/api/pedidos`, {
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
    const response = await fetch(`${API_BASE_URL}/api/pedidos`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch pedidos');
    }
    
    return response.json();
  },

  async getPedidosByVendedor(vendedorId: number) {
    const response = await fetch(`${API_BASE_URL}/api/pedidos/vendedor/${vendedorId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch pedidos');
    }
    
    return response.json();
  },

  async updatePedidoStatus(id: number, status: string) {
    const response = await fetch(`${API_BASE_URL}/api/pedidos/${id}/status`, {
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