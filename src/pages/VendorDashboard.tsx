import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

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

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddItem = () => {
    if (!newItem.productCode || !newItem.description || !newItem.quantity || !newItem.unitPrice) {
      toast({
        title: "Error",
        description: "Please fill all item fields",
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

  const handleSubmitOrder = () => {
    if (!customerInfo.cnpj || !customerInfo.businessName || items.length === 0) {
      toast({
        title: "Error",
        description: "Please fill all required fields and add at least one item",
        variant: "destructive",
      });
      return;
    }

    // Mock order submission
    toast({
      title: "Success",
      description: "Order submitted successfully",
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
          <h1 className="text-2xl font-bold text-gray-900">New Order</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">CNPJ</label>
              <Input
                name="cnpj"
                value={customerInfo.cnpj}
                onChange={handleCustomerInfoChange}
                placeholder="Enter CNPJ"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Name</label>
              <Input
                name="businessName"
                value={customerInfo.businessName}
                onChange={handleCustomerInfoChange}
                placeholder="Enter business name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <Input
                name="address"
                value={customerInfo.address}
                onChange={handleCustomerInfoChange}
                placeholder="Enter address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact</label>
              <Input
                name="contact"
                value={customerInfo.contact}
                onChange={handleCustomerInfoChange}
                placeholder="Enter contact details"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Product Code</th>
                  <th className="text-left p-2">Description</th>
                  <th className="text-left p-2">Quantity</th>
                  <th className="text-left p-2">Discount (%)</th>
                  <th className="text-left p-2">Unit Price</th>
                  <th className="text-left p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2">{item.productCode}</td>
                    <td className="p-2">{item.description}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">{item.discount}%</td>
                    <td className="p-2">${item.unitPrice.toFixed(2)}</td>
                    <td className="p-2">
                      ${((item.quantity * item.unitPrice) * (1 - item.discount / 100)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              placeholder="Product Code"
              value={newItem.productCode || ""}
              onChange={(e) => setNewItem({ ...newItem, productCode: e.target.value })}
            />
            <Input
              placeholder="Description"
              value={newItem.description || ""}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Quantity"
              value={newItem.quantity || ""}
              onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
            />
            <Input
              type="number"
              placeholder="Discount %"
              value={newItem.discount || ""}
              onChange={(e) => setNewItem({ ...newItem, discount: Number(e.target.value) })}
            />
            <Input
              type="number"
              placeholder="Unit Price"
              value={newItem.unitPrice || ""}
              onChange={(e) => setNewItem({ ...newItem, unitPrice: Number(e.target.value) })}
            />
          </div>
          <Button onClick={handleAddItem} className="mt-4">
            Add Item
          </Button>
        </div>

        <Button onClick={handleSubmitOrder} className="w-full">
          Submit Order
        </Button>
      </div>
    </div>
  );
};

export default VendorDashboard;