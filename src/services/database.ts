import { api } from './api';
import { Pedido } from '@/types/pedido';

export const DatabaseService = {
  createPedido: async (pedido: Omit<Pedido, 'id'>) => {
    return await api.createPedido(pedido);
  },

  getPedidos: async () => {
    return await api.getPedidos();
  },

  getPedidosByVendedor: async (vendedorId: number) => {
    return await api.getPedidosByVendedor(vendedorId);
  },

  updatePedidoStatus: async (id: number, status: string) => {
    return await api.updatePedidoStatus(id, status);
  }
};