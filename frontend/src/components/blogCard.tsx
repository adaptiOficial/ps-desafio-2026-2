import { cn } from '@/lib/utils'
import { Button } from './button'
import { VariantProps, cva } from 'class-variance-authority'
import Image from 'next/image'

const cardVariants = cva(
  'bg-card rounded shadow text-xs p-5 text-ellipsis overflow-hidden [&_.blog-card-information]:line-clamp-2 [&_.blog-card-title]:line-clamp-3 flex *:items-start justify-start *:*:text-left max-sm:w-[17.45rem]',
  {
    variants: {
      variant: {
        default:
          'h-[13rem] w-[18rem] flex-col relative p-0 [&_.blog-card-title]:line-clamp-2 [&_.blog-card-title]:text-card [&_.blog-card-content]:min-h-3/4 [&_.blog-card-content]:h-auto [&_.blog-card-content]:w-auto [&_.blog-card-content]:absolute [&_.blog-card-content]:bottom-0 [&_.blog-card-content]:bg-gray-400 [&_.blog-card-content]:justify-center [&_.blog-card-content]:p-4 [&_.blog-card-content]:rounded-ee [&_.blog-card-content]:backdrop-blur-md [&_.blog-card-content]:bg-opacity-50 [&_.blog-card-content]:flex-wrap',
        horizontal:
          'w-[34.5rem] h-[13.5rem] [&_.blog-card-image]:rounded-e-none [&_.blog-card-button]:ml-4 [&_.blog-card-button]:max-sm:ml-0 [&_.blog-card-information]:line-clamp-3 [&_.blog-card-information]:pl-4 [&_.blog-card-title]:pl-4 [&_.blog-card-date]:pl-4 [&_.blog-card-information]:text-xs max-sm:h-auto max-sm:flex-col [&_.blog-card-button]:max-sm:text-[0.75rem] [&_.blog-card-information]:max-sm:pl-0 [&_.blog-card-date]:max-sm:pl-0 [&_.blog-card-title]:max-sm:pl-0 [&_.blog-card-content]:max-sm:gap-y-2 [&_.blog-card-image]:max-sm:rounded-t [&_.blog-card-image]:max-sm:rounded-b-none',
        vertical:
          'w-[18rem] h-auto flex-col text-xs [&_.blog-card-content]:gap-y-2 [&_.blog-card-date]:mt-2 [&_.blog-card-image]:rounded-b-none [&_.blog-card-image]:rounded-t',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type BlogCardProps<T = unknown> = {
  children: React.ReactNode
  className?: string
} & T

interface BlogCardVariantProps extends VariantProps<typeof cardVariants> {}

export function BlogCard({
  className,
  children,
  variant,
  ...props
}: BlogCardProps<BlogCardVariantProps>) {
  return (
    <div className={cn(cardVariants({ variant }), className)} {...props}>
      {children}
    </div>
  )
}

export function BlogCardHeader({
  className,
  children,
  ...props
}: BlogCardProps) {
  return (
    <header className={cn('w-full', className)} {...props}>
      {children}
    </header>
  )
}

type BlogCardPropsImage = {
  className?: string
  src: string
  alt: string
  width: number
  height?: number
}

export function BlogCardImage({
  className,
  src,
  alt,
  width,
  height,
}: BlogCardPropsImage) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        'blog-card-image w-full h-full object-cover rounded',
        className,
      )}
    />
  )
}

export function BlogCardContent({
  className,
  children,
  ...props
}: BlogCardProps) {
  return (
    <div
      className={cn(
        'blog-card-content flex flex-col h-full w-full justify-between gap-y-1 max-sm:mt-2',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function BlogCardDate({ className, children, ...props }: BlogCardProps) {
  return (
    <p
      className={cn(
        'blog-card-date text-card-foreground font-normal max-h-5 max-sm:max-h-4',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  )
}

export function BlogCardTitle({
  className,
  children,
  ...props
}: BlogCardProps) {
  return (
    <h3
      className={cn(
        'blog-card-title text-card-foreground items-center font-medium text-base leading-none',
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

export function BlogCardInformation({
  className,
  children,
  ...props
}: BlogCardProps) {
  return (
    <p
      className={cn(
        'blog-card-information text-card-foreground font-normal text-ellipsis overflow-hidden line-clamp-3 leading-none max-sm:overflow-hidden max-sm:line-clamp-2',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  )
}

export function BlogCardButton({
  className,
  children,
  ...props
}: BlogCardProps) {
  return (
    <>
      <Button
        className={cn(
          'blog-card-button bg-card-foreground sm:w-[9rem] h-[34px] rounded text-sm text-card max-sm:ml-0 max-sm:items-center',
          className,
        )}
        {...props}
      >
        {children}
      </Button>
    </>
  )
}
