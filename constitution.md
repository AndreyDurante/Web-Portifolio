# Constitution do Projeto: Portfólio Pessoal

## Princípios Fundamentais

### I. Stack fixa
- O projeto usa **React + Vite + Tailwind CSS**, em **JavaScript** (não usar TypeScript).
- Rotas são feitas com **React Router**.
- Novas dependências só entram quando houver necessidade clara e sem alternativa simples; cada uma deve ser justificada no plano.

### II. Organização do código
- Estrutura de pastas **por tipo**: `components/`, `pages/`, `hooks/`, `services/`, `utils/`.
- Toda a lógica de acesso à API do GitHub fica em `services/`; os componentes a consomem apenas por meio de hooks.
- Componentes são pequenos e têm uma única responsabilidade.

### III. Qualidade e testes (NÃO NEGOCIÁVEL)
- Testes básicos com **Vitest + React Testing Library**, cobrindo os pontos críticos: busca e filtro dos projetos do GitHub, troca de idioma e troca de tema.
- Lint deve passar sem erros antes de qualquer merge.
- Nenhuma feature é considerada pronta com testes ou lint falhando.

### IV. Performance (NÃO NEGOCIÁVEL)
- Nota mínima de **80 em Performance no Lighthouse, em modo mobile**.
- Fontes: no máximo **2 famílias**, carregadas com `font-display: swap`.
- Imagens otimizadas, com dimensões definidas e `loading="lazy"` quando abaixo da dobra.
- Nada bloqueia a primeira renderização; conteúdo dependente de rede usa skeleton com espaço reservado, evitando mudanças de layout.
- O **cartão 3D** existe apenas no **desktop**, carregado de forma tardia (lazy/import dinâmico). No mobile e para quem prefere movimento reduzido, é exibido o **crachá estático**. A biblioteca 3D não pode entrar no bundle inicial do mobile.

### V. Acessibilidade (NÃO NEGOCIÁVEL)
- HTML semântico, `alt` em todas as imagens e contraste adequado nos dois temas.
- Navegação completa por teclado, com foco visível.
- Nota mínima de **90 em Acessibilidade no Lighthouse**.
- Respeitar `prefers-reduced-motion`: animações são reduzidas ou removidas para quem pede.

### VI. Dados do GitHub
- Os projetos são buscados **em tempo real no navegador**, com **uma única requisição** à API pública do GitHub.
- Só aparecem os repositórios com o **tópico `portfolio`**; o filtro é feito no cliente a partir dos `topics` retornados.
- Resposta guardada em **cache no localStorage com tempo de validade** (por exemplo, 1 hora).
- Se a API falhar, usar o último cache disponível ou uma lista mínima de fallback; o site nunca quebra por causa disso.
- Repositórios sem imagem (projetos de back-end) aparecem como cartão arredondado apenas com texto resumindo o projeto.

### VII. Design e estilo
- Estilização com **Tailwind**, usando **componentes reutilizáveis** (`Button`, `Card`, `Section`).
- Cores, fontes e espaçamentos ficam em **tokens centralizados** (configuração do Tailwind e variáveis de tema); evitar valores soltos no código.
- Dois temas, **claro e escuro**, com botão de alternância.
- Paleta: base monocromática com **vermelho escuro usado de forma sutil** como destaque. O vermelho vai em detalhes (bordas, brilhos, selos, botões); texto e links em vermelho exigem contraste mínimo adequado, usando uma variação mais clara no tema escuro.
- Tipografia: títulos largos e bold, texto de apoio em sans-serif limpa e fonte monoespaçada em navegação e detalhes.
- Referência visual: visual escuro, minimalista, com fundo em grade sutil, navbar em pílula e cards arredondados.

### VIII. Internacionalização
- Idiomas: **português (padrão) e inglês**, com alternância pelo usuário.
- Solução própria e leve: arquivos/objetos de texto por idioma e um contexto do React, sem biblioteca de i18n.
- Nenhum texto visível ao usuário fica fixo nos componentes; tudo vem dos arquivos de idioma.
- A escolha do visitante é salva no localStorage e o atributo `lang` do `<html>` acompanha o idioma ativo.

### IX. Escopo
- O projeto é um **site estático, apenas front-end**: sem backend, banco de dados, comentários ou upload de arquivos.
- Contato é feito apenas por **links** (redes sociais e e-mail), sem formulário.

## Fluxo de Desenvolvimento

- Hospedagem na **Vercel**, com deploy a partir da branch principal.
- Commits no padrão **Conventional Commits** (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`).
- Cada feature em sua própria branch; o merge na principal só acontece com testes e lint passando.
- Antes de publicar, rodar o Lighthouse (mobile) e confirmar as metas de Performance e Acessibilidade.

## Governança

- Esta constitution prevalece sobre qualquer outra prática do projeto.
- Alterações exigem registro do motivo e atualização da versão.

**Versão**: 1.0.0 | **Ratificada em**: 2026-10-22
