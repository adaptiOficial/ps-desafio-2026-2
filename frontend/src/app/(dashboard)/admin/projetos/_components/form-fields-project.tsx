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
          <textarea className="flex w-full rounded border border-input bg-background shadow px-3 py-2 text-sm resize-none disabled:opacity-50 disabled:cursor-not-allowed col-start-2 col-end-5"
            name="descricao"
            id="descricao"
            placeholder="Insira a descrição do projeto"
            defaultValue={projeto?.descricao}
            disabled={pending}
            readOnly={readOnly}
            rows={6}
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
      </FormFieldsGroup>
      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}
