import { type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { api } from '@/services/api'
import { authType } from '@/types/auth'

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const { response, error } = await api<authType | null>(
          'POST',
          '/login',
          {
            headers: {
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          },
        )

        if (!response || error) {
          return null
        }

        return response ?? null
      },
    }),
  ],
} satisfies NextAuthConfig
