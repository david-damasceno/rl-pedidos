import { X, Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CNPJDetailsModal, CNPJDetails } from "./CNPJDetailsModal";
import { useToast } from "@/hooks/use-toast";

interface CNPJListProps {
  cnpjsAdicionais: string[];
  onAddCNPJ: (cnpj: string) => void;
  onRemoveCNPJ: (cnpj: string) => void;
}

interface CNPJWithDetails {
  cnpj: string;
  details?: CNPJDetails;
}

export const CNPJList = ({
  cnpjsAdicionais,
  onAddCNPJ,
  onRemoveCNPJ,
}: CNPJListProps) => {
  const { toast } = useToast();
  const [cnpjAdicional, setCnpjAdicional] = useState("");
  const [selectedCNPJ, setSelectedCNPJ] = useState<string | null>(null);
  const [cnpjDetails, setCnpjDetails] = useState<Record<string, CNPJDetails>>({});

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 14) {
      return numbers.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        (_, g1, g2, g3, g4, g5) => {
          if (g5) return `${g1}.${g2}.${g3}/${g4}-${g5}`;
          if (g4) return `${g1}.${g2}.${g3}/${g4}`;
          if (g3) return `${g1}.${g2}.${g3}`;
          if (g2) return `${g1}.${g2}`;
          return g1;
        }
      );
    }
    return value.slice(0, 18);
  };

  const validateCNPJ = (cnpj: string) => {
    const numbers = cnpj.replace(/\D/g, "");
    return numbers.length === 14;
  };

  const handleAddCNPJ = () => {
    if (validateCNPJ(cnpjAdicional)) {
      onAddCNPJ(cnpjAdicional);
      setCnpjAdicional("");
    } else {
      toast({
        title: "CNPJ Inválido",
        description: "Por favor, digite um CNPJ válido com 14 dígitos",
        variant: "destructive",
      });
    }
  };

  const handleSaveDetails = (cnpj: string, details: CNPJDetails) => {
    setCnpjDetails((prev) => ({ ...prev, [cnpj]: details }));
    toast({
      title: "Detalhes Salvos",
      description: "Os detalhes do CNPJ foram salvos com sucesso",
    });
  };

  const handleCNPJInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCNPJ(e.target.value);
    setCnpjAdicional(formattedValue);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">CNPJs Adicionais</label>
      <div className="flex gap-2">
        <Input
          value={cnpjAdicional}
          onChange={handleCNPJInput}
          placeholder="00.000.000/0000-00"
          className="flex-1"
          maxLength={18}
          inputMode="numeric"
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
          {cnpjsAdicionais.map((cnpj) => (
            <div
              key={cnpj}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
            >
              <span className="text-sm text-gray-600">{cnpj}</span>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCNPJ(cnpj)}
                  className="h-8 w-8 p-0"
                  title="Ver detalhes"
                >
                  <Info className="h-4 w-4 text-blue-500" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveCNPJ(cnpj)}
                  className="h-8 w-8 p-0"
                  title="Remover CNPJ"
                >
                  <X className="h-4 w-4 text-gray-500 hover:text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <CNPJDetailsModal
        isOpen={!!selectedCNPJ}
        onClose={() => setSelectedCNPJ(null)}
        onSave={(details) => {
          if (selectedCNPJ) {
            handleSaveDetails(selectedCNPJ, details);
          }
        }}
        initialDetails={selectedCNPJ ? cnpjDetails[selectedCNPJ] : undefined}
      />
    </div>
  );
};