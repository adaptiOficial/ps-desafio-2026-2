<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreMembroRequest extends FormRequest
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
            'nome' => ['required'],
            'email' => ['required', 'string', 'max:255', 'unique:membros,email'],
            'senha' => ['required',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
            ],
            'cor_favorita' => ['nullable', 'string', 'max:255'],
            'data_aniversario' => ['nullable', 'date'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp'],
        ];
    }

    public function messages(): array {
        return [
            'nome.required' => 'O nome é obrigatório',
            'email.required' => 'O e-mail é obrigatório',
            'email.unique' => 'O e-mail já pertence a um membro cadastrado',
            'senha.required' => 'A senha é obrigatória',
            'senha.min' => 'A senha deve conter no mínimo 8 caracteres',
            'senha.mixed' => 'A senha deve conter uma letra minúscula e uma letra maiúscula',
            'senha.numbers' => 'A senha deve conter no mínimo um número',
            'senha.symbols' => 'A senha deve conter no mínimo um símbolo (Ex.: !, @, _)',
            'data_aniversario.date' => 'A data é inválida'

        ];
    }
}
