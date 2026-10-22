<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTarefaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'projeto_id' => ['required', 'uuid', 'exists:projetos,id'],
            'membro_id' => ['required', 'uuid', 'exists:membros,id'],
            'titulo' => ['required', 'string', 'max:255'],
            'descricao' => ['nullable', 'string'],
            'status' => ['nullable', Rule::in(['pendente', 'em_andamento', 'concluida'])],
            'data_inicio' => ['nullable', 'date'],
            'data_fim' => ['nullable', 'date', 'after_or_equal:data_inicio'],
        ];
    }

    public function messages(): array
    {
        return [
            'projeto_id.required' => 'O projeto da tarefa é obrigatório.',
            'projeto_id.exists' => 'Projeto não encontrado.',
            'membro_id.required' => 'A tarefa precisa ser atribuída a um membro.',
            'membro_id.exists' => 'Membro não encontrado.',
            'titulo.required' => 'O título da tarefa é obrigatório.',
            'titulo.max' => 'O título deve ter no máximo 255 caracteres.',
            'status.in' => 'O status deve ser pendente, em_andamento ou concluida.',
            'data_inicio.date' => 'A data de início deve ser uma data válida.',
            'data_fim.date' => 'A data de término deve ser uma data válida.',
            'data_fim.after_or_equal' => 'A data de término não pode ser anterior à data de início.',
        ];
    }
}
