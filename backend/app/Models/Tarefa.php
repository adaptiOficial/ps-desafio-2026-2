<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarefa extends Model
{
    use HasFactory, HasUuids;
    public function projeto()//Função para definir o relacionamento entre Tarefa e Projeto
    {
        return $this->belongsTo(Projeto::class);
    }

    public function membro(){//função para definir o relacionamento entre Tarefa e Membro
        return $this->belongsTo(Membro::class);
    }

    protected $fillable = [
        'nome',
        'descricao',
        'projeto_id',
        'membro_id',
        'status',
        'data_inicio',
        'data_fim',

    ];
}