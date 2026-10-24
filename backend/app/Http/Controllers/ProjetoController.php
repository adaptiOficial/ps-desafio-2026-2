<?php

namespace App\Http\Controllers;

use App\Models\Projeto;
use App\Http\Requests\StoreProjetoRequest;
use App\Http\Requests\UpdateProjetoRequest;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;
use App\Models\Membro;
use Illuminate\Http\Request;
class ProjetoController extends Controller
{
    protected Projeto $projeto;

    public function __construct(Projeto $projeto)
    {
        $this->projeto = $projeto;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $projetos = Projeto::with('membros:id,nome,email')->get();
        return response()->json($projetos, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjetoRequest $request) : JsonResponse
    {
        $projeto = Projeto::create($request->validated());
        return response()->json($projeto, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(String $id): JsonResponse
    {
        $projeto = Projeto::with('membros:id,nome,email')->findOrFail($id);
        return response()->json($projeto, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjetoRequest $request, String $id): JsonResponse
    {
        $projeto = Projeto::findOrFail($id);
        $projeto->update($request->validated());
        return response()->json($projeto, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(String $id): JsonResponse
    {
        $projeto = Projeto::findOrFail($id);
        $projeto->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
    //criando vinculo com membro_projeto 
    public function vincularMembro(Request $request, string $id): JsonResponse
{
    $request->validate(['membro_id' => 'required|exists:membros,id']);

    $projeto = Projeto::findOrFail($id);
    $membro  = Membro::findOrFail($request->membro_id);

    if ($membro->projetos()->where('projetos.id', $projeto->id)->exists()) {
        return response()->json(['message' => 'Membro já vinculado a este projeto.'], 422);
    }

    // A trava só vale se o projeto que recebe o membro também é ativo
    $projetoEhAtivo = Projeto::ativos()->whereKey($projeto->id)->exists();

    if ($projetoEhAtivo && $membro->projetos()->ativos()->count() >= 2) {
        return response()->json(
            ['message' => 'O membro já está alocado em 2 projetos ativos.'],
            422,
        );
    }

    $membro->projetos()->attach($projeto->id);

    return response()->json(['message' => 'Membro vinculado ao projeto com sucesso.'], 201);
}
}
