<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projeto extends Model
{
   use HasFactory,  HasUuids;

    protected $fillable = [
        'nome',
        'nome_cliente',
        'descricao',
        'data_inicio',
        'data_fim',
    ];

    public function tarefas() {
        return $this->hasMany(Tarefa::class, 'idProjeto_vinculado');
    }

    protected static function booted() {
        static::deleting(function(Projeto $projeto) {
            $projeto->tarefas()->get()->each->delete();
        });
    }
}
