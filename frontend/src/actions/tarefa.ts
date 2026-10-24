'use server'

import { api } from '@/services/api'
import { tarefaPayload } from '@/types/tarefa'
import { revalidatePath } from 'next/cache'

// Tarefas não possuem upload de arquivo, então enviamos JSON: isso permite
// usar PUT de verdade (o PHP não faz parse de multipart em PUT) e limpar a
// descrição enviando string vazia (convertida para null pelo Laravel).

export async function createTarefa(data: tarefaPayload) {
  const res = await api('POST', '/tarefas', { data })

  if (!res.error) {
    revalidatePath('/admin/tarefas')
  }

  return JSON.stringify(res)
}

export async function updateTarefa(id: string, data: tarefaPayload) {
  const res = await api('PUT', `/tarefas/${id}`, { data })

  if (!res.error) {
    revalidatePath('/admin/tarefas')
  }

  return JSON.stringify(res)
}

export async function destroyTarefa(id: string) {
  const res = await api('DELETE', `/tarefas/${id}`)

  if (!res.error) {
    revalidatePath('/admin/tarefas')
  }

  return JSON.stringify(res)
}
