"use client";

import { Button } from "@/components/button";
import { FormFieldsGroup, FormField } from "@/components/dashboard/form";
import { DialogFooter } from "@/components/dialog";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { cn } from "@/lib/utils";
import { membroType } from "@/types/member";
import { useFormStatus } from "react-dom";

interface FormFieldsMemberProps {
  member?: membroType;
  readOnly?: boolean;
}

export default function FormFieldsMember({
  member,
  readOnly,
}: FormFieldsMemberProps) {
  const { pending } = useFormStatus();

  return (
    <>
      <FormFieldsGroup>
        {member && <Input defaultValue={member.id} type="text" name="id" hidden />}
        <FormField>
          <Label htmlFor="nome">Nome</Label>
          <Input
            name="nome"
            id="nome"
            placeholder="Insira o nome completo"
            defaultValue={member?.nome}
            disabled={pending}
            readOnly={readOnly}
            required
            minLength={2}
          />
        </FormField>
        <FormField>
          <Label htmlFor="email">E-mail</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="Insira o e-mail"
            disabled={pending}
            readOnly={readOnly}
            required
            maxLength={255}
          />
        </FormField>
        <FormField>
          <Label htmlFor="senha">Senha</Label>
          <Input
            name="senha"
            id="senha"
            type="password"
            placeholder="Insira a senha"
            disabled={pending}
            readOnly={readOnly}
            required={!member}
            minLength={8}
          />
        </FormField>
        <FormField>
          <Label htmlFor="cor_favorita">Cor favorita</Label>
          <Input
            name="cor_favorita"
            id="cor_favorita"
            placeholder="Ex.: Azul"
            defaultValue={member?.cor_favorita}
            disabled={pending}
            readOnly={readOnly}
            required
            minLength={2}
          />
        </FormField>
        <FormField>
          <Label htmlFor="data_aniversario">Data de aniversário</Label>
          <Input
            name="data_aniversario"
            id="data_aniversario"
            type="date"
            defaultValue={member?.data_aniversario}
            disabled={pending}
            readOnly={readOnly}
            required
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
