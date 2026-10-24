import { projetoType } from './projeto'
import { membroType } from './member'

export interface tarefaType {
  id: number;
  titulo: string;
  descricao?: string;
  status: string;
  projeto_id: string;
  membro_id: string;
  created_at?: string;
  updated_at?: string;
    
  projeto?: projetoType;
  membro?: membroType;
}