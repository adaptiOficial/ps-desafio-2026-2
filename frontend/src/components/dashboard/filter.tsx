import { cn } from '@/lib/utils'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { ReadonlyURLSearchParams } from 'next/navigation'
import React, { RefObject } from 'react'
import { Button, ButtonProps } from '../button'

export const applyFilter = async (
  formRef: RefObject<HTMLFormElement>,
  searchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance,
  pathname: string,
) => {
  if (!formRef.current) {
    return
  }
  const form = new FormData(formRef.current)
  const params = new URLSearchParams(searchParams.toString())
  form.forEach((value, key) => {
    if (value) {
      params.set(key, value.toString())
    } else {
      params.delete(key)
    }
  })
  router.push(pathname + '?' + params.toString())
}

export const clearFilter = (
  formRef: RefObject<HTMLFormElement>,
  searchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance,
  pathname: string,
) => {
  if (!formRef.current) {
    return
  }
  const params = new URLSearchParams(searchParams.toString())
  const form = new FormData(formRef.current)

  form.forEach((_, key) => {
    params.delete(key)
  })

  formRef.current.reset()

  router.push(pathname + '?' + params.toString())
}

export const checkFilters = (
  fields: string[],
  searchParams: ReadonlyURLSearchParams,
) => {
  const params = new URLSearchParams(searchParams.toString())
  let hasParam: boolean = false
  fields.forEach((field) => {
    if (params.get(field)) hasParam = true
  })

  return hasParam
}

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const FormFilter = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn('flex flex-col gap-2.5', className)}
        {...props}
      >
        {children}
      </form>
    )
  },
)
FormFilter.displayName = 'FormFilter'

interface ButtonFilterProps extends ButtonProps {
  hasFilters: boolean
}

function ButtonFilter({
  variant = 'outline',
  size = 'sm',
  hasFilters,
  children,
  ...props
}: ButtonFilterProps) {
  return (
    <Button variant={variant} size={size} {...props}>
      <div className="relative">
        {children}
        {hasFilters && (
          <div className="absolute -right-1 -top-1 bg-primary size-3 rounded-full shadow border" />
        )}
      </div>
    </Button>
  )
}

export { FormFilter, ButtonFilter }
