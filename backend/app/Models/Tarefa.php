<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Tarefa extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'idMembro_alocado',
        'idProjeto_vinculado',
        'titulo',
        'descricao',
        'data_inicio',
        'data_fim'
    ];

    public function membro() {
        return $this->belongsTo(Membro::class, 'idMembro_alocado', 'id');
    }

    public function projeto() {
        return $this->belongsTo(Projeto::class, 'idProjeto_vinculado', 'id');
    }
}
