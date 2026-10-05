'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { cva } from 'class-variance-authority'
import React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { LuMenu, LuX } from 'react-icons/lu'

const SheetTrigger = SheetPrimitive.Trigger

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-black opacity-90 lg:opacity-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const navbarVariants = cva(
  'flex justify-around bg-primary h-[90px] items-center px-6 lg:gap-8',
  {
    variants: {
      variant: {
        default: '',
        float: 'mx-5 my-4 rounded-3xl',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export type NavbarProps<T = unknown> = {
  children?: React.ReactNode
  className?: string
  variant?: 'default' | 'float'
} & T

export function Navbar({
  className,
  children,
  variant,
  ...props
}: NavbarProps) {
  return (
    <SheetPrimitive.Root>
      <div className={cn([className, navbarVariants({ variant })])} {...props}>
        {children}
      </div>
    </SheetPrimitive.Root>
  )
}

export function NavbarHeader({ children, className, ...props }: NavbarProps) {
  return (
    <nav
      className={cn(['flex max-lg:w-full justify-between', className])}
      {...props}
    >
      {children}
      <SheetTrigger>
        <div className="text-4xl text-primary-foreground lg:hidden">
          <LuMenu size={46} />
        </div>
      </SheetTrigger>
    </nav>
  )
}

type NavbarLogoProps = {
  src: string
  alt: string
  width: number
  height: number
}

export function NavbarLogo({
  className,
  src,
  alt,
  width,
  height,
}: NavbarProps<NavbarLogoProps>) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(className)}
    />
  )
}

export function NavbarMain({ className, children, ...props }: NavbarProps) {
  return (
    <div
      className={cn('flex max-lg:hidden overflow-auto', className)}
      {...props}
    >
      {children}
      <SheetPortal>
        <SheetOverlay />
        <SheetPrimitive.Content
          className={cn(
            'fixed z-50 flex flex-col bg-primary-foreground max-lg:shadow-lg lg:hidden transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 w-5/6 left-1/12 inset-y-0 right-0 h-full data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
            className,
          )}
          {...props}
        >
          {children}
        </SheetPrimitive.Content>
      </SheetPortal>
    </div>
  )
}

export function NavbarHeaderMobile({
  className,
  children,
  ...props
}: NavbarProps) {
  return (
    <nav
      className={cn([
        'flex justify-between items-center px-10 py-7 lg:hidden',
        className,
      ])}
      {...props}
    >
      {children}
      <SheetPrimitive.Close asChild>
        <div className="flex justify-center items-center text-4xl text-primary-foreground">
          <LuX size={46} />
        </div>
      </SheetPrimitive.Close>
    </nav>
  )
}

export function NavbarActions({ children, className }: NavbarProps) {
  return (
    <nav
      className={cn([
        'flex max-lg:hidden gap-12 items-center max-lg:gap-5 overflow-auto',
        className,
      ])}
    >
      {children}
    </nav>
  )
}

export function NavbarLinkItems({ children, className }: NavbarProps) {
  return (
    <nav
      className={cn([
        'flex max-lg:px-10 max-lg:py-8 items-start gap-12 max-lg:gap-8 max-lg:flex-col text-2xl lg:text-xl overflow-auto lg:items-center',
        className,
      ])}
    >
      {children}
    </nav>
  )
}

type NavbarLinkProps = {
  href: string
}

export function NavbarLink({
  children,
  className,
  href,
}: NavbarProps<NavbarLinkProps>) {
  return (
    <Link href={href} className={cn(['text-primary-foreground', className])}>
      {children}
    </Link>
  )
}
