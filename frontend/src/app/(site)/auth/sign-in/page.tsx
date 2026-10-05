'use client'

import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormFieldsSignIn } from './_component/form-fields-sign-in'
import { signIn } from 'next-auth/react'

export default function SignInPage() {
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const login = async (form: FormData) => {
    const auth = await signIn('credentials', {
      email: form.get('email'),
      password: form.get('password'),
      redirect: false,
    })

    if (auth?.error) {
      setError('Credenciais inválidas!')
      return
    }

    router.replace('/admin')
  }

  return (
    <div className="flex-1 flex items-center justify-center min-h-screen">
      <DashboardContainer className="space-x-0 space-y-4 p-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 leading-none">Conecte-se</h2>
          <p className="text-sm text-muted-foreground leading-none">
            Seja bem-vindo novamente!
          </p>
        </div>
        <form action={login} className="space-y-2">
          <FormFieldsSignIn error={error} />
        </form>
      </DashboardContainer>
    </div>
  )
}
