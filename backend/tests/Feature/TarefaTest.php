<?php

use App\Models\Membro;
use App\Models\Projeto;
use App\Models\Tarefa;

function payloadTarefa(Membro $membro, Projeto $projeto, array $extra = []): array
{
    return array_merge([
        'titulo' => 'Implementar tela de login',
        'descricao' => 'Descrição da tarefa',
        'projeto_id' => $projeto->id,
        'membro_id' => $membro->id,
    ], $extra);
}

test('cria tarefa e vincula o membro ao projeto (projeto_membro)', function () {
    $membro = Membro::factory()->create();
    $projeto = Projeto::factory()->create();

    $this->postJson('/tarefas', payloadTarefa($membro, $projeto))
        ->assertCreated()
        ->assertJsonPath('status', 'pendente')
        ->assertJsonPath('projeto.id', $projeto->id)
        ->assertJsonPath('membro.id', $membro->id);

    expect($membro->estaAlocadoEm($projeto->id))->toBeTrue();
});

test('RN01: projeto_id e membro_id são obrigatórios', function () {
    $this->postJson('/tarefas', ['titulo' => 'Sem vínculo'])
        ->assertStatus(422)
        ->assertJsonValidationErrors(['projeto_id', 'membro_id']);
});

test('RN02: bloqueia alocação em um 3º projeto quando o membro já está em 2 ativos', function () {
    $membro = Membro::factory()->create();
    $membro->projetos()->attach(Projeto::factory()->count(2)->create(['status' => Projeto::STATUS_ATIVO]));
    $novoProjeto = Projeto::factory()->create();

    $this->postJson('/tarefas', payloadTarefa($membro, $novoProjeto))
        ->assertStatus(422)
        ->assertJsonValidationErrors(['membro_id']);

    expect(Tarefa::count())->toBe(0)
        ->and($membro->estaAlocadoEm($novoProjeto->id))->toBeFalse();
});

test('RN02: permite nova tarefa em projeto onde o membro já está alocado', function () {
    $membro = Membro::factory()->create();
    [$projetoA, $projetoB] = Projeto::factory()->count(2)->create(['status' => Projeto::STATUS_ATIVO]);
    $membro->projetos()->attach([$projetoA->id, $projetoB->id]);

    $this->postJson('/tarefas', payloadTarefa($membro, $projetoA))->assertCreated();
});

test('RN03: projetos concluídos não contam para o limite', function () {
    $membro = Membro::factory()->create();
    $membro->projetos()->attach(Projeto::factory()->create(['status' => Projeto::STATUS_ATIVO]));
    $membro->projetos()->attach(Projeto::factory()->count(3)->create(['status' => Projeto::STATUS_CONCLUIDO]));

    $this->postJson('/tarefas', payloadTarefa($membro, Projeto::factory()->create()))->assertCreated();
});

test('RN02 na edição: mover a única tarefa do membro para outro projeto não gera falso positivo', function () {
    $membro = Membro::factory()->create();
    [$projetoA, $projetoB, $projetoC] = Projeto::factory()->count(3)->create(['status' => Projeto::STATUS_ATIVO]);

    $this->postJson('/tarefas', payloadTarefa($membro, $projetoA))->assertCreated();
    $tarefa = Tarefa::first();
    $this->postJson('/tarefas', payloadTarefa($membro, $projetoB))->assertCreated();

    $this->putJson("/tarefas/{$tarefa->id}", payloadTarefa($membro, $projetoC))
        ->assertOk()
        ->assertJsonPath('projeto.id', $projetoC->id);

    expect($membro->estaAlocadoEm($projetoA->id))->toBeFalse()
        ->and($membro->quantidadeProjetosAtivos())->toBe(2);
});

test('excluir a última tarefa do membro no projeto libera o vínculo', function () {
    $membro = Membro::factory()->create();
    $projeto = Projeto::factory()->create();

    $this->postJson('/tarefas', payloadTarefa($membro, $projeto))->assertCreated();

    $this->deleteJson('/tarefas/'.Tarefa::first()->id)->assertNoContent();

    expect($membro->estaAlocadoEm($projeto->id))->toBeFalse();
});
