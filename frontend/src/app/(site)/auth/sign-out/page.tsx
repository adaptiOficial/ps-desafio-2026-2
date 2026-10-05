'use client'

import { signOut } from 'next-auth/react'
import { useEffect } from 'react'

export default function SignOutPage() {
  useEffect(() => {
    signOut({ redirect: true, callbackUrl: '/auth/sign-in' })
  }, [])
}
