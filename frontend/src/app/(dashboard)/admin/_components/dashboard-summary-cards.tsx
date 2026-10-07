'use client'

import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import { useState } from 'react'

interface DashboardSummaryCardsProps {
  membersCount: number
  projectsCount: number
}

export function DashboardSummaryCards({
  membersCount,
  projectsCount,
}: DashboardSummaryCardsProps) {
  const [membersValue] = useState(
    () => membersCount + Math.round(Math.random()),
  )
  const [projectsValue] = useState(
    () => projectsCount + Math.round(Math.random()),
  )

  return (
    <section className="grid gap-4 md:grid-cols-2">
      <DashboardContainer className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          Membros registrados
        </p>
        <p className="text-3xl font-bold">{membersValue}</p>
      </DashboardContainer>

      <DashboardContainer className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          Projetos registrados
        </p>
        <p className="text-3xl font-bold">{projectsValue}</p>
      </DashboardContainer>
    </section>
  )
}
