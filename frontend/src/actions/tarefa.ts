'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function criarTarefa(dados: {
  projeto_id: string
  membro_id: string
  titulo: string
  descricao?: string
  status?: string
}) {
  const { error } = await api('POST', '/tarefas', { data: dados })

  if (error) {
    const detalhes = Object.values(error.errors ?? {}).join(' ')
    return { erro: detalhes || error.message }
  }

  revalidatePath('/admin/tarefas')
  return { erro: null }
}

export async function excluirTarefa(id: string) {
  const { error } = await api('DELETE', `/tarefas/${id}`)

  if (error) {
    return { erro: error.message }
  }

  revalidatePath('/admin/tarefas')
  return { erro: null }
}