import { supabase } from '@/lib/supabase';
import { Pedido } from '@/types/pedido';

export const api = {
  async createPedido(pedidoData: Omit<Pedido, 'id'>) {
    const { data, error } = await supabase
      .from('pedidos')
      .insert([pedidoData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getPedidos() {
    const { data, error } = await supabase
      .from('pedidos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getPedidosByVendedor(vendedorId: number) {
    const { data, error } = await supabase
      .from('pedidos')
      .select('*')
      .eq('vendedor_id', vendedorId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async updatePedidoStatus(id: number, status: string) {
    const { data, error } = await supabase
      .from('pedidos')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};