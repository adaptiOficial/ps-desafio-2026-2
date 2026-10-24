<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Membro extends Model
{
    use HasFactory, HasUuids;
    // Definindo o relacionamento entre membros e projetos.
    public function projetos()
    {
        return $this->belongsToMany(Projeto::class, 'membro_projeto');
    }
    protected $fillable = [
        'nome',
        'email',
        'senha',
        'cor_favorita',
        'data_aniversario',
        'image',
    ];

    protected $hidden = [
        'senha',
    ];
    public function getAuthPassword()
    {
        return $this->senha;
    }
}

