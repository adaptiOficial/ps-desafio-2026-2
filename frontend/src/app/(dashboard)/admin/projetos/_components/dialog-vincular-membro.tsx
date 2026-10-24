'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/dialog'
import { Button } from '@/components/button'
import { FormField, FormFieldsGroup } from '@/components/dashboard/form'
import { Label } from '@/components/label'
import { useState, useEffect } from 'react'
import { useToast } from '@/components/use-toast'
import { vincularMembroAoProjeto } from '@/actions/vincular-membro'
import { api } from '@/services/api'
import { membroType } from '@/types/member'
import { LuUserPlus } from 'react-icons/lu'

interface DialogVincularMembroProps {
  projetoId: string
  children: React.ReactNode
}

export function DialogVincularMembro({ projetoId, children }: DialogVincularMembroProps) {
  const [open, setOpen] = useState(false)
  const [membros, setMembros] = useState<membroType[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (open) {
      api<membroType[]>('GET', '/membros').then(({ response }) => {
        if (response) setMembros(response)
      })
    }
  }, [open])

  const submit = async (form: FormData) => {
    setLoading(true)
    const membroId = form.get('membro_id') as string
    
    if (!membroId) {
      toast({ title: 'Selecione um membro!' })
      setLoading(false)
      return
    }

    const { error, success } = await JSON.parse(await vincularMembroAoProjeto(projetoId, membroId))

    if (error) {
      // Exibe o erro retornado pelo backend (ex: limite de 2 projetos)
      toast({ title: error, variant: 'destructive' }) 
    } else {
      toast({ title: success })
      setOpen(false)
    }
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vincular Membro</DialogTitle>
          <DialogDescription>
            Selecione um membro para alocá-ado a este projeto. Um membro pode participar de no máximo 2 projetos ativos.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsGroup>
            <FormField>
              <Label htmlFor="membro_id">Membro disponível</Label>
              <select 
                name="membro_id" 
                id="membro_id" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                <option value="">Selecione um membro...</option>
                {membros.map(m => (
                  <option key={m.id} value={m.id}>{m.nome}</option>
                ))}
              </select>
            </FormField>
          </FormFieldsGroup>
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Vinculando...' : 'Vincular'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}