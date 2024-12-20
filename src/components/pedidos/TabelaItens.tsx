import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ItemPedido } from "@/types/pedido";
import { useState } from "react";
import { Plus } from "lucide-react";

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

  const calcularTotalGeral = () => {
    return itens.reduce((total, item) => total + calcularTotal(item), 0);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Itens do Pedido</h2>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <Input
            value={novoItem.produtoCodigo || ""}
            onChange={(e) =>
              setNovoItem({ ...novoItem, produtoCodigo: e.target.value })
            }
            placeholder="Código"
            className="w-full"
          />
          <Input
            value={novoItem.descricao || ""}
            onChange={(e) =>
              setNovoItem({ ...novoItem, descricao: e.target.value })
            }
            placeholder="Descrição"
            className="w-full sm:col-span-2"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Input
            type="number"
            value={novoItem.quantidade || ""}
            onChange={(e) =>
              setNovoItem({ ...novoItem, quantidade: Number(e.target.value) })
            }
            placeholder="Qtd"
            className="w-full"
          />
          <Input
            type="number"
            value={novoItem.desconto || ""}
            onChange={(e) =>
              setNovoItem({ ...novoItem, desconto: Number(e.target.value) })
            }
            placeholder="Desconto %"
            className="w-full"
          />
          <Input
            type="number"
            value={novoItem.precoUnitario || ""}
            onChange={(e) =>
              setNovoItem({ ...novoItem, precoUnitario: Number(e.target.value) })
            }
            placeholder="Preço Unit."
            className="w-full"
          />
        </div>
        <Button 
          onClick={adicionarItem}
          className="w-full sm:w-auto"
          size="icon"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Código</th>
              <th className="text-left p-2">Descrição</th>
              <th className="text-right p-2">Qtd</th>
              <th className="text-right p-2">Desc%</th>
              <th className="text-right p-2">Preço</th>
              <th className="text-center p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {itens.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-2">{item.produtoCodigo}</td>
                <td className="p-2">{item.descricao}</td>
                <td className="p-2 text-right">{item.quantidade}</td>
                <td className="p-2 text-right">{item.desconto}%</td>
                <td className="p-2 text-right">
                  R$ {item.precoUnitario.toFixed(2)}
                </td>
                <td className="p-2 text-center">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removerItem(item.id)}
                  >
                    <span className="sr-only">Remover</span>
                    ×
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <div className="text-lg font-semibold">
          Total: R$ {calcularTotalGeral().toFixed(2)}
        </div>
      </div>
    </div>
  );
};