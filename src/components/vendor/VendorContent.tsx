import { FormularioCliente } from "@/components/pedidos/FormularioCliente";
import { TabelaItens } from "@/components/pedidos/TabelaItens";
import { ListaPedidos } from "@/components/pedidos/ListaPedidos";
import { Button } from "@/components/ui/button";
import { ItemPedido, Pedido } from "@/types/pedido";
import { DadosCliente } from "@/types/cliente";

interface VendorContentProps {
  activeTab: "novo" | "pedidos" | "orcamentos";
  dadosCliente: DadosCliente;
  itens: ItemPedido[];
  pedidos: Pedido[];
  orcamentos: Pedido[];
  onDadosClienteChange: (dados: DadosCliente) => void;
  onItensChange: (itens: ItemPedido[]) => void;
  onSalvarPedido: (tipo: "pedido" | "orcamento") => void;
  onVerDetalhes: (pedido: Pedido) => void;
}

export const VendorContent = ({
  activeTab,
  dadosCliente,
  itens,
  pedidos,
  orcamentos,
  onDadosClienteChange,
  onItensChange,
  onSalvarPedido,
  onVerDetalhes,
}: VendorContentProps) => {
  if (activeTab === "novo") {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <FormularioCliente onDadosClienteChange={onDadosClienteChange} />
          <TabelaItens itens={itens} onItensChange={onItensChange} />
          <div className="flex flex-col sm:flex-row justify-end gap-2 p-4 bg-gray-50">
            <Button 
              variant="outline" 
              onClick={() => onSalvarPedido("orcamento")}
              className="w-full sm:w-auto"
            >
              Salvar Orçamento
            </Button>
            <Button 
              onClick={() => onSalvarPedido("pedido")}
              className="w-full sm:w-auto"
            >
              Enviar Pedido
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <ListaPedidos
        pedidos={activeTab === "pedidos" ? pedidos : orcamentos}
        tipo={activeTab === "pedidos" ? "pedidos" : "orcamentos"}
        onVerDetalhes={onVerDetalhes}
        onConverterOrcamento={activeTab === "orcamentos" ? (pedido) => onSalvarPedido("pedido") : undefined}
      />
    </div>
  );
};