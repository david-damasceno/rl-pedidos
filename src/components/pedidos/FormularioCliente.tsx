import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CNPJList } from "./CNPJList";
import { PaymentInfoFields } from "./PaymentInfoFields";
import { ContactFields } from "./ContactFields";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FornecedorField } from "./FornecedorField";
import { CNPJField } from "./CNPJField";
import { CompanyInfoFields } from "./CompanyInfoFields";

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

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-lg font-semibold">Dados do Pedido</h2>
      <div className="grid grid-cols-1 gap-6">
        <FornecedorField
          value={fornecedor}
          onChange={(value) => {
            setFornecedor(value);
            updateDadosCliente({ fornecedor: value });
          }}
        />
        
        <CNPJField
          value={cnpj}
          onChange={(value) => {
            setCnpj(value);
            updateDadosCliente({ cnpj: value });
          }}
          onSearch={consultarCNPJ}
        />

        <CompanyInfoFields
          razaoSocial={razaoSocial}
          endereco={endereco}
          onRazaoSocialChange={(value) => {
            setRazaoSocial(value);
            updateDadosCliente({ razaoSocial: value });
          }}
          onEnderecoChange={(value) => {
            setEndereco(value);
            updateDadosCliente({ endereco: value });
          }}
        />

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