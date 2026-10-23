'use client'

import { destroyMember } from '@/actions/member'
import { api } from '@/services/api'
import { Button } from '@/components/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from '@/components/dialog'
import { useToast } from '@/components/use-toast'
import { useState, useEffect } from 'react'

interface DialogDeleteMemberProps {
  id: string
  children: React.ReactNode
}

export function DialogMemberDelete({ id, children }: DialogDeleteMemberProps) {
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  // Estados para gerenciar a migração
  const [requiresMigration, setRequiresMigration] = useState(false)
  const [pendingTasksCount, setPendingTasksCount] = useState(0)
  const [substituteId, setSubstituteId] = useState('')
  const [availableMembers, setAvailableMembers] = useState<any[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Busca os outros membros assim que o modal for aberto
  useEffect(() => {
    if (open) {
      api<any[]>('GET', '/membros').then(({ response }) => {
        if (response) {
          // Remove o próprio membro da lista de opções
          setAvailableMembers(response.filter((m: any) => m.id !== id))
        }
      })
    } else {
      // Reseta os estados ao fechar
      setRequiresMigration(false)
      setSubstituteId('')
      setErrorMessage(null)
    }
  }, [open, id])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    // Passa o substituteId caso o usuário já tenha escolhido alguém
    const res = await JSON.parse(await destroyMember(id, substituteId || undefined))

    if (res.error) {
      // Verifica onde a sua função 'api' armazenou a resposta de erro
      const errorData = res.error?.data || res.error?.response || res.error

      // Se o backend pedir migração (409 Conflict)
      if (errorData?.requires_migration || res.status === 409 || res.error?.status === 409) {
        setRequiresMigration(true)
        setPendingTasksCount(errorData?.pending_tasks?.length || 0)
        return // Interrompe para o usuário selecionar
      }

      // Se o backend barrar por excesso de projetos (422) ou outro erro
      setErrorMessage(errorData?.message || 'Não foi possível excluir o membro!')
      return
    }

    toast({
      title: requiresMigration ? 'Tarefas migradas e membro excluído!' : 'Membro excluído com sucesso!',
    })

    setOpen(false)
    window.location.reload()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {requiresMigration ? '⚠️ Tarefas Pendentes' : 'Confirmar exclusão de membro'}
          </DialogTitle>
          <DialogDescription>
            {requiresMigration
              ? `Este membro possui ${pendingTasksCount} tarefa(s) em projetos ativos. Para manter o fluxo da EJ, selecione um substituto para assumi-las.`
              : 'Tem certeza de que deseja excluir este membro? Esta ação é irreversível e removerá permanentemente o membro do sistema.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit}>
          {requiresMigration && (
            <div className="py-4">
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
                  {errorMessage}
                </div>
              )}
              <label htmlFor="substituto" className="block text-sm font-medium text-gray-700 mb-2">
                Migrar tarefas para:
              </label>
              <select
                id="substituto"
                value={substituteId}
                onChange={(e) => setSubstituteId(e.target.value)}
                className="w-full border rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-background"
                required
              >
                <option value="">Selecione um membro disponível...</option>
                {availableMembers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nome}
                  </option>
                ))}
              </select>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" type="submit">
              {requiresMigration ? 'Migrar Tarefas e Excluir' : 'Excluir'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}