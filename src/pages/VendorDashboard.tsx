import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Pedido, ItemPedido } from "@/types/pedido";
import { DatabaseService } from "@/services/database";
import { VendorHeader } from "@/components/vendor/VendorHeader";
import { VendorTabs } from "@/components/vendor/VendorTabs";
import { VendorContent } from "@/components/vendor/VendorContent";
import { DadosCliente } from "@/types/cliente";

const mockPedidos: Pedido[] = [
  {
    id: "1",
    data: new Date().toISOString(),
    clienteCNPJ: "12345678901234",
    clienteRazaoSocial: "Empresa Exemplo LTDA",
    clienteEndereco: "Rua Exemplo, 123",
    clienteContato: "contato@exemplo.com",
    vendedorNome: "João Silva",
    status: "enviado",
    itens: [],
    total: 1500.0,
  },
];

const VendorDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"novo" | "pedidos" | "orcamentos">("novo");
  const [dadosCliente, setDadosCliente] = useState<DadosCliente>({
    cnpj: "",
    razaoSocial: "",
    endereco: "",
    email: "",
    telefone: "",
    fornecedor: "",
    cnpjsAdicionais: [],
    ipi: "",
    desconto: "",
    tipoPagamento: "antecipado",
    observacao: "",
  });
  const [itens, setItens] = useState<ItemPedido[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>(mockPedidos);
  const [orcamentos, setOrcamentos] = useState<Pedido[]>([]);

  const limparFormulario = () => {
    setDadosCliente({
      cnpj: "",
      razaoSocial: "",
      endereco: "",
      email: "",
      telefone: "",
      fornecedor: "",
      cnpjsAdicionais: [],
      ipi: "",
      desconto: "",
      tipoPagamento: "antecipado",
      observacao: "",
    });
    setItens([]);
  };

  const salvarPedido = async (tipo: "pedido" | "orcamento") => {
    if (!dadosCliente.cnpj || !dadosCliente.razaoSocial || itens.length === 0) {
      toast({
        title: "Erro ao salvar",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    try {
      const total = itens.reduce(
        (acc, item) =>
          acc + item.quantidade * item.precoUnitario * (1 - (item.desconto || 0) / 100),
        0
      );

      const novoPedido = await DatabaseService.createPedido({
        data: new Date().toISOString(),
        clienteCNPJ: dadosCliente.cnpj,
        clienteRazaoSocial: dadosCliente.razaoSocial,
        clienteEndereco: dadosCliente.endereco,
        clienteContato: `${dadosCliente.email} / ${dadosCliente.telefone}`,
        vendedorNome: "Vendedor",
        status: tipo === "pedido" ? "enviado" : "rascunho",
        itens: [...itens],
        total,
      });

      if (tipo === "pedido") {
        setPedidos([...pedidos, novoPedido]);
        toast({
          title: "Pedido enviado",
          description: "Pedido foi enviado com sucesso",
        });
      } else {
        setOrcamentos([...orcamentos, novoPedido]);
        toast({
          title: "Orçamento salvo",
          description: "Orçamento foi salvo com sucesso",
        });
      }

      limparFormulario();
      setActiveTab(tipo === "pedido" ? "pedidos" : "orcamentos");
    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar o pedido",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        <VendorHeader />
        <VendorTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <VendorContent
          activeTab={activeTab}
          dadosCliente={dadosCliente}
          itens={itens}
          pedidos={pedidos}
          orcamentos={orcamentos}
          onDadosClienteChange={setDadosCliente}
          onItensChange={setItens}
          onSalvarPedido={salvarPedido}
          onVerDetalhes={(pedido) => {
            toast({
              title: "Detalhes do Pedido",
              description: `Pedido ${pedido.id} - ${pedido.clienteRazaoSocial}`,
            });
          }}
        />
      </div>
    </div>
  );
};

export default VendorDashboard;
