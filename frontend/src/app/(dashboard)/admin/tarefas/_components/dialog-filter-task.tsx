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
import FormFieldsTarefa from './form-fields-task'
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

interface DialogFilterTarefaProps {
  children: React.ReactNode
  projetos?: projetoType[]
  membros?: membroType[]
  tarefa?: tarefaType
  readOnly?: boolean
  filtroProjeto: string
  setFiltroProjeto: (str: string) => void
  filtroMembro: string
  setFiltroMembro: (str: string) => void
}

export function DialogFilterTarefa({ children, projetos, membros, tarefa, readOnly, filtroProjeto, setFiltroProjeto, filtroMembro, setFiltroMembro }: DialogFilterTarefaProps) {
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()
  const { pending } = useFormStatus()

  const apagarFiltros = () => {
    setFiltroProjeto('')
    setFiltroMembro('')
  }

  const aplicarFiltros = () => { setOpen(false) }

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)
    const { error } = await JSON.parse(await createTarefa(newForm))

    if (error) {
      toast({ title: 'Não foi possível criar a tarea!' })
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
          <DialogTitle>Filtrar tarefa</DialogTitle>
          <DialogDescription>
            Escolha o método de filtragem de tarefas e clique em &quot;Aplicar&quot; para aplicar o filtro.
          </DialogDescription>
        </DialogHeader>
        <FormFieldsGroup>
          {tarefa && <Input defaultValue={tarefa.id} type="text" name="id" hidden />}
          {tarefa && <Input defaultValue={tarefa.idMembro_alocado} type="text" name="idMembro_alocado" hidden />}
          {tarefa && <Input defaultValue={tarefa.idProjeto_vinculado} type="text" name="idProjeto_vinculado" hidden />}
          <FormField>
            <Label htmlFor="projeto">Projeto</Label>
            <select
              className="flex h-10 w-full rounded border border-input bg-background shadow px-3 py-2 text-sm col-start-2 col-end-5"
              id="idProjeto_vinculado"
              value={filtroProjeto}
              onChange={(event) => setFiltroProjeto(event.target.value)}
              disabled={pending}
              defaultValue={tarefa?.idProjeto_vinculado || ""}>
                <option value="">Selecione um projeto</option>
                {projetos?.map((projeto) => (
                  <option key={projeto.id} value={projeto.id}>{projeto.nome}</option>
                ))}
            </select>
          </FormField>
          <FormField>
            <Label htmlFor="membro">Membro</Label>
            <select
              className="flex h-10 w-full rounded border border-input bg-background shadow px-3 py-2 text-sm col-start-2 col-end-5"
              id="idMembro_alocado"
              value={filtroMembro}
              onChange={(event) => setFiltroMembro(event.target.value)}
              disabled={pending}
              defaultValue={tarefa?.idMembro_alocado || ""}>
                <option value="" disabled>Selecione um membro</option>
                {membros?.map((membro) => (
                  <option key={membro.id} value={membro.id}>{membro.nome}</option>
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
