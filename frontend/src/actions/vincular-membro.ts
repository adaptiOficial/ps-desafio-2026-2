'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function vincularMembroAoProjeto(projetoId: string, membroId: string) 
{
    const{ error}= await api
    ('POST', `/projetos/${projetoId}/vincular-membro`, { data: { membro_id: membroId } })

    if (error) {
        return JSON.stringify({ error: error.message|| 'Erro ao vincular membro ao projeto' })
    }

    revalidatePath('/admin/projetos')
    return JSON.stringify({ success: 'Membro vinculado ao projeto com sucesso!' })

}

