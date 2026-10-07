import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import { Button } from '@/components/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { api } from '@/services/api'
import { membroType } from '@/types/member'
import { LuInfo, LuPen, LuCirclePlus, LuTrash } from 'react-icons/lu'
import { DialogUpdateMember } from './dialog-update-member'
import { DialogMemberDelete } from './dialog-delete-member'
import { DialogInformationMember } from './dialog-information-member'
import { DialogCreateMember } from './dialog-create-member'

export default async function ListMembers() {
  const { response } = await api<membroType[]>('GET', '/membros')

  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os membros.
      </DashboardContainer>
    )
  }

  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <DialogCreateMember>
          <Button size="sm">
            <LuCirclePlus />
            Novo membro
          </Button>
        </DialogCreateMember>
      </DashboardContainer>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Cor favorita</TableHead>
              <TableHead>Aniversário</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {response.map((member: membroType) => (
              <TableRow key={member.id}>
                <TableCell>{member.nome}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.cor_favorita || '-'}</TableCell>
                <TableCell>
                  {member.data_aniversario
                    ? new Date(member.data_aniversario).toLocaleDateString('pt-BR')
                    : '-'}
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  <DialogInformationMember member={member}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationMember>
                  <DialogUpdateMember member={member}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateMember>
                  <DialogMemberDelete id={member.id}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogMemberDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!response.length && (
            <TableCaption>Nenhum membro encontrado.</TableCaption>
          )}
        </Table>
      </DashboardContainer>
    </>
  )
}
