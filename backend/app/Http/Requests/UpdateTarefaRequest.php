<?php

namespace App\Http\Requests;

use App\Models\Tarefa;

class UpdateTarefaRequest extends StoreTarefaRequest
{
    /**
     * Ao mover a única tarefa de um membro para outro projeto, o vínculo antigo
     * será liberado — então ele não deve contar para o limite da RN02.
     */
    protected function projetoLiberadoPelaOperacao(): ?string
    {
        /** @var Tarefa $tarefa */
        $tarefa = $this->route('tarefa');

        $mesmoMembro = $tarefa->membro_id === $this->input('membro_id');
        $mudouProjeto = $tarefa->projeto_id !== $this->input('projeto_id');

        if (! $mesmoMembro || ! $mudouProjeto) {
            return null;
        }

        $possuiOutrasTarefasNoProjeto = Tarefa::query()
            ->where('membro_id', $tarefa->membro_id)
            ->where('projeto_id', $tarefa->projeto_id)
            ->whereKeyNot($tarefa->getKey())
            ->exists();

        return $possuiOutrasTarefasNoProjeto ? null : $tarefa->projeto_id;
    }
}
