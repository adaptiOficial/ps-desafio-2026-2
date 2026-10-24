"use client"

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsTarefa from './form-fields-task'
import { tarefaType } from '@/types/tarefa'
import { useState } from 'react'
import { projetoType } from '@/types/projeto'
import { membroType } from '@/types/member'

interface DialogInformationTarefaProps {
  tarefa: tarefaType
  children: React.ReactNode
  projetos?: projetoType[]
  membros?: membroType[]
}

export function DialogInformationTarefa({
  tarefa,
  children,
  projetos,
  membros
}: DialogInformationTarefaProps) {
  
  const [open, setOpen] = useState<boolean>()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações da tarefa</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas da tarefa abaixo.
          </DialogDescription>
        </DialogHeader>
        <FormFieldsTarefa tarefa={tarefa} projetos={projetos} membros={membros} readOnly />
      </DialogContent>
    </Dialog>
  )
}
