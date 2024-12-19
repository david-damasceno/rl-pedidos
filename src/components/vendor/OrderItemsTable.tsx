import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface OrderItem {
  id: string;
  productCode: string;
  description: string;
  quantity: number;
  discount: number;
  unitPrice: number;
}

interface OrderItemsTableProps {
  items: OrderItem[];
  newItem: Partial<OrderItem>;
  onNewItemChange: (item: Partial<OrderItem>) => void;
  onAddItem: () => void;
}

export const OrderItemsTable = ({ items, newItem, onNewItemChange, onAddItem }: OrderItemsTableProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Itens do Pedido</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Desconto (%)</TableHead>
              <TableHead>Preço Unit.</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.productCode}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.discount}%</TableCell>
                <TableCell>R$ {item.unitPrice.toFixed(2)}</TableCell>
                <TableCell>
                  R$ {((item.quantity * item.unitPrice) * (1 - item.discount / 100)).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
        <Input
          placeholder="Código"
          value={newItem.productCode || ""}
          onChange={(e) => onNewItemChange({ ...newItem, productCode: e.target.value })}
        />
        <Input
          placeholder="Descrição"
          value={newItem.description || ""}
          onChange={(e) => onNewItemChange({ ...newItem, description: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Quantidade"
          value={newItem.quantity || ""}
          onChange={(e) => onNewItemChange({ ...newItem, quantity: Number(e.target.value) })}
        />
        <Input
          type="number"
          placeholder="Desconto %"
          value={newItem.discount || ""}
          onChange={(e) => onNewItemChange({ ...newItem, discount: Number(e.target.value) })}
        />
        <Input
          type="number"
          placeholder="Preço Unit."
          value={newItem.unitPrice || ""}
          onChange={(e) => onNewItemChange({ ...newItem, unitPrice: Number(e.target.value) })}
        />
      </div>
      <Button onClick={onAddItem} className="mt-4">
        Adicionar Item
      </Button>
    </div>
  );
};