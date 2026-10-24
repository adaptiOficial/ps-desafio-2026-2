<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;

class UpdateMembroRequest extends FormRequest
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
            'nome' => ['sometimes'],
            'email' => ['sometimes', 'string', 'max:255', Rule::unique('membros', 'email')->ignore($this->input('id'))],
            'senha' => ['sometimes', 'string', 'max:255',
                    Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ],
            'cor_favorita' => ['sometimes', 'string', 'max:255'],
            'data_aniversario' => ['sometimes', 'date'],
            'image' => ['sometimes', 'image', 'mimes:jpeg,png,jpg,webp'],
        ];
    }

    public function messages(): array {
        return [
            'email.unique' => 'O e-mail já pertence a um membro cadastrado',
            'senha.min' => 'A senha deve conter no mínimo 8 caracteres',
            'senha.mixed' => 'A senha deve conter uma letra minúscula e uma letra maiúscula',
            'senha.numbers' => 'A senha deve conter no mínimo um número',
            'senha.symbols' => 'A senha deve conter no mínimo um símbolo (Ex.: !, @, _)',
            'data_aniversario.date' => 'A data é inválida'
        ];
    }
}
