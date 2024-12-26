import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import { CNPJList } from "./CNPJList";
import { PaymentInfoFields } from "./PaymentInfoFields";
import { ContactFields } from "./ContactFields";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormularioClienteProps {
  onDadosClienteChange: (dados: {
    cnpj: string;
    razaoSocial: string;
    endereco: string;
    email: string;
    telefone: string;
    fornecedor: string;
    cnpjsAdicionais: string[];
    ipi: string;
    desconto: string;
    tipoPagamento: string;
    condicaoPagamento?: string;
    observacao: string;
  }) => void;
}

export const FormularioCliente = ({ onDadosClienteChange }: FormularioClienteProps) => {
  const { toast } = useToast();
  const [cnpj, setCnpj] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [endereco, setEndereco] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [cnpjsAdicionais, setCnpjsAdicionais] = useState<string[]>([]);
  const [observacao, setObservacao] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({
    ipi: "",
    desconto: "",
    tipoPagamento: "antecipado",
    condicaoPagamento: undefined as string | undefined
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
      updateDadosCliente({ cnpj: formattedValue });
    }
  };

  const updateDadosCliente = (newData: Partial<Parameters<typeof onDadosClienteChange>[0]>) => {
    onDadosClienteChange({
      cnpj,
      razaoSocial,
      endereco,
      email,
      telefone,
      fornecedor,
      cnpjsAdicionais,
      observacao,
      ...paymentInfo,
      ...newData
    });
  };

  const handlePaymentInfoChange = (info: {
    ipi: string;
    desconto: string;
    tipoPagamento: string;
    condicaoPagamento?: string;
  }) => {
    setPaymentInfo(prevInfo => ({
      ...prevInfo,
      ...info
    }));
    updateDadosCliente(info);
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
      updateDadosCliente({
        razaoSocial: dados.razaoSocial,
        endereco: dados.endereco,
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
              updateDadosCliente({ fornecedor: e.target.value });
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
              inputMode="numeric"
              pattern="\d*"
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
              updateDadosCliente({ razaoSocial: e.target.value });
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
              updateDadosCliente({ endereco: e.target.value });
            }}
            placeholder="Endereço completo"
          />
        </div>

        <ContactFields
          email={email}
          telefone={telefone}
          onEmailChange={(value) => {
            setEmail(value);
            updateDadosCliente({ email: value });
          }}
          onTelefoneChange={(value) => {
            setTelefone(value);
            updateDadosCliente({ telefone: value });
          }}
        />

        <PaymentInfoFields onPaymentInfoChange={handlePaymentInfoChange} />
        
        <CNPJList
          cnpjsAdicionais={cnpjsAdicionais}
          onAddCNPJ={(novoCnpj) => {
            setCnpjsAdicionais([...cnpjsAdicionais, novoCnpj]);
            updateDadosCliente({ cnpjsAdicionais: [...cnpjsAdicionais, novoCnpj] });
          }}
          onRemoveCNPJ={(cnpjToRemove) => {
            const newCnpjs = cnpjsAdicionais.filter(c => c !== cnpjToRemove);
            setCnpjsAdicionais(newCnpjs);
            updateDadosCliente({ cnpjsAdicionais: newCnpjs });
          }}
        />

        <div>
          <Label htmlFor="observacao" className="block text-sm font-medium mb-2">Observação</Label>
          <Textarea
            id="observacao"
            value={observacao}
            onChange={(e) => {
              setObservacao(e.target.value);
              updateDadosCliente({ observacao: e.target.value });
            }}
            placeholder="Digite as observações"
            className="min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
};