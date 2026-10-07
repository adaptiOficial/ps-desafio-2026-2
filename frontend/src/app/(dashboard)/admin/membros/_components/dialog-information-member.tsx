"use client";

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/dialog";
import FormFieldsMember from "./form-fields-member";
import { membroType } from "@/types/member";
import SkeletonFormFieldsMember from "./skeleton-members";
import { useState } from "react";

interface DialogInformationMemberProps {
  member: membroType;
  children: React.ReactNode;
  isInformation?: boolean;
}

export function DialogInformationMember({
  member,
  children,
}: DialogInformationMemberProps) {
  const [open, setOpen] = useState<boolean>();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do membro</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas do membro abaixo.
          </DialogDescription>
        </DialogHeader>
        {member ? (
          <FormFieldsMember member={member} readOnly />
        ) : (
          <SkeletonFormFieldsMember readOnly />
        )}
      </DialogContent>
    </Dialog>
  );
}
