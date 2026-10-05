'use client'

import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const MVVVariants = cva(
  'flex flex-col justify-center items-center w-[330px] min-h-[400px] md:h-auto p-10 gap-5 ',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground flex-1 max-h-auto w-auto py-8 px-10 md:px-8 lg:p-14 xl:px-28',
        card: 'bg-card text-card-foreground max-h-auto shadow-sm rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const IconVariants = cva(
  'flex justify-center items-center w-[105px] h-[105px] bg-primary-50 rounded-full shadow-lg p-5',
  {
    variants: {
      variant: {
        default: 'bg-card text-primary',
        card: 'bg-card-foreground text-card',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const ContainerVariants = cva(
  'flex items-center justify-center max-md:flex-col ',
  {
    variants: {
      variant: {
        default: 'bg-primary h-full max-md:flex-col ',
        card: 'gap-20 max-lg:gap-10 max-md:gap-7 md:items-stretch',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type MVVGenericProps<T = any> = {
  children: React.ReactNode
  className?: string
} & T

export function MVVCard({
  className,
  children,
  variant,
  ...props
}: MVVGenericProps) {
  return (
    <div className={cn(MVVVariants({ variant }), className)} {...props}>
      {children}
    </div>
  )
}

export function MVVHeader({ className, children, ...props }: MVVGenericProps) {
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center gap-8',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function MVVIcon({
  className,
  children,
  variant,
  ...props
}: MVVGenericProps) {
  return (
    <div
      className={cn(IconVariants({ variant }), className, children)}
      {...props}
    >
      {children}
    </div>
  )
}

export function MVVContent({ className, children, ...props }: MVVGenericProps) {
  return (
    <div
      className={cn(
        ' text-center flex flex-col justify-center gap-3',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function MVVTittle({ className, children, ...props }: MVVGenericProps) {
  return (
    <>
      <h1 className={cn('font-bold text-3xl', className)} {...props}>
        {children}
      </h1>
    </>
  )
}

export function MVVDescription({
  className,
  children,
  ...props
}: MVVGenericProps) {
  return (
    <>
      <p className={cn('text-base font-normal ', className)} {...props}>
        {children}
      </p>
    </>
  )
}

export function MVVContainer({
  className,
  children,
  variant,
  ...props
}: MVVGenericProps) {
  return (
    <div className={cn(ContainerVariants({ variant }), className)} {...props}>
      {children}
    </div>
  )
}
