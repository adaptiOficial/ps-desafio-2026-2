"use client"

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsProjeto from './form-fields-project'
import { projetoType } from '@/types/projeto'
import { useState, useEffect } from 'react'
import { Button } from '@/components/button'
import { api } from '@/services/api'
import { LuCheckCircle, LuTrash2, LuUndo2 } from 'react-icons/lu'

interface membroType {
  id: string | number 
  nome: string
  status?: string 
}

interface tarefaType {
  id: number
  titulo: string
  status: string
  projeto_id: string
  membro_id: string | number
  membro?: membroType
  justificativa_exclusao?: string
}

interface DialogInformationProjetoProps {
  projeto: projetoType
  children: React.ReactNode
}

export function DialogInformationProjeto({
  projeto,
  children,
}: DialogInformationProjetoProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [abaTarefas, setAbaTarefas] = useState<'ativas' | 'concluidas' | 'excluidas'>('ativas')
  
  const [tarefas, setTarefas] = useState<tarefaType[]>([])
  const [membros, setMembros] = useState<membroType[]>([])
  const [novaTarefa, setNovaTarefa] = useState({ titulo: '', membro_id: '' })
  const [erroMsg, setErroMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  const [tarefaSendoExcluida, setTarefaSendoExcluida] = useState<number | null>(null)
  const [justificativa, setJustificativa] = useState<string>('')
  
  useEffect(() => {
    if (open) {
      carregarTarefas()
      carregarMembros()
      setTarefaSendoExcluida(null)
      setJustificativa('')
      setErroMsg(null)
    }
  }, [open])
  
  const carregarTarefas = async () => {
    try {
      const resTarefas = await api<tarefaType[]>('GET', '/tarefas')
      if (resTarefas?.response) {
        setTarefas(resTarefas.response.filter((t: any) => t.projeto_id === projeto.id))
      }
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error)
    }
  }
  
  const carregarMembros = async () => {
    try {
      const resMembros = await api<membroType[]>('GET', '/membros')
      if (resMembros?.response) {
        // Aplica o filtro de membros ativos
        const membrosAtivos = resMembros.response.filter((m: any) => 
          !m.status || (m.status !== 'desligado' && m.status !== 'excluido')
        )
        setMembros(membrosAtivos)
      }
    } catch (error) {
      console.error("Erro ao carregar membros:", error)
    }
  }

  const handleAddTarefa = async (e: React.FormEvent) => {
    e.preventDefault()
    setErroMsg(null)
    setLoading(true)

    try {      
      const res: any = await api<tarefaType>('POST', '/tarefas', {
        data: {
          titulo: novaTarefa.titulo,
          projeto_id: projeto.id,
          membro_id: novaTarefa.membro_id,
        }
      })
      
      if (res.error) throw res.error;

      if (res.response) {        
        carregarTarefas()
        setNovaTarefa({ titulo: '', membro_id: '' })
      }
    } catch (error: any) {      
      const errorData = error?.response?.data || error?.data || error;
      
      if (errorData?.errors) {
        const mensagensErro = Object.values(errorData.errors).flat()
        setErroMsg(mensagensErro.join(' '))
      } else {
        setErroMsg(errorData?.message || 'Ocorreu um erro ao criar a tarefa.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleConcluirTarefa = async (tarefaId: number) => {
    try {
      setErroMsg(null)
      const res: any = await api('PUT', `/tarefas/${tarefaId}`, {
        data: { status: 'concluida' }
      })
      if (res.error) throw res.error;
      carregarTarefas()
    } catch (error: any) {
      console.error("Erro ao concluir a tarefa", error)
      const errorData = error?.response?.data || error?.data || error;
      setErroMsg(errorData?.message || 'Erro ao atualizar a tarefa.')
    }
  }

  const handleConfirmarExclusao = async (tarefaId: number) => {
    if (!justificativa.trim()) {
      setErroMsg("A justificativa é obrigatória para excluir a tarefa.")
      return
    }

    try {
      setErroMsg(null)
      const res: any = await api('PUT', `/tarefas/${tarefaId}`, {
        data: { 
          status: 'excluida',
          justificativa_exclusao: justificativa 
        }
      })
      if (res.error) throw res.error;
      
      setTarefaSendoExcluida(null)
      setJustificativa('')
      carregarTarefas()
    } catch (error: any) {
      console.error("Erro ao mover a tarefa para a lixeira", error)
      const errorData = error?.response?.data || error?.data || error;
      setErroMsg(errorData?.message || 'Erro ao excluir a tarefa.')
    }
  }

  const handleRestaurarTarefa = async (tarefaId: number) => {
    try {
      setErroMsg(null)
      const res: any = await api('PUT', `/tarefas/${tarefaId}`, {
        data: { 
          status: 'pendente',
          justificativa_exclusao: null
        }
      })
      if (res.error) throw res.error;
      carregarTarefas()
    } catch (error: any) {
      console.error("Erro ao restaurar a tarefa", error)
      const errorData = error?.response?.data || error?.data || error;
      setErroMsg(errorData?.message || 'Erro ao restaurar a tarefa.')
    }
  }

  const tarefasAtivas = tarefas.filter(t => t.status !== 'excluida' && t.status !== 'concluida')
  const tarefasConcluidas = tarefas.filter(t => t.status === 'concluida')
  const tarefasExcluidas = tarefas.filter(t => t.status === 'excluida')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>Informações do projeto</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas do projeto abaixo.
          </DialogDescription>
        </DialogHeader>
        <FormFieldsProjeto projeto={projeto} readOnly />
        
        <hr className="my-4 border-slate-200" />
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-slate-800">Tarefas & Alocação</h3>
          
          <div className="flex border-b border-slate-200 gap-4 text-sm font-medium">
            <button
              type="button"
              onClick={() => setAbaTarefas('ativas')}
              className={`pb-2 transition-colors ${abaTarefas === 'ativas' ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Ativas ({tarefasAtivas.length})
            </button>
            <button
              type="button"
              onClick={() => setAbaTarefas('concluidas')}
              className={`pb-2 transition-colors ${abaTarefas === 'concluidas' ? 'border-b-2 border-green-600 text-green-600 font-semibold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Concluídas ({tarefasConcluidas.length})
            </button>
            <button
              type="button"
              onClick={() => setAbaTarefas('excluidas')}
              className={`pb-2 transition-colors ${abaTarefas === 'excluidas' ? 'border-b-2 border-red-600 text-red-600 font-semibold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Lixeira ({tarefasExcluidas.length})
            </button>
          </div>

          {abaTarefas === 'ativas' && (
            <form onSubmit={handleAddTarefa} className="flex flex-col gap-3 bg-slate-100 p-3 rounded-lg border border-slate-200 mb-2">
              <h4 className="text-sm font-semibold text-slate-700">Nova Tarefa</h4>
                          
              {erroMsg && (
                <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded-md">
                  <strong>Atenção:</strong> {erroMsg}
                </div>
              )}
              
              <div className="flex gap-2 max-sm:flex-col">
                <input
                  type="text"
                  placeholder="Título da tarefa..."
                  required
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-blue-500 bg-white"
                  value={novaTarefa.titulo}
                  onChange={(e) => setNovaTarefa({ ...novaTarefa, titulo: e.target.value })}
                />
                                                
                <select
                  required
                  className="px-3 py-2 border border-slate-300 rounded-md text-sm bg-white text-slate-800 outline-none focus:border-blue-500 min-w-[200px] cursor-pointer"
                  value={novaTarefa.membro_id}
                  onChange={(e) => setNovaTarefa({ ...novaTarefa, membro_id: e.target.value })}
                >
                  <option value="" disabled>Selecione um membro</option>
                                    
                  {membros.length === 0 ? (
                    <option disabled>⚠️ Nenhum membro recebido da API</option>
                  ) : (
                    membros.map((m: any) => (
                      <option key={String(m.id)} value={String(m.id)}>
                        {m.nome}
                      </option>
                    ))
                  )}
                </select>
              </div>
              
              <Button type="submit" size="sm" className="self-end" disabled={loading}>
                {loading ? 'A validar...' : 'Adicionar Tarefa'}
              </Button>
            </form>
          )}
          
          <div className="flex flex-col gap-2">
            
            {/* ABA: TAREFAS ATIVAS */}
            {abaTarefas === 'ativas' && (
              tarefasAtivas.length > 0 ? (
                tarefasAtivas.map(tarefa => (
                  <div key={tarefa.id} className="p-3 border rounded-md bg-slate-50 flex flex-col gap-2 transition-all">
                    
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="font-medium text-sm text-slate-800">{tarefa.titulo}</p>
                        <p className="text-xs text-slate-500">Membro: {tarefa.membro?.nome || 'Desconhecido'}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-[10px] uppercase font-bold px-2 py-1 bg-blue-100 text-blue-800 rounded-full whitespace-nowrap">
                          {tarefa.status}
                        </span>
                        <div className="flex gap-1.5 mt-1">
                          <button
                            type="button"
                            onClick={() => handleConcluirTarefa(tarefa.id)}
                            title="Concluir tarefa"
                            disabled={tarefaSendoExcluida === tarefa.id}
                            className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-green-700 bg-green-100 rounded hover:bg-green-200 transition-colors disabled:opacity-50"
                          >
                            <LuCheckCircle size={12} />
                            Concluir
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => {
                              setTarefaSendoExcluida(tarefa.id)
                              setJustificativa('')
                              setErroMsg(null)
                            }}
                            title="Mover para a Lixeira"
                            disabled={tarefaSendoExcluida === tarefa.id}
                            className="p-1.5 text-red-700 bg-red-100 rounded hover:bg-red-200 transition-colors disabled:opacity-50"
                          >
                            <LuTrash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {tarefaSendoExcluida === tarefa.id && (
                      <div className="mt-2 pt-3 border-t border-slate-200 flex flex-col gap-2">
                        <label className="text-xs font-semibold text-red-700">
                          Justifique a exclusão desta tarefa:
                        </label>
                        <input
                          type="text"
                          autoFocus
                          placeholder="Ex: Tarefa cancelada pelo cliente..."
                          className="px-3 py-2 text-sm border border-red-200 rounded-md outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white"
                          value={justificativa}
                          onChange={(e) => setJustificativa(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleConfirmarExclusao(tarefa.id)
                            if (e.key === 'Escape') setTarefaSendoExcluida(null)
                          }}
                        />
                        <div className="flex justify-end gap-2 mt-1">
                          <button
                            type="button"
                            onClick={() => {
                              setTarefaSendoExcluida(null)
                              setJustificativa('')
                            }}
                            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-200 rounded hover:bg-slate-300 transition-colors"
                          >
                            Cancelar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleConfirmarExclusao(tarefa.id)}
                            className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
                          >
                            Confirmar Exclusão
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 italic mt-2">Nenhuma tarefa ativa neste projeto.</p>
              )
            )}

            {/* ABA: TAREFAS CONCLUÍDAS */}
            {abaTarefas === 'concluidas' && (
              tarefasConcluidas.length > 0 ? (
                tarefasConcluidas.map(tarefa => (
                  <div key={tarefa.id} className="p-3 border border-green-200 rounded-md bg-green-50 flex justify-between items-center gap-2">
                    <div>
                      <p className="font-medium text-sm text-slate-700">{tarefa.titulo}</p>
                      <p className="text-xs text-slate-500">Membro: {tarefa.membro?.nome || 'Desconhecido'}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-1 bg-green-100 text-green-800 rounded-full whitespace-nowrap">
                        <LuCheckCircle size={12} />
                        Concluída
                      </span>
                      
                      <button
                        type="button"
                        onClick={() => handleRestaurarTarefa(tarefa.id)}
                        title="Desfazer conclusão"
                        className="flex items-center gap-1 px-2 py-1 mt-1 text-[10px] font-medium text-amber-700 bg-amber-100 rounded hover:bg-amber-200 transition-colors"
                      >
                        <LuUndo2 size={12} />
                        Desfazer
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 italic mt-2">Nenhuma tarefa concluída neste projeto ainda.</p>
              )
            )}

            {/* ABA: TAREFAS NA LIXEIRA */}
            {abaTarefas === 'excluidas' && (
              tarefasExcluidas.length > 0 ? (
                tarefasExcluidas.map(tarefa => (
                  <div key={tarefa.id} className="p-3 border rounded-md bg-red-50/50 border-red-100 flex flex-col gap-2">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="font-medium text-sm text-slate-700 line-through">{tarefa.titulo}</p>
                        <p className="text-xs text-slate-500">Membro: {tarefa.membro?.nome || 'Desconhecido'}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRestaurarTarefa(tarefa.id)}
                        title="Restaurar tarefa"
                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200 transition-colors"
                      >
                        <LuUndo2 size={13} />
                        Restaurar
                      </button>
                    </div>
                    {tarefa.justificativa_exclusao && (
                      <div className="text-xs text-red-800 bg-red-100 p-2 rounded-md border border-red-200">
                        <strong>Motivo:</strong> {tarefa.justificativa_exclusao}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 italic mt-2">A lixeira está vazia.</p>
              )
            )}

          </div>
        </div>        

      </DialogContent>
    </Dialog>
  )
}