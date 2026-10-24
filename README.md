# Sistema de Gestão de Projetos MEJ
## INICIANDO O PROJETO

Clone o projeto para sua máquina:
```bash
    git clone https://github.com/DiegoDadalto/ps-desafio-2026-2
```
### Laravel
Dentro da pasta `backend` siga as seguintes instruções.
1. Instale as dependências:
    ```bash
    composer install
    ```
2. Crie o arquivo de variáveis globais do projeto **backend**:
    ```bash
    cp .env.example .env
    ```
3. Após isso insira as credenciais do banco de dados no arquivo `.env`, como nome de usuário e senha;
4. Crie o schema no banco de dados. O nome do banco deve ser o valor contido na variável `DB_DATABASE` presente no arquivo `.env`. 
5. Gere a chave do projeto:
    ```bash
    php artisan key:generate
    ```
6. Crie o link simbólico com o diretório storage:
    ```bash
    php artisan storage:link
    ```
7. Rode as migrations:
    ```bash
    php artisan migrate --seed
    ```
   1. Caso as migrations já tenham sido rodadas anteriormente no seu banco de dados, execute o comando:
        ```bash
        php artisan migrate:fresh --seed
        ```
8. Inicie o servidor **backend**:
    ```bash
    php artisan serve
    ```
    1. O servidor **backend** será iniciado por padrão no endereço `http://127.0.0.1:8000`. 
### React.js/Next.js
Tenha o gerenciador de pacotes <a href="https://pnpm.io/pt/installation">pnpm</a> instalado globalmente em sua máquina.

Dentro da pasta `frontend` siga as seguintes instruções.
1. Instale as dependências:
    ```bash
    pnpm install
    ```
2. Crie o arquivo de variáveis globais do projeto **frontend**:
    ```bash
    cp .env.local.example .env.local
    ```
3. Inicie o servidor **frontend**:
    ```bash
    pnpm dev
    ```
    1. O servidor **frontend** será iniciado por padrão no endereço `http://127.0.0.1:3000`. 


## ARQUITETURA E MODELAGEM DO PROJETO
### Modelagem do banco de dados

