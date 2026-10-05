'use client'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/dashboard/popover'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { LuFilter, LuSearch, LuX } from 'react-icons/lu'
import { useEffect, useRef, useState } from 'react'
import {
  checkFilters,
  applyFilter,
  clearFilter,
  FormFilter,
  ButtonFilter,
} from '@/components/dashboard/filter'

interface FilterUsersProps {
  name?: string
  email?: string
}

export function FilterUsers({ name, email }: FilterUsersProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [hasFilters, setHasFilters] = useState(false)

  useEffect(() => {
    setHasFilters(checkFilters(['name', 'email'], searchParams))
  }, [searchParams])

  return (
    <Popover>
      <PopoverTrigger>
        <ButtonFilter hasFilters={hasFilters} asChild>
          <LuFilter /> Filtros
        </ButtonFilter>
      </PopoverTrigger>
      <PopoverContent>
        <FormFilter
          ref={formRef}
          action={() => applyFilter(formRef, searchParams, router, pathname)}
        >
          <Input
            name="name"
            placeholder="Nome do usuário"
            size="sm"
            defaultValue={name}
          />
          <Input
            name="email"
            placeholder="E-mail do usuário"
            size="sm"
            defaultValue={email}
          />
          <Button size="sm" type="submit">
            <LuSearch />
            Aplicar filtros
          </Button>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => clearFilter(formRef, searchParams, router, pathname)}
          >
            <LuX />
            Limpar filtros
          </Button>
        </FormFilter>
      </PopoverContent>
    </Popover>
  )
}
