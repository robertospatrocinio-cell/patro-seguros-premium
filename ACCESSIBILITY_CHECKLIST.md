# Checklist de Acessibilidade Contínua (WCAG 2.1 - Nível AA)

Esta checklist deve ser consultada ao criar novas páginas ou componentes no projeto Patro Seguros.

## 1. Perceção (Perceivable)
- [ ] **Texto Alternativo (Alt Text):** Todas as imagens informativas possuem `alt` descritivo. Imagens decorativas usam `alt=""`.
- [ ] **Contraste de Cor:** O texto tem uma relação de contraste de pelo menos 4.5:1 (ou 3:1 para texto grande).
- [ ] **Legendas e Transcrições:** Vídeos ou áudios possuem alternativas textuais ou legendas.
- [ ] **Estrutura Semântica:** Uso correto de tags HTML5 (`<header>`, `<main>`, `<nav>`, `<footer>`, `<section>`).
- [ ] **Hierarquia de Títulos:** Apenas um `<h1>` por página, seguido de uma ordem lógica (`<h2>` -> `<h3>`).

## 2. Operabilidade (Operable)
- [ ] **Navegação por Teclado:** Todos os elementos interativos são acessíveis via tecla `Tab`.
- [ ] **Indicador de Foco:** O estado `:focus-visible` é visível e claro em todos os links e botões.
- [ ] **Skip Link:** O link "Ir para o conteúdo principal" está presente e funcional.
- [ ] **Nomes Acessíveis:** Botões apenas com ícones possuem `aria-label` descritivo.
- [ ] **Tempo Suficiente:** Não existem limites de tempo críticos para completar ações.

## 3. Compreensão (Understandable)
- [ ] **Idioma da Página:** O atributo `lang="pt-BR"` está definido na tag `<html>`.
- [ ] **Rótulos de Formulário:** Todos os campos de input possuem um `<label>` associado ou `aria-label`.
- [ ] **Mensagens de Erro:** Erros de validação são descritos em texto e associados ao campo via `aria-describedby`.
- [ ] **Consistência:** Menus de navegação e ícones mantêm o mesmo comportamento em todas as páginas.

## 4. Robustez (Robust)
- [ ] **Atributos ARIA:** Uso correto de `aria-expanded`, `aria-controls` e `role` em componentes dinâmicos (modais, menus).
- [ ] **Compatibilidade:** O código é validado e funciona corretamente em diferentes navegadores e leitores de ecrã (NVDA, VoiceOver).

---
**Responsáveis:** Desenvolvedores (Implementação), Designers (Contraste/UX), Redatores (Alt Text/Hierarquia).
