<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Projeto>
 */
class ProjetoFactory extends Factory
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
        
            //Erro identificado foi a falta de usar um clone para criar uma cópia do objeto DateTime, evitando que a modificação afete a variável original.
            (clone $dataInicio)->modify('+1 day'),
            '2027-12-31'
        );

        return [
            'nome' => fake()->sentence(3),
            'nome_cliente' => fake()->name(),
            'descricao' => fake()->paragraph(),
            'data_inicio' => $dataInicio->format('Y-m-d'),
            'data_fim' => $dataFim->format('Y-m-d'),
        ];
    }
}
