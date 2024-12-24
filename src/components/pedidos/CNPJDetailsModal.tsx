import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CNPJDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (details: CNPJDetails) => void;
  initialDetails?: CNPJDetails;
}

export interface CNPJDetails {
  razaoSocial: string;
  endereco: string;
  email: string;
  telefone: string;
  tipo: "comercial" | "financeiro";
  observacao: string;
}

export const CNPJDetailsModal = ({
  isOpen,
  onClose,
  onSave,
  initialDetails,
}: CNPJDetailsModalProps) => {
  const [details, setDetails] = useState<CNPJDetails>(
    initialDetails || {
      razaoSocial: "",
      endereco: "",
      email: "",
      telefone: "",
      tipo: "comercial",
      observacao: "",
    }
  );

  const handleSave = () => {
    onSave(details);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detalhes do CNPJ</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="razaoSocial">Razão Social</Label>
            <Input
              id="razaoSocial"
              value={details.razaoSocial}
              onChange={(e) =>
                setDetails({ ...details, razaoSocial: e.target.value })
              }
              placeholder="Digite a razão social"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="endereco">Endereço</Label>
            <Input
              id="endereco"
              value={details.endereco}
              onChange={(e) =>
                setDetails({ ...details, endereco: e.target.value })
              }
              placeholder="Digite o endereço"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={details.email}
              onChange={(e) => setDetails({ ...details, email: e.target.value })}
              placeholder="Digite o e-mail"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={details.telefone}
              onChange={(e) =>
                setDetails({ ...details, telefone: e.target.value })
              }
              placeholder="Digite o telefone"
            />
          </div>
          <div className="grid gap-2">
            <Label>Tipo</Label>
            <RadioGroup
              value={details.tipo}
              onValueChange={(value: "comercial" | "financeiro") =>
                setDetails({ ...details, tipo: value })
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comercial" id="comercial" />
                <Label htmlFor="comercial">Comercial</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="financeiro" id="financeiro" />
                <Label htmlFor="financeiro">Financeiro</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="observacao">Observação</Label>
            <Textarea
              id="observacao"
              value={details.observacao}
              onChange={(e) =>
                setDetails({ ...details, observacao: e.target.value })
              }
              placeholder="Digite as observações"
              className="min-h-[100px]"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};