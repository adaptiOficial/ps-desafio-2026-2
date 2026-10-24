<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjetoRequest extends FormRequest
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
            'nome' => 'required',
            'nome_cliente' => 'required',
            'descricao' => 'required',
            'data_inicio' => 'required|date',
            'data_fim' => 'required|date|after_or_equal:data_inicio', // a cláusula after_or_equal garante que data_fim >= data_inicio
        ];
    }

    public function messages(): array { // Mensagens de erro
        return [
            'nome.required' => 'O nome é obrigatório',
            'nome_cliente.required' => 'O nome do cliente é obrigatório',
            'descricao.required' => 'A descrição é obrigatória',
            'data_inicio.required' => 'A data de início é obrigatória',
            'data_inicio.date' => 'A data de início precisa ser uma data válida',
            'data_fim.required' => 'A data de fim é obrigatória',
            'data_fim.date' => 'A data de fim precisa ser uma data válida',
            'data_fim.after_or_equal' => 'A data de fim precisa ser mais recente que a data de início.'
        ];
    }
}
