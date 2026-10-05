import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from "@/components/dashboard/dashboard-items";
import { LuHouse } from "react-icons/lu";

export default function Page() {
  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuHouse />
          Home
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Tela principal da aplicação.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain></DashboardMain>
    </>
  );
}
