# Adapti Project Template - Módulo de Tarefas (Desafio Técnico)

Este repositório contém a implementação do novo **Módulo de Tarefas** e o sistema de regras de negócio para alocação de membros em projetos, desenvolvido como parte do desafio técnico para o Movimento Empresa Júnior (MEJ).

## 🚀 Iniciando o projeto

Clone o projeto para sua máquina:

```
git clone link-do-seu-fork-aqui


```

### Laravel (Backend)

Dentro da pasta `backend` siga as seguintes instruções:

1. Instale as dependências:

   ```
   composer install
   
   
   ```

2. Crie o arquivo de variáveis globais do projeto:

   ```
   cp .env.example .env
   
   
   ```

3. Após isso insira as credenciais do banco de dados no arquivo `.env`.

4. Crie o schema no banco de dados. O nome do banco deve ser o valor contido na variável `DB_DATABASE`.

5. Gere a chave do projeto:

   ```
   php artisan key:generate
   
   
   ```

6. Crie o link simbólico com o diretório storage:

   ```
   php artisan storage:link
   
   
   ```

7. Rode as migrations e os seeders. Como o banco possui novas tabelas e regras, recomenda-se o comando *fresh*:

   ```
   php artisan migrate:fresh --seed
   
   
   ```

8. Inicie o servidor backend:

   ```
   php artisan serve
   
   
   ```

   *O servidor backend será iniciado por padrão no endereço `http://127.0.0.1:8000`.*

### React.js/Next.js (Frontend)

Tenha o gerenciador de pacotes pnpm instalado globalmente em sua máquina.

Dentro da pasta `frontend` siga as seguintes instruções:

1. Instale as dependências:

   ```
   pnpm install
   
   
   ```

2. Crie o arquivo de variáveis globais do projeto:

   ```
   cp .env.local.example .env.local
   
   
   ```

3. Inicie o servidor frontend:

   ```
   pnpm dev
   
   
   ```

   *O servidor frontend será iniciado por padrão no endereço `http://127.0.0.1:3000`.*

## 🏛️ Decisões Arquiteturais e Modelagem

Para atender aos requisitos do sistema, a modelagem de dados foi expandida para suportar Tarefas e um controle rigoroso do status dos Projetos.

### Modelagem de Dados (MER Textual)

* **Tabela `projetos`**: Foi adicionado o campo `status` (Enum: `Ativo`, `Concluido`, `Pausado`). Apenas projetos com status "Ativo" contabilizam no limite de alocação dos membros.

* **Tabela `tarefas` (Nova)**: Armazena as tarefas do sistema. Possui relacionamento N:1 com `Projetos` e N:1 com `Membros` (responsável). Colunas principais: `id`, `titulo`, `descricao`, `status`, `projeto_id`, `membro_id`.

* **Tabela Pivot `projeto_membro`**: Gerencia a alocação (N:N).

### Lógica da Trava de Alocação (Race Condition Tracking)

A regra de negócio exige que um membro **não ultrapasse 2 projetos ativos**. Para garantir integridade de dados e evitar cenários de concorrência (ex: usuário enviando múltiplas requisições simultâneas), foi implementada uma proteção a nível de banco de dados:

* **Lock Pessimista (`lockForUpdate`)**: No `TarefaController`, a transação inicia bloqueando a linha do membro no banco (`Membro::where('id', $id)->lockForUpdate()->firstOrFail()`). Isso força requisições concorrentes a entrarem em fila.

* **Encapsulamento de Domínio**: A lógica de contagem foi isolada no método `$membro->alocarEm($projetoId)` no Model, mantendo o Controller enxuto e garantindo que exceções (`ValidationException` / HTTP 422) sejam lançadas na camada correta.

## 📖 Documentação da API

### `POST /api/tarefas`

Cria uma nova tarefa e verifica a alocação do membro no projeto.

* **Payload esperado:**

  ```
  {
    "titulo": "Implementar dashboard",
    "descricao": "Criar gráficos de produtividade",
    "projeto_id": 1,
    "membro_id": 4,
    "status": "Pendente"
  }
  
  
  ```

* **Respostas:**

  * `201 Created`: Tarefa criada com sucesso.

  * `422 Unprocessable Entity`: Erro de validação ou **Regra de Negócio Violada** (Limite de projetos).

### `PUT /api/projetos/{id}`

Atualiza os dados de um projeto, permitindo a transição do `status` (ex: concluir um projeto libera os membros vinculados a ele).

