export type tarefaType = {
  id: string
  projeto_id: string
  membro_id: string
  titulo: string
  descricao?: string | null
  status: 'pendente' | 'em_andamento' | 'concluida'
  data_inicio?: string | null
  data_fim?: string | null
  projeto?: { id: string; nome: string }
  membro?: { id: string; nome: string }
}