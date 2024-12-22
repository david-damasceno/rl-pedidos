import type { Pedido } from '@/types/pedido';

export const pedidosApi = {
  async createPedido(pedidoData: Omit<Pedido, 'id'> & { vendedorId: number }) {
    const response = await fetch('/api/pedidos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedidoData),
    });

    if (!response.ok) {
      throw new Error('Falha ao criar pedido');
    }

    return response.json();
  },

  async getPedidos() {
    const response = await fetch('/api/pedidos');
    
    if (!response.ok) {
      throw new Error('Falha ao buscar pedidos');
    }

    return response.json();
  },

  async getPedidosByVendedor(vendedorId: number) {
    const response = await fetch(`/api/pedidos/vendedor/${vendedorId}`);
    
    if (!response.ok) {
      throw new Error('Falha ao buscar pedidos do vendedor');
    }

    return response.json();
  },
};