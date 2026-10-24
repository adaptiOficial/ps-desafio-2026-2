"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarHeaderTitle,
  SidebarNav,
  SidebarNavLink,
  SidebarNavLinkLabel,
  SidebarFooter,
  SidebarHeaderLogo,
  UserDropdown,
} from "@/components/dashboard/sidebar";
// Importei o ícone LuMenu (Hambúrguer)
import { LuClipboard, LuHome, LuLogOut, LuUsers, LuMenu, LuListTodo } from "react-icons/lu";
import { DropdownMenuItem } from "@/components/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import logo from "@/assets/img/logo.jpeg";

export function SidebarMain() {
  // Estado para controlar se o menu mobile está aberto ou fechado
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  const user = session?.data?.user;

  return (
    <>
      {/* 1. CABEÇALHO MOBILE (Visível apenas em ecrãs pequenos) */}
      <div className="flex items-center justify-between p-4 bg-white border-b md:hidden">
        
        {/* Substituímos o texto simples pelos componentes oficiais do seu tema */}
        <div className="flex items-center gap-2">
          <SidebarHeaderLogo src={logo} alt="Logo Adapti" />
          <SidebarHeaderTitle>Adapti</SidebarHeaderTitle>
        </div>

        <button 
          onClick={() => setIsOpen(true)} 
          className="p-2 transition-colors rounded-md bg-slate-100 hover:bg-slate-200"
        >
          <LuMenu size={24} className="text-slate-700" />
        </button>
      </div>

      {/* 2. OVERLAY (Fundo escuro que fecha o menu ao clicar) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 3. MENU LATERAL (Desliza no mobile, Fixo no Desktop) */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-[18rem] bg-white transform transition-transform duration-300 ease-in-out
          md:relative md:w-auto md:transform-none md:flex
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
       <Sidebar>
          {/* 1. Forçamos a altura total do ecrã (h-screen) e dividimos os extremos (justify-between) */}
          <div className="flex flex-col justify-between h-screen md:h-full">
            
            {/* BLOCO SUPERIOR: Logo e Navegação colados ao topo */}
            <div>
              <SidebarHeader href="/admin">
                <SidebarHeaderLogo src={logo} alt="Logo Dashboard" />
                <SidebarHeaderTitle>Adapti</SidebarHeaderTitle>
              </SidebarHeader>

              <div onClick={() => setIsOpen(false)} className="w-full">
                <SidebarNav>
                  <SidebarNavLink href="/admin">
                    <LuHome />
                    <SidebarNavLinkLabel>Home</SidebarNavLinkLabel>
                  </SidebarNavLink>
                  <SidebarNavLink href="/admin/membros">
                    <LuUsers />
                    <SidebarNavLinkLabel>Membros</SidebarNavLinkLabel>
                  </SidebarNavLink>
                  <SidebarNavLink href="/admin/projetos">
                    <LuClipboard />
                    <SidebarNavLinkLabel>Projetos</SidebarNavLinkLabel>
                  </SidebarNavLink>
                  <SidebarNavLink href="/admin/tarefas">
                    <LuListTodo />
                    <SidebarNavLinkLabel>Tarefas</SidebarNavLinkLabel>
                  </SidebarNavLink>
                </SidebarNav>
              </div>
            </div>

            {/* BLOCO INFERIOR: Utilizador colado ao fundo */}
            {/* O pb-4 dá uma pequena margem no telemóvel para não encostar na borda física do ecrã */}
            <div className="pb-4 md:pb-0">
              <SidebarFooter>
                <UserDropdown name={user?.name} email={user?.email} src={user?.image}>
                  <DropdownMenuItem onClick={async () => await signOut()}>
                    <LuLogOut className="w-3 h-3 mr-3" />
                    Log out
                  </DropdownMenuItem>
                </UserDropdown>
              </SidebarFooter>
            </div>
            
          </div>
        </Sidebar>
      </div>
    </>
  );
}