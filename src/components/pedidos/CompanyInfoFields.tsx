import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CompanyInfoFieldsProps {
  razaoSocial: string;
  endereco: string;
  onRazaoSocialChange: (value: string) => void;
  onEnderecoChange: (value: string) => void;
}

export const CompanyInfoFields = ({
  razaoSocial,
  endereco,
  onRazaoSocialChange,
  onEnderecoChange,
}: CompanyInfoFieldsProps) => {
  return (
    <>
      <div>
        <Label className="block text-sm font-medium mb-2">Razão Social</Label>
        <Input
          value={razaoSocial}
          onChange={(e) => onRazaoSocialChange(e.target.value)}
          placeholder="Razão Social"
        />
      </div>
      <div>
        <Label className="block text-sm font-medium mb-2">Endereço</Label>
        <Input
          value={endereco}
          onChange={(e) => onEnderecoChange(e.target.value)}
          placeholder="Endereço completo"
        />
      </div>
    </>
  );
};