![Diagrama entidade-relacionamento do banco de dados](https://lh3.googleusercontent.com/d/10TduZv-tAwDHyEEvlDFnmeJlg3UKJqZ-)

A modelagem do banco de dados foi feita a partir de um relato de usuário, adicionando à estrutura do banco previamente existente. A tabela **Tarefas** foi adicionada para armazenar atributos relacionados às tarefas individuais dos projetos do MEJ. Abaixo, estão os atributos presentes na tabela:

- **id:** Identificador padrão de tabelas no Laravel;
- **idMembro_alocado (Chave estrangeira):** Identificador do membro alocado à tarefa. Relaciona-se com a tabela **Membros**;
- **idProjeto_vinculado (Chave estrangeira):** Identificador do projeto vinculado à tarefa. Relaciona-se com a tabela **Projetos**;
- **titulo:** O título da tarefa;
- **descricao:** Um breve texto descritivo acerca da tarefa;
- **data_inicio** e **data_fim:** Datas que marcam o início e fim de uma tarefa.

As relações foram estabelecidas tomando o atributo **id**, presente em ambas as tabelas **Membros** e **Projetos**, como **Chave primária** da tabela, relacionando ambas as tabelas com a tabela **Tarefas** utilizando da relação **um-para-muitos (1:N)** em ambas as chaves primárias (1) às chaves estrangeiras (N).

### Regras de negócio

1. **Um membro não pode participar de mais de dois projetos ativos ao mesmo tempo:** Ao criar uma tarefa, o usuário será solicitado a inserir uma data de início e uma data de fim para a tarefa; o sistema então irá verificar se o intervalo especificado têm interseções com o intervalo de tempo de outra tarefa; caso hajam tarefas ativas em mais de dois projetos ao mesmo tempo (incluindo a tarefa prestes a ser inserida), o sistema bloqueará a criação da tarefa para evitar a sobrecarga de trabalho de um membro, exibindo uma mensagem de erro.
A validação da regra de negócio no backend foi feita da seguinte maneira:

**TarefaController - função store()**
```php
$idMembro = $request->input('idMembro_alocado');
$idProjeto = $request->input('idProjeto_vinculado');
$dataInicio = $request->input('data_inicio');
$dataFim = $request->input('data_fim');
$projetoInserido = Projeto::findOrFail($idProjeto);

$numeroProjetos = Tarefa::where('idMembro_alocado', $idMembro)
                        ->where('idProjeto_vinculado', '!=', $idProjeto)
                        ->where(function ($req) use ($dataInicio, $dataFim) {
                            $req->where('data_inicio', '<=', $dataFim)->where('data_fim', '>=', $dataInicio);
                        })->distinct('idProjeto_vinculado')
                        ->count('idProjeto_vinculado');

if ($numeroProjetos >= 2) {
    return response()->json(['message' => 'Um membro não pode participar de mais de dois projetos ativos.'], Response::HTTP_UNPROCESSABLE_ENTITY);
}
```

A variável `$numeroProjetos` guarda o número de projetos ativos distintos que o membro está através da consulta do Eloquent na tabela **Tarefas** que realiza a verificação do conflito de projetos. Funciona da seguinte maneira:

    * Seleciona todas as tarefas alocadas ao membro sendo inserido;
    * Seleciona todos os projetos vinculados ao membro diferentes do projeto da nova tarefa;
    * Agrupa as cláusulas numa função anônima, buscando projetos que têm uma data de início posterior à data de fim sendo inserida, e projetos que têm uma data de término anterior à data de início sendo inserida (ou seja, verifica se existe sobreposição de intervalos);
    * Desconsidera duplicatas de projeto;
    * Conta o número de projetos ativos com intervalos de tempo sobrepostos;
    * Verifica se o número de projetos é maior ou igual a dois, caso seja, dispara uma mensagem de erro e um código de status 422 (HTTP_UNPROCESSABLE_ENTITY).


2. **A data de início de uma tarefa não pode ser anterior à data de início do projeto vinculado:**

**TarefaController - função store()**
```php
if ($dataInicio < $projetoInserido->data_inicio) {
    return response()->json(['message' => 'Uma tarefa não pode começar antes do início de um projeto.'], Response::HTTP_UNPROCESSABLE_ENTITY);
}
```

O backend faz uma comparação simples, verificando se a data de início da tarefa sendo inserida é anterior à data de início do projeto vinculado à tarefa, caso seja, dispara uma mensagem de erro e um código de status 422 (HTTP_UNPROCESSABLE_ENTITY).

3. **A data de término de uma tarefa não pode ser posterior à data de término do projeto vinculado:**

**TarefaController - função store()**
```php
if ($dataFim > $projetoInserido->data_fim) {
    return response()->json(['message' => 'Uma tarefa não pode terminar após o fim de um projeto.'], Response::HTTP_UNPROCESSABLE_ENTITY);
}
```

O backend faz uma comparação similar à anterior, verificando se a data de fim da tarefa sendo inserida é posterior à data de fim do projeto vinculado à tarefa, caso seja, dispara uma mensagem de erro e um código de status 422 (HTTP_UNPROCESSABLE_ENTITY).


## DOCUMENTAÇÃO DA API
Por padrão, o servidor do backend inicia na porte **http://127.0.0.1:8000**, para facilitar a exemplificação, considere `baseUrl` como tal porta.

### Rotas - Membro
- **Obter membro:**
    - Método: **GET**
    - Rota: `baseUrl/membros/{id do membro}`, Ex.: id = 1000 => baseUrl/membros/1000
    - Objeto retornado:
    ```json
    {
        "id": "a30d9824-c168-42a7-a548-30b4696a7536",
        "nome": "Amanda Orn",
        "email": "predovic.cyrus@example.org",
        "cor_favorita": "Purple",
        "data_aniversario": "2025-03-11",
        "image": "https://picsum.photos/seed/e5f90607-b845-3479-95dc-9a59667424ee/400/400",
        "created_at": "2026-10-23T20:37:04.000000Z",
        "updated_at": "2026-10-23T20:37:04.000000Z"
    }
    ```
    - Código de status retornado: `200 OK`: Sucesso; `404 Not Found`: Membro não encontrado;

- **Inserir membro:**
    - Método: **POST**
    - Rota: `baseUrl/membros/`
    - Parâmetros esperados:
        - nome: string
        - email: string
        - senha: string
        - cor_favorita: string
        - data_aniversario: date
        - image: image (Opcional)
    - Código de status retornado: `201 Created`: Sucesso; `422 Unprocessable Entity`: Erro na inserção de atributos obrigatórios

- **Atualizar membro:**
    - Método: **PUT**
    - Rota: `baseUrl/membros/{id do membro}`, Ex.: id = 1000 => baseUrl/membros/1000
    - Código de status retornado: `200 OK`: Sucesso; `404 Not Found`: Membro não encontrado;

- **Deletar membro:**
    - Método: **DELETE**
    - Rota: `baseUrl/membros/{id do membro}`
    - Código de status retornado: `204 No Content`: Sucesso; `404 Not Found`: Membro não encontrado;

### Rotas - Projeto
- **Obter projeto:**
    - Método: **GET**
    - Rota: `baseUrl/projetos/{id do projeto}`
    - Objeto retornado:
    ```json
    {
        "id": "a30d9825-5002-4753-a0a7-87ab9dd8da30",
        "nome": "Doloribus officia facere neque.",
        "nome_cliente": "Lavinia Stiedemann",
        "descricao": "Fugit repellat quidem dolorem et doloribus alias iste. Adipisci labore ea voluptatibus possimus. Ut illum dolores nostrum.",
        "data_inicio": "2027-09-13",
        "data_fim": "2027-12-25",
        "created_at": "2026-10-23T20:37:04.000000Z",
        "updated_at": "2026-10-23T20:37:04.000000Z"
    }
    ```
    - Código de status retornado: `200 OK`: Sucesso; `404 Not Found`: Projeto não encontrado;

- **Inserir projeto:**
    - Método: **POST**
    - Rota: `baseUrl/projetos/`
    - Parâmetros esperados:
        - nome: string
        - nome_cliente: string
        - descricao: string
        - data_inicio: date
        - data_fim: date
    - Código de status retornado: `201 Created`: Sucesso; `422 Unprocessable Entity`: Erro na inserção de atributos obrigatórios

- **Atualizar projeto:**
    - Método: **PUT**
    - Rota: `baseUrl/projeto/{id do projeto}`
    - Código de status retornado: `200 OK`: Sucesso; `404 Not Found`: Projeto não encontrado;

- **Deletar projeto:**
    - Método: **DELETE**
    - Rota: `baseUrl/membros/{id do projeto}`
    - Código de status retornado: `204 No Content`: Sucesso; `404 Not Found`: Projeto não encontrado;
    - Obs.: Ao deletar um projeto, **todas** as tarefas relacionadas a ele também são deletadas.

### Rotas - Tarefa
- **Obter tarefa:**
    - Método: **GET**
    - Rota: `baseUrl/tarefas/{id da tarefa}`
    - Objeto retornado:
    ```json 
    {
        "id": "a30d9825-afb9-49db-bce4-f06459fb8557",
        "idMembro_alocado": "a30d9825-2840-4071-9d1d-ed1141307673",
        "idProjeto_vinculado": "a30d9825-8b4d-4d85-ad1d-3ceddc4eb2de",
        "titulo": "Occaecati a aspernatur quas aut.",
        "descricao": "Natus saepe reprehenderit pariatur praesentium. Est mollitia hic et esse. Ut nesciunt sed recusandae quo autem libero.",
        "data_inicio": "2027-01-23",
        "data_fim": "2027-04-22",
        "created_at": "2026-10-23T20:37:05.000000Z",
        "updated_at": "2026-10-23T20:37:05.000000Z",
        "membro": {
            "id": "a30d9825-2840-4071-9d1d-ed1141307673",
            "nome": "Prof. Sim Abernathy III",
            "email": "aleen.boyle@example.org",
            "cor_favorita": "Purple",
            "data_aniversario": "2026-05-16",
            "image": "https://picsum.photos/seed/c7dc92e4-9ab0-3dbc-b020-a4209ed1228d/400/400",
            "created_at": "2026-10-23T20:37:04.000000Z",
            "updated_at": "2026-10-23T20:37:04.000000Z"
        },
        "projeto": {
            "id": "a30d9825-8b4d-4d85-ad1d-3ceddc4eb2de",
            "nome": "Non rerum dicta illum ipsum.",
            "nome_cliente": "Adonis Lebsack",
            "descricao": "Autem amet doloribus quibusdam. Odio enim sint et et qui. Expedita quas at id est culpa.",
            "data_inicio": "2026-04-21",
            "data_fim": "2026-06-24",
            "created_at": "2026-10-23T20:37:04.000000Z",
            "updated_at": "2026-10-23T20:37:04.000000Z"
        }
    }
    ```
    - Código de status retornado: `200 OK`: Sucesso; `404 Not Found`: Projeto não encontrado;

- **Inserir tarefa:**
    - Método: **POST**
    - Rota: `baseUrl/tarefas/`
    - Parâmetros esperados:
        - idMembro_alocado: string
        - idProjeto_vinculado: string
        - titulo: string
        - descricao: string
        - data_inicio: date
        - data_fim: date
    - Código de status retornado: `201 Created`: Sucesso; `422 Unprocessable Entity`: Erro na inserção de atributos obrigatórios

- **Atualizar tarefa:**
    - Método: **PUT**
    - Rota: `baseUrl/membros/{id da tarefa}`
    - Código de status retornado: `200 OK`: Sucesso; `404 Not Found`: Tarefa não encontrada;

- **Deletar tarefa:**
    - Método: **DELETE**
    - Rota: `baseUrl/membros/{id do tarefa}`
    - Código de status retornado: `204 No Content`: Sucesso; `404 Not Found`: Tarefa não encontrada;

### Factory e Seeder de tarefas
Foram criadas uma factory e um seeder para a tabela de tarefas para gerar dados falsos no banco de dados. A seguir há o trecho do código e uma breve explicação dos dados gerados.

**Factory**
```php
public function definition(): array
    {
        $dataInicio = fake()->dateTimeBetween('2025-01-01', '2027-12-30');
        $dataFim = fake()->dateTimeBetween(
            $dataInicio->modify('+1 day'),
            '2027-12-31'
        );

        return [
            'idMembro_alocado' => Membro::inRandomOrder()->first()?->id ?? Membro::factory(),
            'idProjeto_vinculado' => Projeto::factory(),
            'titulo' => $this->faker->sentence(4),
            'descricao' => $this->faker->paragraph(),
            'data_inicio' => $dataInicio->format('Y-m-d'),
            'data_fim' => $dataFim->format('Y-m-d'),
        ];
    }
```

**Dados gerados para cada atributo:**
- **idMembro_alocado:** Associa um id de um membro já existente na tabela **Membros** à tarefa; se não houver membros disponíveis, cria um novo membro com a factory de membro;
    - Exemplo de dado gerado: **a30d9825-2840-4071-9d1d-ed1141307673**
- **idProjeto_vinculado:** Associa um id de um projeto na tabela **Projetos** à tarefa;
    - Exemplo de dado gerado: **a30d9825-8b4d-4d85-ad1d-3ceddc4eb2de**
- **titulo:** Gera uma frase com quatro palavras.
    - Exemplo de dado gerado: **Occaecati a aspernatur quas aut.**
- **descricao:** Gera um parágrafo aleatório.
    - Exemplo de dado gerado: **Natus saepe reprehenderit pariatur praesentium. Est mollitia hic et esse. Ut nesciunt sed recusandae quo autem libero.**
- **data_inicio:** Gera uma data entre 1º de janeiro de 2025 e 30 de dezembro de 2027. Obs.: A data gerada é guardada em uma variável `$dataInicio` para garantir que a data de término da tarefa não possa ser anterior à data de início.
- **data_fim:** Gera uma data entre o dia posterir à data de início gerada e 31 de dezembro de 2027. Ex.: se a data de início gerada for 24/10/2026, o intervalo de datas de término que podem ser geradas é 25/10/2026-31/12/2027.

**Seeder**
```php
public function run(): void
    {
        \App\Models\Tarefa::factory(10)->create();
    }
```

O seeder utiliza da factory para gerar 10 instâncias na tabela **Tarefas**.

## INTERFACE
### Aba de membros

**Campo vazio na criação de membro**

![Campo vazio na criação de membro](https://lh3.googleusercontent.com/d/13InBdmh5JhBPMJrZJ5nPZuaesU_jikSo)

Ao tentar criar um membro sem um campo obrigatório, uma mensagem de erro aparecerá.

**Restrição de integridade de um campo**

![Restrição de integridade de um campo](https://lh3.googleusercontent.com/d/1eNCS1JqESwq19eQU8dgNk8OWVcR3h_e8)

No exemplo acima, alguma das restrições da senha foi quebrada (Letras minúsculas e maiúsculas, números, símbolos).

**Sucesso na criação de um membro**

![Sucesso na criação de um membro](https://lh3.googleusercontent.com/d/1x65FdjL06rACVrpsqN4OAd6KOZOT4YcV)

**Restrição de unicidade do e-mail**

![Restrição de unicidade do e-mail](https://lh3.googleusercontent.com/d/1K3R4o1HsAJb9x4ObadJKrGgc_2dIaL_v)

No exemplo acima, tentou-se criar um membro com um endereço de e-mail já existente (diego@gmail.com), resultando num erro ao submeter.

**Sucesso na edição de um membro**

![Sucesso na edição de um membro](https://lh3.googleusercontent.com/d/1GQLRQUQ2zXbCq1tgRcUyFSV1r0wTBLYH)

**Exigência de data de fim posterior à data de início**

![Exigência de data de fim posterior à data de início](https://lh3.googleusercontent.com/d/1ncN-Op6TFTKlfHrap75xk8yXm_fXBiuX)

Ao tentar criar uma tarefa cuja data de fim é anterior à data de início, como no exemplo, onde a data de início é 24/10 e a de fim é 20/10, o sistema bloqueia a criação do projeto.

**Filtragem de projetos**

![Janela de filtragem de projetos](https://lh3.googleusercontent.com/d/1kQCdeWxvCicgPI6fcI5WJ3u7LyM_l9sh)
![Projetos filtrados](https://lh3.googleusercontent.com/d/1_Qrfc62AnLtzlg1lJKaaMLOHl8VT8tFD)

**Restrição de intervalo de tempo de uma tarefa**

![Restrição de intervalo de tempo de uma tarefa](https://lh3.googleusercontent.com/d/1ersHqalqZP1P7vXPVRF8OgsfVw84TpXX)

O sistema não permite que uma tarefa seja criada com um intervalo de tempo que vai além do intervalo de seu projeto vinculado.

![Tarefa criada com sucesso](https://lh3.googleusercontent.com/d/1xmumFbZeDqcUH51QySzT98T0lqy3T9tC)

**Trava de sobrecarga de trabalho de um membro**

![Trava de sobrecarga de trabalho de um membro](https://lh3.googleusercontent.com/d/1Jq7qT_moLBqb9wD3-0xHWEZlSAg_1ZnA)

No exemplo em questão, tenta-se criar uma tarefa em um intervalo de tempo onde o membro associado estava com outras duas tarefas ativas em dois projetos diferentes; o sistema bloqueia a criação da tarefa para evitar sobrecarga de trabalho em um único membro

![Tarefas sem sobreposição de intervalos](https://lh3.googleusercontent.com/d/1UlNw_94mc6SlIrv_UXhLH3NUKSegSPyU)

Desse modo, o sistema permite a criação de três tarefas em três projetos diferentes, já que as tarefas em momento algum estão todas ativas ao mesmo tempo.

**Filtros de tarefa**

Filtro por projeto:

![Filtro de projeto](https://lh3.googleusercontent.com/d/1UENkiR9FVwr32deuwA4eY7_gTXhyzmzB)

Filtro por membro:

![Filtro de membro](https://lh3.googleusercontent.com/d/1eEcObgg5gP3XUvBKV8_TPwwwclqAnVpO)

Filtro por projeto e membro:

![Filtro de projeto e membro](https://lh3.googleusercontent.com/d/12vUMPPnpmx1klDCKyF60yWFbC1fY7zFG)

## EXTRA: Sistema de filtragem

O sistema de filtragem de projetos e tarefas se divide em três componentes de cada aba: o componente de servidor da listagem de projetos/tarefas (**ListTasks/ListProjects**); o componente para exibir as tarefas filtradas (**ListFilteredTasks/ListFilteredProjects**) e o componente da caixa de diálogo da filtragem (**DialogFilterTarefa/DialogFilterProjeto**). Vamos usar a listagem filtrada de tarefas como exemplo:

**ListTasks (list-task.tsx)**
```typescript
export default async function ListTasks() {
  const { response } = await api<tarefaType[]>('GET', '/tarefas')
  const { response: projetos } = await api<projetoType[]>('GET', '/projetos')
  const { response: membros } = await api<membroType[]>('GET', '/membros')
  
  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter as tarefas.
      </DashboardContainer>
    )
  }

  return (
    <ListFilteredTasks tarefas={response} projetos={projetos} membros={membros}/>
  )
}
```

A listagem é desestruturada em dois componentes para separar ações de servidor e de cliente. O componente **ListTasks** faz a requisição à API para obter os dados de tarefas, projetos e membros e passa esses dados como _props_ ao componente **ListFilteredTasks**, que irá manipular os dados para realizar a filtragem.

**ListFilteredTasks (list-filtered-tasks.tsx)**
```typescript
const [filtroProjeto, setFiltroProjeto] = useState('')
const [filtroMembro, setFiltroMembro] = useState('')

const tarefasFiltradas = tarefas?.filter((tarefa) => {
    const fProjeto = !filtroProjeto || tarefa.idProjeto_vinculado === filtroProjeto
    const fMembro = !filtroMembro || tarefa.idMembro_alocado === filtroMembro
    return fProjeto && fMembro
})
```

Para filtrar as tarefas de acordo com o atributo, usa-se dois _hooks_ useState(), que inicializam com uma string vazia, indicando a ausência de filtro. Para de fato filtrar as tarefas, usa-se o método **filter()**, que criará um novo array com as tarefas filtradas a partir da função anônima (através de comparações, onde apenas as que resultarem em **true** passarão para o novo array).
Com isso, temos duas validações antes do retorno que funcionam de maneira idêntica: caso nenhum filtro esteja selecionado, fProjeto ou fMembro assumem `!filtroProjeto === true` / `!filtroMembro === true`, efetivamente ignorando a validação e passando todos os elementos de `tarefa` para o novo array; caso algum filtro esteja selecionado, fProjeto e fMembro assumem o valor da verificação `tarefa.idProjeto_vinculado === filtroProjeto` / `tarefa.idMembro_alocado === filtroMembro`, ou seja, se o membro ou o projeto presente no array original for igual ao membro ou projeto selecionado na filtragem, ele passa para o próximo array, sendo exibido na interface, com fProjeto e/ou fMembro assumindo `true`, caso contrário, ele não é exibido na interface, com fProjeto e/ou fMembro assumindo `false`.
Finalmente, a função retorna o resultado da verificação lógica `fProjeto && fMembro`, ou seja, é mostrado na interface apenas o elemento que contém os atributos exigidos pelo filtro selecionado.

```js
<DialogFilterTarefa
    projetos={projetos}
    membros={membros}
    filtroProjeto={filtroProjeto}
    setFiltroProjeto={setFiltroProjeto}
    filtroMembro={filtroMembro}
    setFiltroMembro={setFiltroMembro}>
    <Button size="sm">
        <LuFilter />
        Filtrar tarefas
    </Button>
</DialogFilterTarefa>
```

Os _props_ do componente pai, bem como as variáveis e funções dos **useState()** são passados como _props_ para o componente DialogFilterTarefa.

**DialogFilterTarefa (dialog-filter-task.tsx)**
```typescript
const apagarFiltros = () => {
    setFiltroProjeto('')
    setFiltroMembro('')
}

const aplicarFiltros = () => { setOpen(false) }
```

São criadas funções simples para limpar os filtros dentro da caixa de diálogo, e fechar a caixa de diálogo após aplicar os filtros.

```js
<FormField>
    <Label htmlFor="projeto">Projeto</Label>
    <select
        className="flex h-10 w-full rounded border border-input bg-background shadow px-3 py-2 text-sm col-start-2 col-end-5"
        id="idProjeto_vinculado"
        value={filtroProjeto}
        onChange={(event) => setFiltroProjeto(event.target.value)}
        disabled={pending}
        defaultValue={tarefa?.idProjeto_vinculado || ""}>
        <option value="">Selecione um projeto</option>
        {projetos?.map((projeto) => (
            <option key={projeto.id} value={projeto.id}>{projeto.nome}</option>
        ))}
    </select>
</FormField>
```

O menu de seleção dentro da caixa de diálogo de filtros assume alguns valores tratados nos componentes pais: o `value` indica o filtro atualmente selecionado, exibido na caixa de seleção; `onChange` possui uma _arrow function_ que atualiza o valor de filtroProjeto para o filtro atualmente selecionado.

O sistema de filtragem de projetos possui o mesmo funcionamento, apesar de um pouco mais simples, por se tratar de apenas um filtro.

## USO DE IA
Para auxiliar no desenvolvimento do projeto, o chatbot **Gemini** foi utilizado para fins de aprendizado e retirada de dúvidas simples, mais especificamente em:

- Sintaxe do TailwindCSS, php e Laravel;
- Comandos de terminal;
- Auxílio na implementação de algumas regras de negócio;
- AUxílio na implementação do menu seletor;
- Auxílio da implementação da filtragem;