import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CustomerFormProps {
  customerInfo: {
    cnpj: string;
    businessName: string;
    address: string;
    contact: string;
  };
  onCustomerInfoChange: (info: any) => void;
}

export const CustomerForm = ({ customerInfo, onCustomerInfoChange }: CustomerFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const fetchCompanyData = async (cnpj: string) => {
    if (cnpj.length !== 14) return;
    
    setIsLoading(true);
    try {
      // Simulated API call - replace with actual Sintegra integration
      const response = await fetch(`https://api.example.com/sintegra/${cnpj}`);
      const data = await response.json();
      
      onCustomerInfoChange({
        ...customerInfo,
        businessName: data.businessName,
        address: data.address,
      });
      
      toast({
        title: "Sucesso",
        description: "Dados da empresa carregados com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados da empresa",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cnpj = e.target.value.replace(/\D/g, "");
    onCustomerInfoChange({ ...customerInfo, cnpj });
    if (cnpj.length === 14) {
      fetchCompanyData(cnpj);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Informações do Cliente</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">CNPJ</label>
          <Input
            name="cnpj"
            value={customerInfo.cnpj}
            onChange={handleCNPJChange}
            placeholder="Digite o CNPJ"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Razão Social</label>
          <Input
            name="businessName"
            value={customerInfo.businessName}
            onChange={(e) => onCustomerInfoChange({ ...customerInfo, businessName: e.target.value })}
            placeholder="Razão Social"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Endereço</label>
          <Input
            name="address"
            value={customerInfo.address}
            onChange={(e) => onCustomerInfoChange({ ...customerInfo, address: e.target.value })}
            placeholder="Endereço"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contato</label>
          <Input
            name="contact"
            value={customerInfo.contact}
            onChange={(e) => onCustomerInfoChange({ ...customerInfo, contact: e.target.value })}
            placeholder="Contato"
          />
        </div>
      </div>
    </div>
  );
};