<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Necessário para a RN02: apenas projetos com status "Ativo" contam
     * para o limite de sobrecarga de um membro.
     */
    public function up(): void
    {
        Schema::table('projetos', function (Blueprint $table) {
            $table->string('status')->default('Ativo')->index()->after('data_fim');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projetos', function (Blueprint $table) {
            $table->dropIndex(['status']);
            $table->dropColumn('status');
        });
    }
};
