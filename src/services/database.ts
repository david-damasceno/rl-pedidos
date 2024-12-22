import prisma from '@/lib/prisma';
import { Pedido, ItemPedido } from '@/types/pedido';

export const DatabaseService = {
  createUser: async (userData: any) => {
    return await prisma.usuario.create({
      data: userData,
    });
  },

  createPedido: async (pedidoData: Omit<Pedido, 'id'> & { vendedorId: number }) => {
    return await prisma.pedido.create({
      data: {
        clienteCNPJ: pedidoData.clienteCNPJ,
        clienteRazaoSocial: pedidoData.clienteRazaoSocial,
        clienteEndereco: pedidoData.clienteEndereco,
        clienteContato: pedidoData.clienteContato,
        status: pedidoData.status,
        vendedorId: pedidoData.vendedorId,
        total: pedidoData.total,
        itens: {
          create: pedidoData.itens.map(item => ({
            produtoCodigo: item.produtoCodigo,
            descricao: item.descricao,
            quantidade: item.quantidade,
            desconto: item.desconto,
            precoUnitario: item.precoUnitario,
          })),
        },
      },
      include: {
        itens: true,
        vendedor: true,
      },
    });
  },

  getPedidos: async () => {
    return await prisma.pedido.findMany({
      include: {
        itens: true,
        vendedor: true,
      },
    });
  },

  getPedidosByVendedor: async (vendedorId: number) => {
    return await prisma.pedido.findMany({
      where: {
        vendedorId,
      },
      include: {
        itens: true,
        vendedor: true,
      },
    });
  },

  updatePedidoStatus: async (id: number, status: string) => {
    return await prisma.pedido.update({
      where: { id },
      data: { status },
      include: {
        itens: true,
        vendedor: true,
      },
    });
  },
};