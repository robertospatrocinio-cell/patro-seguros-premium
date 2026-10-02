# Baseline de Rich Results

## Baseline histórico

O baseline agregado anterior registrava:

- 891 arquivos;
- 6.051 blocos JSON-LD;
- 235 ocorrências de `Article`;
- 235 ocorrências de `BlogPosting`;
- 1.400 ocorrências de `BreadcrumbList`.

Esse baseline não possuía inventário suficiente no nível rota × schema para permitir uma reconciliação retrospectiva completa. Portanto, as diferenças para o estado atual não são tratadas como regressões comprovadas.

## Baseline R6 validado

O baseline atual deve ser lido em conjunto com:

- `reports/rich-results-current-inventory.json`;
- `reports/rich-results-current-inventory.md`;
- `dist/google-rich-results-report.json` gerado pelo build.

Os snapshots agregados preservam as asserções da suíte, enquanto o inventário por rota é a evidência auditável para comparações futuras.
