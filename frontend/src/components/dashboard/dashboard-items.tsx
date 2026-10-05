import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

export function DashboardHeader({
  className,
  children,
  ...props
}: ComponentProps<'header'>) {
  return (
    <header className={cn('bg-card border-b p-6', className)} {...props}>
      {children}
    </header>
  )
}

export function DashboardHeaderTitle({
  className,
  children,
  ...props
}: ComponentProps<'h1'>) {
  return (
    <h1
      className={cn(
        'inline-flex items-center gap-2.5 [&_svg]:size-6 [&_svg]:stroke-[2.5px] font-bold text-2xl',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

export function DashboardHeaderDescription({
  className,
  children,
  ...props
}: ComponentProps<'p'>) {
  return (
    <p className={cn('', className)} {...props}>
      {children}
    </p>
  )
}

export function DashboardMain({
  className,
  children,
  ...props
}: ComponentProps<'main'>) {
  return (
    <main className={cn('p-6 space-y-6', className)} {...props}>
      {children}
    </main>
  )
}

export function DashboardContainer({
  className,
  children,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn('bg-card border rounded p-4 space-x-2.5', className)}
      {...props}
    >
      {children}
    </div>
  )
}
