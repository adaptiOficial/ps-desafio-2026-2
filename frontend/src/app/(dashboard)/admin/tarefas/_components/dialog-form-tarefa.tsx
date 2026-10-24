'use client'

import { createTarefa, updateTarefa } from '@/actions/tarefa'
import { Button } from '@/components/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { useToast } from '@/components/use-toast'
import { cn } from '@/lib/utils'
import type { ResponseErrorType } from '@/services/api'
import { membroType } from '@/types/member'
import { projetoType } from '@/types/projeto'
import {
  TAREFA_STATUS_LABEL,
  tarefaPayload,
  tarefaStatus,
  tarefaType,
} from '@/types/tarefa'
import { FormEvent, ReactNode, useState } from 'react'
import { LuAlertTriangle, LuUserX } from 'react-icons/lu'

type ErrosCampos = Partial<Record<keyof tarefaPayload, string>>

interface DialogFormTarefaProps {
  /** Quando informado, o formulário entra em modo de edição. */
  tarefa?: tarefaType
  projetos: projetoType[]
  membros: membroType[]
  children: ReactNode
}

// Classes equivalentes às do <Input /> do design system, para manter
// <select> e <textarea> nativos visualmente consistentes.
const controlClass =
  'w-full rounded border border-input bg-transparent px-3 py-2 text-base shadow transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'

const limparMensagem = (mensagem: string) => mensagem.replace(/^ERRO:\s*/, '')

