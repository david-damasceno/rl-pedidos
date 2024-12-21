import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, X } from "lucide-react";

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
    if (cnpjAdicional.length === 18) {
      if (cnpjsAdicionais.includes(cnpjAdicional)) {
        toast({
          title: "CNPJ Duplicado",
          description: "Este CNPJ já foi adicionado",
          variant: "destructive",
        });
        return;
      }
      
      setCnpjsAdicionais([...cnpjsAdicionais, cnpjAdicional]);
      setCnpjAdicional("");
      onDadosClienteChange({
        cnpj,
        razaoSocial,
        endereco,
        contato,
        fornecedor,
        cnpjsAdicionais: [...cnpjsAdicionais, cnpjAdicional],
      });
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
              });
            }}
            placeholder="Telefone ou e-mail"
          />
        </div>
        
        {/* CNPJs Adicionais */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">CNPJs Adicionais</label>
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
            <div className="mt-2 space-y-2">
              {cnpjsAdicionais.map((cnpjAdicional, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                  <span className="text-sm text-gray-600">{cnpjAdicional}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveCNPJ(cnpjAdicional)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4 text-gray-500 hover:text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
