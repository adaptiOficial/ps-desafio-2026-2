'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createProjeto(form: FormData) {
  const res = await api('POST', '/projetos', { data: form })

  if (!res.error) {
    revalidatePath('/admin/projetos')
  }

  return JSON.stringify(res)
}

export async function updateProjeto(form: FormData) {
  const res = await api('PUT', `/projetos/${form.get('id')}`, {
    data: form,
  })

  if (!res.error) {
    revalidatePath('/admin/projetos')
  }

  return JSON.stringify(res)
}

export async function destroyProjeto(id: string, justificativa_exclusao: string) {
  const res = await api('DELETE', `/projetos/${id}`, {
    data: { justificativa_exclusao }
  })

  if (!res.error) {
    revalidatePath('/admin/projetos')
  }

  return JSON.stringify(res)
}