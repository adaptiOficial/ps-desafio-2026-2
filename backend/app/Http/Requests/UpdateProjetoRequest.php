<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjetoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    //Alterado para true para permitir a atualização do projeto.
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
        /* 
        Criando regras de validação para o update do projeto
        */ 
        return [
            'nome' => 'sometimes|required',
            'nome_cliente' => 'sometimes|required',
            'descricao' => 'sometimes|required',
            'data_inicio' => 'sometimes|required|date',
            //Alterado a verificação de data_fim para verificar se é depois da data_inicio, caso a data_inicio seja fornecida.
            'data_fim' => 'sometimes|nullable|date|after:data_inicio',
        ];
    }
}
