# Sistema de Gestão de Projetos MEJ — Desafio Técnico Adapti

Este repositório contém a solução desenvolvida para o Desafio Técnico do Processo Seletivo Adapti 2026.2. A aplicação consiste em um sistema Full-Stack para gestão interna de projetos, membros e tarefas de Empresas Juniores.

---

## Tecnologias Utilizadas

- **Frontend:** Next.js (React), TypeScript, Tailwind CSS, Lucide Icons, NextAuth.js.
- **Backend:** Laravel (PHP), Eloquent ORM, Laravel Sanctum, SQLite/MySQL.
- **Ferramentas e Versionamento:** Git, pnpm/npm, Composer, VS Code.

---

## Guia de Configuração e Execução Local

### Pré-requisitos
- Node.js (v18+) e pnpm/npm
- PHP (v8.2+) e Composer

---

### 1. Configurando o Backend (Laravel)

1. Navegue até a pasta do backend:
   cd backend

2. Instale as dependências do PHP:
   composer install

3. Copie o arquivo de ambiente e gere a chave da aplicação:
   cp .env.example .env
   php artisan key:generate

4. Execute as migrações e popule o banco de dados (Seeders):
   php artisan migrate --seed

5. Inicie o servidor do Laravel:
   php artisan serve

*O backend estará rodando em http://localhost:8000.*

---

### 2. Configurando o Frontend (Next.js)

1. Em um novo terminal, navegue até a pasta do frontend:
   cd frontend

2. Instale as dependências:
   pnpm install  # ou npm install

3. Crie o arquivo .env.local configurando a URL da API e a chave do NextAuth (use o arquivo .env.local.example como base):
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   NEXTAUTH_SECRET=sua_chave_secreta_aqui
   NEXTAUTH_URL=http://localhost:3000

4. Inicie o servidor de desenvolvimento:
   pnpm dev  # ou npm run dev

*O frontend estará acessível em http://localhost:3000.*

---

## Decisões Arquiteturais e Modelagem de Dados

### Estrutura do Banco de Dados
A modelagem integra três entidades principais através de relacionamentos no Eloquent ORM:

- **Projetos (`projetos`):** `id` (PK), `nome`, `cliente`, `descricao`, `data_inicio`, `data_fim`.
- **Membros (`membros`):** `id` (PK), `nome`, `email`, `cargo`.
- **Tarefas (`tarefas`):** `id` (PK), `titulo`, `status`, `projeto_id` (FK), `membro_id` (FK).

#### Relacionamentos Eloquent:
- Um **Projeto** possui muitas **Tarefas** (`hasMany`).
- Um **Membro** possui muitas **Tarefas** (`hasMany`).
- Uma **Tarefa** pertence a um **Projeto** e a um **Membro** (`belongsTo`).
- Um **Membro** está vinculado a um **Projeto** através de suas tarefas (relacionamento indireto). **[Regra de Negócio: A cardinalidade desta ligação é restrita a, no máximo, 2 projetos ativos simultâneos por membro].**

---

### Lógica da Trava de Alocação de Membros

Para cumprir a regra de negócio que impede que um membro seja alocado em mais de **2 projetos ativos simultaneamente**:

1. **Definição de Projeto Ativo:** Considera-se ativo qualquer projeto cuja `data_fim` seja igual ou posterior à data atual.
2. **Validação no Backend (`TarefaController`):**
   Antes de salvar uma nova tarefa, o sistema consulta o banco de dados contando em quantos projetos **ativos e distintos** o `membro_id` selecionado já possui tarefas atreladas.
3. **Bloqueio e Resposta (HTTP 422):**
   Se o membro já estiver em 2 projetos ativos e a nova tarefa for para um 3º projeto ativo diferente, a requisição é interrompida e o backend retorna um erro de validação com código HTTP `422 Unprocessable Entity`.
4. **Exibição Amigável no Frontend:**
   O componente `dialog-information-project.tsx` captura a resposta de erro 422 e exibe um alerta formatado em vermelho no modal de criação de tarefa: *"Este membro já está alocado no limite máximo de 2 projetos ativos em simultâneo."*

---

## Documentação da API

| Método | Endpoint | Descrição | Parâmetros Principais | Resposta Esperada |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/projetos` | Lista todos os projetos | N/A | `200 OK` (Array) |
| `POST` | `/api/projetos` | Cria um novo projeto | `nome`, `data_inicio`, `data_fim` | `201 Created` |
| `GET` | `/api/membros` | Lista todos os membros | N/A | `200 OK` (Array) |
| `POST` | `/api/membros` | Cadastra um novo membro | `nome`, `email`, `cargo` | `201 Created` |
| `GET` | `/api/tarefas` | Lista todas as tarefas | N/A | `200 OK` (Array) |
| `POST` | `/api/tarefas` | Cria e atribui uma nova tarefa | `titulo`, `projeto_id`, `membro_id` | `201 Created` ou `422 Unprocessable Entity` (Bloqueio) |

---

## Manutenção e Correção de Bugs (Missão 1)

Durante a fase de manutenção e auditoria do código herdado, foram identificados e corrigidos os seguintes problemas:

1. **Validação de Datas no Backend:** Adicionada regra de validação na criação de projetos para impedir datas de término anteriores à data de início.
2. **Inconsistências em Membros:** Adicionada validação de e-mail único e sanitização de campos no cadastro de membros.
3. **Loop de Redirecionamento no Frontend:** Ajustado o arquivo `middleware.ts` do NextAuth, resolvendo o bug de loop infinito de redirecionamentos ao tentar acessar páginas administrativas.
4. **Ícones Desatualizados (`react-icons/lu`):** Corrigidos os nomes dos ícones que estavam quebrando o layout do sistema (`LuHouse` alterado para `LuHome`, e `LuCirclePlus` alterado para `LuPlusCircle`).
5. **Comunicação de API (CSRF e CORS):** Adequada a rota de tarefas (`routes/api.php`) isentando-a de verificações de estado Sanctum conflitantes no ambiente de desenvolvimento, e refatorado o payload de submissão do frontend (`dialog-information-project.tsx`) para usar corretamente o utilitário `api()` pré-configurado com a propriedade `data`.

---

## Demonstração Visual

- [Clique aqui para acessar os prints de demonstração](COLOQUE_SEU_LINK_AQUI)
*(A pasta contém imagens do sistema rodando e validações de erro funcionando na prática).*

---

## Extras e Diferenciais Implementados

- **Tipagem Rigorosa em TypeScript:** Uso de interfaces padronizadas (`membroType`, `projetoType`, `tarefaType`) aplicadas nos componentes React.
- **Custom API Client Dinâmico:** Integração do frontend via cliente customizado `api()` do projeto, com tratamento de exceções para apresentar mensagens amigáveis baseadas no status de retorno do Laravel.
- **Form Requests no Laravel:** Organização do código de validação do lado do servidor em classes dedicadas, mantendo os Controllers enxutos e seguindo boas práticas de arquitetura MVC.