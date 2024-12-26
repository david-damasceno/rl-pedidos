import { Button } from "@/components/ui/button";
import { PlusCircle, ClipboardList, FileText } from "lucide-react";

interface VendorTabsProps {
  activeTab: "novo" | "pedidos" | "orcamentos";
  onTabChange: (tab: "novo" | "pedidos" | "orcamentos") => void;
}

export const VendorTabs = ({ activeTab, onTabChange }: VendorTabsProps) => {
  return (
    <div className="flex gap-2 mb-4 overflow-x-auto bg-white p-2 rounded-lg shadow">
      <Button
        variant={activeTab === "novo" ? "default" : "outline"}
        onClick={() => onTabChange("novo")}
        className="flex-1 sm:flex-none whitespace-nowrap"
      >
        <PlusCircle className="h-4 w-4 sm:mr-2" />
        <span className="hidden sm:inline">Novo Pedido</span>
        <span className="sm:hidden">Novo</span>
      </Button>
      <Button
        variant={activeTab === "pedidos" ? "default" : "outline"}
        onClick={() => onTabChange("pedidos")}
        className="flex-1 sm:flex-none whitespace-nowrap"
      >
        <ClipboardList className="h-4 w-4 sm:mr-2" />
        <span className="hidden sm:inline">Pedidos</span>
        <span className="sm:hidden">Pedidos</span>
      </Button>
      <Button
        variant={activeTab === "orcamentos" ? "default" : "outline"}
        onClick={() => onTabChange("orcamentos")}
        className="flex-1 sm:flex-none whitespace-nowrap"
      >
        <FileText className="h-4 w-4 sm:mr-2" />
        <span className="hidden sm:inline">Orçamentos</span>
        <span className="sm:hidden">Orç.</span>
      </Button>
    </div>
  );
};