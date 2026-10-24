<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Tabela associativa N:N (RN03). Usada para calcular o limite de
     * sobrecarga de projetos ativos por membro (RN02).
     */
    public function up(): void
    {
        Schema::create('projeto_membro', function (Blueprint $table) {
            $table->foreignUuid('projeto_id')->constrained('projetos')->cascadeOnDelete();
            $table->foreignUuid('membro_id')->constrained('membros')->cascadeOnDelete();

            $table->primary(['projeto_id', 'membro_id']);
            // Acelera a consulta "projetos de um membro" (a PK cobre o sentido inverso).
            $table->index('membro_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projeto_membro');
    }
};
