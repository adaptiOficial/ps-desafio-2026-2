'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createUser(form: FormData) {
  const res = await api('POST', '/users', { data: form })

  if (!res.error) {
    revalidatePath('/admin/usuarios')
  }

  return JSON.stringify(res)
}

export async function updateUser(form: FormData) {
  const res = await api('POST', `/users/${form.get('id')}`, {
    data: form,
  })

  if (!res.error) {
    revalidatePath('/admin/usuarios')
  }

  return JSON.stringify(res)
}

export async function destroyUser(id: string) {
  const res = await api('DELETE', `/users/${id}`)

  if (!res.error) {
    revalidatePath('/admin/usuarios')
  }

  return JSON.stringify(res)
}
