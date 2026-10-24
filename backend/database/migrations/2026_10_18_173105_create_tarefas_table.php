<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tarefas', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('idMembro_alocado')->nullable()->references('id')->on('membros')->onDelete('set null');
            $table->foreignUuid('idProjeto_vinculado')->references('id')->on('projetos')->onDelete('cascade');
            $table->text('titulo');
            $table->text('descricao');
            $table->date('data_inicio');
            $table->date('data_fim');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tarefas');
    }
};
