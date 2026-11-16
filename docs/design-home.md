# Revisão visual da página inicial

## Direção e plano

A página apresenta a corretora Patro Seguros a pessoas, famílias e empresas. A prioridade visual é facilitar a leitura das soluções e o acesso à cotação, sem alterar o conteúdo, a ordem das seções ou os destinos dos links.

Paleta mantida a partir da marca:
- Azul institucional: `#1b304b`.
- Azul profundo / texto: `#13263e`.
- Dourado fosco: `#c7b087`.
- Branco: `#ffffff`.
- Superfície clara: `#f3f5f7`.
- Divisórias: `#dce2e8`.

Tipografia: Inter já existente para leitura, navegação e títulos consultivos; Georgia apenas para a assinatura Patro Private e o encerramento. Textos com entrelinha confortável e títulos sem palavras isoladas em outra cor. Nenhuma fonte ou imagem nova é baixada.

Layout, sempre preservando as seções existentes:

```text
Computador
[ Título + prova social | Foto existente ]
[ Texto + ações        | Foto existente ]
[ Credenciais          | Foto existente ]
[ Apresentação         | Explicação + ações ]
[ Seguradoras / formulário / guia de soluções ]
[ Demais seções existentes, com respiro consistente ]

Celular
[ Título + prova social ]
[ Texto + ações + credenciais ]
[ Foto em faixa própria ]
[ Seções na mesma ordem, em coluna ]
```

Alinhamento prioritariamente à esquerda para leitura e comparação. O encerramento permanece centralizado. A abertura concentra a presença visual; o restante usa superfícies calmas e bordas que separam informações, não molduras sobrepostas.

## Revisão do plano antes da execução

A direção anterior repetia títulos serifados e tratamentos de cartão em diferentes contextos. A revisão reserva a linguagem editorial à consultoria patrimonial e ao encerramento. Na grade de seguros, manter a superfície clara durante a interação evita inversões bruscas de cor; o estado ativo do guia continua explicitamente azul.

## Alterações implementadas

Todas as regras ficam abaixo de `.patro-home`, na folha já importada pela página inicial. Cabeçalho, rodapé, componentes compartilhados e outras rotas não foram editados.

- Abertura: escala tipográfica mais controlada, ações hierarquizadas, foto sem moldura dupla no computador e separada do texto no celular/tablet.
- Cotação Express: grade de duas colunas no computador, campos finais em largura total, limites de campo mais perceptíveis e prévia sem corte de uma linha.
- Guia de soluções: perfis com áreas consistentes e opção selecionada identificável.
- Produtos: contraste estável, ações separadas do texto e áreas de toque maiores.
- Processo: sequência existente preservada, sem cartões dentro de cartões.
- Depoimentos, bairros e artigos: alinhamento de leitura, metadados maiores e sombras reduzidas.
- Seguradoras: interação sem perda de contraste no fundo branco.
- Foco de teclado e preferência por movimento reduzido preservados.

## Verificação e limites

Adicionado `src/test/home-design.test.ts` com verificações estáticas do isolamento dos estilos, regras responsivas da foto e preservação dos principais componentes e conexões do formulário. Não foi possível executar testes, build ou uma inspeção em navegador neste ambiente; o teste adicionado não equivale a uma validação visual executada.

A calculadora e os widgets de parceiros/credenciais mantêm seus tratamentos específicos; uma revisão detalhada desses blocos pode ser feita em outro pedido. Nenhuma ação do usuário, alteração no banco, troca de imagem ou configuração externa é necessária para aplicar esta revisão.
