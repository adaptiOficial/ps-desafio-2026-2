import { SessionProvider } from 'next-auth/react'

type NextAuthSessionProviderProps = {
  children: React.ReactNode
}

export default function NextAuthSessionProvider({
  children,
}: NextAuthSessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
}
