import { memo, useId } from "react";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";

interface GooglePreferredSourceProps {
  /** Contexto de tracking/localização para o aria-label */
  context?: string;
  className?: string;
}

const SUPPORT_TEXT =
  "Gostou do conteúdo da Patro Seguros? Adicione a Patro como fonte preferencial no Google e receba mais conteúdos úteis sobre seguros, planos de saúde e proteção financeira.";

const FALLBACK_URL =
  "https://www.google.com/preferences/source?q=patroseguros.com.br";

/**
 * Botão oficial do Google "Adicionar como fonte preferencial".
 *
 * O script `publisher.js` (carregado de forma assíncrona no <head> do
 * index.html) hidrata o <div google-add-preferred-source-btn>. Caso o
 * script não renderize (bloqueadores, falha de rede), um fallback
 * discreto em link é exibido logo abaixo.
 *
 * Acessibilidade:
 * - Região agrupada com `role="group"` rotulada pelo texto de apoio,
 *   para que leitores de tela anunciem o contexto antes do botão.
 * - O texto de apoio recebe `id` único (useId) e serve como
 *   `aria-labelledby` do grupo — sem impactar os CTAs principais.
 * - O fallback em <a> possui aria-label descritivo com o contexto.
 *
 * Componente leve, sem JS próprio — não impacta performance mobile.
 */
const GooglePreferredSource = memo(({ context = "site", className = "" }: GooglePreferredSourceProps) => {
  const descriptionId = useId();

  return (
    <div
      role="group"
      aria-labelledby={descriptionId}
      className={`flex flex-col items-center gap-3 text-center ${className}`}
    >
      <p
        id={descriptionId}
        className="text-[13px] text-muted-foreground leading-relaxed max-w-md"
      >
        {SUPPORT_TEXT}
      </p>
      {/* Botão oficial — hidratado pelo publisher.js do Google News */}
      <div
        google-add-preferred-source-btn=""
        data-theme="light"
        data-lang="pt-br"
        aria-hidden="false"
      />
      {/* Fallback discreto caso o botão oficial não renderize */}
      <a
        href={FALLBACK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-primary underline decoration-muted-foreground/30 hover:decoration-primary transition-colors"
        aria-label={`Adicionar a Patro Seguros como fonte preferencial no Google (abre em nova aba) — ${context}`}
        aria-describedby={descriptionId}
      >
        <ExternalLinkIcon className="h-3 w-3" aria-hidden="true" focusable="false" />
        Adicionar a Patro Seguros como fonte preferencial no Google
      </a>
    </div>
  );
});

GooglePreferredSource.displayName = "GooglePreferredSource";

export default GooglePreferredSource;
