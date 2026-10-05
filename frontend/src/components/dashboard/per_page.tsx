'use client'

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectSeparator,
  SelectLabel,
} from '@/components/select'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export function PerPage({ total }: { total: number }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [perPage, setPerPage] = useState('15')

  const setPageParam = (value: string) => {
    setPerPage(value)
    const params = new URLSearchParams(searchParams.toString())
    params.set('per_page', value)
    router.push(pathname + '?' + params.toString())
  }

  return (
    <div className="flex items-center gap-2">
      <span>Exibindo</span>
      <Select defaultValue={perPage} onValueChange={setPageParam}>
        <SelectTrigger size="sm">
          {Number(perPage) > total ? total : perPage}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Itens por página</SelectLabel>
            <SelectSeparator />
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <span>de {total}.</span>
    </div>
  )
}
