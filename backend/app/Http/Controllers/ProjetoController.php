<?php

namespace App\Http\Controllers;

use App\Models\Projeto;
use App\Models\Membro;
use App\Http\Requests\StoreProjetoRequest;
use App\Http\Requests\UpdateProjetoRequest;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;
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
        $projetos = [
            'ativo' => Projeto::with('tarefas.membro')->where('status', 'ativo')->get(),
            'concluidos'   => Projeto::with('tarefas.membro')->where('status', 'concluido')->get(),
            'excluidos'    => Projeto::onlyTrashed()->with('tarefas.membro')->get(),
        ];
        
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
        $projeto->update($request->validated());
        return response()->json($projeto, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, String $id): JsonResponse
    {
        // Exige a justificativa antes de excluir
        $request->validate(['justificativa_exclusao' => 'required|string|min:5']);
        
        $projeto = Projeto::findOrFail($id);
        $projeto->justificativa_exclusao = $request->justificativa_exclusao;
        $projeto->save();
        $projeto->delete();
        
        return response()->json(['message' => 'Projeto excluído com sucesso.'], Response::HTTP_OK);
    }

    /**
     * Altera o status entre 'ativo' e 'concluido'
     */
    public function updateStatus(Request $request, String $id): JsonResponse
    {
        $projeto = Projeto::findOrFail($id);
        $novoStatus = $request->status;

        if ($projeto->status === 'concluido' && $novoStatus === 'ativo') {
            $membrosIds = $projeto->tarefas()->pluck('membro_id')->unique();
            foreach ($membrosIds as $membroId) {
                if ($this->membroExcedeLimite($membroId, $projeto->id)) {
                    return response()->json([
                        'message' => 'Erro: Ao reabrir este projeto, um dos membros ultrapassará o limite de 2 projetos ativos.'
                    ], Response::HTTP_UNPROCESSABLE_ENTITY);
                }
            }
        }

        $projeto->update(['status' => $novoStatus]);
        return response()->json($projeto, Response::HTTP_OK);
    }

    /**
     * Reverte a exclusão lógica
     */
    public function restore(String $id): JsonResponse
    {
        $projeto = Projeto::onlyTrashed()->findOrFail($id);

        if ($projeto->status === 'ativo') {
            $membrosIds = $projeto->tarefas()->pluck('membro_id')->unique();
            foreach ($membrosIds as $membroId) {
                if ($this->membroExcedeLimite($membroId, $projeto->id)) {
                    return response()->json([
                        'message' => 'Restauração bloqueada: um dos membros excederá o limite de 2 projetos ativos.'
                    ], Response::HTTP_UNPROCESSABLE_ENTITY);
                }
            }
        }

        $projeto->justificativa_exclusao = null;
        $projeto->restore();
        return response()->json(['message' => 'Projeto restaurado com sucesso.'], Response::HTTP_OK);
    }

    /**
     * Helper para verificar a trava de sobrecarga
     */
    private function membroExcedeLimite(string $membroId, ?string $ignorarProjetoId = null): bool
    {
        $count = Projeto::ativos()
            ->when($ignorarProjetoId, fn($q) => $q->where('id', '!=', $ignorarProjetoId))
            ->whereHas('tarefas', fn($q) => $q->where('membro_id', $membroId))
            ->count();
        return $count >= 2;
    }
}