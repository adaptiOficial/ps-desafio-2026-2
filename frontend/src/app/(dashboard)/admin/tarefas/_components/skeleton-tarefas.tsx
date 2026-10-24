import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { Skeleton } from '@/components/skeleton'

export function SkeletonTarefas() {
  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <Skeleton className="h-8 w-32 max-sm:w-full" />
      </DashboardContainer>
      <DashboardContainer>
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow>
                {Array.from({ length: 4 }, (_, index) => (
                  <TableHead key={index}>
                    <Skeleton className="h-6 w-24" />
                  </TableHead>
                ))}
                <TableHead className="flex justify-end">
                  <Skeleton className="h-6 w-16" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 8 }, (_, row) => (
                <TableRow key={row}>
                  {Array.from({ length: 4 }, (_, cell) => (
                    <TableCell key={cell}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                  <TableCell className="flex justify-end gap-2">
                    <Skeleton className="size-9" />
                    <Skeleton className="size-9" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DashboardContainer>
    </>
  )
}
