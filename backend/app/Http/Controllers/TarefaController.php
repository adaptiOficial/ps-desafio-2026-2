<?php

namespace App\Http\Controllers;

use App\Models\Tarefa;
use App\Http\Requests\StoreTarefaRequest;
use App\Http\Requests\UpdateTarefaRequest;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;

class TarefaController extends Controller
{
   
    public function index(): JsonResponse
    {
        $tarefas = Tarefa::with(['projeto:id,nome', 'membro:id,nome,email'])->get();
        return response()->json($tarefas, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTarefaRequest $request) : JsonResponse
    {
        
        $tarefa= Tarefa::create($request->validated());
        return response()->json($tarefa, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(String $id): JsonResponse
    {
        $tarefa = Tarefa::with(['projeto:id,nome', 'membro:id,nome,email'])->findOrFail($id);
        return response()->json($tarefa, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTarefaRequest $request, String $id): JsonResponse
    {
        $tarefa = Tarefa::findOrFail($id);
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