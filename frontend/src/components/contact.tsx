import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Input, InputProps } from '@/components/input'
import { Button } from '@/components/button'

const ContactVariants = cva('mx-auto my-20', {
  variants: {
    variant: {
      default:
        'w-4/5 sm:w-2/5 md:w-1/3 *:flex *:flex-col *:justify-between [&>main]:gap-4',
      cards:
        'w-5/6 *:flex *:flex-col [&>header]:mb-6 [&>main]:lg:flex-row [&>main>div]:max-lg:mb-5 [&>main>div]:lg:w-[39%] [&>main>section]:bg-card [&>main>section]:w-full [&>main>section]:lg:w-[58%] [&>main>section]:p-5 [&>main>section]:ml-auto [&>main>section]:rounded',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type ContactGenericProps<T = unknown> = {
  children?: React.ReactNode
  className?: string
} & T

export function Contact({
  variant,
  className,
  children,
  ...props
}: ContactGenericProps<React.HTMLProps<HTMLElement>> &
  VariantProps<typeof ContactVariants>) {
  return (
    <section className={cn(ContactVariants({ variant }), className)} {...props}>
      {children}
    </section>
  )
}

export function ContactHeader({
  className,
  children,
  ...props
}: ContactGenericProps<React.HTMLProps<HTMLDivElement>>) {
  return (
    <header
      className={cn('w-full text-center mb-2 lg:mb-5', className)}
      {...props}
    >
      {children}
    </header>
  )
}

export function ContactTitle({
  className,
  children,
  ...props
}: ContactGenericProps<React.HTMLProps<HTMLHeadingElement>>) {
  return (
    <h1
      className={cn(
        'text-card-foreground text-center bg-card rounded font-bold text-3xl py-8 shadow',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

export function ContactSubtitle({
  className,
  children,
  ...props
}: ContactGenericProps<React.HTMLProps<HTMLHeadingElement>>) {
  return (
    <h2
      className={cn(
        'text-background text-lg md:text-xl lg:text-2xl font-bold mt-2 lg:mt-5 py-7 lg:py-14',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

export function ContactBody({
  className,
  children,
  ...props
}: ContactGenericProps<React.HTMLProps<HTMLDivElement>>) {
  return (
    <main className={className} {...props}>
      {children}
    </main>
  )
}

export function ContactInformations({
  className,
  children,
  ...props
}: ContactGenericProps<React.HTMLProps<HTMLDivElement>>) {
  return (
    <div
      className={cn(
        'bg-card w-full p-5 flex flex-col justify-between',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function ContactSocialMedia({
  className,
  children,
  ...props
}: ContactGenericProps<React.HTMLProps<HTMLDivElement>>) {
  return (
    <div className={cn('flex flex-row items-center', className)} {...props}>
      {children}
    </div>
  )
}

export function ContactSocialMediaIcon({
  className,
  children,
  ...props
}: ContactGenericProps<React.HTMLProps<HTMLDivElement>>) {
  return (
    <div
      className={cn(
        'text-background w-fit rounded text-3xl bg-foreground p-3 m-2',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function ContactSocialMediaTitle({
  className,
  children,
  ...props
}: ContactGenericProps<React.HTMLProps<HTMLDivElement>>) {
  return (
    <div className={cn('text-lg font-bold mb-0', className)} {...props}>
      {children}
    </div>
  )
}

export function ContactSocialMediaContent({
  className,
  children,
  ...props
}: ContactGenericProps<React.HTMLProps<HTMLDivElement>>) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export function ContactSocialMediaDescription({
  className,
  children,
  ...props
}: ContactGenericProps<React.HTMLProps<HTMLDivElement>>) {
  return (
    <div className={cn('text-base', className)} {...props}>
      {children}
    </div>
  )
}

export function ContactContent({
  className,
  children,
  ...props
}: ContactGenericProps<React.HTMLProps<HTMLDivElement>>) {
  return (
    <section className={cn('flex flex-col', className)} {...props}>
      {children}
    </section>
  )
}

export function ContactInput({ className, ...props }: InputProps) {
  return <Input className={cn('bg-card mb-4', className)} {...props} />
}

export function ContactInputGroup({
  className,
  children,
  ...props
}: ContactGenericProps<React.HTMLProps<HTMLDivElement>>) {
  return (
    <div
      className={cn('flex flex-col md:flex-row md:gap-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function ContactButton({
  className,
  children,
  ...props
}: ContactGenericProps<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <Button
      variant={'default-inverse'}
      className={cn(
        'bg-card text-card-foreground mx-auto w-2/5 md:w-1/3 lg:w-1/5',
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  )
}
