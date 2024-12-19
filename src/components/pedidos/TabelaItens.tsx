import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ItemPedido } from "@/types/pedido";
import { useState } from "react";

interface TabelaItensProps {
  itens: ItemPedido[];
  onItensChange: (itens: ItemPedido[]) => void;
}

export const TabelaItens = ({ itens, onItensChange }: TabelaItensProps) => {
  const [novoItem, setNovoItem] = useState<Partial<ItemPedido>>({});

  const adicionarItem = () => {
    if (!novoItem.produtoCodigo || !novoItem.descricao || !novoItem.quantidade || !novoItem.precoUnitario) {
      return;
    }

    const item: ItemPedido = {
      id: Math.random().toString(),
      produtoCodigo: novoItem.produtoCodigo || "",
      descricao: novoItem.descricao || "",
      quantidade: Number(novoItem.quantidade),
      desconto: Number(novoItem.desconto || 0),
      precoUnitario: Number(novoItem.precoUnitario),
    };

    onItensChange([...itens, item]);
    setNovoItem({});
  };

  const removerItem = (id: string) => {
    onItensChange(itens.filter((item) => item.id !== id));
  };

  const calcularTotal = (item: ItemPedido) => {
    return (
      item.quantidade * item.precoUnitario * (1 - (item.desconto || 0) / 100)
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Itens do Pedido</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Código</th>
              <th className="text-left p-2">Descrição</th>
              <th className="text-left p-2">Qtd</th>
              <th className="text-left p-2">Desconto %</th>
              <th className="text-left p-2">Preço Unit.</th>
              <th className="text-left p-2">Total</th>
              <th className="text-left p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {itens.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-2">{item.produtoCodigo}</td>
                <td className="p-2">{item.descricao}</td>
                <td className="p-2">{item.quantidade}</td>
                <td className="p-2">{item.desconto}%</td>
                <td className="p-2">R$ {item.precoUnitario.toFixed(2)}</td>
                <td className="p-2">R$ {calcularTotal(item).toFixed(2)}</td>
                <td className="p-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removerItem(item.id)}
                  >
                    Remover
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td className="p-2">
                <Input
                  value={novoItem.produtoCodigo || ""}
                  onChange={(e) =>
                    setNovoItem({ ...novoItem, produtoCodigo: e.target.value })
                  }
                  placeholder="Código"
                />
              </td>
              <td className="p-2">
                <Input
                  value={novoItem.descricao || ""}
                  onChange={(e) =>
                    setNovoItem({ ...novoItem, descricao: e.target.value })
                  }
                  placeholder="Descrição"
                />
              </td>
              <td className="p-2">
                <Input
                  type="number"
                  value={novoItem.quantidade || ""}
                  onChange={(e) =>
                    setNovoItem({ ...novoItem, quantidade: Number(e.target.value) })
                  }
                  placeholder="Qtd"
                />
              </td>
              <td className="p-2">
                <Input
                  type="number"
                  value={novoItem.desconto || ""}
                  onChange={(e) =>
                    setNovoItem({ ...novoItem, desconto: Number(e.target.value) })
                  }
                  placeholder="Desconto"
                />
              </td>
              <td className="p-2">
                <Input
                  type="number"
                  value={novoItem.precoUnitario || ""}
                  onChange={(e) =>
                    setNovoItem({ ...novoItem, precoUnitario: Number(e.target.value) })
                  }
                  placeholder="Preço"
                />
              </td>
              <td className="p-2">
                <Button onClick={adicionarItem}>Adicionar</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};