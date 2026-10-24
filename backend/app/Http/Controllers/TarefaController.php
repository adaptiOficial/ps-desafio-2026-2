<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTarefaRequest;
use App\Http\Requests\UpdateTarefaRequest;
use App\Models\Membro;
use App\Models\Tarefa;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class TarefaController extends Controller
{
    private const RELACIONAMENTOS = [
        'projeto:id,nome,status',
        'membro:id,nome,email,image',
    ];

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $tarefas = Tarefa::with(self::RELACIONAMENTOS)->latest()->get();

        return response()->json($tarefas, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     * RN01/RN02 já foram garantidas pelo StoreTarefaRequest.
     */
    public function store(StoreTarefaRequest $request): JsonResponse
    {
        $tarefa = DB::transaction(function () use ($request) {
        $dados = $request->validated();

        $membro = Membro::where('id', $dados['membro_id'])->lockForUpdate()->firstOrFail();
        $membro->alocarEm($dados['projeto_id']);

        $tarefa = Tarefa::create($dados);

        return $tarefa;
    });

    // Mantém o seu retorno original carregando os relacionamentos (boa prática!)
    return response()->json($tarefa->load(self::RELACIONAMENTOS), Response::HTTP_CREATED);
}

    /**
     * Display the specified resource.
     */
    public function show(Tarefa $tarefa): JsonResponse
    {
        return response()->json($tarefa->load(self::RELACIONAMENTOS), Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTarefaRequest $request, Tarefa $tarefa): JsonResponse
    {
        DB::transaction(function () use ($request, $tarefa) {
            $projetoAnterior = $tarefa->projeto_id;
            $membroAnterior = $tarefa->membro_id;

            $tarefa->update($request->validated());

            $tarefa->membro->alocarEm($tarefa->projeto_id);

            if ($projetoAnterior !== $tarefa->projeto_id || $membroAnterior !== $tarefa->membro_id) {
                Membro::find($membroAnterior)?->liberarSeSemTarefas($projetoAnterior);
            }
        });

        return response()->json($tarefa->refresh()->load(self::RELACIONAMENTOS), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tarefa $tarefa): JsonResponse
    {
        DB::transaction(function () use ($tarefa) {
            $tarefa->delete();

            $tarefa->membro?->liberarSeSemTarefas($tarefa->projeto_id);
        });

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
