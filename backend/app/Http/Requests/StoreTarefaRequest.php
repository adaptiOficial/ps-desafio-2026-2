<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;

class StoreTarefaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Alterado para true para permitir a requisição
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'titulo' => ['required', 'string', 'max:255'],
            'descricao' => ['nullable', 'string'],
            'projeto_id' => ['required', 'uuid', 'exists:projetos,id'],
            'membro_id' => [
                'required',
                'uuid',
                'exists:membros,id',                
                function ($attribute, $value, $fail) {
                    $projetoIdRequisicao = $this->projeto_id;

                    if (!$projetoIdRequisicao) {
                        return;
                    }
                    
                    $projetosAtivosIds = DB::table('tarefas')
                        ->join('projetos', 'tarefas.projeto_id', '=', 'projetos.id')
                        ->where('tarefas.membro_id', $value)
                        ->where('projetos.data_fim', '>=', now()->toDateString()) // O projeto ainda não terminou
                        ->pluck('tarefas.projeto_id')
                        ->unique() // Remove projetos duplicados para sabermos em quantos projetos distintos ele está
                        ->toArray();
                    
                    if (count($projetosAtivosIds) >= 2 && !in_array($projetoIdRequisicao, $projetosAtivosIds)) {
                        $fail('Este membro já está alocado no limite máximo de 2 projetos ativos em simultâneo.');
                    }
                },
            ],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'titulo.required' => 'O título da tarefa é obrigatório.',
            'projeto_id.required' => 'É obrigatório vincular a tarefa a um projeto.',
            'projeto_id.exists' => 'O projeto selecionado não foi encontrado.',
            'membro_id.required' => 'É obrigatório atribuir a tarefa a um membro específico.',
            'membro_id.exists' => 'O membro selecionado não foi encontrado.',
        ];
    }
}