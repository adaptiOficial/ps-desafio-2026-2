import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuUsers } from 'react-icons/lu'
import ListUsers from './_components/list-users'
import { Suspense } from 'react'
import { SkeletonUsers } from './_components/skeleton-users'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { page, per_page: perPage, name, email } = searchParams

  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuUsers />
          Usuários
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Cadastre, edite, visualize e exclua usuários.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <Suspense fallback={<SkeletonUsers />}>
          <ListUsers
            page={Number(page)}
            perPage={Number(perPage)}
            name={name as string}
            email={email as string}
          />
        </Suspense>
      </DashboardMain>
    </>
  )
}
