'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsProjeto from './form-fields-project'
import { createProjeto } from '@/actions/projeto'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'

interface DialogCreateProjetoProps {
  children: React.ReactNode
}

export function DialogCreateProjeto({ children }: DialogCreateProjetoProps) {
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)
    const { error } = await JSON.parse(await createProjeto(newForm))

    console.log("ERRO DO BACKEND:", error);

    if (error) {
      let mensagemErro = 'Não foi possível criar o projeto!'

      if(error.status == 422 && error.errors) {
        mensagemErro = Object.values(error.errors)[0] as string;
      }
      toast({ title: mensagemErro})
    } else {
      toast({ title: 'Projeto criado com sucesso!' })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar projeto</DialogTitle>
          <DialogDescription>
            Preencha as informações do novo projeto abaixo e clique em
            &rdquo;Salvar&rdquo; para incluí-lo no sistema.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsProjeto />
        </form>
      </DialogContent>
    </Dialog>
  )
}
