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
import { projetoType } from '@/types/projeto'
import { LuInfo, LuPen, LuCirclePlus, LuTrash } from 'react-icons/lu'
import { DialogUpdateProjeto } from './dialog-update-project'
import { DialogProjetoDelete } from './dialog-delete-project'
import { DialogInformationProjeto } from './dialog-information-project'
import { DialogCreateProjeto } from './dialog-create-project'

export default async function ListProjects() {
  const { response } = await api<projetoType[]>('GET', '/projetos')

  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os projetos.
      </DashboardContainer>
    )
  }

  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <DialogCreateProjeto>
          <Button size="sm">
            <LuCirclePlus />
            Novo projeto
          </Button>
        </DialogCreateProjeto>
      </DashboardContainer>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Início</TableHead>
              <TableHead>Fim</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {response.map((projeto: projetoType) => (
              <TableRow key={projeto.id}>
                <TableCell>{projeto.nome}</TableCell>
                <TableCell>{projeto.nome_cliente}</TableCell>
                <TableCell>
                  {new Date(projeto.data_inicio).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  {new Date(projeto.data_fim).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  <DialogInformationProjeto projeto={projeto}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationProjeto>
                  <DialogUpdateProjeto projeto={projeto}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateProjeto>
                  <DialogProjetoDelete id={projeto.id}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogProjetoDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!response.length && (
            <TableCaption>Nenhum projeto encontrado.</TableCaption>
          )}
        </Table>
      </DashboardContainer>
    </>
  )
}
