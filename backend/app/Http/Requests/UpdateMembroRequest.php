<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

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
            'nome' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes',
                        'string',
                        'email', 
                        'max:255',
                        Rule::unique('membros', 'email')->ignore($this->route('membro')),],

            
            'senha' => ['sometimes', 'string', 'max:255',
                    Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ],
            'cor_favorita' => ['sometimes', 'string', 'max:255'],
            'data_aniversario' => ['sometimes', 'date','before:today'],
            'image' => ['sometimes', 'image', 'mimes:jpeg,png,jpg,webp'],
        ];
    }
    public function messages(): array
    {
        return [
            'nome.string' => 'O campo nome deve ser uma string.',
            'email.email' => 'O campo email deve ser um email valido.',
            'email.unique' => 'O email informado ja esta em uso.',
            'senha.min' => 'O campo senha deve ter no minimo 8 caracteres.',
            'cor_favorita.string' => 'O campo cor favorita deve ser uma string.',
            'data_aniversario.date' => 'O campo data de aniversario deve ser uma data valida.',
            'data_aniversario.before' => 'O campo data de aniversario deve ser uma data anterior a hoje.',
            'image.image' => 'O campo imagem deve ser um arquivo de imagem valido.',
            'image.mimes' => 'O campo imagem deve ser um arquivo de imagem do tipo: jpeg, png, jpg, webp.',
        ];
    }
}
