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
import { projetoType } from '@/types/projeto'
import { LuInfo, LuPen, LuPlus, LuTrash } from 'react-icons/lu'
import { DialogUpdateProjeto } from './dialog-update-project'
import { DialogProjetoDelete } from './dialog-delete-project'
import { DialogInformationProjeto } from './dialog-information-project'
import { DialogCreateProjeto } from './dialog-create-project'
import ListFilteredProjects from './list-filtered-projects'

export default async function ListProjects() {
  const { response } = await api<projetoType[]>('GET', '/projetos')

  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os projetos.
      </DashboardContainer>
    )
  }

  return (
    <ListFilteredProjects projetos={response} />
  )
}
