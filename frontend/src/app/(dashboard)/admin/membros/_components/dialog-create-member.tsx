'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsMember from './form-fields-member'
import { createMember } from '@/actions/member'
import { filterFormData } from '@/services/filter-form-data'
import { useState } from 'react'
import { useToast } from '@/components/use-toast'

interface DialogCreateMemberProps {
  children: React.ReactNode
}

export function DialogCreateMember({ children }: DialogCreateMemberProps) {
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)

    const { error } = await JSON.parse(await createMember(newForm))

    if (error) {
      toast({
        title: 'Não foi possível criar o membro!',
      })
    } else {
      toast({
        title: 'Membro criado com sucesso!',
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar membro</DialogTitle>
          <DialogDescription>
            Preencha as informações do novo membro abaixo e clique em
            &rdquo;Salvar&rdquo; para incluí-lo no sistema.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsMember />
        </form>
      </DialogContent>
    </Dialog>
  )
}
