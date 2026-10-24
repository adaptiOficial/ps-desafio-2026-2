import {
    DashboardHeader,
    DashboardHeaderDescription,
    DashboardHeaderTitle,
    DashboardMain,
  } from '@/components/dashboard/dashboard-items'
  import { LuListTodo } from 'react-icons/lu'
  import ListTarefas from './_components/list-tarefas'
  import { Suspense } from 'react'
  import { SkeletonTarefas } from './_components/skeleton-tarefas'
  
  export default async function Page() {
    return (
      <>
        <DashboardHeader>
          <DashboardHeaderTitle>
            <LuListTodo />
            Tarefas
          </DashboardHeaderTitle>
          <DashboardHeaderDescription>
            Cadastre, edite, visualize e exclua tarefas.
          </DashboardHeaderDescription>
        </DashboardHeader>
        <DashboardMain>
          <Suspense fallback={<SkeletonTarefas />}>
            <ListTarefas />
          </Suspense>
        </DashboardMain>
      </>
    )
  }