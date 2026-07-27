"use client";

import type { VariantProps } from "class-variance-authority";
import { Button, type buttonVariants } from "@/components/ui/Button";
import { useToast } from "@/components/feedback/toast";

type DemoActionButtonProps = VariantProps<typeof buttonVariants> & {
  children: React.ReactNode;
  className?: string;
  message?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export function DemoActionButton({
  message = "준비 중인 기능입니다",
  variant,
  className,
  disabled,
  onClick,
  children,
}: DemoActionButtonProps) {
  const { showToast } = useToast();

  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      disabled={disabled}
      onClick={() => {
        onClick?.();
        showToast(message, "info");
      }}
    >
      {children}
    </Button>
  );
}
