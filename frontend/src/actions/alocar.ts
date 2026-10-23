'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function alocarMembro(projetoId: string, membroId: string) {
  const { error } = await api('POST', `/projetos/${projetoId}/membros`, {
    data: { membro_id: membroId },
  })

  if (error) {
    return { erro: error.message }
  }

  revalidatePath('/admin/projetos')
  return { erro: null }
}