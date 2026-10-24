'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsTarefa from './form-fields-tarefa'
import { useState } from 'react'
import { useToast } from '@/components/use-toast'
import { createTarefa } from '@/actions/tarefa'

interface DialogCreateTarefaProps {
  children: React.ReactNode
}

export function DialogCreateTarefa({ children }: DialogCreateTarefaProps) {
  const [open, setOpen] = useState<boolean>(false)
  const { toast } = useToast()
  const submit = async (form: FormData) => {
    const{error}=JSON.parse(await createTarefa(form))
    if (error) {
      toast({ title: 'Não foi possível criar a tarefa!', variant: 'destructive' })
    } else {
      toast({ title: 'Tarefa criada com sucesso!' })
      setOpen(false)
    }

  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar tarefa</DialogTitle>
          <DialogDescription>
            Preencha as informações da nova tarefa abaixo.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsTarefa />
        </form>
      </DialogContent>
    </Dialog>
  )
}