* *Nota técnica: Devido à limitação do PHP em ler `multipart/form-data` via PUT, a requisição é feita via POST com Method Spoofing (`_method=PUT`).*

## 🖼️ Demonstração Visual

Abaixo estão os links de acesso público (Google Drive) com as capturas de tela comprovando o funcionamento das novas interfaces e bloqueios implementados:

*   🔗 **[Criar Tarefa](https://drive.google.com/file/d/1OcBtv2zGJeVEhc1k-59kGg1Cs7BtSyZ2/view?usp=drive_link)**
*   🔗 **[Editar Tarefa](https://drive.google.com/file/d/173BWpITyjeXt4pYUvbUotLfvofySNzTZ/view?usp=drive_link)**
*   🔗 **[Listagem de Projetos](https://drive.google.com/file/d/1__7AGjIQqea-cBG61noFPMeCn8rJ5X-B/view?usp=drive_link)**
*   🔗 **[Listagem de Tarefas](https://drive.google.com/file/d/1mUtVgMA-ooub3hMlitn1jDNLdovF7fFI/view?usp=drive_link)**
*   🔗 **[Restrição de alocação de membros em projetos](https://drive.google.com/file/d/1JryMAASbgRvndfE8K-elDJMTflUdQoGW/view?usp=drive_link)**

## 🌟 Extras Implementados (Troubleshooting e Melhorias)

Durante o desenvolvimento, além da entrega da *feature* principal, dediquei tempo para analisar o código base e corrigir *bugs* preexistentes de interface, segurança e lógica de negócio. Abaixo listo as melhorias não solicitadas diretamente, mas implementadas para garantir a qualidade final do sistema.

### Melhorias no Backend (Laravel)
1.  **Bug de Criação de Projetos (Data Invertida):** O sistema permitia cadastrar a "Data de Fim" antes da "Data de Início". Adicionei uma validação customizada nas *rules* do Request, forçando que `data_fim` seja igual ou posterior a `data_inicio`. Também criei mensagens de erro personalizadas no `StorageProjectRequest` e exibi o feedback no front-end (`dialog-create-project`).
2.  **Inconsistências no Cadastro de Membros resolvidas:**
    *   O método `authorize()` no Form Request estava retornando `false`, bloqueando *todas* as submissões. Corrigido para `true`.
    *   A API estava aceitando e-mails repetidos. Adicionada regra `unique:membros` na validação.
    *   O campo `senha` não estava no `$fillable` (Mass Assignment) do Laravel, sendo ignorado na criação. Campo adicionado.
    *   Adicionei criptografia segura (Hash) na gravação da senha antes de persistir no banco.

### Melhorias no Frontend (Next.js & React)
1.  **Resolução de Erros de Importação (React Icons):** O projeto utilizava a versão 5.0.1 da biblioteca `react-icons`, que possui nomenclaturas diferentes das mais recentes, causando erro no build. Corrigi os componentes:
    *   Trocado `LuHouse` por `LuHome` na `sidebar-main-tsx` e `page.tsx`.
    *   Trocado `LuCirclePlus` por `LuPlusCircle` em `list-members.tsx` e na `page` de Membros.
2.  **Correção de Bug Visual na Edição de Membros:** Ao abrir o modal `dialog-update-member`, o e-mail não estava preenchendo automaticamente. Adicionado o atributo `defaultValue={member?.email}` no input.
3.  **Correção de Hydration Error (Fuso Horário):** O uso de `new Date(projeto.data_inicio).toLocaleDateString('pt-BR')` direto no JSX causava conflito de renderização (Hydration Error) devido à diferença de fuso horário entre o Servidor (SSR) e o Navegador do cliente. Criei a função utilitária `formataData()` para padronizar a exibição das datas (dividindo a string bruta), resolvendo o bug.
4.  **Correção do Loop de Redirecionamento:** O `middleware.ts` estava interceptando a própria rota de login (`/auth`), gerando um loop de redirecionamentos. Adicionei a exclusão `|auth` no RegEx do `matcher` do middleware.
5.  **Method Spoofing na Edição de Projetos:** A API rejeitava requisições `PUT` com envio de formulário em `multipart/form-data` (limitação do PHP). Adicionei o input *hidden* com `_method=PUT` no formulário front-end e alterei a Server Action para disparar via `POST`, resolvendo a falha na edição de projetos.