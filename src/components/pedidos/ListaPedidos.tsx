import { Pedido } from "@/types/pedido";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ListaPedidosProps {
  pedidos: Pedido[];
  tipo: "pedidos" | "orcamentos";
  onVerDetalhes: (pedido: Pedido) => void;
  onConverterOrcamento?: (pedido: Pedido) => void;
}

export const ListaPedidos = ({
  pedidos,
  tipo,
  onVerDetalhes,
  onConverterOrcamento,
}: ListaPedidosProps) => {
  const [filtro, setFiltro] = useState("");

  const pedidosFiltrados = pedidos.filter(
    (pedido) =>
      pedido.clienteRazaoSocial.toLowerCase().includes(filtro.toLowerCase()) ||
      pedido.id.includes(filtro)
  );

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        {tipo === "pedidos" ? "Pedidos Enviados" : "Orçamentos Salvos"}
      </h2>
      <Input
        placeholder="Buscar por cliente ou número"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Número</th>
              <th className="text-left p-2">Data</th>
              <th className="text-left p-2">Cliente</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Vendedor</th>
              <th className="text-left p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidosFiltrados.map((pedido) => (
              <tr key={pedido.id} className="border-b">
                <td className="p-2">{pedido.id}</td>
                <td className="p-2">{new Date(pedido.data).toLocaleDateString()}</td>
                <td className="p-2">{pedido.clienteRazaoSocial}</td>
                <td className="p-2">{pedido.status}</td>
                <td className="p-2">{pedido.vendedorNome}</td>
                <td className="p-2 space-x-2">
                  <Button size="sm" onClick={() => onVerDetalhes(pedido)}>
                    Detalhes
                  </Button>
                  {tipo === "orcamentos" && onConverterOrcamento && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onConverterOrcamento(pedido)}
                    >
                      Converter em Pedido
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};