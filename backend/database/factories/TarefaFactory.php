<?php

namespace Database\Factories;

use App\Models\Projeto;
use App\Models\Membro;
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
        $dataInicio = fake()->dateTimeBetween('2025-01-01', '2027-12-30');
        $dataFim = fake()->dateTimeBetween(
            $dataInicio->modify('+1 day'),
            '2027-12-31'
        );

        return [
            'idMembro_alocado' => Membro::inRandomOrder()->first()?->id ?? Membro::factory(),
            'idProjeto_vinculado' => Projeto::factory(),
            'titulo' => $this->faker->sentence(4),
            'descricao' => $this->faker->paragraph(),
            'data_inicio' => $dataInicio->format('Y-m-d'),
            'data_fim' => $dataFim->format('Y-m-d'),
        ];
    }
}
