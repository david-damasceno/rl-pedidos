import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactFieldsProps {
  email: string;
  telefone: string;
  onEmailChange: (value: string) => void;
  onTelefoneChange: (value: string) => void;
}

export const ContactFields = ({
  email,
  telefone,
  onEmailChange,
  onTelefoneChange,
}: ContactFieldsProps) => {
  return (
    <>
      <div>
        <Label htmlFor="email" className="block text-sm font-medium mb-2">E-mail</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="Digite o e-mail"
        />
      </div>
      <div>
        <Label htmlFor="telefone" className="block text-sm font-medium mb-2">Telefone</Label>
        <Input
          id="telefone"
          value={telefone}
          onChange={(e) => onTelefoneChange(e.target.value)}
          placeholder="Digite o telefone"
        />
      </div>
    </>
  );
};