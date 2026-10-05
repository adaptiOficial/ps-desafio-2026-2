import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

export interface H2Props extends ComponentProps<'h2'> {}

export function H2({ className, ...props }: H2Props) {
  return <h2 className={cn('text-3xl font-bold', className)} {...props} />
}
