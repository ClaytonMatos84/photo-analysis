# User Stories: Pre-Analysis Empty State

Canonical behavior catalog for the pre-analysis empty state shown on the photo,
ad, and video analysis pages. Companion to `_prd.md`; consumed by
`_techspec.md` (component mapping) and `_tests.md` (coverage matrix).

## Personas

- **Novo usuário** — Chega a uma das três páginas de análise (foto, anúncio ou vídeo) pela primeira vez, ainda sem ter enviado nada. Precisa entender rapidamente como o fluxo funciona e o que vai receber como resultado, para decidir se vale a pena continuar.
- **Usuário recorrente** — Já usou a funcionalidade antes e volta para fazer uma nova análise. Prefere que a tela não pareça quebrada ou vazia enquanto decide o que enviar, e não é incomodado por conteúdo repetitivo depois que uma prévia ou resultado aparece.

## Story Index

| ID     | Feature Area                  | Persona              | Story                                                                 |
|--------|--------------------------------|-----------------------|------------------------------------------------------------------------|
| US-001 | Estado vazio - Foto            | Novo usuário          | Ver passos e benefícios ao abrir a página de análise de fotos          |
| US-002 | Estado vazio - Anúncio         | Novo usuário          | Ver passos e benefícios ao abrir a página de análise de anúncios       |
| US-003 | Estado vazio - Vídeo           | Novo usuário          | Ver passos e benefícios ao abrir a página de análise de vídeos         |
| US-004 | Transição foto                | Usuário recorrente    | Ver a prévia da foto somente junto com o resultado da análise          |
| US-005 | Transição anúncio              | Usuário recorrente    | Ver o estado vazio dar lugar à prévia da URL do anúncio                |
| US-006 | Transição vídeo                | Usuário recorrente    | Ver o estado vazio permanecer durante o carregamento da análise        |
| US-007 | Consistência visual            | Novo e recorrente     | Perceber o mesmo padrão visual de estado vazio nas três páginas        |

## Estado vazio - Foto

### US-001: Ver passos e benefícios ao abrir a página de análise de fotos

**As a** novo usuário na página de análise de fotos, **I want** ver uma explicação visual de como o processo funciona e o que a análise vai me entregar, **so that** eu entenda o valor da funcionalidade antes de enviar uma imagem.

Acceptance criteria:

- AC-1: Given o usuário abre a página de análise de fotos sem ter enviado nenhuma imagem ainda, when a página termina de carregar, then uma seção abaixo do hero exibe uma timeline com exatamente 3 passos numerados descrevendo o fluxo (ex: selecionar imagem → aguardar análise → ver resultado).
- AC-2: Given a mesma condição do AC-1, when o usuário rola a tela até a seção de benefícios, then vê exatamente 4 cards, cada um citando um campo que o resultado da análise de foto retorna (ex: objetos identificados, sentimento transmitido, estilo da foto, pessoas e ambiente) com uma explicação em linguagem simples do que aquele campo representa.
- AC-3: Given a área anteriormente vazia abaixo do hero, when o novo estado vazio é renderizado, then não há mais espaço em branco perceptível entre o hero e o rodapé da página em resoluções desktop e mobile padrão.

Edge cases:

- EC-1: Janela muito estreita (mobile pequeno) → a timeline e os cards de benefício se reorganizam em coluna única, sem overflow horizontal.
- EC-2: Usuário com JavaScript de animação desabilitado/reduzido (prefers-reduced-motion) → o conteúdo aparece sem a animação de entrada, mas permanece totalmente visível e legível.

## Estado vazio - Anúncio

### US-002: Ver passos e benefícios ao abrir a página de análise de anúncios

**As a** novo usuário na página de análise de anúncios, **I want** ver os passos do fluxo de análise por URL e os principais insights que vou receber, **so that** eu saiba o que informar e o que esperar do resultado.

Acceptance criteria:

- AC-1: Given o usuário abre a página de análise de anúncios sem ter informado nenhuma URL, when a página termina de carregar, then uma timeline com 3 passos específicos do fluxo de anúncio (ex: informar URL → aguardar análise estratégica → ver comparativo e recomendações) é exibida abaixo do hero.
- AC-2: Given a mesma condição do AC-1, when o usuário observa a seção de benefícios, then vê 4 cards citando campos retornados pela análise de anúncio (ex: posicionamento da marca, forças e fraquezas, estratégia sugerida, proposta de melhoria) com explicação de cada um.
- AC-3: Given o usuário digita uma URL válida de imagem, when a pré-visualização da imagem do anúncio é exibida, then a timeline e os cards de benefício deixam de ser exibidos (ver US-005).

Edge cases:

- EC-1: Usuário cola uma URL inválida (sem protocolo http/https) → o estado vazio permanece visível, pois nenhuma pré-visualização válida é exibida.
- EC-2: Usuário limpa o campo de URL depois de ter digitado uma URL válida → o estado vazio volta a ser exibido, já que a pré-visualização some.

## Estado vazio - Vídeo

### US-003: Ver passos e benefícios ao abrir a página de análise de vídeos

**As a** novo usuário na página de análise de vídeos do YouTube, **I want** ver como o fluxo de análise funciona e quais informações do vídeo serão analisadas, **so that** eu entenda o que a ferramenta vai me mostrar antes de informar uma URL.

Acceptance criteria:

- AC-1: Given o usuário abre a página de análise de vídeos sem ter informado nenhuma URL, when a página termina de carregar, then uma timeline com 3 passos específicos do fluxo de vídeo (ex: informar URL do YouTube → aguardar análise → ver identificação e engajamento do vídeo) é exibida abaixo do hero.
- AC-2: Given a mesma condição do AC-1, when o usuário observa a seção de benefícios, then vê 4 cards citando campos retornados pela análise de vídeo (ex: identificação do vídeo, engajamento do canal, descrição, metadados) com explicação de cada um.
- AC-3: Given uma análise em andamento (loading), when o spinner de carregamento é exibido, then a timeline e os cards de benefício permanecem visíveis ao mesmo tempo (ver US-006).

Edge cases:

- EC-1: URL do YouTube inválida ou de formato não reconhecido → o estado vazio permanece visível, pois nenhum resultado nem preview é gerado.
- EC-2: Erro na análise (ex: timeout) → o estado vazio permanece visível junto com a mensagem de erro, já que não há resultado.

## Transições e consistência

### US-004: Ver a prévia da foto somente junto com o resultado da análise

**As a** usuário recorrente na página de análise de fotos, **I want** que a prévia da imagem enviada apareça apenas quando o resultado da análise estiver disponível, **so that** eu não veja uma prévia isolada seguida de um espaço vazio enquanto aguardo o resultado.

Acceptance criteria:

- AC-1: Given o usuário seleciona um arquivo de imagem válido, when o arquivo é apenas selecionado (antes de clicar em enviar/analisar), then a prévia da imagem (`PhotoDisplay`) não é exibida e o estado vazio (US-001) continua visível.
- AC-2: Given o usuário envia a imagem para análise, when a análise está em andamento (loading), then o estado vazio permanece visível (nenhuma prévia isolada aparece).
- AC-3: Given a análise é concluída com sucesso, when o resultado retorna, then a prévia da imagem e o painel de resultado (`PhotoAnalysisDashboard`) são exibidos juntos, e o estado vazio deixa de ser exibido.

Edge cases:

- EC-1: Usuário seleciona um novo arquivo depois de já ter um resultado anterior na tela → o resultado anterior e a prévia anterior são removidos, e o estado vazio volta a ser exibido até o novo resultado chegar.
- EC-2: Envio falha (erro de rede ou validação) → nem a prévia nem o resultado aparecem; o estado vazio permanece visível junto com a mensagem de erro existente.

### US-005: Ver o estado vazio dar lugar à prévia da URL do anúncio

**As a** usuário recorrente na página de análise de anúncios, **I want** que o estado vazio desapareça assim que eu informar uma URL de imagem válida, **so that** eu veja a prévia da imagem sem conteúdo duplicado ou concorrente na tela.

Acceptance criteria:

- AC-1: Given o campo de URL está vazio, when a página é exibida, then o estado vazio (US-002) é exibido e a seção de pré-visualização de imagem não é exibida.
- AC-2: Given o usuário informa uma URL válida de imagem, when a pré-visualização é exibida com sucesso, then o estado vazio deixa de ser exibido.
- AC-3: Given a URL informada é inválida (formato incorreto), when a mensagem de aviso de URL inválida é exibida no lugar da prévia, then o estado vazio permanece visível.

Edge cases:

- EC-1: A imagem da URL falha ao carregar (erro 404 ou CORS) → a prévia exibe o aviso de erro de carregamento existente; o estado vazio permanece oculto, pois uma URL válida foi informada (comportamento já coberto pela lógica existente de validação de formato de URL).

### US-006: Ver o estado vazio permanecer durante o carregamento da análise

**As a** usuário em qualquer uma das três páginas, **I want** que o conteúdo informativo (timeline e benefícios) continue visível enquanto a análise está em andamento, **so that** a tela não pareça vazia ou instável durante a espera.

Acceptance criteria:

- AC-1: Given o usuário disparou uma análise (anúncio ou vídeo) e o spinner de carregamento é exibido, when a tela é observada, then o estado vazio (timeline + cards de benefício) continua visível junto com o spinner.
- AC-2: Given a análise termina (sucesso ou erro), when o resultado ou a mensagem de erro é exibida, then o estado vazio segue as regras específicas de cada página (US-004 e US-005) para decidir se continua visível ou some.

Edge cases:

- EC-1: Loading demora até o limite de timeout de 120s → o estado vazio permanece visível durante toda a espera, sem piscar ou desaparecer prematuramente.

### US-007: Perceber o mesmo padrão visual de estado vazio nas três páginas

**As a** usuário que navega entre as páginas de foto, anúncio e vídeo, **I want** reconhecer o mesmo padrão visual (timeline + cards) em todas elas, **so that** a experiência pareça consistente e profissional em todo o produto.

Acceptance criteria:

- AC-1: Given o usuário visita as três páginas de análise sem ter enviado nada, when compara a estrutura visual do estado vazio, then a estrutura (timeline de 3 passos + 4 cards de benefício) é idêntica nas três páginas, variando apenas o texto e a cor de destaque de cada página (herdada do `PageHero`).
- AC-2: Given qualquer uma das três páginas, when o estado vazio é exibido, then ele usa a mesma animação de entrada (scroll-in) já aplicada aos demais elementos da página (`v-animateonscroll`).

Edge cases:

- EC-1: Uma das páginas está em um estado de erro de carregamento (ex: falha ao carregar a própria página) → fora de escopo desta funcionalidade; o estado vazio só se aplica ao fluxo normal de pré-análise.
