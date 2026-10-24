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
   NEXT_PUBLIC_API_URL=http://localhost:8000
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

#### Relacionamentos entre as entidades

A modelagem do sistema é baseada em três entidades principais: **Projetos, Membros e Tarefas**.

- **Projeto → Tarefa (1:N):** um projeto pode possuir várias tarefas, enquanto cada tarefa pertence a um único projeto.
- **Membro → Tarefa (1:N):** um membro pode ser responsável por várias tarefas, enquanto cada tarefa deve possuir obrigatoriamente um membro responsável.
- **Tarefa → Projeto (N:1):** cada tarefa pertence a um projeto específico.
- **Tarefa → Membro (N:1):** cada tarefa é atribuída a um membro específico.

**Relacionamento entre Membros e Projetos**

O vínculo entre membros e projetos é estabelecido indiretamente pelas tarefas. Dessa forma, quando um membro recebe uma tarefa de determinado projeto, ele passa a ser considerado alocado naquele projeto.

Não é necessário criar um vínculo independente entre membro e projeto, pois a alocação é identificada a partir das tarefas cadastradas.

Para verificar a quantidade de projetos em que um membro está alocado, o sistema deve considerar os **projetos ativos distintos** associados às suas tarefas.

Por exemplo, se um membro possui três tarefas no Projeto A e duas tarefas no Projeto B, considera-se que ele está alocado em apenas dois projetos.

Essa estrutura permite que um projeto tenha vários membros trabalhando simultaneamente, respeitando a regra de negócio que limita cada membro a, no máximo, dois projetos ativos distintos.

---

### Lógica da Trava de Alocação de Membros

Para evitar a sobrecarga dos integrantes da Empresa Júnior, foram implementadas duas regras de negócio complementares: o limite de participação em projetos ativos e o limite de tarefas ativas por membro.

#### 1. Definição de Projeto Ativo

O sistema considera ativo um projeto cujo campo `status` possui o valor `ativo`.

A identificação de projetos ativos é baseada nesse status, permitindo que projetos em execução continuem sendo considerados ativos mesmo quando ultrapassam a data de término originalmente prevista.

#### 2. Limite de Dois Projetos Ativos

Cada membro pode participar de, no máximo, **2 projetos ativos distintos simultaneamente**.

Como a alocação ocorre por meio das tarefas, o sistema consulta os projetos aos quais o membro está vinculado e contabiliza apenas os projetos ativos distintos.

Para essa contagem:

- São considerados projetos com `status = 'ativo'`.
- Tarefas com `status = 'excluida'` são desconsideradas.
- Múltiplas tarefas de um membro no mesmo projeto representam apenas uma alocação.
- Tarefas concluídas ainda podem representar o vínculo do membro com um projeto ativo.

Antes de criar uma tarefa em um novo projeto ativo, o backend verifica se o membro já está associado a dois outros projetos ativos.

Caso esteja, a operação é bloqueada e a API retorna um erro HTTP `422 Unprocessable Entity`.

A regra não impede a criação de novas tarefas em projetos nos quais o membro já está alocado, desde que seja respeitado o limite de tarefas ativas.

Projetos concluídos não entram na contagem dos dois projetos ativos. Assim, a criação de tarefas nesses projetos é permitida pela regra de alocação, desde que as demais validações sejam atendidas.

#### 3. Limite de Cinco Tarefas Ativas

Como funcionalidade adicional, foi implementado um limite de **5 tarefas ativas simultâneas por membro**.

Essa restrição tem como objetivo evitar a concentração excessiva de atividades em um único integrante.

Para a contagem das tarefas ativas, o sistema desconsidera aquelas com status `concluida` ou `excluida`.

Quando o membro já possui cinco tarefas ativas, o backend impede novas atribuições e retorna a mensagem:

> Sobrecarga: Este membro já atingiu o limite máximo de 5 tarefas ativas.

Ao concluir ou excluir uma tarefa, o membro recupera capacidade para receber novas atribuições.

Essa regra é independente do limite de projetos e se aplica também às tarefas criadas em projetos concluídos.

