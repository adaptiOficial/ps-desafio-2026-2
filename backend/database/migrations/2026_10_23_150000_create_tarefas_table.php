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
            $table->string('nome');
            $table->text('descricao');
            //id  referente ao projeto, chave estrangeira
            $table->foreignUuid('projeto_id')->constrained()->onDelete('cascade');
            //id referente ao membro designado, chave estrangeira
            $table->foreignUuid('membro_id')->nullable()->constrained()->onDelete('set null');
            $table->date('data_inicio')->nullable();
            $table->date('data_fim')->nullable();
            $table->enum('status', ['pendente', 'em_progresso', 'concluida'])->default('pendente');
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