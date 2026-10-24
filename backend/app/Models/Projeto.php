<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

class Projeto extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'nome',
        'nome_cliente',
        'descricao',
        'data_inicio',
        'data_fim',
        'status',
        'justificativa_exclusao'
    ];

    public function tarefas()
    {
        return $this->hasMany(Tarefa::class);
    }

    public function scopeAtivos(Builder $query): Builder
    {
        return $query->where('status', 'ativo');
    }
}
