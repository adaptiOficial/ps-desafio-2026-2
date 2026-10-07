import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuUsers } from 'react-icons/lu'
import ListMembers from './_components/list-member'
import { Suspense } from 'react'
import { SkeletonMembers } from './_components/skeleton-members'

export default async function Page() {
  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuUsers />
          Membros
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Cadastre, edite, visualize e exclua membros.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <Suspense fallback={<SkeletonMembers />}>
          <ListMembers />
        </Suspense>
      </DashboardMain>
    </>
  )
}
