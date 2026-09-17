"use client";

import { useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { DecoStar } from "@/components/ornaments";
import { site } from "@/data/site";
import { submitLaunchListSignup, validateSignup, type LaunchListSignup } from "@/lib/launch-list";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Botão + diálogo modal nativo (<dialog>.showModal):
 * fundo inerte, Esc fecha, foco preso no diálogo e devolvido ao botão ao fechar.
 */
export function LaunchListDialog() {
  const copy = site.launchList;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof LaunchListSignup | "form", string>>>({});

  const open = () => {
    setStatus("idle");
    setErrors({});
    dialogRef.current?.showModal();
    // Foco direto no primeiro campo; o título e o aviso de demonstração são anunciados pelo diálogo.
    requestAnimationFrame(() => nameRef.current?.focus());
  };

  const close = () => dialogRef.current?.close();

  const onClose = () => {
    setStatus("idle");
    setErrors({});
    triggerRef.current?.focus();
  };

  const trapFocus = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusables = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex='-1'])"),
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = { name: String(form.get("name") ?? ""), email: String(form.get("email") ?? "") };
    const found = validateSignup(data);
    setErrors(found);
    if (found.name || found.email) {
      const field = event.currentTarget.elements.namedItem(found.name ? "name" : "email");
      if (field instanceof HTMLElement) field.focus();
      return;
    }
    setStatus("submitting");
    const result = await submitLaunchListSignup(data);
    if (result.ok) {
      setStatus("success");
      requestAnimationFrame(() => successRef.current?.focus());
    } else {
      setStatus("error");
      setErrors({ form: result.error });
    }
  };

  const titleId = `${id}-title`;
  const noticeId = `${id}-notice`;

  return (
    <>
      <Button ref={triggerRef} size="lg" onClick={open} aria-haspopup="dialog">
        {site.invitation.cta}
      </Button>

      <dialog
        ref={dialogRef}
        className="launch-dialog"
        aria-labelledby={titleId}
        aria-describedby={noticeId}
        onClose={onClose}
        onKeyDown={trapFocus}
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
      >
        <div className="relative px-6 pb-8 pt-7 sm:px-9 sm:pb-10 sm:pt-9">
          <button
            type="button"
            onClick={close}
            className="absolute right-3 top-3 grid size-11 place-items-center text-fumo transition-colors hover:text-marfim"
            aria-label="Fechar"
          >
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>

          <DecoStar className="size-4 text-ouro" />
          <h2 id={titleId} className="mt-4 font-display text-[2rem] font-medium leading-[1.05] sm:text-[2.35rem]">
            {copy.dialogTitle}
          </h2>

          <p id={noticeId} className="mt-5 border-l-2 border-ouro py-1 pl-3 text-[0.875rem] leading-snug text-ribalta">
            {copy.demoNotice}
          </p>

          {status === "success" ? (
            <div className="mt-8">
              <p ref={successRef} tabIndex={-1} role="status" className="font-display text-[1.35rem] italic leading-snug outline-none">
                {copy.successMessage}
              </p>
              <Button variant="ghost" className="mt-8 w-full" onClick={close}>
                Fechar
              </Button>
            </div>
          ) : (
            <form className="mt-7 grid gap-5" noValidate onSubmit={onSubmit}>
              <p className="text-[0.9375rem] leading-relaxed text-fumo">{copy.dialogIntro}</p>

              <div className="grid gap-2">
                <label htmlFor={`${id}-name`} className="text-[0.875rem] font-medium">
                  Nome
                </label>
                <input
                  ref={nameRef}
                  id={`${id}-name`}
                  name="name"
                  autoComplete="name"
                  className="field"
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? `${id}-name-error` : undefined}
                />
                {errors.name && (
                  <p id={`${id}-name-error`} className="text-[0.8125rem] text-[#f0a0aa]">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <label htmlFor={`${id}-email`} className="text-[0.875rem] font-medium">
                  E-mail
                </label>
                <input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  className="field"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? `${id}-email-error` : undefined}
                />
                {errors.email && (
                  <p id={`${id}-email-error`} className="text-[0.8125rem] text-[#f0a0aa]">
                    {errors.email}
                  </p>
                )}
              </div>

              {errors.form && (
                <p role="alert" className="text-[0.875rem] text-[#f0a0aa]">
                  {errors.form}
                </p>
              )}

              <Button type="submit" size="lg" className="mt-2 w-full" disabled={status === "submitting"}>
                {status === "submitting" ? "Enviando…" : copy.submitLabel}
              </Button>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
