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
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { criarTarefa } from '@/actions/tarefa'
import { useToast } from '@/components/use-toast'
import { membroType } from '@/types/member'
import { projetoType } from '@/types/projeto'
import { useState } from 'react'

interface DialogCreateTarefaProps {
  projetos: projetoType[]
  membros: membroType[]
  children: React.ReactNode
}

const campo = 'w-full rounded-md border bg-background px-3 py-2 text-sm'

export function DialogCreateTarefa({
  projetos,
  membros,
  children,
}: DialogCreateTarefaProps) {
  const [open, setOpen] = useState<boolean>()
  const [projetoId, setProjetoId] = useState('')
  const [membroId, setMembroId] = useState('')
  const [titulo, setTitulo] = useState('')
  const [status, setStatus] = useState('pendente')
  const [pending, setPending] = useState(false)
  const { toast } = useToast()

  const confirmar = async () => {
    if (!projetoId || !membroId || !titulo.trim()) {
      toast({ title: 'Preencha projeto, membro e título.' })
      return
    }

    setPending(true)
    const { erro } = await criarTarefa({
      projeto_id: projetoId,
      membro_id: membroId,
      titulo,
      status,
    })
    setPending(false)

    if (erro) {
      toast({ title: 'Não foi possível criar a tarefa!', description: erro })
    } else {
      toast({ title: 'Tarefa criada com sucesso!' })
      setProjetoId('')
      setMembroId('')
      setTitulo('')
      setStatus('pendente')
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova tarefa</DialogTitle>
          <DialogDescription>
            Escolha o projeto e o membro responsável, e dê um título à tarefa.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1">
          <Label htmlFor="titulo">Título</Label>
          <Input
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Insira o título"
            disabled={pending}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="projeto">Projeto</Label>
          <select
            id="projeto"
            value={projetoId}
            onChange={(e) => setProjetoId(e.target.value)}
            className={campo}
          >
            <option value="">Selecione um projeto</option>
            {projetos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="membro">Membro</Label>
          <select
            id="membro"
            value={membroId}
            onChange={(e) => setMembroId(e.target.value)}
            className={campo}
          >
            <option value="">Selecione um membro</option>
            {membros.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={campo}
          >
            <option value="pendente">Pendente</option>
            <option value="em_andamento">Em andamento</option>
            <option value="concluida">Concluída</option>
          </select>
        </div>

        <Button type="button" onClick={confirmar} pending={pending}>
          Criar tarefa
        </Button>
      </DialogContent>
    </Dialog>
  )
}