import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import { CNPJList } from "./CNPJList";
import { PaymentInfoFields } from "./PaymentInfoFields";

interface FormularioClienteProps {
  onDadosClienteChange: (dados: {
    cnpj: string;
    razaoSocial: string;
    endereco: string;
    contato: string;
    fornecedor: string;
    cnpjsAdicionais: string[];
    ipi: string;
    desconto: string;
    tipoPagamento: string;
    condicaoPagamento?: string;
  }) => void;
}

export const FormularioCliente = ({ onDadosClienteChange }: FormularioClienteProps) => {
  const { toast } = useToast();
  const [cnpj, setCnpj] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [endereco, setEndereco] = useState("");
  const [contato, setContato] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [cnpjsAdicionais, setCnpjsAdicionais] = useState<string[]>([]);
  const [paymentInfo, setPaymentInfo] = useState({
    ipi: "",
    desconto: "",
    tipoPagamento: "antecipado",
    condicaoPagamento: "" as string | undefined // Make condicaoPagamento optional
  });

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/,
      "$1.$2.$3/$4-$5"
    );
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (rawValue.length <= 14) {
      const formattedValue = formatCNPJ(rawValue);
      setCnpj(formattedValue);
      onDadosClienteChange({
        cnpj: formattedValue,
        razaoSocial,
        endereco,
        contato,
        fornecedor,
        cnpjsAdicionais,
        ...paymentInfo
      });
    }
  };

  const handleAddCNPJ = (novoCnpj: string) => {
    if (cnpjsAdicionais.includes(novoCnpj)) {
      toast({
        title: "CNPJ Duplicado",
        description: "Este CNPJ já foi adicionado",
        variant: "destructive",
      });
      return;
    }
    
    setCnpjsAdicionais([...cnpjsAdicionais, novoCnpj]);
    onDadosClienteChange({
      cnpj,
      razaoSocial,
      endereco,
      contato,
      fornecedor,
      cnpjsAdicionais: [...cnpjsAdicionais, novoCnpj],
      ...paymentInfo
    });
    toast({
      title: "CNPJ Adicional",
      description: "CNPJ adicional incluído com sucesso",
    });
  };

  const handleRemoveCNPJ = (cnpjToRemove: string) => {
    const newCnpjs = cnpjsAdicionais.filter(c => c !== cnpjToRemove);
    setCnpjsAdicionais(newCnpjs);
    onDadosClienteChange({
      cnpj,
      razaoSocial,
      endereco,
      contato,
      fornecedor,
      cnpjsAdicionais: newCnpjs,
      ...paymentInfo
    });
    toast({
      title: "CNPJ Removido",
      description: "CNPJ adicional removido com sucesso",
    });
  };

  const consultarCNPJ = async () => {
    const numerosCNPJ = cnpj.replace(/\D/g, "");
    if (numerosCNPJ.length !== 14) {
      toast({
        title: "CNPJ Inválido",
        description: "Por favor, digite um CNPJ válido com 14 dígitos",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            razaoSocial: "Empresa Exemplo LTDA",
            endereco: "Rua Exemplo, 123 - São Paulo/SP",
          });
        }, 1000);
      });

      const dados = response as { razaoSocial: string; endereco: string };
      setRazaoSocial(dados.razaoSocial);
      setEndereco(dados.endereco);

      onDadosClienteChange({
        cnpj,
        razaoSocial: dados.razaoSocial,
        endereco: dados.endereco,
        contato,
        fornecedor,
        cnpjsAdicionais,
        ...paymentInfo
      });

      toast({
        title: "Dados encontrados",
        description: "Informações do CNPJ foram preenchidas automaticamente",
      });
    } catch (error) {
      toast({
        title: "Erro ao consultar CNPJ",
        description: "Não foi possível obter os dados do CNPJ",
        variant: "destructive",
      });
    }
  };

  const handlePaymentInfoChange = (info: {
    ipi: string;
    desconto: string;
    tipoPagamento: string;
    condicaoPagamento?: string;
  }) => {
    setPaymentInfo(prevInfo => ({
      ...prevInfo,
      ...info,
      // Ensure condicaoPagamento is set to undefined if not provided
      condicaoPagamento: info.condicaoPagamento || undefined
    }));
    onDadosClienteChange({
      cnpj,
      razaoSocial,
      endereco,
      contato,
      fornecedor,
      cnpjsAdicionais,
      ...info,
    });
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-lg font-semibold">Dados do Pedido</h2>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Fornecedor</label>
          <Input
            value={fornecedor}
            onChange={(e) => {
              setFornecedor(e.target.value);
              onDadosClienteChange({
                cnpj,
                razaoSocial,
                endereco,
                contato,
                fornecedor: e.target.value,
                cnpjsAdicionais,
                ...paymentInfo
              });
            }}
            placeholder="Nome do Fornecedor"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">CNPJ</label>
          <div className="flex gap-2">
            <Input
              value={cnpj}
              onChange={handleCNPJChange}
              placeholder="Digite o CNPJ"
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={consultarCNPJ}
              className="shrink-0 w-10 px-0"
              title="Buscar CNPJ"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Razão Social</label>
          <Input
            value={razaoSocial}
            onChange={(e) => {
              setRazaoSocial(e.target.value);
              onDadosClienteChange({
                cnpj,
                razaoSocial: e.target.value,
                endereco,
                contato,
                fornecedor,
                cnpjsAdicionais,
                ...paymentInfo
              });
            }}
            placeholder="Razão Social"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Endereço</label>
          <Input
            value={endereco}
            onChange={(e) => {
              setEndereco(e.target.value);
              onDadosClienteChange({
                cnpj,
                razaoSocial,
                endereco: e.target.value,
                contato,
                fornecedor,
                cnpjsAdicionais,
                ...paymentInfo
              });
            }}
            placeholder="Endereço completo"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Contato</label>
          <Input
            value={contato}
            onChange={(e) => {
              setContato(e.target.value);
              onDadosClienteChange({
                cnpj,
                razaoSocial,
                endereco,
                contato: e.target.value,
                fornecedor,
                cnpjsAdicionais,
                ...paymentInfo
              });
            }}
            placeholder="Telefone ou e-mail"
          />
        </div>
        
        <CNPJList
          cnpjsAdicionais={cnpjsAdicionais}
          onAddCNPJ={handleAddCNPJ}
          onRemoveCNPJ={handleRemoveCNPJ}
        />

        <PaymentInfoFields onPaymentInfoChange={handlePaymentInfoChange} />
      </div>
    </div>
  );
};