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

export function SkeletonMembers() {
  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <Skeleton className="h-8 w-32" />
      </DashboardContainer>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-6 w-24" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-6 w-24" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-6 w-28" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-6 w-24" />
              </TableHead>
              <TableHead className="text-right flex justify-end">
                <Skeleton className="h-6 w-16" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 8 }, (_, index) => index).map((index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-6 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-full" />
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
            ))}
          </TableBody>
        </Table>
      </DashboardContainer>
    </>
  )
}

interface SkeletonFormFieldsMemberProps {
  readOnly?: boolean
}

export default function SkeletonFormFieldsMember({
  readOnly,
}: SkeletonFormFieldsMemberProps) {
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
        <FormField>
          <Skeleton className="h-5" />
          <Skeleton className="h-10 col-span-3" />
        </FormField>
        <FormField>
          <Skeleton className="h-5" />
          <Skeleton className="h-10 col-span-3" />
        </FormField>
        <FormField>
          <Skeleton className="h-5" />
          <Skeleton className="h-10 col-span-3" />
        </FormField>
      </FormFieldsGroup>
      <DialogFooter className={cn({ hidden: readOnly })}>
        <Skeleton className="h-10 w-24" />
      </DialogFooter>
    </>
  )
}
