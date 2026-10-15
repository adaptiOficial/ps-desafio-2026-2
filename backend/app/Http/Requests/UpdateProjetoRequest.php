<?php

namespace App\Http\Requests;

use App\Models\Projeto;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProjetoRequest extends FormRequest
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
        $projeto=Projeto::find($this->route('projeto'));

        $inicio=$this->input('data_inicio',$projeto?->date_inicio);
        return [
            'nome'=>['sometimes','string','max:255'],
            'nome_cliente'=>['sometimes','string','max:255'],
            'descricao'=>['sometimes','string'],
            'data_inicio'=>['sometimes','date'],
            'data_fim'=>['sometimes','date','after_or_equal:'.$inicio],
        ];
    }
    
    public function messages(): array
    {
        return [
            'nome.string' => 'O campo nome deve ser uma string.',
            'nome_cliente.string' => 'O campo nome do cliente deve ser uma string.',
            'descricao.string' => 'O campo descricao deve ser uma string.',
            'data_inicio.date' => 'O campo data de inicio deve ser uma data valida.',
            'data_fim.date' => 'O campo data de fim deve ser uma data valida.',
            'data_fim.after_or_equal' => 'O campo data de fim deve ser uma data posterior ou igual a data de inicio.',
        ];
    }
}
