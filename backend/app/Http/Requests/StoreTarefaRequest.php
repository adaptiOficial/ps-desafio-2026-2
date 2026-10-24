<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTarefaRequest extends FormRequest
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
            'nome' => ['required', 'string', 'max:255'],
            'descricao' => ['required', 'string'],
            'projeto_id' => ['required', 'exists:projetos,id'],
            // Adicionando uma validação customizada para verificar se o membro está vinculado ao projeto especificado.
            'membro_id' => ['required', 'exists:membros,id',
                function ($attribute, $value, $fail) {
                    $vinculado= \DB::table('membro_projeto')
                        ->where('projeto_id', $this->projeto_id)
                        ->where('membro_id', $value)
                        ->exists();
                    if (!$vinculado) {
                        $fail('O membro selecionado não está vinculado ao projeto especificado.');
                    }
                }
            ],
            'status' => ['required','in:pendente,em_progresso,concluida'],
            'data_inicio' => ['nullable', 'date'],
            'data_fim' => ['nullable', 'date', 'after_or_equal:data_inicio'],
        ];
    }
}
