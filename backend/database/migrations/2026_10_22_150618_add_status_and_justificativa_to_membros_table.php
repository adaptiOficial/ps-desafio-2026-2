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
        Schema::table('membros', function (Blueprint $table) {
            $table->string('status')->default('ativo');
            $table->text('justificativa_desligamento')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('membros', function (Blueprint $table) {
            $table->dropColumn('status');
            $table->dropColumn('justificativa_desligamento');
        });
    }
};
