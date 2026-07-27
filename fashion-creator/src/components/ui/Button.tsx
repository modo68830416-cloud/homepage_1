import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-40 min-h-11 px-6",
  {
    variants: {
      variant: {
        primary:
          "bg-accent-lime text-[#0a0a0a] hover:brightness-110 active:brightness-95 shadow-[0_0_0_1px_rgba(217,255,87,0.4)]",
        secondary:
          "bg-surface-strong text-foreground border border-border-strong hover:bg-white/15",
        ghost: "text-foreground-muted hover:text-foreground hover:bg-surface",
        outline:
          "border border-border-strong text-foreground hover:border-accent-lime hover:text-accent-lime",
        icon: "h-11 w-11 p-0 rounded-full bg-surface border border-border hover:bg-surface-strong",
        magnetic:
          "bg-gradient-to-r from-accent-lime via-accent-pink to-accent-violet text-[#0a0a0a] hover:scale-[1.03] active:scale-[0.98]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({ className, variant, children, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant }), className);

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
