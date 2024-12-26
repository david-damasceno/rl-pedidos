export interface DadosCliente {
  cnpj: string;
  razaoSocial: string;
  endereco: string;
  email: string;
  telefone: string;
  fornecedor: string;
  cnpjsAdicionais: string[];
  ipi: string;
  desconto: string;
  tipoPagamento: string;
  condicaoPagamento?: string;
  observacao: string;
}