<?php

namespace App\Http\Controllers;

use App\Models\Projeto;
use App\Http\Requests\StoreProjetoRequest;
use App\Http\Requests\UpdateProjetoRequest;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

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
        $projetos = Projeto::with('membros')->get();
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
        $projeto = Projeto::findOrFail($id);
        return response()->json($projeto, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjetoRequest $request, String $id): JsonResponse
{
    $projeto = Projeto::findOrFail($id);
    $dados = $request->validated();

    if (($dados['status'] ?? null) === 'ativo'&& $projeto->status !== 'ativo') {
        $membros = $projeto->membros;

        foreach ($membros as $membro) {
            $ativos = $membro->projetos()->where('projetos.status', 'ativo')->count();

            if ($ativos >= 2) {
                return response()->json(['message' => "{$membro->nome} já está alocado em 2 projetos ativos. Não é possível reativar este projeto."],
        Response::HTTP_UNPROCESSABLE_ENTITY);
            }
        }
    }

    $projeto->update($dados);

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
}
