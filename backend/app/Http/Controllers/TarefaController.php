<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTarefaRequest;
use App\Http\Requests\UpdateTarefaRequest;
use App\Models\Projeto;
use App\Models\Tarefa;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TarefaController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Tarefa::with(['projeto:id,nome', 'membro:id,nome']);

        if ($request->filled('projeto_id')) {
            $query->where('projeto_id', $request->input('projeto_id'));
        }

        return response()->json($query->get(), Response::HTTP_OK);
    }

    public function store(StoreTarefaRequest $request): JsonResponse
    {
        $dados = $request->validated();

        $erro = $this->verificarAlocacao($dados['projeto_id'], $dados['membro_id']);
        if ($erro) {
            return $erro;
        }

        $tarefa = Tarefa::create($dados);

        return response()->json($tarefa->load(['projeto:id,nome', 'membro:id,nome']), Response::HTTP_CREATED);
    }

    public function show(string $id): JsonResponse
    {
        $tarefa = Tarefa::with(['projeto:id,nome', 'membro:id,nome'])->findOrFail($id);

        return response()->json($tarefa, Response::HTTP_OK);
    }

    public function update(UpdateTarefaRequest $request, string $id): JsonResponse
    {
        $tarefa = Tarefa::findOrFail($id);
        $dados = $request->validated();

        if (isset($dados['membro_id'])) {
            $erro = $this->verificarAlocacao($tarefa->projeto_id, $dados['membro_id']);
            if ($erro) {
                return $erro;
            }
        }

        $tarefa->update($dados);

        return response()->json($tarefa->load(['projeto:id,nome', 'membro:id,nome']), Response::HTTP_OK);
    }

    public function destroy(string $id): JsonResponse
    {
        Tarefa::findOrFail($id)->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    private function verificarAlocacao(string $projetoId, string $membroId): ?JsonResponse
    {
        $alocado = Projeto::findOrFail($projetoId)
            ->membros()
            ->where('membros.id', $membroId)
            ->exists();

        if (! $alocado) {
            return response()->json(
                ['message' => 'O membro escolhido não está alocado neste projeto.'],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        return null;
    }
}