<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use LogicException;

class Membro extends Model
{
    use HasFactory, HasUuids;

    /**
     * RN02 - Trava de sobrecarga: quantidade máxima de projetos ativos por membro.
     */
    public const LIMITE_PROJETOS_ATIVOS = 2;

    protected $fillable = [
        'nome',
        'email',
        'cor_favorita',
        'data_aniversario',
        'image',
        'senha',
    ];

    protected $hidden = [
        'senha',
    ];

    public function projetos(): BelongsToMany
    {
        return $this->belongsToMany(Projeto::class, 'projeto_membro');
    }

    public function tarefas(): HasMany
    {
        return $this->hasMany(Tarefa::class);
    }

    public function estaAlocadoEm(string $projetoId): bool
    {
        return $this->projetos()->whereKey($projetoId)->exists();
    }

    /**
     * RN03: contagem feita sobre a tabela projeto_membro, apenas projetos ativos.
     */
    public function quantidadeProjetosAtivos(?string $ignorarProjetoId = null): int
    {
        return $this->projetos()
            ->ativos()
            ->when($ignorarProjetoId, fn ($query) => $query->whereKeyNot($ignorarProjetoId))
            ->count();
    }

    /**
     * RN02: um membro já vinculado ao projeto sempre pode receber novas tarefas nele;
     * a alocação em um projeto NOVO só é permitida abaixo do limite de projetos ativos.
     *
     * @param  string|null  $ignorarProjetoId  Vínculo que será liberado pela própria operação (edição).
     */
    public function podeSerAlocadoEm(string $projetoId, ?string $ignorarProjetoId = null): bool
    {
        if ($this->estaAlocadoEm($projetoId)) {
            return true;
        }

        return $this->quantidadeProjetosAtivos($ignorarProjetoId) < self::LIMITE_PROJETOS_ATIVOS;
    }

    public function mensagemLimiteAtingido(): string
    {
        return sprintf(
            'ERRO: %s já está alocado(a) em %d projetos ativos e não pode ser vinculado(a) a um novo projeto.',
            $this->nome,
            self::LIMITE_PROJETOS_ATIVOS,
        );
    }

    /**
     * Bloqueia (SELECT ... FOR UPDATE) os membros informados até o fim da transação,
     * serializando alocações concorrentes do mesmo membro. A ordenação por id
     * garante ordem de lock determinística e evita deadlocks.
     *
     * @return Collection<string, Membro> indexada pelo id
     */
    public static function bloquearParaAlocacao(string ...$ids): Collection
    {
        self::exigirTransacao();

        return static::query()
            ->whereKey(array_unique($ids))
            ->orderBy('id')
            ->lockForUpdate()
            ->get()
            ->keyBy('id');
    }

    /**
     * Valida a RN02 novamente (agora sob lock) e cria o vínculo em projeto_membro.
     * O FormRequest faz a validação rápida para UX; esta é a checagem autoritativa,
     * imune a requisições simultâneas. Exige transação + bloquearParaAlocacao().
     *
     * @throws ValidationException HTTP 422 quando o limite seria ultrapassado.
     */
    public function alocarEm(string $projetoId): void
    {
        self::exigirTransacao();

        if (! $this->podeSerAlocadoEm($projetoId)) {
            throw ValidationException::withMessages([
                'membro_id' => $this->mensagemLimiteAtingido(),
            ]);
        }

        $this->projetos()->syncWithoutDetaching([$projetoId]);
    }

    private static function exigirTransacao(): void
    {
        if (DB::transactionLevel() === 0) {
            throw new LogicException('Alocação de membros deve ocorrer dentro de DB::transaction().');
        }
    }

    /**
     * Remove o vínculo com o projeto quando o membro não possui mais tarefas nele,
     * liberando capacidade para a RN02.
     */
    public function liberarSeSemTarefas(string $projetoId): void
    {
        if (! $this->tarefas()->where('projeto_id', $projetoId)->exists()) {
            $this->projetos()->detach($projetoId);
        }
    }
}
