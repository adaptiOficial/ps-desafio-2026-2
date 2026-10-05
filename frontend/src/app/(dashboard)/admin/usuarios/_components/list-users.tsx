import { DashboardContainer } from "@/components/dashboard/dashboard-items";
import { Pagination } from "@/components/dashboard/pagination";
import {
  TabbleCellImage,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/dashboard/table";
import { api } from "@/services/api";
import { paginationResponseType } from "@/types/pagination-response";
import { userType } from "@/types/user";
import { Button } from "@/components/button";
import { LuInfo, LuPen, LuCirclePlus, LuTrash } from "react-icons/lu";
import { DialogUpdateUser } from "./dialog-update-user";
import { DialogUserDelete } from "./dialog-delete-user";
import { DialogInformationUser } from "./dialog-information-user";
import { PerPage } from "@/components/dashboard/per_page";
import { DialogCreateUser } from "./dialog-create-user";
import { FilterUsers } from "./filter-users";

interface ListUsersProps {
  page?: number;
  perPage?: number;
  name?: string;
  email?: string;
}

export default async function ListUsers({
  page,
  perPage,
  name,
  email,
}: ListUsersProps) {
  const { response } = await api<paginationResponseType<userType[]>>(
    "GET",
    "/users",
    {
      params: {
        page,
        per_page: perPage,
        name,
        email,
      },
    },
  );

  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os usuários.
      </DashboardContainer>
    );
  }

  const users: userType[] = response?.data;

  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <FilterUsers name={name} email={email} />
        <DialogCreateUser>
          <Button size="sm">
            <LuCirclePlus />
            Novo usuário
          </Button>
        </DialogCreateUser>
      </DashboardContainer>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user: userType) => (
              <TableRow key={user.id}>
                <TableCell>
                  <TabbleCellImage src={user.image} />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <DialogInformationUser user={user}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationUser>
                  <DialogUpdateUser user={user}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateUser>
                  <DialogUserDelete id={user.id}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogUserDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!users.length && (
            <TableCaption>Nenhum usuário encontrado.</TableCaption>
          )}
        </Table>
      </DashboardContainer>
      <DashboardContainer className="flex justify-between space-x-0 gap-y-2.5 max-sm:flex-col max-sm:items-center">
        <PerPage total={response.total} />
        <Pagination lastPage={response.last_page} />
      </DashboardContainer>
    </>
  );
}
