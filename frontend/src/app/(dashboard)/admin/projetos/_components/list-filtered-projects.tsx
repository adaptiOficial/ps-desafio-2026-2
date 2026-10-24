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
import { projetoType } from '@/types/projeto'
import { membroType } from '@/types/member'
import { useState } from 'react'
import { DialogCreateProjeto } from './dialog-create-project'
import { DialogInformationProjeto } from './dialog-information-project'
import { DialogProjetoDelete } from './dialog-delete-project'
import { DialogUpdateProjeto } from './dialog-update-project'
import { DialogFilterProjeto } from './dialog-filter-project'

interface ListFilteredProjectsProps {
    projetos?: projetoType[]
}

export default function ListFilteredProjects({ projetos }: ListFilteredProjectsProps) {
  const [filtroCliente, setFiltroCliente] = useState('')

  const projetosFiltrados = projetos?.filter((projeto) => {
    return !filtroCliente || projeto.nome_cliente === filtroCliente
  })

  return (
    <>
      <DashboardContainer className="flex h-min space-x-0 gap-x-1 gap-y-2.5 max-sm:flex-col">
        <DialogCreateProjeto>
          <Button size="sm">
            <LuPlus />
            Novo projeto
          </Button>
        </DialogCreateProjeto>
        <DialogFilterProjeto
          projetos={projetos}
          filtroCliente={filtroCliente}
          setFiltroCliente={setFiltroCliente}>
          <Button size="sm">
              <LuFilter />
              Filtrar projetos
          </Button>
        </DialogFilterProjeto>
      </DashboardContainer>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead className="hidden lg:table-cell">Início</TableHead>
              <TableHead className="hidden lg:table-cell">Fim</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projetosFiltrados?.map((projeto: projetoType) => (
              <TableRow key={projeto.id}>
                <TableCell>{projeto.nome}</TableCell>
                <TableCell>{projeto.nome_cliente}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  {new Date(projeto.data_inicio).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {new Date(projeto.data_fim).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  <DialogInformationProjeto projeto={projeto}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationProjeto>
                  <DialogUpdateProjeto projeto={projeto}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateProjeto>
                  <DialogProjetoDelete id={projeto.id}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogProjetoDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!projetosFiltrados?.length && (
            <TableCaption>Nenhum projeto encontrado.</TableCaption>
          )}
        </Table>
      </DashboardContainer>
    </>
  )
}
