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
        // Alterado para true para permitir a criação do membro.
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
            //Adicionado a regra de validação para o email, garantindo que seja único.
            'email' => ['required', 'email', 'max:255', 'unique:membros,email'],
            //Adicionado required para a senha, garantindo que seja fornecida durante a criação do membro.
            'senha' => [
                'required',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
            ],
            //Existe a nescessidade da cor favorita ? 
            'cor_favorita' => ['nullable', 'string', 'max:255'],
            'data_aniversario' => ['nullable', 'date'],
            //'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp'],
        ];
    }
}
