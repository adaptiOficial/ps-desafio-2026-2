"use client"

import { Button } from '@/components/button'
import { FormFieldsGroup, FormField } from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { cn } from '@/lib/utils'
import { projetoType } from '@/types/projeto'
import { useFormStatus } from 'react-dom'

interface FormFieldsProjetoProps {
  projeto?: projetoType
  readOnly?: boolean
}

export default function FormFieldsProjeto({
  projeto,
  readOnly,
}: FormFieldsProjetoProps) {
  const { pending } = useFormStatus()

  return (
    <>
      <FormFieldsGroup>
        {projeto && <Input defaultValue={projeto.id} type="text" name="id" hidden />}

        {projeto && <input type="hidden" name="_method" value="PUT" />}
        
        <FormField>
          <Label htmlFor="nome">Nome</Label>
          <Input
            name="nome"
            id="nome"
            placeholder="Insira o nome"
            defaultValue={projeto?.nome}
            disabled={pending}
            readOnly={readOnly}
          />
        </FormField>
        <FormField>
          <Label htmlFor="nome_cliente">Nome do cliente</Label>
          <Input
            name="nome_cliente"
            id="nome_cliente"
            placeholder="Insira o nome do cliente"
            defaultValue={projeto?.nome_cliente}
            disabled={pending}
            readOnly={readOnly}
          />
        </FormField>
        <FormField>
          <Label htmlFor="descricao">Descrição</Label>
          <Input
            name="descricao"
            id="descricao"
            placeholder="Insira a descrição do projeto"
            defaultValue={projeto?.descricao}
            disabled={pending}
            readOnly={readOnly}
          />
        </FormField>
        <FormField>
          <Label htmlFor="data_inicio">Data de início</Label>
          <Input
            name="data_inicio"
            id="data_inicio"
            type="date"
            defaultValue={projeto?.data_inicio}
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
            defaultValue={projeto?.data_fim}
            disabled={pending}
            readOnly={readOnly}
          />
        </FormField>
        <FormField>
          <Label htmlFor="status">Status</Label>
          <select
            name="status"
            id="status"
            defaultValue={projeto?.status || 'Ativo'}
            disabled={pending || readOnly}
            className="flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="Ativo">Ativo</option>
            <option value="Concluido">Concluído</option>
            <option value="Pausado">Pausado</option>
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
