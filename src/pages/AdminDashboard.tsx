import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { OrderDetailsModal } from "@/components/admin/OrderDetailsModal";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<any[]>([]); // We'll type this properly when we have the full order type
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
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