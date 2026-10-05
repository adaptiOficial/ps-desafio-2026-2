import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import { FormFieldsGroup, FormField } from '@/components/dashboard/form'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/dashboard/table'
import { DialogFooter } from '@/components/dialog'

import { Skeleton } from '@/components/skeleton'
import { cn } from '@/lib/utils'

export function SkeletonUsers() {
  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-36" />
      </DashboardContainer>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-6 w-16" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-6 w-16" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-6 w-16" />
              </TableHead>
              <TableHead className="text-right flex justify-end">
                <Skeleton className="h-6 w-16" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 15 }, (index: number) => index).map(
              (_, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="size-10" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Skeleton className="size-9" />
                    <Skeleton className="size-9" />
                    <Skeleton className="size-9" />
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </DashboardContainer>
      <DashboardContainer className="flex justify-between space-x-0 gap-y-2.5 max-sm:flex-col max-sm:items-center">
        <div className="flex items-center gap-1">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="flex gap-2.5">
          <Skeleton className="size-9" />
          <Skeleton className="size-9" />
          <Skeleton className="size-9" />
          <Skeleton className="size-9" />
          <Skeleton className="size-9" />
        </div>
      </DashboardContainer>
    </>
  )
}

interface SkeletonFormFieldsUserProps {
  readOnly?: boolean
}

export default function SkeletonFormFieldsUser({
  readOnly,
}: SkeletonFormFieldsUserProps) {
  return (
    <>
      <FormFieldsGroup>
        <FormField>
          <Skeleton className="h-5" />
          <Skeleton className="h-10 col-span-3" />
        </FormField>
        <FormField>
          <Skeleton className="h-5" />
          <Skeleton className="h-10 col-span-3" />
        </FormField>
        <FormField hidden={readOnly}>
          <Skeleton className="h-5" />
          <Skeleton className="h-10 col-span-3" />
        </FormField>
        <FormField hidden={readOnly}>
          <Skeleton className="h-5" />
          <Skeleton className="h-10 col-span-3" />
        </FormField>
        <FormField>
          <Skeleton className="h-5" />
          <Skeleton className="h-10 col-span-3" hidden={readOnly} />
          <Skeleton className="size-40 col-start-2" />
        </FormField>
      </FormFieldsGroup>
      <DialogFooter className={cn({ hidden: readOnly })}>
        <Skeleton className="h-10 w-24" />
      </DialogFooter>
    </>
  )
}
