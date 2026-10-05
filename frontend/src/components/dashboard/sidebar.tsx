'use client'

import { cn } from '@/lib/utils'
import Image, { ImageProps } from 'next/image'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import React, {
  ComponentProps,
  createContext,
  useContext,
  useState,
} from 'react'
import { LuAlignJustify, LuX } from 'react-icons/lu'
import { Button } from '@/components/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/dropdown-menu'
import { Skeleton } from '@/components/skeleton'

export type MobileToggleContextType = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MobileToggleContext = createContext<MobileToggleContextType>({
  open: false,
  setOpen: () => {},
})

export function Sidebar({
  className,
  children,
  ...props
}: ComponentProps<'aside'>) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <MobileToggleContext.Provider value={{ open, setOpen }}>
      <aside
        className={cn(
          'bg-card h-screen w-full flex flex-col md:border-r max-md:border-b z-50',
          open ? 'max-md:fixed' : 'max-md:h-fit max-md:sticky max-md:top-0',
          className,
        )}
        {...props}
      >
        {children}
      </aside>
    </MobileToggleContext.Provider>
  )
}

export type SidebarHeaderProps = ComponentProps<'div'> & {
  href: string
}

export function SidebarHeader({
  className,
  children,
  href,
  ...props
}: SidebarHeaderProps) {
  const { open, setOpen } = useContext(MobileToggleContext)

  return (
    <div
      className={cn(
        'flex gap-3 items-center p-8 max-md:px-6 max-md:py-3.5',
        className,
      )}
      {...props}
    >
      <a href={href} className="flex gap-3 items-center">
        {children}
      </a>
      <div className="flex-1 flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden size-6"
          onClick={() => setOpen((state) => !state)}
          asChild
        >
          {open ? <LuX /> : <LuAlignJustify />}
        </Button>
      </div>
    </div>
  )
}

export function SidebarHeaderLogo({
  src,
  alt,
  className,
  ...props
}: ImageProps) {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <Image
        src={src}
        alt={alt}
        className={cn(
          'size-10 rounded object-cover',
          { hidden: loading },
          className,
        )}
        quality={100}
        onLoad={() => setLoading(false)}
        priority
        {...props}
      />
      {loading && <Skeleton className="size-10 rounded" />}
    </>
  )
}

export function SidebarHeaderTitle({
  className,
  children,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex-1 line-clamp-1 text-lg font-bold', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarNav({
  className,
  children,
  ...props
}: ComponentProps<'nav'>) {
  const { open } = useContext(MobileToggleContext)

  return (
    <>
      <nav
        className={cn(
          'flex-1 p-5 pt-2 space-y-1 overflow-y-auto',
          { 'max-md:hidden': !open },
          className,
        )}
        {...props}
      >
        {children}
      </nav>
    </>
  )
}

export type SidebarNavLinkProps = LinkProps & ComponentProps<'a'>

export function SidebarNavLink({
  className,
  children,
  href,
  ...props
}: SidebarNavLinkProps) {
  const { setOpen } = useContext(MobileToggleContext)
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'flex gap-2 p-3 items-center rounded font-medium text-sm hover:text-primary hover:bg-background [&_svg]:size-4',
        isActive && 'bg-background text-primary',
        className,
      )}
      onClick={() => setOpen(false)}
      {...props}
    >
      {children}
    </Link>
  )
}

export function SidebarNavLinkLabel({
  className,
  children,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div className={cn('flex-1 line-clamp-1', className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarFooter({
  className,
  children,
  ...props
}: ComponentProps<'div'>) {
  const { open } = useContext(MobileToggleContext)

  return (
    <div
      className={cn(
        'p-5 flex items-center gap-3 border-t',
        { 'max-md:hidden': !open },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

type UserDropdownProps = {
  name?: string
  email?: string
  src?: string
  children: React.ReactNode
}

export function UserDropdown({
  name,
  email,
  src,
  children,
}: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className="p-0 gap-3 w-full focus-visible:ring-0"
        >
          {name && email ? (
            <>
              <Avatar className="size-12">
                <AvatarImage
                  src={src}
                  className="object-cover"
                  alt="avatar user"
                />
                <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col md:flex-1 space-y-1 text-left">
                <p className="font-bold leading-none line-clamp-1">{name}</p>
                <p className="text-xs leading-none line-clamp-1 text-muted-foreground">
                  {email}
                </p>
              </div>
            </>
          ) : (
            <>
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex flex-col md:flex-1 space-y-1 text-left">
                <Skeleton className="h-5" />
                <Skeleton className="h-3 w-9/12" />
              </div>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 mb-6" align="center" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            {name ? (
              <p className="text-sm font-medium leading-none line-clamp-1">
                {name}
              </p>
            ) : (
              <Skeleton className="h-4" />
            )}
            {email ? (
              <p className="text-xs leading-none text-muted-foreground line-clamp-1">
                {email}
              </p>
            ) : (
              <Skeleton className="h-3 w-9/12" />
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
