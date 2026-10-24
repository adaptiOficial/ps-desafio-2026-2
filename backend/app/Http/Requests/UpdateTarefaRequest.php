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
            'idMembro_alocado' => 'sometimes',
            'idProjeto_vinculado' => 'sometimes',
            'titulo' => 'sometimes',
            'descricao' => 'sometimes',
            'data_inicio' => 'sometimes|date',
            'data_fim' => 'sometimes|date|after_or_equal:data_inicio'
        ];
    }

    public function messages(): array { // Mensagens de erro
        return [
            'data_inicio.date' => 'A data de início precisa ser uma data válida',
            'data_fim.date' => 'A data de fim precisa ser uma data válida',
            'data_fim.after_or_equal' => 'A data de fim precisa ser mais recente que a data de início.'
        ];
    }
}
