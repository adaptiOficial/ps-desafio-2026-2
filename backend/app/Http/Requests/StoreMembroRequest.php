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
            'email' => ['required', 'string', 'email','max:255', 'unique:membros,email'],
            'senha' => [
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

    public function messages(): array
    {
        return [
            'nome.required' => 'ERRO: O campo nome é obrigatório.',
            'email.required' => 'ERRO: O campo email é obrigatório.',
            'email.email' => 'ERRO: O campo email deve ser um endereço de email válido.',
            'email.unique' => 'ERRO: O email informado já está em uso.',
            'senha.min' => 'ERRO: A senha deve ter no mínimo 8 caracteres.',
            'senha.letters' => 'ERRO: A senha deve conter pelo menos uma letra.',
            'senha.mixedCase' => 'ERRO: A senha deve conter pelo menos uma letra maiúscula e uma letra minúscula.',
            'senha.numbers' => 'ERRO: A senha deve conter pelo menos um número.',
            'senha.symbols' => 'ERRO: A senha deve conter pelo menos um símbolo.',
            'cor_favorita.string' => 'ERRO: O campo cor favorita deve ser uma string.',
            'cor_favorita.max' => 'ERRO: O campo cor favorita não pode ter mais de 255 caracteres.',
            'data_aniversario.date' => 'ERRO: O campo data de aniversário deve ser uma data válida.',
            'image.image' => 'ERRO: O arquivo enviado não é uma imagem válida.',
            'image.mimes' => 'ERRO: A imagem deve estar no formato JPEG, PNG, JPG ou WEBP.',
        ];
    }
}
