import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FornecedorFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const FornecedorField = ({ value, onChange }: FornecedorFieldProps) => {
  return (
    <div>
      <Label className="block text-sm font-medium mb-2">Fornecedor</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Nome do Fornecedor"
      />
    </div>
  );
};