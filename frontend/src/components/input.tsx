import * as React from 'react'

import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

export const inputVariants = cva('', {
  variants: {
    size: {
      sm: 'px-2.5 py-1.5 text-sm',
      default: 'px-3 py-2 text-base',
      lg: 'px-4 py-2.5 text-lg',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})
export interface InputProps
  extends VariantProps<typeof inputVariants>,
    Omit<ComponentProps<'input'>, 'size'> {
  error?: string
}

export function Input({
  className,
  type,
  error,
  hidden,
  size,
  ...props
}: InputProps) {
  return (
    <>
      <input
        type={type}
        className={cn(
          inputVariants({ size }),
          'flex rounded border border-input bg-transparent shadow transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          error &&
            `border-destructive after:content-['*'] after:mt-0.5 after:text-destructive`,
          { hidden },
          className,
        )}
        {...props}
      />
      {error && <p className="text-destructive text-xs mt-2">{error}</p>}
    </>
  )
}
