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
import FormFieldsProjeto from './form-fields-project'
import { createTarefa } from '@/actions/tarefa'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { projetoType } from '@/types/projeto'
import { membroType } from '@/types/member'
import { FormField, FormFieldsGroup } from '@/components/dashboard/form'
import { Label } from '@/components/label'
import { tarefaType } from '@/types/tarefa'
import { Input } from '@/components/input'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/button'
import { cn } from '@/lib/utils'

interface DialogFilterProjetoProps {
  children: React.ReactNode
  projetos?: projetoType[]
  readOnly?: boolean
  filtroCliente: string
  setFiltroCliente: (str: string) => void
}

export function DialogFilterProjeto({ children, projetos, readOnly, filtroCliente, setFiltroCliente }: DialogFilterProjetoProps) {
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()
  const { pending } = useFormStatus()

  const apagarFiltros = () => { setFiltroCliente('') }
  const aplicarFiltros = () => { setOpen(false) }
  const clientesUnicos = Array.from(
    new Set(projetos?.map((p) => p.nome_cliente).filter(Boolean))
  )

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)
    const { error } = await JSON.parse(await createTarefa(newForm))

    if (error) {
      toast({ variant: 'destructive', title: 'Não foi possível criar a tarea!' })
    } else {
      toast({ title: 'Tarefa criada com sucesso!' })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtrar projeto</DialogTitle>
          <DialogDescription>
            Escolha o método de filtragem de projetos e clique em &quot;Aplicar&quot; para aplicar o filtro.
          </DialogDescription>
        </DialogHeader>
        <FormFieldsGroup>
          <FormField>
            <Label htmlFor="projeto">Cliente</Label>
            <select
              className="flex h-10 w-full rounded border border-input bg-background shadow px-3 py-2 text-sm col-start-2 col-end-5"
              id="cliente"
              value={filtroCliente}
              onChange={(event) => setFiltroCliente(event.target.value)}
              disabled={pending}
              defaultValue="">
                <option value="">Selecione um cliente</option>
                {clientesUnicos.map((cliente) => (
                  <option key={cliente} value={cliente}>{cliente}</option>
                ))}
            </select>
          </FormField>
        </FormFieldsGroup>
        <DialogFooter className={cn({ hidden: readOnly })}>
          <Button type="submit" pending={pending} onClick={apagarFiltros}>
            Remover filtros
          </Button>
          <Button type="submit" pending={pending} onClick={aplicarFiltros}>
            Aplicar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
