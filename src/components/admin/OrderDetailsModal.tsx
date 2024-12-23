import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any; // We'll type this properly when we have the full order type
}

export const OrderDetailsModal = ({ isOpen, onClose, order }: OrderDetailsModalProps) => {
  const { toast } = useToast();
  
  if (!order) return null;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: `${fieldName} copiado para a área de transferência`,
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
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p><span className="font-medium">CNPJ Principal:</span> {order.clienteCNPJ}</p>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => copyToClipboard(order.clienteCNPJ, "CNPJ")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <p><span className="font-medium">Razão Social:</span> {order.clienteRazaoSocial}</p>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => copyToClipboard(order.clienteRazaoSocial, "Razão Social")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <p><span className="font-medium">Endereço:</span> {order.clienteEndereco}</p>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => copyToClipboard(order.clienteEndereco, "Endereço")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <p><span className="font-medium">Contato:</span> {order.clienteContato}</p>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => copyToClipboard(order.clienteContato, "Contato")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p><span className="font-medium">Fornecedor:</span> {order.fornecedor}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Informações do Pedido</h3>
              <p><span className="font-medium">Data:</span> {new Date(order.data).toLocaleDateString()}</p>
              <p><span className="font-medium">Vendedor:</span> {order.vendedorNome}</p>
              <p><span className="font-medium">Status:</span> {order.status}</p>
              <p><span className="font-medium">Total:</span> R$ {order.total?.toFixed(2)}</p>
            </div>
          </div>

          {order.cnpjsAdicionais?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">CNPJs Adicionais</h3>
              <div className="space-y-4">
                {order.cnpjsAdicionais.map((cnpj: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p><span className="font-medium">CNPJ:</span> {cnpj.numero}</p>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => copyToClipboard(cnpj.numero, "CNPJ Adicional")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <p><span className="font-medium">Endereço:</span> {cnpj.endereco}</p>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => copyToClipboard(cnpj.endereco, "Endereço Adicional")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p><span className="font-medium">Email:</span> {cnpj.email}</p>
                    <p><span className="font-medium">Telefone:</span> {cnpj.telefone}</p>
                    <p><span className="font-medium">Tipo:</span> {cnpj.tipo}</p>
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
                    <th className="text-right py-2">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {order.itens?.map((item: any, index: number) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{item.produtoCodigo}</td>
                      <td className="py-2">{item.descricao}</td>
                      <td className="text-right py-2">{item.quantidade}</td>
                      <td className="text-right py-2">R$ {item.precoUnitario.toFixed(2)}</td>
                      <td className="text-right py-2">{item.desconto}%</td>
                      <td className="text-right py-2">
                        R$ {(item.quantidade * item.precoUnitario * (1 - item.desconto / 100)).toFixed(2)}
                      </td>
                      <td className="text-right py-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => copyToClipboard(item.produtoCodigo, "Código do Produto")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
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