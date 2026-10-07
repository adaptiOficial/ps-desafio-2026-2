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
}
