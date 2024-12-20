import prisma from '@/lib/prisma';
import { Pedido, ItemPedido } from '@/types/pedido';

export const DatabaseService = {
  // Pedidos
  async createPedido(pedido: Omit<Pedido, 'id'>) {
    return await prisma.pedido.create({
      data: {
        clienteCNPJ: pedido.clienteCNPJ,
        clienteRazaoSocial: pedido.clienteRazaoSocial,
        clienteEndereco: pedido.clienteEndereco || '',
        clienteContato: pedido.clienteContato || '',
        status: pedido.status,
        vendedorId: 1, // Temporário: deve vir do contexto de autenticação
        total: pedido.total,
        itens: {
          create: pedido.itens.map(item => ({
            produtoCodigo: item.produtoCodigo,
            descricao: item.descricao,
            quantidade: item.quantidade,
            desconto: item.desconto,
            precoUnitario: item.precoUnitario,
          }))
        }
      },
      include: {
        itens: true,
        vendedor: true,
      }
    });
  },

  async getPedidos() {
    return await prisma.pedido.findMany({
      include: {
        itens: true,
        vendedor: true,
      }
    });
  },

  async getPedidosByVendedor(vendedorId: number) {
    return await prisma.pedido.findMany({
      where: {
        vendedorId
      },
      include: {
        itens: true,
        vendedor: true,
      }
    });
  },

  async updatePedidoStatus(id: number, status: string) {
    return await prisma.pedido.update({
      where: { id },
      data: { status }
    });
  }
};