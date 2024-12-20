import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Search, Save, Send } from "lucide-react";

interface FormularioClienteProps {
  onDadosClienteChange: (dados: {
    cnpj: string;
    razaoSocial: string;
    endereco: string;
    contato: string;
  }) => void;
}

export const FormularioCliente = ({ onDadosClienteChange }: FormularioClienteProps) => {
  const { toast } = useToast();
  const [cnpj, setCnpj] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [endereco, setEndereco] = useState("");
  const [contato, setContato] = useState("");

  const formatCNPJ = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "");
    
    // Aplica a máscara do CNPJ: XX.XXX.XXX/XXXX-XX
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
        contato 
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
    <div className="space-y-4 p-2">
      <h2 className="text-lg font-semibold">Dados do Cliente</h2>
      <div className="grid grid-cols-1 gap-4">
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
              onDadosClienteChange({ cnpj, razaoSocial: e.target.value, endereco, contato });
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
              onDadosClienteChange({ cnpj, razaoSocial, endereco: e.target.value, contato });
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
              onDadosClienteChange({ cnpj, razaoSocial, endereco, contato: e.target.value });
            }}
            placeholder="Telefone ou e-mail"
          />
        </div>
      </div>
    </div>
  );
};