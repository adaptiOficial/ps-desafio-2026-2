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
import { api } from '@/services/api'
import { tarefaType } from '@/types/tarefa'

const nomesStatus: Record<string, string> = {
  pendente: 'Pendente',
  em_andamento: 'Em andamento',
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
    <DashboardContainer>
      <Table className="min-w-[640px]">
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Projeto</TableHead>
            <TableHead>Membro</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {response.map((tarefa) => (
            <TableRow key={tarefa.id}>
              <TableCell>{tarefa.titulo}</TableCell>
              <TableCell>{tarefa.projeto?.nome}</TableCell>
              <TableCell>{tarefa.membro?.nome}</TableCell>
              <TableCell>{nomesStatus[tarefa.status] ?? tarefa.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {!response.length && (
          <TableCaption>Nenhuma tarefa encontrada.</TableCaption>
        )}
      </Table>
    </DashboardContainer>
  )
}