import React from 'react';
import { Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

export const OrderDetailsModal = ({ isOpen, onClose, order }: OrderDetailsModalProps) => {
  if (!order) return null;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: `${fieldName} copiado!`,
      duration: 2000,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Pedido #{order.id}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Informações do Cliente</h3>
              <div className="space-y-1">
                <p className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(order.clienteCNPJ, "CNPJ")}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <span className="font-medium">CNPJ Principal:</span> {order.clienteCNPJ}
                </p>
                <p className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(order.clienteRazaoSocial, "Razão Social")}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <span className="font-medium">Razão Social:</span> {order.clienteRazaoSocial}
                </p>
                <p className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(order.clienteEndereco, "Endereço")}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <span className="font-medium">Endereço:</span> {order.clienteEndereco}
                </p>
                <p className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(order.clienteEmail, "Email")}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <span className="font-medium">Email:</span> {order.clienteEmail}
                </p>
                <p className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(order.clienteTelefone, "Telefone")}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <span className="font-medium">Telefone:</span> {order.clienteTelefone}
                </p>
                <p><span className="font-medium">Fornecedor:</span> {order.fornecedor}</p>
                {order.observacao && (
                  <p><span className="font-medium">Observação:</span> {order.observacao}</p>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Informações do Pedido</h3>
              <p><span className="font-medium">Data:</span> {new Date(order.data).toLocaleDateString()}</p>
              <p><span className="font-medium">Vendedor:</span> {order.vendedorNome}</p>
              <p><span className="font-medium">Status:</span> {order.status}</p>
              <p><span className="font-medium">IPI:</span> {order.ipi}%</p>
              <p><span className="font-medium">Desconto:</span> {order.desconto}%</p>
              <p><span className="font-medium">Tipo de Pagamento:</span> {order.tipoPagamento}</p>
              {order.condicaoPagamento && (
                <p><span className="font-medium">Condição de Pagamento:</span> {order.condicaoPagamento}</p>
              )}
              <p><span className="font-medium">Total:</span> R$ {order.total?.toFixed(2)}</p>
            </div>
          </div>

          {order.cnpjsAdicionais?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">CNPJs Adicionais</h3>
              <div className="space-y-4">
                {order.cnpjsAdicionais.map((cnpj: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <p className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => copyToClipboard(cnpj.numero, "CNPJ Adicional")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <span className="font-medium">CNPJ:</span> {cnpj.numero}
                    </p>
                    <p className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => copyToClipboard(cnpj.razaoSocial, "Razão Social")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <span className="font-medium">Razão Social:</span> {cnpj.razaoSocial}
                    </p>
                    <p className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => copyToClipboard(cnpj.endereco, "Endereço")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <span className="font-medium">Endereço:</span> {cnpj.endereco}
                    </p>
                    <p className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => copyToClipboard(cnpj.email, "Email")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <span className="font-medium">Email:</span> {cnpj.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => copyToClipboard(cnpj.telefone, "Telefone")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <span className="font-medium">Telefone:</span> {cnpj.telefone}
                    </p>
                    {cnpj.observacao && (
                      <p><span className="font-medium">Observação:</span> {cnpj.observacao}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h3 className="font-semibold mb-2">Itens do Pedido</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Código</th>
                    <th className="text-left py-2">Descrição</th>
                    <th className="text-right py-2">Qtd</th>
                    <th className="text-right py-2">Preço Unit.</th>
                    <th className="text-right py-2">Desconto</th>
                    <th className="text-right py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.itens?.map((item: any, index: number) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(item.produtoCodigo, "Código do Produto")}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          {item.produtoCodigo}
                        </div>
                      </td>
                      <td className="py-2">{item.descricao}</td>
                      <td className="text-right py-2">{item.quantidade}</td>
                      <td className="text-right py-2">R$ {item.precoUnitario.toFixed(2)}</td>
                      <td className="text-right py-2">{item.desconto}%</td>
                      <td className="text-right py-2">
                        R$ {(item.quantidade * item.precoUnitario * (1 - item.desconto / 100)).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};