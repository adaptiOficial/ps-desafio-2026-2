import {
    DashboardContainer,
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuListChecks } from 'react-icons/lu'
import ListTasks from './_components/list-task'
import { Suspense } from 'react'
import { SkeletonProjects } from './_components/skeleton-projects'

export default async function Page() {
  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuListChecks />
          Tarefas
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Cadastre, edite, visualize e exclua tarefas.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <Suspense fallback={<SkeletonProjects />}>
          <ListTasks />
        </Suspense>
      </DashboardMain>
    </>
  )
}
