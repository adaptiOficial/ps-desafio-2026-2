'use client'

import { destroyProjeto } from '@/actions/projeto'
import { Button } from '@/components/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from '@/components/dialog'
import { useToast } from '@/components/use-toast'
import { useState } from 'react'

interface DialogDeleteProjetoProps {
  id: string
  children: React.ReactNode
}

export function DialogProjetoDelete({ id, children }: DialogDeleteProjetoProps) {
  const [open, setOpen] = useState<boolean>()
  const [justificativa, setJustificativa] = useState('')
  const { toast } = useToast()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
        
    const { error } = await JSON.parse(await destroyProjeto(id, justificativa))

    if (error) {
      toast({ title: 'Não foi possível excluir o projeto!' })
    } else {
      toast({ title: 'Projeto movido para a lixeira com sucesso!' })      
      window.location.reload();
    }

    setOpen(false)
    setJustificativa('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão de projeto</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir este projeto? Ele será movido para a aba de Projetos Excluídos e você poderá reverter essa ação futuramente.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit}>
          <div className="py-4">
            <label htmlFor="justificativa" className="block text-sm font-medium text-gray-700 mb-2">
              Motivo da exclusão (obrigatório)
            </label>
            <textarea
              id="justificativa"
              className="w-full border rounded-md p-3 text-sm focus:ring-2 focus:ring-destructive outline-none bg-background"
              rows={3}
              placeholder="Ex: Projeto cancelado, escopo alterado..."
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" type="submit" disabled={justificativa.trim().length < 5}>
              Excluir
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}