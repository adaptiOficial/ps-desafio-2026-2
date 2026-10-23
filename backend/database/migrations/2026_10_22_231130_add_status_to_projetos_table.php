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
        Schema::table('projetos', function (Blueprint $table) {
            if (!Schema::hasColumn('projetos', 'status')) {
                $table->enum('status', ['ativo', 'concluido'])->default('ativo')->after('descricao');
            }
            if (!Schema::hasColumn('projetos', 'justificativa_exclusao')) {
                $table->text('justificativa_exclusao')->nullable()->after('status');
            }
            if (!Schema::hasColumn('projetos', 'deleted_at')) {
                $table->softDeletes();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projetos', function (Blueprint $table) {
            $table->dropColumn(['status', 'justificativa_exclusao']);
            $table->dropSoftDeletes();
        });
    }
};