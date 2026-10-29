# Portfólio — Andrey Durante

Portfólio pessoal desenvolvido para apresentar projetos, tecnologias, competências e trajetória profissional. A interface está disponível em português e inglês, com temas claro e escuro.

## Funcionalidades

- Página inicial com apresentação, projetos, competências e trajetória.
- Alternância entre português e inglês, com preferência salva no navegador.
- Alternância entre tema claro e escuro, também persistida no navegador.
- Listagem de repositórios públicos do GitHub marcados com o tópico `portfolio`.
- Página de detalhes por projeto que carrega e exibe o README do repositório em Markdown.
- Cache local dos dados do GitHub para reduzir requisições e permitir exibir dados recentes quando a API estiver indisponível.
- Layout adaptável a diferentes tamanhos de tela.

## Tecnologias

- React 19
- Vite 8
- React Router
- Tailwind CSS 4
- Three.js
- Vitest e Testing Library

## Requisitos

- Node.js 22.12 ou superior
- npm

## Como executar localmente

1. Clone este repositório e acesse a pasta do projeto.
2. Instale as dependências:

   ```bash
   npm ci
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Abra no navegador o endereço informado pelo Vite (normalmente `http://localhost:5173`).

## Projetos exibidos

A aplicação consulta os repositórios públicos da conta `AndreyDurante` pela API do GitHub. Para aparecer na seção de projetos, um repositório precisa ter o tópico `portfolio` configurado no GitHub. A descrição e o link do projeto vêm dos metadados do repositório; a página de detalhes usa o README publicado nele.

Os dados dos repositórios e dos READMEs são armazenados em cache no navegador. O projeto também possui uma lista de imagens locais em `src/data/projectImages.js` e projetos de contingência em `src/data/fallbackProjects.js`; atualmente, essas listas estão vazias.

## Comandos disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Gera a versão de produção em `dist/`. |
| `npm run preview` | Serve localmente a versão gerada para conferência. |
| `npm run lint` | Executa o ESLint. |
| `npm run test` | Executa os testes com Vitest. |
| `npm run format` | Formata os arquivos configurados com Prettier. |

Para gerar a versão de produção:

```bash
npm run build
```

## Publicação

O projeto está configurado para publicação na Vercel. O arquivo `vercel.json` direciona as rotas da aplicação para `index.html`, permitindo abrir e atualizar diretamente páginas internas, como `/projetos/nome-do-repositorio`.

## Estrutura principal

```text
src/
├── components/   # Componentes da interface
├── contexts/     # Estado global de idioma e tema
├── data/         # Textos, projetos de contingência e imagens
├── hooks/        # Hooks reutilizáveis
├── pages/        # Página inicial, detalhes e página não encontrada
├── services/     # Integração com GitHub e cache
└── utils/        # Funções auxiliares

 tests/           # Testes automatizados
```
