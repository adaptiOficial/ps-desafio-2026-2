<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projeto extends Model
{
   use HasFactory,  HasUuids;
    public function membros()
    {
        return $this->belongsToMany(Membro::class, 'membro_projeto');
    }
    public function tarefas()
    {
        return $this->hasMany(Tarefa::class);
    }

    public function scopeAtivos($query)
    {
        return $query->where(function ($q) {
            $q->whereNull('projetos.data_fim')
              ->orWhereDate('projetos.data_fim', '>=', now()->toDateString());
        });
    }
    protected $fillable = [
        'nome',
        'nome_cliente',
        'descricao',
        'data_inicio',
        'data_fim',
    ];
}
