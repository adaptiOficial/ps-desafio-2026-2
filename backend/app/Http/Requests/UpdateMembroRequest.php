<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
// Adicionado o uso da classe Rule para validação de unicidade do email.
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateMembroRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Alterado para true para permitir a atualização do membro.
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
            'nome' => ['sometimes'],
            //Adicionado a regra de validação para o email, garantindo que seja único, mas ignorando o membro atual.
            'email' => ['sometimes', 'email', 'max:255',Rule::unique('membros')->ignore($this->route('membro'))],
            'senha' => ['sometimes','nullable', 'string', 'max:255',
                    Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ],
            'cor_favorita' => ['sometimes','nullable', 'string', 'max:255'],
            'data_aniversario' => ['sometimes','nullable', 'date'],
            //'image' => ['sometimes', 'image', 'mimes:jpeg,png,jpg,webp'],
        ];
    }
}
