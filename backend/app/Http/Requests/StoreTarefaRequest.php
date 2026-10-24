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
                    
                    // Limite de tarefas ativas por membro (ignora concluidas e excluidas)
                    $limiteTarefas = 5;
                    $totalTarefasAtivas = DB::table('tarefas')
                        ->where('membro_id', $value)
                        ->whereNotIn('status', ['concluida', 'excluida'])
                        ->count();

                    if ($totalTarefasAtivas >= $limiteTarefas) {
                        $fail("Sobrecarga: Este membro já atingiu o limite máximo de {$limiteTarefas} tarefas ativas.");
                        return;
                    }

                    
                    $projetoIdRequisicao = $this->projeto_id;

                    if (!$projetoIdRequisicao) {
                        return;
                    }
                    
                    $statusProjetoDestino = DB::table('projetos')
                        ->where('id', $projetoIdRequisicao)
                        ->value('status');
                    
                    if ($statusProjetoDestino !== 'ativo') {
                        return;
                    }


                    $projetosAtivosIds = DB::table('tarefas')
                        ->join('projetos', 'tarefas.projeto_id', '=', 'projetos.id')
                        ->where('tarefas.membro_id', $value)
                        ->where('tarefas.status', '!=', 'excluida') // Ignora tarefas na lixeira
                        ->where('projetos.status', 'ativo')
                        ->pluck('tarefas.projeto_id')
                        ->unique()
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