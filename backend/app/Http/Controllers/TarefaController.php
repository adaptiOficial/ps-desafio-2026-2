<?php

namespace App\Http\Controllers;

use App\Models\Tarefa;
use App\Models\Projeto;
use App\Http\Requests\StoreTarefaRequest;
use App\Http\Requests\UpdateTarefaRequest;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;

class TarefaController extends Controller
{
    protected Tarefa $tarefa;

    public function __construct(Tarefa $tarefa) {
        $this->tarefa = $tarefa;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $tarefas = Tarefa::with('membro')->with('projeto')
                                         ->join('projetos', 'tarefas.idProjeto_vinculado', '=', 'projetos.id')
                                         ->join('membros', 'tarefas.idMembro_alocado', '=', 'membros.id')
                                         ->orderBy('projetos.nome', 'asc')
                                         ->orderBy('membros.nome', 'asc')
                                         ->orderBy('titulo', 'asc')
                                         ->select('tarefas.*')->get();
        return response()->json($tarefas, Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTarefaRequest $request): JsonResponse
    {
        $idMembro = $request->input('idMembro_alocado');
        $idProjeto = $request->input('idProjeto_vinculado');
        $dataInicio = $request->input('data_inicio');
        $dataFim = $request->input('data_fim');
        $projetoInserido = Projeto::findOrFail($idProjeto);

        $numeroProjetos = Tarefa::where('idMembro_alocado', $idMembro) // procura tarefas associadas ao membro
                                ->where('idProjeto_vinculado', '!=', $idProjeto) // procura projetos diferentes
                                ->where(function ($req) use ($dataInicio, $dataFim) {
                                    $req->where('data_inicio', '<=', $dataFim)->where('data_fim', '>=', $dataInicio); // verifica se o membro está em mais de um projeto ativo
                                })->distinct('idProjeto_vinculado') // ignora duplicatas
                                ->count('idProjeto_vinculado'); // conta todos os projetos que o membro está 

        if ($numeroProjetos >= 2) {
            return response()->json(['message' => 'Um membro não pode participar de mais de dois projetos ativos.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if ($dataInicio < $projetoInserido->data_inicio) {
            return response()->json(['message' => 'Uma tarefa não pode começar antes do início de um projeto.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if ($dataFim > $projetoInserido->data_fim) {
            return response()->json(['message' => 'Uma tarefa não pode terminar após o fim de um projeto.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $tarefa = Tarefa::create($request->validated());
        return response()->json($tarefa, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(String $id): JsonResponse
    {
        $tarefa = Tarefa::findOrFail($id);
        return response()->json($tarefa, Response::HTTP_OK);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tarefa $tarefa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTarefaRequest $request, String $id): JsonResponse
    {
        $tarefa = Tarefa::findOrFail($id);
        $validados = $request->validated();

        $idMembro = $validados['idMembro_alocado'];
        $idProjeto = $validados['idProjeto_vinculado'];
        $dataInicio = $validados['data_inicio'];
        $dataFim = $validados['data_fim'];
        $projetoInserido = Projeto::findOrFail($idProjeto);

        $numeroProjetos = Tarefa::where('idMembro_alocado', $idMembro) // procura tarefas associadas ao membro
                                ->where('id', '!=', $tarefa->id)
                                ->where('idProjeto_vinculado', '!=', $idProjeto) // procura projetos diferentes
                                ->where(function ($req) use ($dataInicio, $dataFim) {
                                    $req->where('data_inicio', '<=', $dataFim)->where('data_fim', '>=', $dataInicio); // verifica se o membro está em mais de um projeto ativo
                                })->distinct('idProjeto_vinculado') // ignora duplicatas
                                ->count('idProjeto_vinculado'); // conta todos os projetos que o membro está 

        if ($numeroProjetos >= 2) {
            return response()->json(['message' => 'Um membro não pode participar de mais de dois projetos ativos.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if ($dataInicio < $projetoInserido->data_inicio) {
            return response()->json(['message' => 'Uma tarefa não pode começar antes do início de um projeto.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if ($dataFim > $projetoInserido->data_fim) {
            return response()->json(['message' => 'Uma tarefa não pode terminar após o fim de um projeto.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $tarefa->update($request->validated());
        return response()->json($tarefa, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(String $id): JsonResponse
    {
        $tarefa = Tarefa::findOrFail($id);
        $tarefa->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
