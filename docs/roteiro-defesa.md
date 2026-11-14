# Roteiro de defesa individual — SoundWave

Cada integrante deve conseguir explicar as quatro interações e os três Grids. Entrega e defesa: 16/11/2026.

## Arquivos e navegação

`index.html` define conteúdo e semântica; `style.css` controla a maior parte da apresentação; `script.js` responde aos eventos. Os caminhos relativos permitem abrir a cópia com sua pasta `img/`. Há um header, nav, main e footer, dez seções com IDs únicos e dez retornos ao topo. IDs e classes usam identificação de integrante, incluindo `andre_ativo` e `andre_ouvida`.

A tabela tem dez linhas de dados por seis colunas. Thead e tfoot são adicionais. Caption explica o caráter demonstrativo; scope="col" identifica cabeçalhos de coluna. Somam-se minutos convertidos em segundos para chegar a 49:52. Os streams usam ponto como separador de milhar e somam 7.830 milhões. O painel de reprodução é ilustrativo.

## CSS e Grid

Há três formas de CSS: externo, cinco regras internas aplicadas e três atributos inline. Seletores externos incluem tag (`body`), classe (`.andre_card`), ID (`#andre_grid_dashboard`), agrupamento e encadeamento (`.andre_btn_filtro.andre_ativo`).

Grid A mantém repeat(4, 1fr); Grid B usa 1fr 2fr 1fr; Grid C usa áreas nomeadas. No dashboard, título, metadados e controles ocupam linhas próprias antes de letra e informação. A media query reorganiza todas essas áreas em uma coluna. `min-width: 0` permite que filhos de Grid/Flex encolham. A tabela mantém largura legível com rolagem no seu contêiner, sem esconder transbordamento da página. `overflow-wrap: anywhere` permite quebrar textos longos. `100dvh` limita a caixa modal à altura visível e `overflow-y: auto` permite rolagem interna.

## Arquivos de imagem

Input file fornece uma lista `files`; `files[0]` é o arquivo escolhido. `accept="image/*"` orienta a seleção, enquanto `arquivo.type.startsWith("image/")` verifica o MIME recebido. Isso não substitui uma verificação binária nem garante imagem não corrompida.

`URL.createObjectURL(arquivo)` cria um endereço temporário para um arquivo local, sem enviar ou salvar em servidor. Foi escolhido porque a imagem pode ser exibida diretamente pelo src, sem precisar ler/converter o arquivo em texto como no FileReader. No carrossel a URL só é criada depois de validar imagem e legenda; permanece válida porque é necessário voltar às imagens adicionadas. O navegador libera esses recursos ao encerrar o documento. No modal, a prévia anterior deixa de ser necessária ao fechar ou substituir; removemos seu src e chamamos `URL.revokeObjectURL()`.

Os arrays de fotos e legendas usam o mesmo índice. O resto da divisão (`%`) permite navegar circularmente; a fórmula do anterior soma o tamanho antes de aplicar o resto para evitar índice negativo. A função atualizarCarrossel sincroniza src, alt, legenda e contador.

## Lista e filtros

`filtroSelecionado` guarda o estado atual. Depois de adicionar, editar, mudar status, excluir ou limpar, atualizarFila decide o atributo hidden de cada item, recalcula total/visíveis e destaca o botão correspondente. Um item novo é pendente: ao adicionar em Ouvidas, existe na lista mas fica oculto até mudar o filtro ou seu status.

`createElement()` cria nós; `textContent` insere nomes como texto literal. Uma entrada com `<img>` não vira uma imagem executável. `append()` acrescenta nós sem recriar os anteriores; assim seus eventos continuam associados. `replaceChildren()` sem argumentos limpa todos os itens. `prompt()` retorna null ao cancelar; a edição só altera o nome depois dessa verificação e de trim(). `dataset.status` acessa data-status. `classList.toggle` e aria-pressed refletem o filtro selecionado.

## Modal e eventos

O texto informado é colocado na mesma janela com textContent. O clique propaga da caixa ao fundo, mas `evento.target` identifica onde começou: só fecha quando o alvo é o próprio fundo. O botão usa a mesma função fecharModal. O atributo hidden é a fonte de estado de abertura; CSS garante que elementos hidden não recebam display flex.

## Datas e validação

`preventDefault()` impede o envio/recarregamento; novalidate permite que nossos alertas substituam as mensagens nativas. Ainda consultamos `validity.typeMismatch` de email e URL. A sequência if/else if/else informa o primeiro erro e mantém os dados; só o ramo final limpa o formulário após sucesso. O cadastro não cria conta, não transmite nem persiste os dados.

`trim()` remove espaços das pontas dos textos. Para senhas, o valor original é comparado e seu comprimento é medido sem alteração: trim é usado apenas para detectar senha inteiramente em espaços. Validamos strings numéricas vazias antes de Number, porque Number("") resulta em zero. Idade exige inteiro de 12 a 120; horas aceitam números entre 1 e 24, inclusive fracionários.

A data é dividida em ano, mês e dia. Construímos Date com componentes locais, evitando interpretar uma string como UTC e deslocar o dia pelo fuso. Comparamos os componentes novamente porque Date normaliza datas inexistentes (como 29/02 em ano não bissexto). Rejeitamos futuro. A idade começa como diferença dos anos e perde um ano quando o aniversário ainda não ocorreu. A validação usa a data local da execução, não uma data fixa do trabalho.

## Três tipos de função reais

- Nomeada: `function atualizarCarrossel()` tem nome e pode ser reutilizada por vários eventos. `fecharModal()` é outro exemplo.
- Anônima: `function () { ... }` atribuída ao onclick de Próximo executa a navegação quando ocorre o clique. Não tem nome próprio.
- Arrow: `() => { lista.replaceChildren(); atualizarFila(); }` no botão Limpar Fila executa uma ação real. Arrow não cria seu próprio this; esse evento usa variáveis explícitas e não depende de this. Funções tradicionais têm seu próprio vínculo de this conforme a chamada. A diferença não impede o uso de parâmetros em nenhum desses tipos.

## Cinco perguntas, uma por eixo da avaliação

1. **HTML, semântica e One Page:** como nav, IDs exclusivos e links de retorno conectam as dez seções, e por que a tabela usa caption e scope?
2. **CSS e Grid:** como as áreas nomeadas garantem a ordem do dashboard e como a media query reorganiza essas áreas em 390 px?
3. **Funções e eventos:** mostre uma função nomeada, uma anônima e a arrow de Limpar Fila; o que muda em relação a this?
4. **DOM, validação e interações:** por que um item novo não aparece sob Ouvidas, como a idade considera o aniversário e quando as URLs temporárias podem ser liberadas?
5. **Integração e raciocínio:** localize o limite de horas no HTML e na validação; explique quais trechos e testes precisariam mudar para aceitar no máximo 12 horas diárias.
