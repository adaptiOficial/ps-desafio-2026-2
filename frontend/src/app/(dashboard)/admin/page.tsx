
import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { api } from '@/services/api'
import { membroType } from '@/types/member'
import { projetoType } from '@/types/projeto'
import { LuHome } from 'react-icons/lu'
import { DashboardSummaryCards } from './_components/dashboard-summary-cards'

interface ProjetosResponse {
  ativo: projetoType[]
  concluidos: projetoType[]
  excluidos: projetoType[]
}

export default async function Page() {
  const [{ response: members }, { response: projects }] = await Promise.all([
    api<membroType[]>('GET', '/membros'),
    api<ProjetosResponse>('GET', '/projetos'),
  ])

  const projectsCount =
    (projects?.ativo?.length ?? 0) +
    (projects?.concluidos?.length ?? 0)

  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuHome />
          Sistema de Gestão de Projetos MEJ
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Tela principal da aplicação.
        </DashboardHeaderDescription>
      </DashboardHeader>

      <DashboardMain>
        <DashboardSummaryCards
          membersCount={members?.length ?? 0}
          projectsCount={projectsCount}
        />
      </DashboardMain>
    </>
  )
}
