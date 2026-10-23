import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuClipboardList } from 'react-icons/lu'
import ListTarefas from './_components/list-tarefas'

export default async function Page() {
  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuClipboardList />
          Tarefas
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Acompanhe as tarefas de cada projeto.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <ListTarefas />
      </DashboardMain>
    </>
  )
}