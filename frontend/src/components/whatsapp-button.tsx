'use client'

import Link from 'next/link'
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { whatsAppUrlReplace } from '@/services/formatter'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const wppButtonVariants = cva('', {
  variants: {
    size: {
      sm: 'w-[35px] h-[35px]',
      default: 'w-[40px] h-[40px]',
      lg: 'w-[45px] h-[45px]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

interface WppButtonProps extends VariantProps<typeof wppButtonVariants> {
  cellphone?: string
  className?: string
  linkClassName?: string 
  color?: string
  isFixed?: boolean
}

const WppButton = ({
  cellphone,
  className,
  linkClassName,
  color = '#145990',
  size,
  isFixed = true,
}: WppButtonProps) => {
  if (typeof cellphone !== 'string') return null

  const WhatsappUrl = whatsAppUrlReplace(cellphone)

  const iconSize = {
    sm: 35,
    default: 40,
    lg: 45,
  }[size ?? 'default']

  const fixedClasses =
    'fixed z-50 bottom-20 right-28 max-lg:right-12 max-lg:bottom-12'

  return (
    <Link
      target="_blank"
      href={WhatsappUrl}
      className={cn(isFixed && fixedClasses, linkClassName)}
    >
      <div className={cn('flex items-center justify-center', className)}>
        <FaWhatsapp
          color={color}
          size={iconSize}
          className={cn(wppButtonVariants({ size }))}
        />
      </div>
    </Link>
  )
}

export default WppButton
