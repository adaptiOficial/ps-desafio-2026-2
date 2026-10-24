'use client'

import { destroyTarefa } from '@/actions/tarefa'
import { Button } from '@/components/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog'
import { useToast } from '@/components/use-toast'
import { useState } from 'react'

interface DialogDeleteTarefaProps {
  id: string
  children: React.ReactNode
}

export function DialogDeleteTarefa({ id, children }: DialogDeleteTarefaProps) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const { toast } = useToast()

  const submit = async () => {
    setPending(true)
    const { error } = JSON.parse(await destroyTarefa(id))
    setPending(false)

    toast({
      title: error
        ? 'Não foi possível excluir a tarefa!'
        : 'Tarefa excluída com sucesso!',
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] rounded-lg">
        <DialogHeader>
          <DialogTitle>Confirmar exclusão de tarefa</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir esta tarefa? Esta ação é
            irreversível. Se for a última tarefa do membro no projeto, ele será
            desvinculado do projeto.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            type="button"
            className="w-full sm:w-auto"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            type="button"
            className="w-full sm:w-auto"
            pending={pending}
            onClick={submit}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
