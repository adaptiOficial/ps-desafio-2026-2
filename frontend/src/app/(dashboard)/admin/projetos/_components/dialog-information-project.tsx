"use client"

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsProjeto from './form-fields-project'
import { projetoType } from '@/types/projeto'
import { useState } from 'react'

interface DialogInformationProjetoProps {
  projeto: projetoType
  children: React.ReactNode
}

export function DialogInformationProjeto({
  projeto,
  children,
}: DialogInformationProjetoProps) {
  const [open, setOpen] = useState<boolean>()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do projeto</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas do projeto abaixo.
          </DialogDescription>
        </DialogHeader>
        <FormFieldsProjeto projeto={projeto} readOnly />
      </DialogContent>
    </Dialog>
  )
}
