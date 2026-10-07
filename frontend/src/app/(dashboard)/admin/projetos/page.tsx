import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuFolderKanban } from 'react-icons/lu'
import ListProjects from './_components/list-project'
import { Suspense } from 'react'
import { SkeletonProjects } from './_components/skeleton-projects'

export default async function Page() {
  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuFolderKanban />
          Projetos
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Cadastre, edite, visualize e exclua projetos.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <Suspense fallback={<SkeletonProjects />}>
          <ListProjects />
        </Suspense>
      </DashboardMain>
    </>
  )
}
