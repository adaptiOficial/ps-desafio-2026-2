<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Membro extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'nome',
        'email',
        'senha',
        'cor_favorita',
        'data_aniversario',
        'image',
        'status',
        'justificativa_desligamento',
        'justificativa_exclusao'
    ];

    /**
     * Relacionamento: Um Membro tem muitas Tarefas
     */
    public function tarefas()
    {
        return $this->hasMany(\App\Models\Tarefa::class, 'membro_id', 'id');
    }

    protected $attributes = [
        'status' => 'ativo',
    ];

    protected $hidden = [
        'senha',
    ];
}

