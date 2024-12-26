import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";

interface CNPJFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export const CNPJField = ({ value, onChange, onSearch }: CNPJFieldProps) => {
  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/,
      "$1.$2.$3/$4-$5"
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (rawValue.length <= 14) {
      const formattedValue = formatCNPJ(rawValue);
      onChange(formattedValue);
    }
  };

  return (
    <div>
      <Label className="block text-sm font-medium mb-2">CNPJ</Label>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={handleChange}
          placeholder="Digite o CNPJ"
          className="flex-1"
          inputMode="numeric"
          pattern="\d*"
        />
        <Button
          type="button"
          variant="outline"
          onClick={onSearch}
          className="shrink-0 w-10 px-0"
          title="Buscar CNPJ"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};