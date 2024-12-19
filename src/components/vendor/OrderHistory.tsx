import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";

interface Order {
  id: string;
  date: string;
  customerName: string;
  status: string;
  total: number;
  vendorName: string;
}

export const OrderHistory = () => {
  const { user } = useAuth();
  // Simulated orders data - replace with actual API call
  const orders: Order[] = [
    {
      id: "1",
      date: "2024-03-14",
      customerName: "Empresa ABC",
      status: "Enviado",
      total: 1500.00,
      vendorName: user?.name || "",
    },
    // Add more orders as needed
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Histórico de Pedidos</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nº Pedido</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Vendedor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>R$ {order.total.toFixed(2)}</TableCell>
                <TableCell>{order.vendorName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};