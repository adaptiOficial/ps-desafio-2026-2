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

interface membroType {
  id: string
  nome: string
}

interface tarefaType {
  id: number
  titulo: string
  status: string
  projeto_id: string
  membro_id: string
  membro?: membroType
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
  
  const [tarefas, setTarefas] = useState<tarefaType[]>([])
  const [membros, setMembros] = useState<membroType[]>([])
  const [novaTarefa, setNovaTarefa] = useState({ titulo: '', membro_id: '' })
  const [erroMsg, setErroMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      carregarDados()
    }
  }, [open])

  const carregarDados = async () => {
    try {
      const resTarefas = await api<tarefaType[]>('GET', '/tarefas')
      const resMembros = await api<membroType[]>('GET', '/membros')

      if (resTarefas.response) {        
        setTarefas(resTarefas.response.filter(t => t.projeto_id === projeto.id))
      }
      if (resMembros.response) {
        setMembros(resMembros.response)
      }
    } catch (error) {
      console.error("Erro ao carregar dados", error)
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
        setTarefas([...tarefas, res.response])
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
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
          
          <div className="flex flex-col gap-2">
            {tarefas.length > 0 ? (
              tarefas.map(tarefa => (
                <div key={tarefa.id} className="p-3 border rounded-md bg-slate-50 flex justify-between items-center gap-2">
                  <div>
                    <p className="font-medium text-sm text-slate-800">{tarefa.titulo}</p>
                    <p className="text-xs text-slate-500">Membro: {tarefa.membro?.nome || 'Desconhecido'}</p>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-1 bg-blue-100 text-blue-800 rounded-full whitespace-nowrap">
                    {tarefa.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 italic">Nenhuma tarefa registada neste projeto.</p>
            )}
          </div>
          
          <form onSubmit={handleAddTarefa} className="flex flex-col gap-3 mt-2 bg-slate-100 p-3 rounded-lg border border-slate-200">
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
                className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-blue-500"
                value={novaTarefa.titulo}
                onChange={(e) => setNovaTarefa({ ...novaTarefa, titulo: e.target.value })}
              />
              <select
                required
                className="px-3 py-2 border border-slate-300 rounded-md text-sm bg-white outline-none focus:border-blue-500 min-w-[180px]"
                value={novaTarefa.membro_id}
                onChange={(e) => setNovaTarefa({ ...novaTarefa, membro_id: e.target.value })}
              >
                <option value="" disabled>Selecione um membro</option>
                {membros.map(m => (
                  <option key={m.id} value={m.id}>{m.nome}</option>
                ))}
              </select>
            </div>
            
            <Button type="submit" size="sm" className="self-end" disabled={loading}>
              {loading ? 'A validar...' : 'Adicionar Tarefa'}
            </Button>
          </form>
        </div>        

      </DialogContent>
    </Dialog>
  )
}