export type projetoType = {
  id: string
  nome: string
  nome_cliente: string
  descricao: string
  data_inicio: string
  data_fim: string
  created_at?: string
  updated_at?: string
  status: 'ativo' | 'concluido'
  justificativa_exclusao?: string | null
  deleted_at?: string | null
}