'use client'

import NextAuthSessionProvider from '@/providers/sessionProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
    </>
  )
}
