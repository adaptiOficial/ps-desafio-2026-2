'use client'
import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import Image, { ImageProps } from 'next/image'
import { ComponentProps, useState } from 'react'
import { Button } from './button'
import { LuCrown } from 'react-icons/lu'
const cardVarians = cva('flex w-[90%] ml-4', {
  variants: {
    variant: {
      default: 'justify-between items-center',
      vertical: 'flex-col space-y-3',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface FooterProps
  extends ComponentProps<'div'>,
    VariantProps<typeof cardVarians> {}

export function ProductCard({
  className,
  children,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        ' rounded shadow overflow-hidden  flex flex-col space-y-5 bg-card pb-4 w-[280px]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
export function ProductCardHeader({
  className,
  children,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div className={cn('relative w-full h-1/2', className)} {...props}>
      {children}
    </div>
  )
}
export function ProductCardFav({ className }: ComponentProps<'div'>) {
  const [fav, setFav] = useState(false)

  const changeFav = () => {
    setFav(!fav)
  }
  return (
    <div
      className={cn(
        `rounded-full h-8 w-8  absolute top-2 left-2 bg-opacity-90 bg-gray-950/30 flex justify-center text-center items-center hover:cursor-pointer hover:bg-gray-950/50 ${fav ? ' border-yellow-400 border-2' : ''}`,
        className,
      )}
      onClick={changeFav}
    >
      <LuCrown className={fav ? 'text-yellow-400' : ' text-lg text-white'} />
    </div>
  )
}

export function ProductCardImage({
  className,
  src,
  alt,
  ...props
}: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      quality={100}
      priority
      height={200}
      width={300}
      className={cn('w-full h-full object-cover', className)}
      {...props}
    />
  )
}

export function ProductCardBody({
  className,
  children,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div className={cn(' ml-4 w-[90%] space-y-3 ', className)} {...props}>
      {children}
    </div>
  )
}
export function ProductCardTitle({
  className,
  children,
  ...props
}: ComponentProps<'h1'>) {
  return (
    <h1 className={cn('text-left  font-bold text-2xl', className)} {...props}>
      {children}
    </h1>
  )
}
export function ProductCardDescription({
  className,
  children,
  ...props
}: ComponentProps<'p'>) {
  return (
    <p className={cn('text-left', className)} {...props}>
      {children}
    </p>
  )
}

export function ProductCardFooter({
  variant,
  className,
  children,
  ...props
}: FooterProps) {
  return (
    <div className={cn(cardVarians({ variant }), className)} {...props}>
      {children}
    </div>
  )
}

export function ProductCardPrice({
  className,
  children,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div className={cn('text-2xl', className)} {...props}>
      {children}
    </div>
  )
}
export function ProductCardButton({
  className,
  children,
  ...props
}: ComponentProps<'button'>) {
  return (
    <Button className={className} {...props}>
      {children}
    </Button>
  )
}
