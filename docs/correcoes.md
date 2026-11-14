# Correções SoundWave

Revisão em 14/11/2026 para entrega e defesa individual em 16/11/2026.

## Integração no repositório de Bernardo

A versão corrigida foi integrada em um novo clone de `https://github.com/bernardorbenato/PORTALMUSICAL_ANDRE_BERNARDO.git`, na branch `main`, a partir do commit inicial `c6add93`. O checkout estava limpo e continha apenas o README inicial. A pasta `.git` e o histórico foram preservados. O README do SoundWave foi integrado com a autoria de André Fogaça Gorski e Bernardo Rodrigues Benato; o nome completo de Bernardo também foi aplicado ao title e ao rodapé.

O relato abaixo descreve a inspeção anterior da pasta original, que não era um repositório Git. A pendência de localizar um checkout foi resolvida para esta integração pelo novo clone. Nenhuma outra cópia do projeto foi modificada. Os testes de navegador relatados abaixo pertencem à versão corrigida de origem; nesta integração foram conferidos hashes dos arquivos copiados, referências locais, sintaxe JavaScript e `git diff --check`. Não foi feito push.

O `git diff --check` identificou espaços no fim de linhas herdados do HTML e CSS; esses espaços foram removidos somente neste checkout. Após a limpeza, o conteúdo desses dois arquivos foi comparado com a origem desconsiderando espaços finais e a atualização de autoria no HTML. JavaScript, imagens e roteiro mantiveram hashes idênticos à origem.

## Inspeção e preservação

- Fonte: `C:\Users\Barouzz\Desktop\soundwave_andre_bernardo`. O projeto é SoundWave, sem associação a Geek Beats/FESTIVAL_MUSICAL.
- Enunciado acadêmico lido integralmente por extração do PDF; o pedido executado veio do texto colado pelo usuário. As instruções acadêmicas foram usadas como critérios do projeto.
- Nenhum AGENTS.md encontrado na pasta do projeto, subpastas ou ancestrais consultados.
- A tentativa inicial do Git recebeu Permission denied. A consulta com acesso ampliado confirmou: a pasta não é um repositório Git (`not a git repository`). Portanto, não há branch, status de alterações ou remoto verificável nessa cópia.
- Remoto esperado, informado pelo usuário: https://github.com/gorskiandre7-coder/projeto-front-portalmusical.git . Não foi confirmado nem configurado.
- Correções feitas em uma cópia de entrega; arquivos originais e imagens preservados. Não houve pull, reset, commit ou push.
- Projeto continua com HTML, CSS e JavaScript puros, sem dependências adicionais. Playwright foi usado apenas como ferramenta externa de teste, sem integração ao site.

## Requisitos, alterações e testes

| Requisito | Alteração | Verificação realizada |
| --- | --- | --- |
| VIP: 13 campos | Sequência if/else if/else; trim nos textos; senha original preservada; email/URL com typeMismatch; números vazios verificados antes da conversão; data real, não futura e idade pelo aniversário | Edge: nome em espaços, email vazio/inválido, senha em espaços/curta, confirmação diferente, idade vazia/11/121/fracionada, nascimento vazio/futuro/incoerente, gênero, artista, horas vazias/0/25, plano, URL vazia/inválida, bio e termos |
| VIP: sucesso e limites | Alerta explícito de demonstração; preventDefault e novalidate; reset somente na validação bem-sucedida (botão manual Limpar preservado) | Edge: idades 12 e 120; horas 1, 24 e 1,5; senha com espaços nas extremidades aceita sem alteração; dados mantidos nos erros; reset no sucesso; botão e Enter sem mudança de URL |
| Datas | Componentes locais, conferência após construção de Date e aniversário | Edge com relógio fixado em 14/11/2026: aniversário hoje, amanhã e ontem; 29/02 inválido em 2025 e válido em 2004 |
| Carrossel D | Input file com label, MIME de imagem, legenda aparada, inclusão nos arrays e alt sincronizado | Edge: quatro imagens iniciais, limites nos dois sentidos, rejeição sem dados, duas inclusões até seis, legendas/alt/contador e carregamento da imagem |
| Modal C | Quatro entradas obrigatórias; textos com textContent; imagem temporária; liberação ao fechar/substituir; evento no fundo; caixa com rolagem | Edge: rejeição sem dados, texto literal com marcação HTML, descrição de 5.000 caracteres, imagem, substituição, botão, clique interno preservando abertura e fundo fechando |
| Lista E | createElement/textContent, eventos por item, filtro guardado, hidden, contadores total/visíveis e aria-pressed | Edge: adicionar texto com marcação sem criar HTML, adicionar pendente em Ouvidas, editar, cancelar, edição em espaços, mudar status com filtro, remover, limpar e rejeitar inclusão em espaços |
| Tipos de função | Nomeadas, anônimas e arrow com ações reais | Checagem de sintaxe Node e execução das ações no Edge |
| HTML/CSS | IDs de âncoras e classes de estado com integrante; referências atualizadas; seis estilos transferidos; três inline preservados; cinco regras internas originais mantidas | Edge: IDs únicos, labels associados, dez seções, dez links de menu e dez retornos; inspeção dos seletores e contagem dos três inline |
| Grid e responsividade | repeat/fr e proporções diferentes preservados; dashboard com cinco linhas de áreas; min-width:0, quebra de texto e ajustes mobile; tabela com rolagem própria | Edge em 1440 e 390 px: página sem transbordamento horizontal; controles acima da análise; capturas revisadas visualmente. Após revisão, tabela ganhou largura mínima de 720 px para leitura e nova verificação de layout passou |
| Tabela e conteúdo | caption, scope col, ranking/streams e player demonstrativos; totais recalculados | Dez linhas com seis células; soma: 2.992 segundos = 49:52 e 7.830 milhões. Cabeçalho e rodapé adicionais à contagem |
| Integração | Caminhos relativos e imagens originais mantidos | Edge: imagens carregadas e nenhum erro de console ou exceção JS durante a suíte; `node --check script.js` passou |

## Limites e pendências reais

- Localizar o checkout Git correto e confirmar branch, alterações locais e remoto antes de integrar esta cópia. Não inicializar outro repositório sobre a pasta sem revisar a organização existente.
- A detecção de imagem usa `File.type` (MIME informado pelo navegador); não faz análise binária nem garante que um arquivo corrompido possa ser decodificado. A rejeição de MIME incorreto foi inspecionada no código, sem teste automatizado específico com arquivo não imagem.
- A guarda de textos em espaços no modal foi inspecionada; o navegador testou ausência de dados e preenchimento válido, sem permutar individualmente todos os campos do modal.
- Testes foram executados em Edge desktop com viewport mobile de 390 px, não em aparelho físico nem em outros navegadores.
- Ranking e números de streams são demonstrativos. As demais informações editoriais originais foram preservadas, sem nova pesquisa de fontes.

## Arquivos alterados/criados na cópia

Alterados: `index.html`, `style.css`, `script.js`. Criados: `docs/correcoes.md`, `docs/roteiro-defesa.md`. `README.md` e os seis arquivos de `img/` foram copiados sem alteração.
