<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Projeto extends Model
{
   use HasFactory,  HasUuids;

    public const STATUS_ATIVO = 'Ativo';
    public const STATUS_CONCLUIDO = 'Concluido';

    public const STATUS = [
        self::STATUS_ATIVO,
        self::STATUS_CONCLUIDO,
    ];

    protected $fillable = [
        'nome',
        'nome_cliente',
        'descricao',
        'data_inicio',
        'data_fim',
        'status',
    ];

    protected $attributes = [
        'status' => self::STATUS_ATIVO,
    ];

    public function membros(): BelongsToMany
    {
        return $this->belongsToMany(Membro::class, 'projeto_membro');
    }

    public function tarefas(): HasMany
    {
        return $this->hasMany(Tarefa::class);
    }

    public function scopeAtivos(Builder $query): Builder
    {
        return $query->where('projetos.status', self::STATUS_ATIVO);
    }
}
