import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import { Button } from '@/components/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { api } from '@/services/api'
import { tarefaType } from '@/types/tarefa'
import { LuInfo, LuPen, LuPlus, LuTrash, LuFilter } from 'react-icons/lu'
import { DialogUpdateTarefa } from './dialog-update-task'
import { DialogTarefaDelete } from './dialog-delete-task'
import { DialogInformationTarefa } from './dialog-information-task'
import { DialogCreateTarefa } from './dialog-create-task'
import { DialogFilterTarefa } from './dialog-filter-task'
import { projetoType } from '@/types/projeto'
import { membroType } from '@/types/member'
import { useState } from 'react'
import ListFilteredTasks from './list-filtered-tasks'

export default async function ListTasks() {
  const { response } = await api<tarefaType[]>('GET', '/tarefas')
  const { response: projetos } = await api<projetoType[]>('GET', '/projetos')
  const { response: membros } = await api<membroType[]>('GET', '/membros')
  
  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter as tarefas.
      </DashboardContainer>
    )
  }

  return (
    <ListFilteredTasks tarefas={response} projetos={projetos} membros={membros}/>
  )
}
