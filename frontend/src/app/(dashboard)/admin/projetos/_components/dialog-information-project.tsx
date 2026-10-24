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
        <div className="space-y-2">
        <h4 className="text-sm font-semibold">
          Membros alocados ({projeto.membros?.length ?? 0})
        </h4>
        {projeto.membros?.length ? 
        (
          <ul className="max-h-40 space-y-1 overflow-y-auto rounded-md border p-2 text-sm">
            {projeto.membros.map((m) => (
              <li key={m.id} className="flex flex-col sm:flex-row sm:justify-between">
                <span>{m.nome}</span>
                <span className="text-muted-foreground">{m.email}</span>
              </li>
            ))}
          </ul>
        ) :
        (
          <p className="text-sm text-muted-foreground">
            Nenhum membro alocado a este projeto.
          </p>
        )}
      </div>
      </DialogContent>
    </Dialog>
  )
}
