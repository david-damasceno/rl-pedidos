import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { FormularioCliente } from "@/components/pedidos/FormularioCliente";
import { TabelaItens } from "@/components/pedidos/TabelaItens";
import { ListaPedidos } from "@/components/pedidos/ListaPedidos";
import { Pedido, ItemPedido } from "@/types/pedido";
import { 
  LogOut, 
  FileText, 
  ClipboardList, 
  PlusCircle,
  Send  
} from "lucide-react";
import { DatabaseService } from "@/services/database"; // Import the DatabaseService

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

    try {
      const total = itens.reduce(
        (acc, item) =>
          acc + item.quantidade * item.precoUnitario * (1 - item.desconto / 100),
        0
      );

      const novoPedido = await DatabaseService.createPedido({
        data: new Date().toISOString(),
        clienteCNPJ: dadosCliente.cnpj,
        clienteRazaoSocial: dadosCliente.razaoSocial,
        clienteEndereco: dadosCliente.endereco,
        clienteContato: dadosCliente.contato,
        vendedorNome: user?.name || "Vendedor",
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
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Painel do Vendedor</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 hidden sm:inline">Olá, {user?.name}</span>
            <Button variant="outline" onClick={logout} size="icon" title="Sair">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-1 sm:gap-2 mb-4 overflow-x-auto">
          <Button
            variant={activeTab === "novo" ? "default" : "outline"}
            onClick={() => setActiveTab("novo")}
            className="flex-1 sm:flex-none"
            title="Novo Pedido"
          >
            <PlusCircle className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Novo Pedido</span>
          </Button>
          <Button
            variant={activeTab === "pedidos" ? "default" : "outline"}
            onClick={() => setActiveTab("pedidos")}
            className="flex-1 sm:flex-none"
            title="Pedidos Enviados"
          >
            <ClipboardList className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Pedidos</span>
          </Button>
          <Button
            variant={activeTab === "orcamentos" ? "default" : "outline"}
            onClick={() => setActiveTab("orcamentos")}
            className="flex-1 sm:flex-none"
            title="Orçamentos"
          >
            <FileText className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Orçamentos</span>
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow">
          {activeTab === "novo" ? (
            <div className="space-y-6">
              <FormularioCliente onDadosClienteChange={setDadosCliente} />
              <TabelaItens itens={itens} onItensChange={setItens} />
              <div className="flex flex-col sm:flex-row justify-end gap-2 p-4">
                <Button 
                  variant="outline" 
                  onClick={() => salvarPedido("orcamento")}
                  className="w-full sm:w-auto"
                >
                  Salvar Orçamento
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
