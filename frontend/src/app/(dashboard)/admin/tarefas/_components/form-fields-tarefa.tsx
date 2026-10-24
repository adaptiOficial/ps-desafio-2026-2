"use client"

import { Button } from '@/components/button'
import { FormFieldsGroup, FormField } from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { cn } from '@/lib/utils'
import { useFormStatus } from 'react-dom'
import { useState, useEffect } from 'react'
import { api } from '@/services/api'
import { membroType } from '@/types/member'
import { projetoType } from '@/types/projeto'

interface FormFieldsTarefaProps {
  tarefa?: any
  readOnly?: boolean
}

export default function FormFieldsTarefa({
  tarefa,
  readOnly,
}: FormFieldsTarefaProps) {
  const { pending } = useFormStatus()
  const [membros, setMembros] = useState<membroType[]>([])
  const [projetos, setProjetos] = useState<projetoType[]>([])

  useEffect(() => {
    // Busca membros e projetos para preencher os selects
    api<membroType[]>('GET', '/membros').then(({ response }) => {
      if (response) setMembros(response)
    })
    api<projetoType[]>('GET', '/projetos').then(({ response }) => {
      if (response) setProjetos(response)
    })
  }, [])

  return (
    <>
      <FormFieldsGroup>
        {tarefa && <Input defaultValue={tarefa.id} type="text" name="id" hidden />}
        
        <FormField>
          <Label htmlFor="nome">Título</Label>
          <Input
            name="nome"
            id="nome"
            placeholder="Insira o nome da tarefa"
            defaultValue={tarefa?.nome}
            disabled={pending}
            readOnly={readOnly}
          />
        </FormField>

        <FormField>
          <Label htmlFor="descricao">Descrição</Label>
          <Input
            name="descricao"
            id="descricao"
            placeholder="Insira a descrição"
            defaultValue={tarefa?.descricao}
            disabled={pending}
            readOnly={readOnly}
          />
        </FormField>

        <FormField>
          <Label htmlFor="status">Status</Label>
          <select
            name="status"
            id="status"
            defaultValue={tarefa?.status || 'pendente'}
            disabled={pending || readOnly}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="pendente">Pendente</option>
            <option value="em_progresso">Em progresso</option>
            <option value="concluida">Concluída</option>
          </select>
        </FormField>

        <FormField>
        <Label htmlFor="data_inicio">Data de início</Label>
        <Input
          type="date"
          name="data_inicio"
          id="data_inicio"
          defaultValue={tarefa?.data_inicio?.slice(0, 10)}
          disabled={pending}
          readOnly={readOnly}
        />
        </FormField>

        <FormField>
          <Label htmlFor="data_fim">Data de fim</Label>
          <Input
            type="date"
            name="data_fim"
            id="data_fim"
            defaultValue={tarefa?.data_fim?.slice(0, 10)}
            disabled={pending}
            readOnly={readOnly}
          />
        </FormField>

        {/* Vínculo com Projeto */}
        <FormField>
          <Label htmlFor="projeto_id">Projeto</Label>
          <select
            key={projetos.length} // Força a atualização do select quando projetos mudarem
            name="projeto_id"
            id="projeto_id"
            defaultValue={tarefa?.projeto_id || ''}
            disabled={pending || readOnly}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Selecione um projeto...</option>
            {projetos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>
        </FormField>

        {/* Vínculo com Membro responsável */}
        <FormField>
          <Label htmlFor="membro_id">Membro Responsável</Label>
          <select
            key={membros.length} // Força a atualização do select quando membros mudarem
            name="membro_id"
            id="membro_id"
            defaultValue={tarefa?.membro_id || ''}
            disabled={pending || readOnly}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Selecione um membro...</option>
            {membros.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nome}
              </option>
            ))}
          </select>
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
