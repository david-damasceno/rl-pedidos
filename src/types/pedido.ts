export type StatusPedido = 'rascunho' | 'enviado' | 'processado' | 'encaminhado';

export interface ItemPedido {
  id: string;
  produtoCodigo: string;
  descricao: string;
  quantidade: number;
  desconto: number;
  precoUnitario: number;
}

export interface Pedido {
  id: string;
  data: string;
  clienteCNPJ: string;
  clienteRazaoSocial: string;
  clienteEndereco: string;
  clienteContato: string;
  vendedorId: number;
  vendedorNome: string;
  status: StatusPedido;
  itens: ItemPedido[];
  total: number;
}