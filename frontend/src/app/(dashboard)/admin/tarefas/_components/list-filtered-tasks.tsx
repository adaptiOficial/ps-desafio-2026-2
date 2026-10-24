'use client'

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

interface ListFilteredTasksProps {
    tarefas?: tarefaType[],
    membros?: membroType[],
    projetos?: projetoType[]
}

export default function ListFilteredTasks({ tarefas, membros, projetos }: ListFilteredTasksProps) {
  const [filtroProjeto, setFiltroProjeto] = useState('')
  const [filtroMembro, setFiltroMembro] = useState('')

  const tarefasFiltradas = tarefas?.filter((tarefa) => {
    const fProjeto = !filtroProjeto || tarefa.idProjeto_vinculado === filtroProjeto
    const fMembro = !filtroMembro || tarefa.idMembro_alocado === filtroMembro
    return fProjeto && fMembro
  })

  return (
    <>
      <DashboardContainer className="flex h-min space-x-0 gap-x-1 gap-y-2.5 max-sm:flex-col">
        <DialogCreateTarefa projetos={projetos} membros={membros}>
          <Button size="sm">
            <LuPlus />
            Nova tarefa
          </Button>
        </DialogCreateTarefa>
        <DialogFilterTarefa
          projetos={projetos}
          membros={membros}
          filtroProjeto={filtroProjeto}
          setFiltroProjeto={setFiltroProjeto}
          filtroMembro={filtroMembro}
          setFiltroMembro={setFiltroMembro}>
          <Button size="sm">
              <LuFilter />
              Filtrar tarefas
          </Button>
        </DialogFilterTarefa>
      </DashboardContainer>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Projeto</TableHead>
              <TableHead>Membro</TableHead>
              <TableHead className="hidden lg:table-cell">Início</TableHead>
              <TableHead className="hidden lg:table-cell">Fim</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tarefasFiltradas?.map((tarefa: tarefaType) => (
              <TableRow key={tarefa.id}>
                <TableCell>{tarefa.titulo}</TableCell>
                <TableCell>{tarefa.projeto.nome}</TableCell>
                <TableCell>{tarefa.membro?.nome}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  {new Date(tarefa.data_inicio).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {new Date(tarefa.data_fim).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
                </TableCell>
                <TableCell className="block sm:flex justify-end gap-2">
                  <DialogInformationTarefa tarefa={tarefa} projetos={projetos} membros={membros}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationTarefa>
                  <DialogUpdateTarefa tarefa={tarefa} projetos={projetos} membros={membros}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateTarefa>
                  <DialogTarefaDelete id={tarefa.id}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogTarefaDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!tarefasFiltradas?.length && (
            <TableCaption>Nenhuma tarefa encontrada.</TableCaption>
          )}
        </Table>
      </DashboardContainer>
    </>
  )
}
