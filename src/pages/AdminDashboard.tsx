import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { OrderDetailsModal } from "@/components/admin/OrderDetailsModal";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Test orders data
  const [orders] = useState([
    {
      id: "001",
      date: new Date("2024-02-20"),
      clienteRazaoSocial: "Empresa ABC Ltda",
      fornecedor: "Fornecedor X",
      vendedorNome: "João Silva",
      status: "pendente",
      total: 1500.50,
      clienteCNPJ: "12.345.678/0001-90",
      clienteEndereco: "Rua das Flores, 123",
      clienteContato: "(11) 98765-4321",
      itens: [
        {
          produtoCodigo: "P001",
          descricao: "Produto 1",
          quantidade: 5,
          precoUnitario: 200.00,
          desconto: 10
        },
        {
          produtoCodigo: "P002",
          descricao: "Produto 2",
          quantidade: 3,
          precoUnitario: 150.00,
          desconto: 5
        }
      ]
    },
    {
      id: "002",
      date: new Date("2024-02-21"),
      clienteRazaoSocial: "Empresa XYZ S.A.",
      fornecedor: "Fornecedor Y",
      vendedorNome: "Maria Santos",
      status: "processado",
      total: 2750.00,
      clienteCNPJ: "98.765.432/0001-10",
      clienteEndereco: "Av. Principal, 456",
      clienteContato: "(11) 91234-5678",
      itens: [
        {
          produtoCodigo: "P003",
          descricao: "Produto 3",
          quantidade: 10,
          precoUnitario: 250.00,
          desconto: 15
        }
      ]
    },
    {
      id: "003",
      date: new Date("2024-02-22"),
      clienteRazaoSocial: "Comércio Beta EIRELI",
      fornecedor: "Fornecedor Z",
      vendedorNome: "Pedro Costa",
      status: "encaminhado",
      total: 4200.00,
      clienteCNPJ: "45.678.901/0001-23",
      clienteEndereco: "Rua Comercial, 789",
      clienteContato: "(11) 94567-8901",
      itens: [
        {
          produtoCodigo: "P004",
          descricao: "Produto 4",
          quantidade: 8,
          precoUnitario: 300.00,
          desconto: 0
        },
        {
          produtoCodigo: "P005",
          descricao: "Produto 5",
          quantidade: 4,
          precoUnitario: 450.00,
          desconto: 5
        }
      ]
    }
  ]);

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    toast({
      title: "Status Atualizado",
      description: `Pedido ${orderId} foi marcado como ${newStatus}`,
    });
  };

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
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
          <OrdersTable
            orders={orders}
            onViewDetails={handleViewDetails}
            onUpdateStatus={handleStatusUpdate}
          />
        </div>

        <OrderDetailsModal
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          order={selectedOrder}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;