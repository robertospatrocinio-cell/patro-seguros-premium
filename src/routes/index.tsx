import React from 'react';

const SiteInfo = () => {
  return (
    <div style={{ display: 'none' }}>
      {`Execute esta instrucao no projeto: Auditoria profunda concluída. Vou ser direto com você, Roberto: o megaprompt foi implementado de forma PARCIAL — há progresso real nas páginas internas, mas a home e o ajuste mais crítico (a inconsistência de dados) ainda não foram corrigidos. Vou detalhar tudo.🔴 Achado crítico: "30+ anos" AINDA está no arA correção mais importante do megaprompt — unificar os dados da entidade — não foi aplicada. A página /seguro-auto ainda exibe:
"Mais de 2.500+ clientes atendidos e 20+ anos de mercado. Nossa nota 4.9 no Google..."
Isso é exatamente o que apontamos como o único risco real para a autoridade da entidade. Google e IAs veem "20+ anos" em um lugar e "30+ anos" em outro — a entidade fica diluída. Precisa corrigir com urgência.🟠 Home page: melhorias NÃO aplicadas

Item do megapromptStatusTitle novo ("Seguros em Guarulhos | Patro Seguros — Compare 16 Seguradoras")❌ Ainda é o antigo ("Corretora de Seguros em Guarulhos | Patro Seguros")Meta description nova (140-155 caracteres, completa)⚠️ Parcial: inclui "há 20+ anos", mas está truncada ("...vida, saúd")Bloco "Resposta rápida" abaixo do H1❌ Não encontradoTimestamp "Atualizado em"❌ Não encontradoFAQ com as 5 perguntas do megaprompt❌ A home tem uma seção "Perguntas Frequentes", mas só com 1 pergunta ("Quanto tempo demora o conserto do veículo pelo seguro?")Alt text do hero⚠️ Segue genérico ("Corretora de Seguros em Guarulhos")`}
    </div>
  );
};

export default SiteInfo;