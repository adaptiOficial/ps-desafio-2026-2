<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tarefa extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'descricao',
        'status',
        'projeto_id',
        'membro_id',
        'justificativa_exclusao',
    ];

    public function projeto()
    {
        return $this->belongsTo(\App\Models\Projeto::class, 'projeto_id', 'id');
    }

    /**
     * Relacionamento: Uma tarefa é obrigatoriamente atribuida a um membro
     */
    public function membro(): BelongsTo
    {
        return $this->belongsTo(Membro::class);
    }
}
