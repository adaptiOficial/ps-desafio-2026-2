import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { LuRotateCw } from 'react-icons/lu'
import { Slot } from '@radix-ui/react-slot'
import { forwardRef } from 'react'

export const buttonVariants = cva(
  'flex gap-2.5 justify-center items-center rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:opacity-80 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground bg-primary shadow',
        'default-inverse': 'text-primary bg-primary-foreground shadow ',
        secondary: 'text-secondary-foreground bg-secondary shadow',
        'secondary-inverse': 'text-secondary bg-secondary-foreground shadow',
        destructive: 'text-destructive-foreground bg-destructive shadow',
        'destructive-inverse':
          'text-destructive bg-destructive-foreground shadow',
        outline:
          'border text-foreground hover:bg-accent hover:text-accent-foreground shadow',
        ghost: 'shadow-none hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'px-4 py-1.5 text-sm [&_svg]:size-4',
        default: 'px-6 py-2 text-base [&_svg]:size-4',
        lg: 'px-8 py-3 text-lg [&_svg]:size-5',
        icon: 'size-9 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  pending?: boolean
  pendingFallback?: React.ReactNode
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      pending = false,
      pendingFallback,
      asChild = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={pending}
        ref={ref}
        {...props}
      >
        {asChild ? (
          children
        ) : pending ? (
          <>
            <LuRotateCw className="animate-spin" />
            {pendingFallback || children}
          </>
        ) : (
          children
        )}
      </Comp>
    )
  },
)

Button.displayName = 'Button'

export { Button }