#### 4. Implementação no Backend

As validações são implementadas na classe `StoreTarefaRequest.php`, utilizando o recurso Form Request do Laravel.

O processo de validação consulta as tabelas de tarefas e projetos para verificar:

1. A existência do projeto e do membro informados.
2. A quantidade de tarefas ativas atribuídas ao membro.
3. A quantidade de projetos ativos distintos em que o membro já possui tarefas.
4. O status do projeto que receberá a nova tarefa.

Somente após a aprovação dessas validações, o método `store()` do `TarefaController` realiza a persistência dos dados utilizando `$request->validated()`.

Em situações inválidas, a API retorna um erro HTTP `422`, impedindo a criação da tarefa.

#### 5. Tratamento de Erros no Frontend

O frontend utiliza o cliente de API da aplicação para receber e tratar as respostas do Laravel.

Quando alguma regra de alocação ou de sobrecarga é violada, o usuário recebe uma mensagem de erro na interface, informando o motivo pelo qual a operação não pôde ser concluída.

Essa abordagem evita falhas silenciosas e permite que o usuário compreenda as restrições do sistema.

#### 6. Testes Realizados

As seguintes situações foram testadas e aprovadas:

- Alocação de um membro em até dois projetos ativos distintos.
- Bloqueio de uma tentativa de alocação em um terceiro projeto ativo.
- Exibição de mensagem de erro adequada no frontend.
- Permissão de criação de tarefa em projeto concluído, mesmo quando o membro já está alocado em dois projetos ativos, respeitando o limite de tarefas.
- Bloqueio da criação de uma sexta tarefa ativa.

As validações garantem o cumprimento das regras testadas durante a criação de tarefas.

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
**6. Tratamento Visual de Erros na Alteração de Status dos Projetos:** Foi aprimorada a experiência do usuário na listagem de projetos, substituindo os alertas nativos do navegador (`alert()`) por mensagens de erro integradas à interface, estilizadas com Tailwind CSS.
A implementação foi realizada no componente `list-project.tsx`, utilizando o hook `useState` do React para controlar a exibição das mensagens retornadas pela API Laravel.
Quando uma operação de alteração de status ou restauração de projeto falha, o sistema apresenta um alerta visual contendo a descrição do erro e uma opção para dispensar a mensagem.
Essa melhoria foi validada por meio de três testes funcionais:
- Exibição correta da mensagem de erro na interface.
- Funcionamento do botão para fechar o alerta.
- Preservação do status do projeto após uma tentativa de reativação bloqueada.

---

## Demonstração Visual

- [Clique aqui para acessar os prints de demonstração](COLOQUE_SEU_LINK_AQUI)
*(A pasta contém imagens do sistema rodando e validações de erro funcionando na prática).*

---

## Extras e Diferenciais Implementados

- **Tipagem Rigorosa em TypeScript:** Uso de interfaces padronizadas (`membroType`, `projetoType`, `tarefaType`) aplicadas nos componentes React.
- **Custom API Client Dinâmico:** Integração do frontend via cliente customizado `api()` do projeto, com tratamento de exceções para apresentar mensagens amigáveis baseadas no status de retorno do Laravel.
- **Form Requests no Laravel:** Organização do código de validação do lado do servidor em classes dedicadas, mantendo os Controllers enxutos e seguindo boas práticas de arquitetura MVC.
- **Controle de Sobrecarga de Tarefas:** Implementada uma regra de negócio adicional que limita a atribuição de tarefas a, no máximo, **5 tarefas ativas simultâneas por membro**. A validação é realizada no backend, por meio da classe `StoreTarefaRequest`, antes da criação de uma nova tarefa.
Para a contagem, são desconsideradas as tarefas com status `concluida` ou `excluida`. Dessa forma, a conclusão ou exclusão de uma tarefa libera a capacidade do membro para receber novas atribuições.
Quando o limite é atingido, a API retorna um erro de validação HTTP `422`, impedindo a criação da tarefa e informando que o membro atingiu sua capacidade máxima.