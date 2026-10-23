'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import { Button } from '@/components/button'
import { alocarMembro } from '@/actions/alocar'
import { useToast } from '@/components/use-toast'
import { membroType } from '@/types/member'
import { useState } from 'react'

interface DialogAlocarMembroProps {
  projetoId: string
  membros: membroType[]
  children: React.ReactNode
}

export function DialogAlocarMembro({
  projetoId,
  membros,
  children,
}: DialogAlocarMembroProps) {
  const [open, setOpen] = useState<boolean>()
  const [membroId, setMembroId] = useState('')
  const [pending, setPending] = useState(false)
  const { toast } = useToast()

  const confirmar = async () => {
    if (!membroId) {
      toast({ title: 'Escolha um membro.' })
      return
    }

    setPending(true)
    const { erro } = await alocarMembro(projetoId, membroId)
    setPending(false)

    if (erro) {
      toast({ title: 'Não foi possível alocar o membro!', description: erro })
    } else {
      toast({ title: 'Membro alocado com sucesso!' })
      setMembroId('')
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alocar membro</DialogTitle>
          <DialogDescription>
            Escolha o membro que vai trabalhar neste projeto e clique em
            &quot;Alocar&quot;.
          </DialogDescription>
        </DialogHeader>
        <select
          value={membroId}
          onChange={(e) => setMembroId(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="">Selecione um membro</option>
          {membros.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nome}
            </option>
          ))}
        </select>
        <Button type="button" onClick={confirmar} pending={pending}>
          Alocar
        </Button>
      </DialogContent>
    </Dialog>
  )
}