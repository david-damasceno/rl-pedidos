import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus } from "lucide-react";

interface FormularioClienteProps {
  onDadosClienteChange: (dados: {
    cnpj: string;
    razaoSocial: string;
    endereco: string;
    contato: string;
    fornecedor: string;
    cnpjsAdicionais: string[];
  }) => void;
}

export const FormularioCliente = ({ onDadosClienteChange }: FormularioClienteProps) => {
  const { toast } = useToast();
  const [cnpj, setCnpj] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [endereco, setEndereco] = useState("");
  const [contato, setContato] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [cnpjAdicional, setCnpjAdicional] = useState("");
  const [cnpjsAdicionais, setCnpjsAdicionais] = useState<string[]>([]);

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
      });
    }
  };

  const handleAddCNPJ = () => {
    if (cnpjAdicional.length === 18) { // CNPJ formatado tem 18 caracteres
      setCnpjsAdicionais([...cnpjsAdicionais, cnpjAdicional]);
      setCnpjAdicional("");
      toast({
        title: "CNPJ Adicional",
        description: "CNPJ adicional incluído com sucesso",
      });
    } else {
      toast({
        title: "CNPJ Inválido",
        description: "Por favor, digite um CNPJ válido",
        variant: "destructive",
      });
    }
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
      // Simulação da consulta ao Sintegra
      // TODO: Implementar integração real com API do Sintegra
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
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold">Dados do Pedido</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Fornecedor</label>
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
              });
            }}
            placeholder="Nome do Fornecedor"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CNPJ</label>
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
          <label className="block text-sm font-medium mb-1">Razão Social</label>
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
              });
            }}
            placeholder="Razão Social"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Endereço</label>
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
              });
            }}
            placeholder="Endereço completo"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contato</label>
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
              });
            }}
            placeholder="Telefone ou e-mail"
          />
        </div>
        
        {/* CNPJs Adicionais */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">CNPJs Adicionais</label>
          <div className="flex gap-2">
            <Input
              value={cnpjAdicional}
              onChange={(e) => {
                const formattedValue = formatCNPJ(e.target.value.replace(/\D/g, ""));
                setCnpjAdicional(formattedValue);
              }}
              placeholder="Digite CNPJ adicional"
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAddCNPJ}
              className="shrink-0 w-10 px-0"
              title="Adicionar CNPJ"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {cnpjsAdicionais.length > 0 && (
            <div className="mt-2 space-y-1">
              {cnpjsAdicionais.map((cnpjAdicional, index) => (
                <div key={index} className="text-sm text-gray-600">
                  {cnpjAdicional}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};