import { useState } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PaymentInfoFieldsProps {
  onPaymentInfoChange: (info: {
    ipi: string;
    desconto: string;
    tipoPagamento: string;
    condicaoPagamento?: string;
  }) => void;
}

export const PaymentInfoFields = ({ onPaymentInfoChange }: PaymentInfoFieldsProps) => {
  const [ipi, setIpi] = useState("");
  const [desconto, setDesconto] = useState("");
  const [tipoPagamento, setTipoPagamento] = useState("antecipado");
  const [condicaoPagamento, setCondicaoPagamento] = useState("");

  const handleIpiChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const formattedValue = numericValue ? `${numericValue}%` : "";
    setIpi(formattedValue);
    updatePaymentInfo(formattedValue, desconto, tipoPagamento, condicaoPagamento);
  };

  const handleDescontoChange = (value: string) => {
    setDesconto(value);
    updatePaymentInfo(ipi, value, tipoPagamento, condicaoPagamento);
  };

  const handleTipoPagamentoChange = (value: string) => {
    setTipoPagamento(value);
    if (value !== "prazo") {
      setCondicaoPagamento("");
    }
    updatePaymentInfo(ipi, desconto, value, value === "prazo" ? condicaoPagamento : undefined);
  };

  const updatePaymentInfo = (
    ipi: string,
    desconto: string,
    tipo: string,
    condicao?: string
  ) => {
    onPaymentInfoChange({
      ipi,
      desconto,
      tipoPagamento: tipo,
      condicaoPagamento: condicao,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">IPI</label>
          <Input
            value={ipi}
            onChange={(e) => handleIpiChange(e.target.value)}
            placeholder="Ex: 6%"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Desconto</label>
          <Input
            value={desconto}
            onChange={(e) => handleDescontoChange(e.target.value)}
            placeholder="Valor do desconto"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Tipo de Pagamento</label>
        <RadioGroup
          value={tipoPagamento}
          onValueChange={handleTipoPagamentoChange}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="antecipado" id="antecipado" />
            <Label htmlFor="antecipado">Antecipado</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="rl-antecipado" id="rl-antecipado" />
            <Label htmlFor="rl-antecipado">RL Antecipado</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="prazo" id="prazo" />
            <Label htmlFor="prazo">A prazo</Label>
          </div>
        </RadioGroup>
      </div>

      {tipoPagamento === "prazo" && (
        <div>
          <label className="block text-sm font-medium mb-2">
            Condição de Pagamento
          </label>
          <Input
            value={condicaoPagamento}
            onChange={(e) => {
              setCondicaoPagamento(e.target.value);
              updatePaymentInfo(ipi, desconto, tipoPagamento, e.target.value);
            }}
            placeholder="Ex: 30-60-90"
          />
        </div>
      )}
    </div>
  );
};