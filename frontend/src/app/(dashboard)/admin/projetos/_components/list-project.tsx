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
import { LuInfo, LuPen, LuCirclePlus, LuTrash,LuUserPlus } from 'react-icons/lu'
import { DialogUpdateProjeto } from './dialog-update-project'
import { DialogProjetoDelete } from './dialog-delete-project'
import { DialogInformationProjeto } from './dialog-information-project'
import { DialogCreateProjeto } from './dialog-create-project'
import { DialogVincularMembro } from './dialog-vincular-membro'
// Função para formatar a data no formato DD/MM/YYYY
function formatDate(value?: string | null) {
  if (!value) return '—'
  const [y, m, d] = value.slice(0, 10).split('-')
  return `${d}/${m}/${y}`
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
            <LuCirclePlus />
            Novo projeto
          </Button>
        </DialogCreateProjeto>
      </DashboardContainer>
      <DashboardContainer className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="max-sm:hidden">Cliente</TableHead>
              <TableHead className="max-sm:hidden">Início</TableHead>
              <TableHead>Fim</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {response.map((projeto: projetoType) => (
              <TableRow key={projeto.id}>
                <TableCell>{projeto.nome}</TableCell>
                <TableCell className="max-sm:hidden">{projeto.nome_cliente}</TableCell>
                <TableCell className="max-sm:hidden">{formatDate(projeto.data_inicio)}</TableCell>
                <TableCell>{formatDate(projeto.data_fim)}</TableCell>
                <TableCell> 
                <div className="flex justify-end gap-2">
                  <DialogVincularMembro projetoId={projeto.id}>
                    <Button variant="secondary" size="icon" title='Vincular Membro'>
                      <LuUserPlus />
                    </Button>
                  </DialogVincularMembro>
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
                  </div>
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
