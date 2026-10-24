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
import { updateTarefa } from '@/actions/tarefa'

interface DialogUpdateTarefaProps {
  tarefa: any
  children: React.ReactNode
}

export function DialogUpdateTarefa({ tarefa, children }: DialogUpdateTarefaProps) {
  const [open, setOpen] = useState<boolean>(false)
  const { toast } = useToast()
  const submit = async (form: FormData) => {
    const {error} = JSON.parse(await updateTarefa(form))
    if (error) {
      toast({ title: 'Não foi possível atualizar a tarefa!',description: error.message , variant: 'destructive' })
    } else {
      toast({ title: 'Tarefa atualizada com sucesso!' })
      setOpen(false)
    }
}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar tarefa</DialogTitle>
          <DialogDescription>
            Atualize as informações da tarefa abaixo.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsTarefa tarefa={tarefa} />
        </form>
        <div className="space-y-1 rounded-md border p-3 text-sm">
            <p>
                <span className="font-semibold">Projeto: </span>
                {tarefa.projeto?.nome ?? '—'}
            </p>
            <p>
                <span className="font-semibold">Responsável: </span>
                {tarefa.membro?.nome ?? '—'}
                {tarefa.membro?.email && (
                <span className="text-muted-foreground"> ({tarefa.membro.email})</span>
                )}
            </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}