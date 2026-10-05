import type { Metadata } from 'next'
import { Arimo } from 'next/font/google'
import '@/app/globals.css'
import { Providers } from '@/providers/providers'
import { Toaster as SonnerToaster } from '@/components/sonner'
import { Toaster } from '@/components/toaster'

const arimo = Arimo({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Adapti Project Template',
  description: 'Created by Adapti 2024',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={arimo.className}>
        <Providers>
          {children}
          <SonnerToaster />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
