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
    <div className="flex flex-col h-screen md:grid md:grid-cols-[18rem_1fr]">
      <SidebarMain />
      <div className="flex-1 overflow-y-auto md:h-screen">{children}</div>
    </div>
  )
}
