"use client";

import { Button } from "@/components/button";
import {
  FormFieldsGroup,
  FormField,
  ImageForm,
  handleImageChange,
} from "@/components/dashboard/form";
import { DialogFooter } from "@/components/dialog";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { cn } from "@/lib/utils";
import { ResponseErrorType } from "@/services/api";
import { userType } from "@/types/user";
import { useState } from "react";
import { useFormStatus } from "react-dom";

interface FormFieldsUserProps {
  user?: userType;
  readOnly?: boolean;
  error?: ResponseErrorType | null;
}

export default function FormFieldsUser({
  user,
  readOnly,
  error,
}: FormFieldsUserProps) {
  const { pending } = useFormStatus();
  const [updateImage, setUpdateImage] = useState<string | undefined>();

  return (
    <>
      <FormFieldsGroup>
        {user && <Input defaultValue={user.id} type="text" name="id" hidden />}
        <FormField>
          <Label htmlFor="name" required={!user}>
            Nome
          </Label>
          <Input
            name="name"
            id="name"
            placeholder="Insira seu nome completo"
            defaultValue={user?.name}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.name}
          />
        </FormField>
        <FormField>
          <Label htmlFor="email" required={!user}>
            E-mail
          </Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="Insira seu e-mail"
            defaultValue={user?.email}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.email}
          />
        </FormField>
        <FormField hidden={readOnly}>
          <Label htmlFor="password" required={!user}>
            Senha
          </Label>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="Insira sua senha"
            disabled={pending}
            error={error?.errors?.password}
          />
        </FormField>
        <FormField hidden={readOnly}>
          <Label htmlFor="password_confirmation" required={!user}>
            Confirmar senha
          </Label>
          <Input
            name="password_confirmation"
            id="password_confirmation"
            type="password"
            placeholder="Confirme sua senha"
            disabled={pending}
            error={error?.errors?.password_confirmation}
          />
        </FormField>
        <FormField>
          <Label htmlFor="image" hidden={readOnly && !user?.image}>
            Imagem
          </Label>
          <Input
            name="image"
            id="image"
            type="file"
            accept="image/*"
            disabled={pending}
            hidden={readOnly}
            onChange={(e) => handleImageChange(e, setUpdateImage)}
            error={error?.errors?.image}
          />
          <ImageForm
            className="aspect-square size-40"
            src={updateImage || user?.image}
          />
        </FormField>
      </FormFieldsGroup>
      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  );
}
