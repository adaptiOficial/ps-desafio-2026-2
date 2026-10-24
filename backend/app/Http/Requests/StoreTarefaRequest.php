<?php

namespace App\Http\Requests;

use App\Models\Membro;
use App\Models\Tarefa;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

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
            'titulo' => ['required', 'string', 'max:255'],
            'descricao' => ['nullable', 'string'],
            'status' => ['sometimes', 'required', Rule::in(Tarefa::STATUS)],
            // RN01: atribuição incondicional.
            'projeto_id' => ['required', 'uuid', 'exists:projetos,id'],
            'membro_id' => ['required', 'uuid', 'exists:membros,id'],
        ];
    }

    /**
     * RN02 - Trava de sobrecarga (hard limit), executada somente após as regras
     * básicas passarem. Falhas geram HTTP 422 no campo membro_id.
     *
     * @return array<int, callable>
     */
    public function after(): array
    {
        return [
            function (Validator $validator) {
                if ($validator->errors()->hasAny(['projeto_id', 'membro_id'])) {
                    return;
                }

                $membro = Membro::find($this->input('membro_id'));

                if (! $membro->podeSerAlocadoEm($this->input('projeto_id'), $this->projetoLiberadoPelaOperacao())) {
                    $validator->errors()->add(
                        'membro_id',
                        sprintf(
                            'ERRO: %s já está alocado(a) em %d projetos ativos e não pode ser vinculado(a) a um novo projeto.',
                            $membro->nome,
                            Membro::LIMITE_PROJETOS_ATIVOS,
                        ),
                    );
                }
            },
        ];
    }

    /**
     * Projeto cujo vínculo será desfeito pela própria operação (relevante na edição).
     * Na criação nenhum vínculo é liberado.
     */
    protected function projetoLiberadoPelaOperacao(): ?string
    {
        return null;
    }

    public function messages(): array
    {
        return [
            'titulo.required' => 'ERRO: O campo título é obrigatório.',
            'titulo.max' => 'ERRO: O título não pode ter mais de 255 caracteres.',
            'status.in' => 'ERRO: Status inválido. Use: pendente, em_andamento ou concluida.',
            'projeto_id.required' => 'ERRO: Toda tarefa deve estar vinculada a um projeto.',
            'projeto_id.uuid' => 'ERRO: Projeto inválido.',
            'projeto_id.exists' => 'ERRO: O projeto selecionado não existe.',
            'membro_id.required' => 'ERRO: Toda tarefa deve ser atribuída a um membro.',
            'membro_id.uuid' => 'ERRO: Membro inválido.',
            'membro_id.exists' => 'ERRO: O membro selecionado não existe.',
        ];
    }
}
