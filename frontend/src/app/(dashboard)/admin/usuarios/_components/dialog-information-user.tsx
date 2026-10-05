"use client";

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/dialog";
import FormFieldsUser from "./form-fields-user";
import { userType } from "@/types/user";
import SkeletonFormFieldsUser from "./skeleton-users";
import { useState } from "react";

interface DialogInformationUserProps {
  user: userType;
  children: React.ReactNode;
  isInformation?: boolean;
}

export function DialogInformationUser({
  user,
  children,
}: DialogInformationUserProps) {
  const [open, setOpen] = useState<boolean>();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do usuário</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas do usuário abaixo.
          </DialogDescription>
        </DialogHeader>
        {user ? (
          <FormFieldsUser user={user} readOnly />
        ) : (
          <SkeletonFormFieldsUser readOnly />
        )}
      </DialogContent>
    </Dialog>
  );
}
