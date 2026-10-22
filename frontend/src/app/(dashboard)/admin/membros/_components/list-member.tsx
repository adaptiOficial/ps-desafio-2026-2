"use client"

import React, { useState, useEffect } from 'react'
import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import { Button } from '@/components/button'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/dashboard/table'
import { api } from '@/services/api'
import { membroType } from '@/types/member'
import { LuInfo, LuPen, LuPlusCircle, LuTrash, LuUserX, LuUndo2, LuAlertTriangle } from 'react-icons/lu'
import { DialogUpdateMember } from './dialog-update-member'
import { DialogMemberDelete } from './dialog-delete-member'
import { DialogInformationMember } from './dialog-information-member'
import { DialogCreateMember } from './dialog-create-member'
import { SkeletonMembers } from './skeleton-members'

export default function ListMembers() {
  const [membros, setMembros] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [aba, setAba] = useState<'ativos' | 'desligados' | 'excluidos'>('ativos')

  const [membroAcaoId, setMembroAcaoId] = useState<string | null>(null)
  const [membroAcaoTipo, setMembroAcaoTipo] = useState<'desligar' | 'excluir' | null>(null)
  const [justificativa, setJustificativa] = useState('')
  
  const [membroDestinoId, setMembroDestinoId] = useState<string>('') 
  const [erroMsg, setErroMsg] = useState<string | null>(null)

  useEffect(() => {
    carregarMembros()
  }, [])

  const carregarMembros = async () => {
    setLoading(true)
    try {
      const { response } = await api<any[]>('GET', '/membros')
      if (response) setMembros(response)
    } catch (error) {
      console.error("Erro ao buscar membros:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmarAcao = async (id: string) => {
    try {
      if (!justificativa.trim()) {
        setErroMsg("A justificativa é obrigatória.");
        return;
      }
      
      const memberAtivo = membros.find(m => m.id === id);
      const temTarefas = memberAtivo?.tarefas_count > 0; // tarefas_count vem do Laravel!

      if (temTarefas && !membroDestinoId) {
        setErroMsg("Este membro possui tarefas. Selecione um membro substituto.");
        return;
      }
      
      const payload = membroAcaoTipo === 'desligar' 
        ? { status: 'desligado', justificativa_desligamento: justificativa, membro_destino_id: membroDestinoId }
        : { status: 'excluido', justificativa_exclusao: justificativa, membro_destino_id: membroDestinoId };

      setErroMsg(null);
      const res: any = await api('PUT', `/membros/${id}`, { data: payload });
      if (res.error) throw res.error;

      setMembroAcaoId(null);
      setMembroAcaoTipo(null);
      setJustificativa('');
      setMembroDestinoId(''); // Limpa o estado
      carregarMembros(); 
      
    } catch (error: any) {
      console.error("ERRO:", error);
      setErroMsg("Erro ao processar a ação.");
    }
  }

  const handleRestaurarMembro = async (id: string, statusAnterior: 'desligado' | 'excluido') => {
    const payload = statusAnterior === 'desligado'
      ? { status: 'ativo', justificativa_desligamento: null }
      : { status: 'ativo', justificativa_exclusao: null };

    try {
      const res: any = await api('PUT', `/membros/${id}`, { data: payload })
      if (res.error) throw res.error
      carregarMembros()
    } catch (error) {
      alert('Erro ao restaurar membro.')
    }
  }

  if (loading) return <SkeletonMembers />

  const membrosAtivos = membros.filter(m => m.status !== 'desligado' && m.status !== 'excluido')
  const membrosDesligados = membros.filter(m => m.status === 'desligado')
  const membrosExcluidos = membros.filter(m => m.status === 'excluido')

  return (
    <>
      <DashboardContainer className="flex h-min justify-between items-end space-x-0 gap-y-4 max-sm:flex-col">
        <div className="flex border-b border-slate-200 gap-4 text-sm font-medium w-full sm:w-auto">
          <button type="button" onClick={() => setAba('ativos')} className={`pb-2 transition-colors ${aba === 'ativos' ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-800'}`}>
            Ativos ({membrosAtivos.length})
          </button>
          <button type="button" onClick={() => setAba('desligados')} className={`pb-2 transition-colors ${aba === 'desligados' ? 'border-b-2 border-amber-600 text-amber-600 font-semibold' : 'text-slate-500 hover:text-slate-800'}`}>
            Desligados ({membrosDesligados.length})
          </button>
          <button type="button" onClick={() => setAba('excluidos')} className={`pb-2 transition-colors ${aba === 'excluidos' ? 'border-b-2 border-red-600 text-red-600 font-semibold' : 'text-slate-500 hover:text-slate-800'}`}>
            Excluídos ({membrosExcluidos.length})
          </button>
        </div>

        {aba === 'ativos' && (
          <DialogCreateMember onSuccess={carregarMembros}>
            <Button size="sm"><LuPlusCircle /> Novo membro</Button>
          </DialogCreateMember>
        )}
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
            
            {/* ---------------- ABA: ATIVOS ---------------- */}
            {aba === 'ativos' && (
              membrosAtivos.length > 0 ? membrosAtivos.map((member: any) => (
                <React.Fragment key={member.id}>
                  <TableRow>
                    <TableCell>
                      {member.nome} 
                      <span className="text-red-500 font-bold ml-2">
                        (Tarefas: {member.tarefas_count ?? 'Não chegou do Laravel'})
                      </span>
                    </TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.cor_favorita || '-'}</TableCell>
                    <TableCell>{member.data_aniversario ? new Date(member.data_aniversario).toLocaleDateString('pt-BR') : '-'}</TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <DialogInformationMember member={member}>
                        <Button type="button" variant="default-inverse" size="icon" disabled={membroAcaoId === member.id}><LuInfo /></Button>
                      </DialogInformationMember>
                      <DialogUpdateMember member={member}>
                        <Button type="button" variant="secondary-inverse" size="icon" disabled={membroAcaoId === member.id}><LuPen /></Button>
                      </DialogUpdateMember>
                      <Button 
                        type="button" variant="destructive-inverse" size="icon" disabled={membroAcaoId === member.id}
                        onClick={(e) => { 
                          e.preventDefault(); setMembroAcaoId(member.id); setMembroAcaoTipo('desligar'); 
                          setJustificativa(''); setMembroDestinoId(''); setErroMsg(null); 
                        }} title="Desligar Membro"
                      ><LuUserX /></Button>
                      <Button 
                        type="button" variant="destructive-inverse" size="icon" disabled={membroAcaoId === member.id}
                        onClick={(e) => { 
                          e.preventDefault(); setMembroAcaoId(member.id); setMembroAcaoTipo('excluir'); 
                          setJustificativa(''); setMembroDestinoId(''); setErroMsg(null); 
                        }} title="Excluir Membro"
                      ><LuTrash /></Button>
                    </TableCell>
                  </TableRow>

                  {/* FORMULÁRIO DE EXCLUSÃO/DESLIGAMENTO COM AVISO DE TAREFAS */}
                  {membroAcaoId === member.id && (
                    <TableRow className={`${membroAcaoTipo === 'excluir' ? 'bg-red-50' : 'bg-amber-50'}`}>
                      <TableCell colSpan={5}>
                        <div className="flex flex-col gap-3 p-3 border border-slate-200 rounded-md bg-white m-2 shadow-sm">
                          
                          {/* AVISO: Se o membro tiver tarefas pendentes */}
                          {member.tarefas_count > 0 && (
                            <div className="flex flex-col gap-2 p-3 bg-orange-50 border border-orange-200 rounded-md text-orange-800">
                              <div className="flex items-center gap-2 font-semibold text-sm">
                                <LuAlertTriangle className="h-5 w-5" />
                                Atenção! Este membro possui {member.tarefas_count} tarefa(s) pendente(s) em projetos ativos.
                              </div>
                              
                              <label className="text-xs font-medium mt-1">Selecione para quem transferir estas tarefas:</label>
                              <select
                                className="px-3 py-2 text-sm border rounded-md outline-none focus:ring-1 bg-white border-orange-300 w-full sm:w-1/2 cursor-pointer"
                                value={membroDestinoId}
                                onChange={(e) => setMembroDestinoId(e.target.value)}
                              >
                                <option value="" disabled>-- Selecione o novo responsável --</option>
                                {/* Lista os ativos exceto o próprio membro */}
                                {membrosAtivos.filter((m: any) => m.id !== member.id).map((m: any) => (
                                  <option key={m.id} value={m.id}>{m.nome}</option>
                                ))}
                              </select>
                            </div>
                          )}

                          <div className="flex flex-col gap-1">
                            <label className={`text-xs font-semibold ${membroAcaoTipo === 'excluir' ? 'text-red-700' : 'text-amber-700'}`}>
                              Justifique {membroAcaoTipo === 'excluir' ? 'a exclusão' : 'o desligamento'}:
                            </label>
                            {erroMsg && <span className="text-xs text-red-600 font-medium">{erroMsg}</span>}
                            
                            <div className="flex gap-2">
                              <input
                                type="text" autoFocus
                                placeholder={membroAcaoTipo === 'excluir' ? "Ex: Quebra de contrato..." : "Ex: Fim do estágio..."}
                                className="flex-1 px-3 py-2 text-sm border rounded-md outline-none focus:ring-1 bg-white border-slate-300"
                                value={justificativa}
                                onChange={(e) => setJustificativa(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleConfirmarAcao(member.id)
                                  if (e.key === 'Escape') { setMembroAcaoId(null); setMembroDestinoId(''); }
                                }}
                              />
                              <Button type="button" variant="secondary" size="sm" onClick={() => { setMembroAcaoId(null); setMembroDestinoId(''); }}>Cancelar</Button>
                              <Button type="button" variant="destructive" size="sm" onClick={(e) => { e.preventDefault(); handleConfirmarAcao(member.id); }}>
                                Confirmar {membroAcaoTipo === 'excluir' ? 'Exclusão' : 'Desligamento'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              )) : (
                <TableRow><TableCell colSpan={5} className="text-center text-slate-500 py-4">Nenhum membro ativo encontrado.</TableCell></TableRow>
              )
            )}

            {/* ---------------- ABA: DESLIGADOS ---------------- */}
            {aba === 'desligados' && (
              membrosDesligados.length > 0 ? membrosDesligados.map((member: any) => (
                <React.Fragment key={member.id}>
                  <TableRow className="bg-amber-50/30">
                    <TableCell className="text-slate-600 font-medium">{member.nome}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.cor_favorita || '-'}</TableCell>
                    <TableCell>{member.data_aniversario ? new Date(member.data_aniversario).toLocaleDateString('pt-BR') : '-'}</TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <Button type="button" variant="secondary-inverse" size="sm" onClick={() => handleRestaurarMembro(member.id, 'desligado')} className="text-blue-600 hover:bg-blue-100 hover:text-blue-700 border-none bg-blue-50">
                        <LuUndo2 className="mr-1" /> Readmitir
                      </Button>
                    </TableCell>
                  </TableRow>
                  {member.justificativa_desligamento && (
                    <TableRow className="bg-amber-50 hover:bg-amber-50">
                      <TableCell colSpan={5} className="py-2 px-4 border-b border-amber-100">
                        <span className="text-xs font-semibold text-amber-700 mr-2">Motivo do desligamento:</span>
                        <span className="text-xs text-amber-900">{member.justificativa_desligamento}</span>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              )) : (
                <TableRow><TableCell colSpan={5} className="text-center text-slate-500 py-4">Nenhum membro desligado.</TableCell></TableRow>
              )
            )}

            {/* ---------------- ABA: EXCLUÍDOS ---------------- */}
            {aba === 'excluidos' && (
              membrosExcluidos.length > 0 ? membrosExcluidos.map((member: any) => (
                <React.Fragment key={member.id}>
                  <TableRow className="bg-red-50/50">
                    <TableCell className="line-through text-slate-500">{member.nome}</TableCell>
                    <TableCell className="text-slate-500">{member.email}</TableCell>
                    <TableCell className="text-slate-500">{member.cor_favorita || '-'}</TableCell>
                    <TableCell className="text-slate-500">{member.data_aniversario ? new Date(member.data_aniversario).toLocaleDateString('pt-BR') : '-'}</TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <Button type="button" variant="secondary-inverse" size="sm" onClick={() => handleRestaurarMembro(member.id, 'excluido')} className="text-blue-600 hover:bg-blue-100 hover:text-blue-700 border-none bg-blue-50">
                        <LuUndo2 className="mr-1" /> Restaurar
                      </Button>
                      <DialogMemberDelete id={member.id}>
                        <Button type="button" variant="destructive-inverse" size="icon" title="Apagar Definitivamente (Banco de Dados)"><LuTrash /></Button>
                      </DialogMemberDelete>
                    </TableCell>
                  </TableRow>
                  {member.justificativa_exclusao && (
                    <TableRow className="bg-red-50 hover:bg-red-50">
                      <TableCell colSpan={5} className="py-2 px-4 border-b border-red-100">
                        <span className="text-xs font-semibold text-red-700 mr-2">Motivo da exclusão:</span>
                        <span className="text-xs text-red-900">{member.justificativa_exclusao}</span>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              )) : (
                <TableRow><TableCell colSpan={5} className="text-center text-slate-500 py-4">A lixeira de membros está vazia.</TableCell></TableRow>
              )
            )}
          </TableBody>
        </Table>
      </DashboardContainer>
    </>
  )
}