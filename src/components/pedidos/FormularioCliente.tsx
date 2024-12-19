import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

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

  const consultarCNPJ = async (cnpj: string) => {
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
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Dados do Cliente</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">CNPJ</label>
          <Input
            value={cnpj}
            onChange={(e) => {
              setCnpj(e.target.value);
              if (e.target.value.length === 14) {
                consultarCNPJ(e.target.value);
              }
            }}
            placeholder="Digite o CNPJ"
            maxLength={14}
          />
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