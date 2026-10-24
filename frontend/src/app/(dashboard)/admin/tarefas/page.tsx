import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { LuListTodo } from 'react-icons/lu'
import ListTarefas from './_components/list-tarefas'
import { SkeletonTarefas } from './_components/skeleton-tarefas'

export const metadata: Metadata = {
  title: 'Tarefas',
  description: 'Gerencie as tarefas dos projetos e seus responsáveis.',
}

export default async function Page() {
  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuListTodo />
          Tarefas
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Cadastre, edite e exclua tarefas vinculadas a projetos e membros.
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
