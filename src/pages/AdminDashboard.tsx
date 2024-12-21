import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Order {
  id: string;
  date: string;
  customerName: string;
  vendorName: string;
  status: "pendente" | "processado" | "encaminhado";
  total: number;
  clienteCNPJ?: string;
  clienteEndereco?: string;
  clienteContato?: string;
  itens?: Array<{
    produtoCodigo: string;
    descricao: string;
    quantidade: number;
    precoUnitario: number;
    desconto: number;
  }>;
}

const mockOrders: Order[] = [
  {
    id: "1",
    date: "2024-02-20",
    customerName: "Tech Solutions Ltda",
    vendorName: "João Silva",
    status: "pendente",
    total: 1500.00,
    clienteCNPJ: "12.345.678/0001-90",
    clienteEndereco: "Rua das Tecnologias, 123",
    clienteContato: "contato@techsolutions.com",
    itens: [
      {
        produtoCodigo: "TECH001",
        descricao: "Notebook Dell",
        quantidade: 2,
        precoUnitario: 750.00,
        desconto: 0
      }
    ]
  },
  {
    id: "2",
    date: "2024-02-19",
    customerName: "Digital Systems Inc",
    vendorName: "Maria Santos",
    status: "processado",
    total: 2300.50,
    clienteCNPJ: "98.765.432/0001-10",
    clienteEndereco: "Av. Digital, 456",
    clienteContato: "contato@digitalsystems.com",
    itens: [
      {
        produtoCodigo: "DIG001",
        descricao: "Servidor HP",
        quantidade: 1,
        precoUnitario: 2300.50,
        desconto: 0
      }
    ]
  },
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleStatusUpdate = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    toast({
      title: "Status Atualizado",
      description: `Pedido ${orderId} foi marcado como ${newStatus}`,
    });
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      case "processado":
        return "bg-blue-100 text-blue-800";
      case "encaminhado":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Pedidos</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Bem-vindo, {user?.name}</span>
            <Button variant="outline" onClick={logout}>
              Sair
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nº Pedido
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendedor
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customerName}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.vendorName}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      R$ {order.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(order)}
                        >
                          Detalhes
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(order.id, "processado")}
                          disabled={order.status !== "pendente"}
                        >
                          Processar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(order.id, "encaminhado")}
                          disabled={order.status !== "processado"}
                        >
                          Encaminhar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Pedido #{selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Informações do Cliente</h3>
                <p><span className="font-medium">CNPJ:</span> {selectedOrder?.clienteCNPJ}</p>
                <p><span className="font-medium">Nome:</span> {selectedOrder?.customerName}</p>
                <p><span className="font-medium">Endereço:</span> {selectedOrder?.clienteEndereco}</p>
                <p><span className="font-medium">Contato:</span> {selectedOrder?.clienteContato}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Informações do Pedido</h3>
                <p><span className="font-medium">Data:</span> {selectedOrder?.date}</p>
                <p><span className="font-medium">Vendedor:</span> {selectedOrder?.vendorName}</p>
                <p><span className="font-medium">Status:</span> {selectedOrder?.status}</p>
                <p><span className="font-medium">Total:</span> R$ {selectedOrder?.total.toFixed(2)}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Itens do Pedido</h3>
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
                  {selectedOrder?.itens?.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{item.produtoCodigo}</td>
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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;