<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Membro>
 */
class MembroFactory extends Factory
{
    protected static ?string $password;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'senha' => static::$password ??= Hash::make('password'),
            'cor_favorita' => fake()->colorName(),
            'data_aniversario' => fake()->date(),
            'image' => 'https://picsum.photos/seed/'.fake()->unique()->uuid().'/400/400',
        ];
    }
}
