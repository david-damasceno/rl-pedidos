import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { FormularioCliente } from "@/components/pedidos/FormularioCliente";
import { TabelaItens } from "@/components/pedidos/TabelaItens";
import { ListaPedidos } from "@/components/pedidos/ListaPedidos";
import { Pedido, ItemPedido } from "@/types/pedido";

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
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"novo" | "pedidos" | "orcamentos">("novo");
  const [dadosCliente, setDadosCliente] = useState({
    cnpj: "",
    razaoSocial: "",
    endereco: "",
    contato: "",
  });
  const [itens, setItens] = useState<ItemPedido[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>(mockPedidos);
  const [orcamentos, setOrcamentos] = useState<Pedido[]>([]);

  const limparFormulario = () => {
    setDadosCliente({
      cnpj: "",
      razaoSocial: "",
      endereco: "",
      contato: "",
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

    const novoPedido: Pedido = {
      id: Math.random().toString(),
      data: new Date().toISOString(),
      clienteCNPJ: dadosCliente.cnpj,
      clienteRazaoSocial: dadosCliente.razaoSocial,
      clienteEndereco: dadosCliente.endereco,
      clienteContato: dadosCliente.contato,
      vendedorNome: user?.name || "Vendedor",
      status: tipo === "pedido" ? "enviado" : "rascunho",
      itens: [...itens],
      total: itens.reduce(
        (acc, item) =>
          acc + item.quantidade * item.precoUnitario * (1 - item.desconto / 100),
        0
      ),
    };

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
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Painel do Vendedor</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Olá, {user?.name}</span>
            <Button variant="outline" onClick={logout}>
              Sair
            </Button>
          </div>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto">
          <Button
            variant={activeTab === "novo" ? "default" : "outline"}
            onClick={() => setActiveTab("novo")}
            className="whitespace-nowrap"
          >
            Novo Pedido
          </Button>
          <Button
            variant={activeTab === "pedidos" ? "default" : "outline"}
            onClick={() => setActiveTab("pedidos")}
            className="whitespace-nowrap"
          >
            Pedidos Enviados
          </Button>
          <Button
            variant={activeTab === "orcamentos" ? "default" : "outline"}
            onClick={() => setActiveTab("orcamentos")}
            className="whitespace-nowrap"
          >
            Orçamentos
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          {activeTab === "novo" ? (
            <div className="space-y-6">
              <FormularioCliente onDadosClienteChange={setDadosCliente} />
              <TabelaItens itens={itens} onItensChange={setItens} />
              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => salvarPedido("orcamento")}
                  className="w-full sm:w-auto"
                >
                  Salvar como Orçamento
                </Button>
                <Button 
                  onClick={() => salvarPedido("pedido")}
                  className="w-full sm:w-auto"
                >
                  Enviar Pedido
                </Button>
              </div>
            </div>
          ) : activeTab === "pedidos" ? (
            <ListaPedidos
              pedidos={pedidos}
              tipo="pedidos"
              onVerDetalhes={(pedido) => {
                toast({
                  title: "Detalhes do Pedido",
                  description: `Pedido ${pedido.id} - ${pedido.clienteRazaoSocial}`,
                });
              }}
            />
          ) : (
            <ListaPedidos
              pedidos={orcamentos}
              tipo="orcamentos"
              onVerDetalhes={(pedido) => {
                toast({
                  title: "Detalhes do Orçamento",
                  description: `Orçamento ${pedido.id} - ${pedido.clienteRazaoSocial}`,
                });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;