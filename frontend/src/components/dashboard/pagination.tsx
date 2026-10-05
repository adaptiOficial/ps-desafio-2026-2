'use client'

import { LuChevronsLeft, LuChevronsRight } from 'react-icons/lu'
import { Button } from '../button'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export interface PaginateProps {
  lastPage: number
}

export function Pagination({ lastPage }: PaginateProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const queryPage: number = Number(searchParams.get('page')) || 1
  const currentPage: number = queryPage > lastPage ? lastPage : queryPage

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === lastPage

  const firstButtonPage = isFirstPage
    ? currentPage
    : isLastPage
      ? currentPage - 2
      : currentPage - 1

  const secondButtonPage = isFirstPage
    ? currentPage + 1
    : isLastPage
      ? currentPage - 1
      : currentPage

  const thirdButtonPage = isFirstPage
    ? currentPage + 2
    : isLastPage
      ? currentPage
      : currentPage + 1

  const setPageParam = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(pathname + '?' + params.toString())
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        disabled={isFirstPage}
        onClick={() => setPageParam(1)}
      >
        <LuChevronsLeft />
      </Button>
      <Button
        variant={currentPage === firstButtonPage ? 'default' : 'outline'}
        size="icon"
        onClick={() => setPageParam(firstButtonPage)}
        className={cn({ hidden: isLastPage && lastPage < 3 && lastPage !== 1 })}
      >
        {firstButtonPage}
      </Button>
      <Button
        variant={currentPage === secondButtonPage ? 'default' : 'outline'}
        size="icon"
        onClick={() => setPageParam(secondButtonPage)}
        className={cn({ hidden: lastPage === 1 })}
      >
        {secondButtonPage}
      </Button>
      <Button
        variant={currentPage === thirdButtonPage ? 'default' : 'outline'}
        size="icon"
        onClick={() => setPageParam(thirdButtonPage)}
        className={cn({ hidden: isFirstPage && lastPage < 3 })}
      >
        {thirdButtonPage}
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={isLastPage}
        onClick={() => setPageParam(lastPage)}
      >
        <LuChevronsRight />
      </Button>
    </div>
  )
}
