'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'


//Mensagem de erro 
function serialize(res: Awaited<ReturnType<typeof api>>) {
  if (res.error) 
    {
    console.log('ERRO TAREFA', res.error.status, res.error.message, res.error.errors)
    return JSON.stringify({
        error: {
          message: res.error.message,
          status: res.error.status,
          errors: res.error.errors ?? {},
        },
      })
    }
    revalidatePath('/admin/tarefas')
    return JSON.stringify({response: res.response})
}

function toPayload(form: FormData)
{
    const data = Object.fromEntries(form.entries())
    delete data.id // Remove o campo "id" do payload
    return data 
}

export async function createTarefa(form: FormData) 
{
    return serialize(await api('POST', '/tarefas', { data: toPayload(form) }))
}

export async function updateTarefa(form: FormData)
{
    return serialize(await api('PUT', `/tarefas/${form.get('id')}`, { data: toPayload(form) }),)

}

export async function destroyTarefa(id: string)
{
    return serialize(await api('DELETE', `/tarefas/${id}`))
}