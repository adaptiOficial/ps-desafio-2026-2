import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import { Button } from '@/components/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { api } from '@/services/api'
import { LuInfo, LuPen, LuCirclePlus, LuTrash } from 'react-icons/lu'
import { DialogCreateTarefa } from './dialog-create-tarefa'
import { DialogUpdateTarefa } from './dialog-update-tarefa'
import { DialogTarefaDelete } from './dialog-delete-tarefa'
import { DialogInformationTarefa } from './dialog-information-tarefa'


interface tarefaType {
  id: string
  nome: string
  descricao: string
  status: string
  projeto_id?: string
  membro_id?: string
  membro?: { id: string; nome: string; email: string }
  projeto?: { id: string; nome: string }
}

const statusLabels: Record<string, string> = {
  pendente: 'Pendente',
  em_progresso: 'Em progresso',
  concluida: 'Concluída',
}

export default async function ListTarefas() {
  const { response } = await api<tarefaType[]>('GET', '/tarefas')

  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter as tarefas.
      </DashboardContainer>
    )
  }

  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <DialogCreateTarefa>
          <Button size="sm">
            <LuCirclePlus />
            Nova tarefa
          </Button>
        </DialogCreateTarefa>
      </DashboardContainer>
      <DashboardContainer className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="max-sm:hidden">Descrição</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {response.map((tarefa: tarefaType) => (
              <TableRow key={tarefa.id}>
                <TableCell>{tarefa.nome}</TableCell>
                <TableCell className="max-sm:hidden">{tarefa.descricao}</TableCell>
                <TableCell>{statusLabels[tarefa.status] ?? tarefa.status}</TableCell>
                <TableCell><div className="flex justify-end gap-2">
                  <DialogInformationTarefa tarefa={tarefa}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationTarefa>
                  <DialogUpdateTarefa tarefa={tarefa}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateTarefa>
                  <DialogTarefaDelete id={tarefa.id}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogTarefaDelete>
                </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!response.length && (
            <TableCaption>Nenhuma tarefa encontrada.</TableCaption>
          )}
        </Table>
      </DashboardContainer>
    </>
  )
}
