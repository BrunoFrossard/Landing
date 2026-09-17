import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Botões do conceito: retângulos de bilheteria com filete interno,
 * sem cantos arredondados. Use `buttonVariants` em <a> para links.
 */
export const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-3 select-none",
    "font-sans text-[0.75rem] font-semibold uppercase tracking-[0.2em] leading-none",
    "transition-[background-color,color,border-color,box-shadow] duration-300",
    "disabled:pointer-events-none disabled:opacity-60",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-ouro text-coxia",
          "shadow-[inset_0_0_0_4px_var(--color-ouro),inset_0_0_0_5px_rgb(8_7_7/0.35)]",
          "hover:bg-ribalta hover:shadow-[inset_0_0_0_4px_var(--color-ribalta),inset_0_0_0_5px_rgb(8_7_7/0.35)]",
        ],
        ghost: [
          "border border-marfim/45 text-marfim bg-coxia/20",
          "hover:border-ribalta hover:text-ribalta",
        ],
        link: ["text-marfim underline decoration-ouro/60 underline-offset-[6px] tracking-[0.14em] hover:text-ribalta"],
      },
      size: {
        default: "min-h-12 px-6 py-4",
        lg: "min-h-14 px-8 py-5",
        sm: "min-h-11 px-4 py-3",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, type = "button", ...props },
  ref,
) {
  return <button ref={ref} type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});
