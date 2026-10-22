<?php

namespace App\Http\Requests;

use App\Models\Tarefa;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTarefaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $tarefa = Tarefa::find($this->route('tarefa'));

        $inicio = $this->input('data_inicio', $tarefa?->data_inicio);

        return [
            'membro_id' => ['sometimes', 'uuid', 'exists:membros,id'],
            'titulo' => ['sometimes', 'string', 'max:255'],
            'descricao' => ['sometimes', 'nullable', 'string'],
            'status' => ['sometimes', Rule::in(['pendente', 'em_andamento', 'concluida'])],
            'data_inicio' => ['sometimes', 'nullable', 'date'],
            'data_fim' => ['sometimes', 'nullable', 'date', 'after_or_equal:' . $inicio],
        ];
    }

    public function messages(): array
    {
        return [
            'membro_id.exists' => 'Membro não encontrado.',
            'titulo.max' => 'O título deve ter no máximo 255 caracteres.',
            'status.in' => 'O status deve ser pendente, em_andamento ou concluida.',
            'data_inicio.date' => 'A data de início deve ser uma data válida.',
            'data_fim.date' => 'A data de término deve ser uma data válida.',
            'data_fim.after_or_equal' => 'A data de término não pode ser anterior à data de início.',
        ];
    }
}