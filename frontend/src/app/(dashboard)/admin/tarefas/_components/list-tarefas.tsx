import { Button } from '@/components/button'
import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { cn } from '@/lib/utils'
import { api } from '@/services/api'
import { membroType } from '@/types/member'
import { projetoType } from '@/types/projeto'
import { TAREFA_STATUS_LABEL, tarefaStatus, tarefaType } from '@/types/tarefa'
import { LuPen, LuPlusCircle, LuTrash } from 'react-icons/lu'
import { DialogDeleteTarefa } from './dialog-delete-tarefa'
import { DialogFormTarefa } from './dialog-form-tarefa'

const statusBadge: Record<tarefaStatus, string> = {
  pendente: 'bg-amber-100 text-amber-800',
  em_andamento: 'bg-sky-100 text-sky-800',
  concluida: 'bg-emerald-100 text-emerald-800',
}

export default async function ListTarefas() {
  const [tarefas, projetos, membros] = await Promise.all([
    api<tarefaType[]>('GET', '/tarefas'),
    api<projetoType[]>('GET', '/projetos'),
    api<membroType[]>('GET', '/membros'),
  ])

  if (!tarefas.response || !projetos.response || !membros.response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter as tarefas.
      </DashboardContainer>
    )
  }

  const opcoes = { projetos: projetos.response, membros: membros.response }

  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <DialogFormTarefa {...opcoes}>
          <Button size="sm" className="max-sm:w-full">
            <LuPlusCircle />
            Nova tarefa
          </Button>
        </DialogFormTarefa>
      </DashboardContainer>
      <DashboardContainer>
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Projeto</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tarefas.response.map((tarefa) => (
                <TableRow key={tarefa.id}>
                  <TableCell
                    className="max-w-[16rem] truncate font-medium"
                    title={tarefa.titulo}
                  >
                    {tarefa.titulo}
                  </TableCell>
                  <TableCell>{tarefa.projeto?.nome ?? '—'}</TableCell>
                  <TableCell>{tarefa.membro?.nome ?? '—'}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        'inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium',
                        statusBadge[tarefa.status],
                      )}
                    >
                      {TAREFA_STATUS_LABEL[tarefa.status] ?? tarefa.status}
                    </span>
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <DialogFormTarefa tarefa={tarefa} {...opcoes}>
                      <Button
                        variant="secondary-inverse"
                        size="icon"
                        aria-label="Editar tarefa"
                      >
                        <LuPen />
                      </Button>
                    </DialogFormTarefa>
                    <DialogDeleteTarefa id={tarefa.id}>
                      <Button
                        variant="destructive-inverse"
                        size="icon"
                        aria-label="Excluir tarefa"
                      >
                        <LuTrash />
                      </Button>
                    </DialogDeleteTarefa>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {!tarefas.response.length && (
              <TableCaption>Nenhuma tarefa encontrada.</TableCaption>
            )}
          </Table>
        </div>
      </DashboardContainer>
    </>
  )
}
