import type { Metadata } from 'next'
import { SidebarMain } from './_components/sidebar-main'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="md:grid md:grid-cols-[18rem_1fr]">
      <SidebarMain />
      <div className="md:h-screen md:overflow-y-auto">{children}</div>
    </div>
  )
}
