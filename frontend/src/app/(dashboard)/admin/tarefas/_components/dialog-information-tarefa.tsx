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

interface DialogInformationTarefaProps {
  tarefa: any
  children: React.ReactNode
}

export function DialogInformationTarefa({
  tarefa,
  children,
}: DialogInformationTarefaProps) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações da tarefa</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas da tarefa.
          </DialogDescription>
        </DialogHeader>
        <FormFieldsTarefa tarefa={tarefa} readOnly />
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