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

  // Test orders data with new features
  const [orders] = useState([
    {
      id: "001",
      date: new Date("2024-02-20"),
      clienteRazaoSocial: "Empresa ABC Ltda",
      clienteCNPJ: "12.345.678/0001-90",
      clienteEndereco: "Rua das Flores, 123 - São Paulo/SP",
      clienteEmail: "contato@empresaabc.com.br",
      clienteTelefone: "(11) 98765-4321",
      fornecedor: "Fornecedor X",
      vendedorId: 1,
      vendedorNome: "João Silva",
      status: "pendente",
      total: 1500.50,
      ipi: 5,
      desconto: 10,
      tipoPagamento: "Antecipado",
      condicaoPagamento: "30/60/90",
      observacao: "Entrega urgente",
      cnpjsAdicionais: [
        {
          numero: "98.765.432/0001-21",
          razaoSocial: "ABC Filial 1",
          endereco: "Av. Principal, 456 - Rio de Janeiro/RJ",
          email: "filial1@empresaabc.com.br",
          telefone: "(21) 98765-4321",
          observacao: "Horário de entrega: 8h às 17h"
        }
      ],
      itens: [
        {
          produtoCodigo: "P001",
          descricao: "Produto Premium 1",
          quantidade: 5,
          precoUnitario: 200.00,
          desconto: 10
        },
        {
          produtoCodigo: "P002",
          descricao: "Produto Premium 2",
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
      clienteCNPJ: "98.765.432/0001-10",
      clienteEndereco: "Av. Comercial, 789 - Curitiba/PR",
      clienteEmail: "compras@xyz.com.br",
      clienteTelefone: "(41) 98765-4321",
      fornecedor: "Fornecedor Y",
      vendedorId: 2,
      vendedorNome: "Maria Santos",
      status: "processado",
      total: 2750.00,
      ipi: 7,
      desconto: 15,
      tipoPagamento: "RL Antecipado",
      condicaoPagamento: "À vista",
      observacao: "Faturamento para matriz",
      cnpjsAdicionais: [
        {
          numero: "98.765.432/0002-00",
          razaoSocial: "XYZ Filial Sul",
          endereco: "Rua do Comércio, 100 - Porto Alegre/RS",
          email: "filial.sul@xyz.com.br",
          telefone: "(51) 98765-4321",
          observacao: "Necessário agendamento"
        },
        {
          numero: "98.765.432/0003-82",
          razaoSocial: "XYZ Filial Norte",
          endereco: "Av. Industrial, 200 - Manaus/AM",
          email: "filial.norte@xyz.com.br",
          telefone: "(92) 98765-4321",
          observacao: "Entrega somente dias úteis"
        }
      ],
      itens: [
        {
          produtoCodigo: "P003",
          descricao: "Produto Premium 3",
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
      clienteCNPJ: "45.678.901/0001-23",
      clienteEndereco: "Rua Industrial, 321 - Belo Horizonte/MG",
      clienteEmail: "pedidos@beta.com.br",
      clienteTelefone: "(31) 98765-4321",
      fornecedor: "Fornecedor Z",
      vendedorId: 3,
      vendedorNome: "Pedro Costa",
      status: "encaminhado",
      total: 4200.00,
      ipi: 10,
      desconto: 5,
      tipoPagamento: "A prazo",
      condicaoPagamento: "28/56/84",
      observacao: "Pedido prioritário",
      itens: [
        {
          produtoCodigo: "P004",
          descricao: "Produto Premium 4",
          quantidade: 8,
          precoUnitario: 300.00,
          desconto: 0
        },
        {
          produtoCodigo: "P005",
          descricao: "Produto Premium 5",
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
            <span className="text-sm text-gray-600">Bem-vindo, {user?.nome}</span>
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