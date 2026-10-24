<?php

namespace App\Http\Controllers;

use App\Models\Membro;
use App\Models\Projeto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ProjetoMembroController extends Controller
{
    public function store(Request $request, string $projetoId): JsonResponse
    {
        $dados = $request->validate([
            'membro_id' => ['required', 'uuid', 'exists:membros,id'],
        ], [
            'membro_id.required' => 'Informe o membro que será alocado.',
            'membro_id.uuid' => 'O identificador do membro é inválido.',
            'membro_id.exists' => 'Membro não encontrado.',
        ]);

        $projeto = Projeto::findOrFail($projetoId);
        $membro = Membro::findOrFail($dados['membro_id']);

        if ($projeto->membros()->where('membros.id', $membro->id)->exists()) {
            return response()->json(
                ['message' => "{$membro->nome} já está alocado neste projeto."],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        if ($projeto->status === 'ativo') {
            $ativos = $membro->projetos()->where('projetos.status', 'ativo')->count();

            if ($ativos >= 2) {
                return response()->json(
                    ['message' => "{$membro->nome} já está alocado em 2 projetos ativos."],
                    Response::HTTP_UNPROCESSABLE_ENTITY
                );
            }
        }

        $projeto->membros()->attach($membro->id);

        return response()->json(
            ['message' => "{$membro->nome} alocado ao projeto com sucesso."],
            Response::HTTP_CREATED
        );
    }

    public function destroy(string $projetoId, string $membroId): JsonResponse
{
    $projeto = Projeto::findOrFail($projetoId);
    $membro = Membro::findOrFail($membroId);

    if (! $projeto->membros()->where('membros.id', $membro->id)->exists()) {
        return response()->json(
            ['message' => "{$membro->nome} não está alocado neste projeto."],
            Response::HTTP_NOT_FOUND
        );
    }

    $projeto->membros()->detach($membro->id);

    return response()->json(
        ['message' => "{$membro->nome} removido do projeto com sucesso."],
        Response::HTTP_OK
    );
}
}