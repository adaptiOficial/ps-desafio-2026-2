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
import { membroType } from "@/types/member";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { LuCheckCircle, LuCircle } from "react-icons/lu";

interface FormFieldsMemberProps {
  member?: membroType;
  readOnly?: boolean;
}

export default function FormFieldsMember({
  member,
  readOnly,
}: FormFieldsMemberProps) {
  const { pending } = useFormStatus();
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    member?.image,
  );
  
  const [senha, setSenha] = useState("");

  const regrasSenha = {
    tamanho: senha.length >= 8,
    maiuscula: /[A-Z]/.test(senha),
    minuscula: /[a-z]/.test(senha),
    numero: /[0-9]/.test(senha),
    simbolo: /[^A-Za-z0-9]/.test(senha),
  };

  const renderRegra = (cumprida: boolean, texto: string) => (
    <div className={`flex items-center gap-2 transition-colors ${cumprida ? 'text-green-600 font-medium' : 'text-slate-800'}`}>
      {cumprida ? <LuCheckCircle size={14} className="shrink-0" /> : <LuCircle size={14} className="shrink-0" />}
      <span className="text-[12px] whitespace-nowrap">{texto}</span>
    </div>
  );

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
            autoComplete="off"
            className="w-full"
          />
        </FormField>
        
        <FormField>
          <Label htmlFor="email">E-mail</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="exemplo@dominio.com"
            defaultValue={member?.email}
            disabled={pending}
            readOnly={readOnly}
            required
            maxLength={255}
            autoComplete="off"
            className="w-full"
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
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="new-password"
            className="w-full"
          />
          {(!member || senha.length > 0) && (
            <div 
              className="mt-2 w-full bg-white p-3 rounded-md border border-slate-200 shadow-sm flex flex-col items-start"
              style={{ gridColumn: '2 / -1' }}
            >
              <p className="text-slate-800 text-[12px] mb-2 font-normal text-left w-full">Sua senha deve conter:</p>
              <div className="flex flex-col gap-1.5 w-full items-start text-left">
                {renderRegra(regrasSenha.tamanho, "Mais de 8 caracteres")}
                {renderRegra(regrasSenha.maiuscula, "Maiúscula (A-Z)")}
                {renderRegra(regrasSenha.minuscula, "Minúscula (a-z)")}
                {renderRegra(regrasSenha.numero, "Número (0-9)")}
                {renderRegra(regrasSenha.simbolo, "Símbolo (@, #, !)")}
              </div>
            </div>
          )}
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
            autoComplete="off"
            className="w-full"
          />
        </FormField>
        
        <FormField>
          <Label htmlFor="data_aniversario">
            Data de <br /> aniversário
          </Label>
          <Input
            name="data_aniversario"
            id="data_aniversario"
            type="date"
            defaultValue={member?.data_aniversario}
            disabled={pending}
            readOnly={readOnly}
            required
            className="w-[180px]"
          />
        </FormField>
        
        <FormField>
          <Label htmlFor="image">Imagem</Label>
          <Input
            name="image"
            id="image"
            type="file"
            accept="image/jpeg, image/png, image/jpg, image/webp"
            disabled={pending}
            readOnly={readOnly}
            onChange={(event) => handleImageChange(event, setImagePreview)}
            className="w-full bg-white"
          />
          <p 
            className="mt-2 text-[12px] text-slate-800 leading-snug text-left w-full"
            style={{ gridColumn: '2 / -1' }}
          >
            Tamanho máximo: 2MB. Formatos aceitos: JPEG, PNG, WEBP.
          </p>
          {imagePreview && (
            <div style={{ gridColumn: '2 / -1' }} className="w-full mt-2">
              <ImageForm
                src={imagePreview}
                alt="Pré-visualização da imagem"
                className="max-h-48 w-full object-contain rounded border"
              />
            </div>
          )}
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