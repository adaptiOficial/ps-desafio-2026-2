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
            'nome' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:membros,email'],
            'senha' => [
                'required',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
            ],
            'cor_favorita' => ['required', 'string', 'max:255'],
            'data_aniversario' => ['required', 'date', 'before:today'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp'],
        ];
    }
    public function messages(): array
    {
        return [
            'nome.required' => 'O campo nome eh obrigatorio.',
            'email.required' => 'O campo email eh obrigatorio.',
            'email.email' => 'O campo email deve ser um email valido.',
            'email.unique' => 'O email informado ja esta em uso.',
            'senha.required' => 'O campo senha eh obrigatorio.',
            'cor_favorita.required' => 'O campo cor favorita eh obrigatorio.',
            'data_aniversario.required' => 'O campo data de aniversario eh obrigatorio.',
            'data_aniversario.date' => 'O campo data de aniversario deve ser uma data valida.',
            'data_aniversario.before' => 'O campo data de aniversario deve ser uma data anterior a hoje.',
            'image.image' => 'O campo imagem deve ser um arquivo de imagem valido.',
            'image.mimes' => 'O campo imagem deve ser um arquivo de imagem do tipo: jpeg, png, jpg, webp.',
        ];
    }
}


