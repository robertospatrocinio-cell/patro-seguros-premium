# Melhorias de conversão, suporte e utilidade

## Objetivo
Adicionar os cinco recursos solicitados sem remover seções, mudar identidade visual, alterar promessas comerciais ou interferir nos formulários e integrações existentes.

## Implementação

1. **Extensão operacional do RH**
   - Criar um bloco reutilizável com o título e os três benefícios informados.
   - Exibi-lo no hub de Seguro Empresarial e na página local de Saúde PME.
   - Usar o CTA empresarial existente e WhatsApp com a mensagem exata solicitada.

2. **Linha de atendimento em sinistros**
   - Criar uma linha do tempo responsiva com os três passos e o selo regional informado.
   - Exibi-la na Central de Sinistros e, de forma resumida, antes da chamada da Central na home.
   - Manter os canais e horários atuais, sem transformar atendimento comercial em promessa de plantão da corretora.

3. **Telefones úteis e FIPE**
   - Criar uma página utilitária pesquisável para assistência e sinistros das seguradoras parceiras.
   - Publicar somente números confirmados em páginas oficiais das próprias seguradoras, com link para a fonte e aviso para conferir a apólice.
   - Criar uma página-guia responsiva para consulta FIPE com atalho ao serviço oficial, sem copiar ou calcular valores no site.
   - Adicionar links discretos no rodapé e no menu móvel de apoio.

4. **Guia Rápido de Soluções**
   - Inserir o seletor logo antes da Cotação Express, preservando a ordem e o desenho geral da home.
   - Mostrar quatro perfis e seus atalhos contextuais.
   - Ao escolher uma solução compatível, preencher somente o campo “Tipo de Seguro” da Cotação Express e levar o foco ao formulário; para soluções sem opção equivalente no formulário, abrir a página específica ou o WhatsApp contextualizado.
   - Não enviar dados nem abrir WhatsApp apenas ao trocar de perfil.

5. **Prova social**
   - Incluir o selo “Avaliações verificadas diretamente no Google Maps” nos blocos de avaliações.
   - Exibir data apenas quando confirmada na fonte pública; depoimentos legados sem data comprovada continuarão sem data e serão mantidos sem alteração de texto.

## Validação
- Conferir home, páginas empresariais, Central de Sinistros e utilitários em celular e desktop.
- Testar pesquisa de telefones, navegação FIPE, seleção do guia, preenchimento do tipo de seguro, CTAs e acessibilidade por teclado.
- Rodar testes do projeto e auditoria de links internos.
- Não publicar sem solicitação explícita.

## Detalhes técnicos
- Componentes reutilizáveis, sem duplicar conteúdo entre páginas.
- Comunicação entre o guia e a Cotação Express por estado da home, sem alterar o envio existente.
- Novas rotas entram no roteamento e na geração normal de sitemap/prerender, seguindo os padrões atuais.
- Nenhum telefone, data de avaliação ou resultado FIPE será inventado.
