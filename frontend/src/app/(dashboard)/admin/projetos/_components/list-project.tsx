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
import { LuInfo, LuPen, LuPlusCircle, LuTrash } from 'react-icons/lu'
import { DialogUpdateProjeto } from './dialog-update-project'
import { DialogProjetoDelete } from './dialog-delete-project'
import { DialogInformationProjeto } from './dialog-information-project'
import { DialogCreateProjeto } from './dialog-create-project'

const formatarData = (dataString: string) => {
  if (!dataString) return '-';
  const data = new Date(dataString);
  return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

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
            <LuPlusCircle />
            Novo projeto
          </Button>
        </DialogCreateProjeto>
      </DashboardContainer>
            
      <DashboardContainer className="w-full">
        <div className="w-full overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Nome</TableHead>
                <TableHead className="whitespace-nowrap">Cliente</TableHead>
                <TableHead className="whitespace-nowrap">Início</TableHead>
                <TableHead className="whitespace-nowrap">Fim</TableHead>
                <TableHead className="text-right whitespace-nowrap">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {response.map((projeto: projetoType) => (
                <TableRow key={projeto.id}>
                  <TableCell className="whitespace-nowrap">{projeto.nome}</TableCell>
                  <TableCell className="whitespace-nowrap">{projeto.nome_cliente}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatarData(projeto.data_inicio)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatarData(projeto.data_fim)}
                  </TableCell>
                  <TableCell className="flex justify-end gap-2 whitespace-nowrap">
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
        </div>
      </DashboardContainer>
    </>
  )
}