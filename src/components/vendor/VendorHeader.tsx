import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const VendorHeader = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Painel do Vendedor</h1>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 hidden sm:inline">Olá, {user?.nome}</span>
        <Button variant="outline" onClick={logout} size="icon" title="Sair">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};