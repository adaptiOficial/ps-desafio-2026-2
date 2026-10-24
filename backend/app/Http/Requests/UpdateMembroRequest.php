<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
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
            'nome' => ['sometimes'],
            'email' => ['sometimes', 'email','string', 'max:255'],
            'senha' => ['nullable','sometimes', 'string', 'max:255',
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
}
