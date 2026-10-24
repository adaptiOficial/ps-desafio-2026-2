<?php

namespace Database\Factories;

use App\Models\Membro;
use App\Models\Projeto;
use App\Models\Tarefa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tarefa>
 */
class TarefaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'titulo' => fake()->sentence(4),
            'descricao' => fake()->paragraph(),
            'status' => fake()->randomElement(Tarefa::STATUS),
            'projeto_id' => Projeto::factory(),
            'membro_id' => Membro::factory(),
        ];
    }
}
