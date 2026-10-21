<?php

namespace App\Http\Controllers;

use App\Models\Tarefa;
use App\Http\Requests\StoreTarefaRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class TarefaController extends Controller
{
    protected Tarefa $tarefa;

    public function __construct(Tarefa $tarefa)
    {
        $this->tarefa = $tarefa;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {        
        $tarefas = $this->tarefa->with(['projeto', 'membro'])->get();
        return response()->json($tarefas, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTarefaRequest $request): JsonResponse
    {        
        $tarefa = $this->tarefa->create($request->validated());
                
        return response()->json($tarefa->load(['projeto', 'membro']), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $tarefa = $this->tarefa->with(['projeto', 'membro'])->findOrFail($id);
        return response()->json($tarefa, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $tarefa = $this->tarefa->findOrFail($id);
        
        $validated = $request->validate([
            'titulo' => 'sometimes|required|string|max:255',
            'descricao' => 'nullable|string',
            'status' => 'sometimes|required|string'
        ]);

        $tarefa->update($validated);
        return response()->json($tarefa->load(['projeto', 'membro']), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $tarefa = $this->tarefa->findOrFail($id);
        $tarefa->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}