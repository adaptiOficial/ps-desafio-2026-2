import { membroType } from './member'
import { projetoType } from './projeto'

export type tarefaStatus = 'pendente' | 'em_andamento' | 'concluida'

export const TAREFA_STATUS_LABEL: Record<tarefaStatus, string> = {
  pendente: 'Pendente',
  em_andamento: 'Em andamento',
  concluida: 'Concluída',
}

export type tarefaType = {
  id: string
  titulo: string
  descricao?: string | null
  status: tarefaStatus
  projeto_id: string
  membro_id: string
  projeto?: Pick<projetoType, 'id' | 'nome' | 'status'>
  membro?: Pick<membroType, 'id' | 'nome' | 'email' | 'image'>
  created_at?: string
  updated_at?: string
}

export type tarefaPayload = {
  titulo: string
  descricao?: string
  status?: tarefaStatus
  projeto_id: string
  membro_id: string
}
