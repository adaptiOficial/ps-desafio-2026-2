'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2',
)

interface LabelProps
  extends ComponentProps<'label'>,
    VariantProps<typeof labelVariants> {
  required?: boolean
}

export function Label({ className, required, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      className={cn(
        labelVariants(),
        { "after:content-['*'] after:ml-0.5 after:text-destructive": required },
        className,
      )}
      {...props}
    />
  )
}
