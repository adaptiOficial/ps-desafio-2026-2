import { membroType } from "./member"
import { projetoType } from "./projeto"

export type tarefaType = {
    id: string
    idMembro_alocado: string
    idProjeto_vinculado: string
    titulo: string
    descricao: string
    data_inicio: string
    data_fim: string
    created_at?: string
    updated_at?: string
    membro: membroType
    projeto: projetoType
}