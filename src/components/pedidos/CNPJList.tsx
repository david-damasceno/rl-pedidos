import { X, Plus, Info, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CNPJDetailsModal, CNPJDetails } from "./CNPJDetailsModal";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

interface CNPJListProps {
  cnpjsAdicionais: string[];
  onAddCNPJ: (cnpj: string) => void;
  onRemoveCNPJ: (cnpj: string) => void;
  onCNPJSelectionChange?: (cnpj: string, isSelected: boolean) => void;
}

interface CNPJWithDetails {
  cnpj: string;
  details?: CNPJDetails;
  isSelected: boolean;
}

export const CNPJList = ({
  cnpjsAdicionais,
  onAddCNPJ,
  onRemoveCNPJ,
  onCNPJSelectionChange,
}: CNPJListProps) => {
  const { toast } = useToast();
  const [cnpjAdicional, setCnpjAdicional] = useState("");
  const [selectedCNPJ, setSelectedCNPJ] = useState<string | null>(null);
  const [cnpjDetails, setCnpjDetails] = useState<Record<string, CNPJDetails>>({});
  const [selectedCNPJs, setSelectedCNPJs] = useState<Record<string, boolean>>(
    cnpjsAdicionais.reduce((acc, cnpj) => ({ ...acc, [cnpj]: true }), {})
  );

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/,
      "$1.$2.$3/$4-$5"
    );
  };

  const handleAddCNPJ = () => {
    if (cnpjAdicional.length === 18) {
      onAddCNPJ(cnpjAdicional);
      setSelectedCNPJs(prev => ({ ...prev, [cnpjAdicional]: true }));
      setCnpjAdicional("");
    } else {
      toast({
        title: "CNPJ Inválido",
        description: "Por favor, digite um CNPJ válido",
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

  const handleCNPJSelection = (cnpj: string, checked: boolean) => {
    setSelectedCNPJs(prev => ({ ...prev, [cnpj]: checked }));
    if (onCNPJSelectionChange) {
      onCNPJSelectionChange(cnpj, checked);
    }
  };

  const handleUncheckAll = () => {
    const newSelection = Object.keys(selectedCNPJs).reduce(
      (acc, cnpj) => ({ ...acc, [cnpj]: false }),
      {}
    );
    setSelectedCNPJs(newSelection);
    cnpjsAdicionais.forEach(cnpj => {
      if (onCNPJSelectionChange) {
        onCNPJSelectionChange(cnpj, false);
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium">CNPJs Adicionais</label>
        {cnpjsAdicionais.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleUncheckAll}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Desmarcar todos
          </Button>
        )}
      </div>
      
      <div className="flex gap-2">
        <Input
          value={cnpjAdicional}
          onChange={(e) => {
            const formattedValue = formatCNPJ(e.target.value.replace(/\D/g, ""));
            setCnpjAdicional(formattedValue);
          }}
          placeholder="Digite CNPJ adicional"
          className="flex-1"
          inputMode="numeric"
          pattern="\d*"
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
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectedCNPJs[cnpj]}
                  onCheckedChange={(checked) => 
                    handleCNPJSelection(cnpj, checked as boolean)
                  }
                  id={`cnpj-${cnpj}`}
                />
                <span className="text-sm text-gray-600">{cnpj}</span>
              </div>
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