export function DialogFormTarefa({
  tarefa,
  projetos,
  membros,
  children,
}: DialogFormTarefaProps) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const [erros, setErros] = useState<ErrosCampos>({})
  const [erroGeral, setErroGeral] = useState<string | null>(null)
  const { toast } = useToast()

  const modoEdicao = Boolean(tarefa)
  const erroSobrecarga = erros.membro_id
  const outrosErros = Object.entries(erros).filter(
    ([campo]) => campo !== 'membro_id',
  )

  const limparErros = () => {
    setErros({})
    setErroGeral(null)
  }

  const handleOpenChange = (value: boolean) => {
    setOpen(value)
    if (!value) limparErros()
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Lido antes de `pending`: campos desabilitados ficam fora do FormData.
    const payload = Object.fromEntries(
      new FormData(event.currentTarget),
    ) as unknown as tarefaPayload

    limparErros()
    setPending(true)

    try {
      const raw = tarefa
        ? await updateTarefa(tarefa.id, payload)
        : await createTarefa(payload)
      const { error } = JSON.parse(raw) as { error?: ResponseErrorType }

      if (error) {
        // Captura explícita do HTTP 422 (validação/RN02) vinda do Laravel.
        if (error.status === 422 && error.errors) {
          setErros(error.errors as ErrosCampos)
        } else {
          setErroGeral(
            'Não foi possível salvar a tarefa. Tente novamente em instantes.',
          )
        }
        return
      }

      toast({
        title: modoEdicao
          ? 'Tarefa editada com sucesso!'
          : 'Tarefa criada com sucesso!',
      })
      setOpen(false)
    } catch {
      setErroGeral('Falha de comunicação com o servidor.')
    } finally {
      setPending(false)
    }
  }

  const campoErro = (campo: keyof tarefaPayload) =>
    erros[campo] ? limparMensagem(erros[campo] as string) : undefined

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-lg">
        <DialogHeader>
          <DialogTitle>
            {modoEdicao ? 'Editar tarefa' : 'Adicionar tarefa'}
          </DialogTitle>
          <DialogDescription>
            Toda tarefa precisa de um projeto e de um membro responsável. Um
            membro pode atuar em no máximo 2 projetos ativos.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4"
        >
          {/* Alerta da RN02: membro sobrecarregado (HTTP 422 em membro_id) */}
          {erroSobrecarga && (
            <div
              role="alert"
              aria-live="assertive"
              className="flex gap-3 rounded-md border border-destructive/40 bg-destructive-foreground p-3 text-destructive animate-in fade-in-0 slide-in-from-top-1"
            >
              <LuUserX className="mt-0.5 size-5 shrink-0" aria-hidden />
              <div className="space-y-1 text-sm">
                <p className="font-semibold">Limite de projetos atingido</p>
                <p>{limparMensagem(erroSobrecarga)}</p>
                <p className="text-xs opacity-80">
                  Escolha outro membro ou conclua um dos projetos ativos dele.
                </p>
              </div>
            </div>
          )}

          {/* Alerta genérico: demais erros 422 ou falhas inesperadas */}
          {(outrosErros.length > 0 || erroGeral) && (
            <div
              role="alert"
              aria-live="polite"
              className="flex gap-3 rounded-md border border-destructive/40 bg-destructive-foreground p-3 text-destructive animate-in fade-in-0"
            >
              <LuAlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden />
              <div className="space-y-1 text-sm">
                <p className="font-semibold">
                  {erroGeral ?? 'Revise os campos destacados'}
                </p>
                {outrosErros.length > 0 && (
                  <ul className="list-disc space-y-0.5 pl-4">
                    {outrosErros.map(([campo, mensagem]) => (
                      <li key={campo}>{limparMensagem(mensagem as string)}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          <fieldset disabled={pending} className="flex flex-col gap-4">
            <CampoTarefa
              id="titulo"
              label="Título"
              erro={campoErro('titulo')}
              required
            >
              <Input
                id="titulo"
                name="titulo"
                placeholder="Ex.: Implementar tela de login"
                defaultValue={tarefa?.titulo}
                aria-invalid={Boolean(erros.titulo)}
                aria-describedby={erros.titulo ? 'titulo-erro' : undefined}
                className={cn('w-full', erros.titulo && 'border-destructive')}
              />
            </CampoTarefa>

            <CampoTarefa
              id="descricao"
              label="Descrição"
              erro={campoErro('descricao')}
            >
              <textarea
                id="descricao"
                name="descricao"
                rows={3}
                placeholder="Detalhes da tarefa (opcional)"
                defaultValue={tarefa?.descricao ?? ''}
                className={cn(
                  controlClass,
                  'resize-y',
                  erros.descricao && 'border-destructive',
                )}
              />
            </CampoTarefa>

            <CampoTarefa
              id="projeto_id"
              label="Projeto"
              erro={campoErro('projeto_id')}
              required
            >
              <select
                id="projeto_id"
                name="projeto_id"
                defaultValue={tarefa?.projeto_id ?? ''}
                aria-invalid={Boolean(erros.projeto_id)}
                className={cn(
                  controlClass,
                  erros.projeto_id && 'border-destructive',
                )}
              >
                <option value="" disabled>
                  Selecione um projeto
                </option>
                {projetos.map((projeto) => (
                  <option key={projeto.id} value={projeto.id}>
                    {projeto.nome}
                    {projeto.status && projeto.status !== 'Ativo'
                      ? ` (${projeto.status})`
                      : ''}
                  </option>
                ))}
              </select>
            </CampoTarefa>

            <CampoTarefa
              id="membro_id"
              label="Responsável"
              // A mensagem da RN02 já aparece no alerta destacado acima.
              erro={
                erroSobrecarga
                  ? 'Membro indisponível para novos projetos.'
                  : undefined
              }
              required
            >
              <select
                id="membro_id"
                name="membro_id"
                defaultValue={tarefa?.membro_id ?? ''}
                aria-invalid={Boolean(erroSobrecarga)}
                className={cn(
                  controlClass,
                  erroSobrecarga &&
                    'border-destructive ring-1 ring-destructive',
                )}
              >
                <option value="" disabled>
                  Selecione um membro
                </option>
                {membros.map((membro) => (
                  <option key={membro.id} value={membro.id}>
                    {membro.nome}
                  </option>
                ))}
              </select>
            </CampoTarefa>

            <CampoTarefa id="status" label="Status" erro={campoErro('status')}>
              <select
                id="status"
                name="status"
                defaultValue={tarefa?.status ?? 'pendente'}
                className={cn(
                  controlClass,
                  erros.status && 'border-destructive',
                )}
              >
                {(Object.keys(TAREFA_STATUS_LABEL) as tarefaStatus[]).map(
                  (status) => (
                    <option key={status} value={status}>
                      {TAREFA_STATUS_LABEL[status]}
                    </option>
                  ),
                )}
              </select>
            </CampoTarefa>
          </fieldset>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => handleOpenChange(false)}
              disabled={pending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              pending={pending}
              className="w-full sm:w-auto"
            >
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface CampoTarefaProps {
  id: string
  label: string
  erro?: string
  required?: boolean
  children: ReactNode
}

/**
 * Mobile first: label empilhada sobre o campo; a partir de `sm` vira o grid
 * label | campo (4 colunas) usado nos demais formulários do dashboard.
 */
function CampoTarefa({
  id,
  label,
  erro,
  required,
  children,
}: CampoTarefaProps) {
  return (
    <div className="flex flex-col gap-1.5 sm:grid sm:grid-cols-4 sm:items-start sm:gap-x-4 sm:gap-y-1">
      <Label
        htmlFor={id}
        required={required}
        className="mb-0 sm:mt-3 sm:text-right"
      >
        {label}
      </Label>
      <div className="sm:col-span-3">{children}</div>
      {erro && (
        <p
          id={`${id}-erro`}
          className="text-xs text-destructive sm:col-span-3 sm:col-start-2"
        >
          {erro}
        </p>
      )}
    </div>
  )
}
