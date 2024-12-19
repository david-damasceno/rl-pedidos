import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { CustomerForm } from "@/components/vendor/CustomerForm";
import { OrderItemsTable } from "@/components/vendor/OrderItemsTable";
import { OrderHistory } from "@/components/vendor/OrderHistory";

interface OrderItem {
  id: string;
  productCode: string;
  description: string;
  quantity: number;
  discount: number;
  unitPrice: number;
}

const VendorDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [customerInfo, setCustomerInfo] = useState({
    cnpj: "",
    businessName: "",
    address: "",
    contact: "",
  });
  const [items, setItems] = useState<OrderItem[]>([]);
  const [newItem, setNewItem] = useState<Partial<OrderItem>>({});
  const [showHistory, setShowHistory] = useState(false);

  const handleAddItem = () => {
    if (!newItem.productCode || !newItem.description || !newItem.quantity || !newItem.unitPrice) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos do item",
        variant: "destructive",
      });
      return;
    }

    setItems([
      ...items,
      {
        id: Math.random().toString(),
        productCode: newItem.productCode || "",
        description: newItem.description || "",
        quantity: Number(newItem.quantity),
        discount: Number(newItem.discount || 0),
        unitPrice: Number(newItem.unitPrice),
      },
    ]);
    setNewItem({});
  };

  const handleSubmitOrder = (isDraft: boolean = false) => {
    if (!customerInfo.cnpj || !customerInfo.businessName || items.length === 0) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios e adicione pelo menos um item",
        variant: "destructive",
      });
      return;
    }

    // Mock order submission
    toast({
      title: "Sucesso",
      description: isDraft ? "Orçamento salvo com sucesso" : "Pedido enviado com sucesso",
    });

    // Reset form
    setCustomerInfo({
      cnpj: "",
      businessName: "",
      address: "",
      contact: "",
    });
    setItems([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {showHistory ? "Histórico de Pedidos" : "Novo Pedido"}
            </h1>
            <Button
              variant="link"
              onClick={() => setShowHistory(!showHistory)}
              className="mt-2"
            >
              {showHistory ? "Criar Novo Pedido" : "Ver Histórico"}
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Bem-vindo, {user?.name}</span>
            <Button variant="outline" onClick={logout}>
              Sair
            </Button>
          </div>
        </div>

        {showHistory ? (
          <OrderHistory />
        ) : (
          <>
            <CustomerForm
              customerInfo={customerInfo}
              onCustomerInfoChange={setCustomerInfo}
            />
            <OrderItemsTable
              items={items}
              newItem={newItem}
              onNewItemChange={setNewItem}
              onAddItem={handleAddItem}
            />
            <div className="flex gap-4">
              <Button onClick={() => handleSubmitOrder(false)} className="flex-1">
                Enviar Pedido
              </Button>
              <Button
                onClick={() => handleSubmitOrder(true)}
                variant="outline"
                className="flex-1"
              >
                Salvar como Orçamento
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;