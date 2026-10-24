"use client"

import { Button } from '@/components/button'
import { FormFieldsGroup, FormField } from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { cn } from '@/lib/utils'
import { tarefaType } from '@/types/tarefa'
import { useFormStatus } from 'react-dom'
import { projetoType } from '@/types/projeto'
import { membroType } from '@/types/member'

interface FormFieldsTarefaProps {
  tarefa?: tarefaType
  readOnly?: boolean
  projetos?: projetoType[]
  membros?: membroType[]
}
export default function FormFieldsTarefa({
  tarefa,
  readOnly,
  projetos,
  membros,
}: FormFieldsTarefaProps) {
  const { pending } = useFormStatus()

  return (
    <>
      <FormFieldsGroup>
        {tarefa && <Input defaultValue={tarefa.id} type="text" name="id" hidden />}
        {tarefa && <Input defaultValue={tarefa.idMembro_alocado} type="text" name="idMembro_alocado" hidden />}
        {tarefa && <Input defaultValue={tarefa.idProjeto_vinculado} type="text" name="idProjeto_vinculado" hidden />}
        <FormField>
          <Label htmlFor="titulo">Título</Label>
          <Input
            name="titulo"
            id="titulo"
            placeholder="Insira o título da tarefa"
            defaultValue={tarefa?.titulo}
            disabled={pending}
            readOnly={readOnly}
          />
        </FormField>
        <FormField>
          <Label htmlFor="descricao">Descrição</Label>
          <textarea className="flex w-full rounded border border-input bg-background shadow px-3 py-2 text-sm resize-none disabled:opacity-50 disabled:cursor-not-allowed col-start-2 col-end-5"
            name="descricao"
            id="descricao"
            placeholder="Insira a descrição da tarefa"
            defaultValue={tarefa?.descricao}
            disabled={pending}
            readOnly={readOnly}
            rows={6}
          />
        </FormField>
        <FormField>
          <Label htmlFor="projeto">Projeto</Label>
          <select
            className="flex h-10 w-full rounded border border-input bg-background shadow px-3 py-2 text-sm col-start-2 col-end-5"
            id="idProjeto_vinculado"
            name="idProjeto_vinculado"
            required
            disabled={pending || readOnly}
            defaultValue={tarefa?.idProjeto_vinculado || ""}>
              <option value="" disabled>Selecione um projeto</option>
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
            name="idMembro_alocado"
            required
            disabled={pending || readOnly}
            defaultValue={tarefa?.idMembro_alocado || ""}>
              <option value="" disabled>Selecione um membro</option>
              {membros?.map((membro) => (
                <option key={membro.id} value={membro.id}>{membro.nome}</option>
              ))}
          </select>
        </FormField>
        <FormField>
          <Label htmlFor="data_inicio">Data de início</Label>
          <Input
            name="data_inicio"
            id="data_inicio"
            type="date"
            defaultValue={tarefa?.data_inicio}
            disabled={pending}
            readOnly={readOnly}
          />
        </FormField>
        <FormField>
          <Label htmlFor="data_fim">Data de fim</Label>
          <Input
            name="data_fim"
            id="data_fim"
            type="date"
            defaultValue={tarefa?.data_fim}
            disabled={pending}
            readOnly={readOnly}
          />
        </FormField>
      </FormFieldsGroup>
      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}
