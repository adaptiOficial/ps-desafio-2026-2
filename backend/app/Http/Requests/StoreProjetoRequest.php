<?php

namespace App\Http\Requests;

use App\Models\Projeto;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'data_fim' => 'required|date|after_or_equal:data_inicio',
            'status' => ['sometimes', 'required', Rule::in(Projeto::STATUS)],
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'ERRO: O campo nome é obrigatório.',
            'nome_cliente.required' => 'ERRO: O campo nome do cliente é obrigatório.',
            'descricao.required' => 'ERRO: O campo descrição é obrigatório.',
            'data_inicio.required' => 'ERRO: O campo data de início é obrigatório.',
            'data_inicio.date' => 'ERRO: O campo data de início deve ser uma data válida.',
            'data_fim.required' => 'ERRO: O campo data de fim é obrigatório.',
            'data_fim.date' => 'ERRO: O campo data de fim deve ser uma data válida.',
            'data_fim.after_or_equal' => 'ERRO: A data de fim deve ser igual ou posterior à data de início.',
            'status.in' => 'ERRO: Status inválido. Use: Ativo ou Concluido.',
        ];
    }
}
