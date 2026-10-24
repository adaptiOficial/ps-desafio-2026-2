<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTarefaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nome' => ['sometimes','required', 'string', 'max:255'],
            'descricao' => ['sometimes','required', 'string'],
            'projeto_id' => ['sometimes','required', 'exists:projetos,id'],
            'membro_id' => ['sometimes','required', 'exists:membros,id'],
            'status' => ['sometimes','in:pendente,em_progresso,concluida'],
            'data_inicio' => ['sometimes','nullable', 'date'],
            'data_fim' => ['sometimes','nullable', 'date', 'after_or_equal:data_inicio'],
        ];
    }
}
