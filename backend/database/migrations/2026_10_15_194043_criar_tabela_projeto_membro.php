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
        Schema::create('projeto_membro', function (Blueprint $table) {
            $table->foreignUuid('projeto_id')->constrained('projetos')->cascadeOnDelete();
            $table->foreignUuid('membro_id')->constrained('membros')->cascadeOnDelete();
            $table->primary(['projeto_id', 'membro_id']);
            $table->timestamps();
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
