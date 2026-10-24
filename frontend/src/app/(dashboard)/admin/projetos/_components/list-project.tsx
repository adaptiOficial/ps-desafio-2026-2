"use client"

import { useState, useEffect } from 'react'
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
import { LuInfo, LuPen, LuPlusCircle, LuTrash, LuCheckCircle, LuRotateCcw } from 'react-icons/lu'
import { DialogUpdateProjeto } from './dialog-update-project'
import { DialogProjetoDelete } from './dialog-delete-project'
import { DialogInformationProjeto } from './dialog-information-project'
import { DialogCreateProjeto } from './dialog-create-project'
import { useRouter } from 'next/navigation'

const formatarData = (dataString: string) => {
  if (!dataString) return '-';
  const data = new Date(dataString);
  return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

type ProjetosResponse = {
  ativo: projetoType[];
  concluidos: projetoType[];
  excluidos: projetoType[];
}

export default function ListProjects() {
  const router = useRouter();
  const [projetos, setProjetos] = useState<ProjetosResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'ativo' | 'concluidos' | 'excluidos'>('ativo');
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchProjetos = async () => {
    setLoading(true);
    const { response } = await api<ProjetosResponse>('GET', '/projetos');
    if (response) setProjetos(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjetos();
  }, []);

  
  const handleToggleStatus = async (projeto: projetoType) => {
    setActionError(null);

    const novoStatus = projeto.status === 'ativo' ? 'concluido' : 'ativo';

    const { error } = await api(
      'PATCH',
      `/projetos/${projeto.id}/status`,
      { data: { status: novoStatus } }
    );

    if (error) {
      setActionError(
        error.message.replace(/^Error:\s*/i, '')
      );
      return;
    }

    fetchProjetos();
    router.refresh();
  };


  
const handleRestore = async (id: string) => {
  setActionError(null);

  const { error } = await api(
    'POST',
    `/projetos/${id}/restore`
  );

  if (error) {
    setActionError(
      error.message.replace(/^Error:\s*/i, '')
    );
    return;
  }

  fetchProjetos();
  router.refresh();
};


  if (loading) {
    return <DashboardContainer>Carregando projetos...</DashboardContainer>;
  }

  if (!projetos) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os projetos.
      </DashboardContainer>
    )
  }

  const listaAtual = projetos[activeTab] || [];

  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col mb-4">
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('ativo')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'ativo' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            Ativo ({projetos.ativo.length})
          </button>
          <button
            onClick={() => setActiveTab('concluidos')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'concluidos' ? 'bg-white shadow text-green-600' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            Concluídos ({projetos.concluidos.length})
          </button>
          <button
            onClick={() => setActiveTab('excluidos')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'excluidos' ? 'bg-white shadow text-red-600' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            Excluídos ({projetos.excluidos.length})
          </button>
        </div>

        <DialogCreateProjeto>
          <Button size="sm">
            <LuPlusCircle />
            Novo projeto
          </Button>
        </DialogCreateProjeto>
      </DashboardContainer>
      
    {actionError && (
      <div
        role="alert"
        className="mb-4 flex items-start justify-between gap-4 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800"
      >
        <div className="flex-1">
          <p className="font-semibold">
            Não foi possível concluir a operação
          </p>

          <p className="mt-1 text-sm">
            {actionError}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActionError(null)}
          className="rounded-md px-2 py-1 text-sm font-medium hover:bg-red-100"
          aria-label="Fechar mensagem de erro"
        >
          Fechar
        </button>
      </div>
    )}

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
              {listaAtual.map((projeto: projetoType) => (
                <TableRow key={projeto.id}>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-medium">{projeto.nome}</span>
                      {activeTab === 'excluidos' && projeto.justificativa_exclusao && (
                         <span className="text-xs text-red-500 mt-1">Motivo: {projeto.justificativa_exclusao}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{projeto.nome_cliente}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatarData(projeto.data_inicio)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatarData(projeto.data_fim)}
                  </TableCell>
                  <TableCell className="flex justify-end gap-2 whitespace-nowrap">
                    
                    {/* Botão de mudar status (não aparece nos excluídos) */}
                    {activeTab !== 'excluidos' && (
                      <Button 
                        variant="secondary-inverse" 
                        size="icon" 
                        title={projeto.status === 'ativo' ? "Marcar como Concluído" : "Reabrir Projeto"}
                        onClick={() => handleToggleStatus(projeto)}
                      >
                        {projeto.status === 'ativo' ? <LuCheckCircle className="text-green-600" /> : <LuRotateCcw className="text-blue-600" />}
                      </Button>
                    )}

                    {/* Botão de restaurar (aparece apenas nos excluídos) */}
                    {activeTab === 'excluidos' ? (
                      <Button variant="default" size="sm" onClick={() => handleRestore(projeto.id)}>
                         Reverter Exclusão
                      </Button>
                    ) : (
                      <>
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
                      </>
                    )}

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {!listaAtual.length && (
              <TableCaption>Nenhum projeto encontrado nesta categoria.</TableCaption>
            )}
          </Table>
        </div>
      </DashboardContainer>
    </>
  )
}