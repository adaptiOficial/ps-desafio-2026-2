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
            'nome' => ['required', 'string', 'max:255'],
            'nome_cliente' => ['required', 'string', 'max:255'],
            'descricao' => ['required', 'string'],
            'data_inicio' => ['required', 'date'],
            'data_fim' => ['required', 'date', 'after_or_equal:data_inicio'],
        ];
    }
    public function messages(): array
    {
        return [
            'nome.required' => 'O campo nome eh obrigatorio.',
            'nome_cliente.required' => 'O campo nome do cliente eh obrigatorio.',
            'descricao.required' => 'O campo descricao eh obrigatorio.',
            'data_inicio.required' => 'O campo data de inicio eh obrigatorio.',
            'data_inicio.date' => 'O campo data de inicio deve ser uma data valida.',
            'data_fim.required' => 'O campo data de fim eh obrigatorio.',
            'data_fim.date' => 'O campo data de fim deve ser uma data valida.',
            'data_fim.after_or_equal' => 'O campo data de fim deve ser uma data igual ou posterior a data de inicio.',
        ];
    }
}
