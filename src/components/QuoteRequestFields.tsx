import { useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  city?: string;
  message?: string;
  onCityChange?: (value: string) => void;
  onMessageChange?: (value: string) => void;
  disabled?: boolean;
};

/** Dados complementares comuns às solicitações de cotação. */
export default function QuoteRequestFields({ city = "", message = "", onCityChange, onMessageChange, disabled }: Props) {
  const id = useId();
  return (
    <div className="space-y-4">
      {onCityChange && <div className="space-y-2">
        <Label htmlFor={`${id}-city`}>Cidade (opcional)</Label>
        <Input id={`${id}-city`} name="quote_city" autoComplete="address-level2" maxLength={80} value={city} disabled={disabled} onChange={event => onCityChange(event.target.value)} placeholder="Ex.: Guarulhos / SP" />
      </div>}
      {onMessageChange && <div className="space-y-2">
        <Label htmlFor={`${id}-message`}>Mensagem (opcional)</Label>
        <Textarea id={`${id}-message`} name="quote_message" maxLength={1000} rows={3} value={message} disabled={disabled} onChange={event => onMessageChange(event.target.value)} placeholder="Conte o que você precisa proteger ou tire uma dúvida." />
      </div>}
    </div>
  );
}
