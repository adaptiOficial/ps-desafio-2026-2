import NextAuth from 'next-auth'
import { authType } from '@/types/auth'
import authConfig from '@/auth.config'

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user)
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: (token.user as authType) || null,
      }
    },
  },
  ...authConfig,
})

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: authType
  }
}
