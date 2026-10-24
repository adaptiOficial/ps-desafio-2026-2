export type projetoType = {
  id: string
  nome: string
  nome_cliente: string
  descricao: string
  data_inicio: string
  data_fim: string
  status?: 'Ativo' | 'Concluido'
  created_at?: string
  updated_at?: string
}
