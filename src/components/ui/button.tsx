'use client';

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { motion, HTMLMotionProps } from "framer-motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 gap-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-800 shadow-md hover:shadow-lg focus-visible:ring-primary/50",
        secondary: "bg-secondary text-white hover:bg-secondary/90 shadow-md hover:shadow-lg focus-visible:ring-secondary/50",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-md hover:shadow-lg focus-visible:ring-primary/50",
        ghost: "text-primary hover:bg-primary-50 focus-visible:ring-primary/50",
        cta: "bg-accent text-white hover:bg-accent-hover shadow-lg hover:shadow-xl text-base font-semibold focus-visible:ring-accent/50",
        white: "bg-white text-primary hover:bg-gray-50 border-2 border-white hover:border-primary shadow-md hover:shadow-lg focus-visible:ring-primary/50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-8 text-base",
      },
      fullWidth: {
        true: "w-full",
      },
      loading: {
        true: "cursor-wait",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
      loading: false,
    },
  }
);

interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, keyof VariantProps<typeof buttonVariants>>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
  soundEffect?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth,
    loading,
    loadingText,
    leftIcon,
    rightIcon,
    children,
    soundEffect = true,
    onClick,
    ...props 
  }, ref) => {
    // Обработчик клика с звуковым эффектом
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (soundEffect) {
        const audio = new Audio("/sounds/click.mp3");
        audio.volume = 0.2;
        audio.play().catch(() => {});
      }
      onClick?.(e);
    };

    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, fullWidth, loading, className }))}
        ref={ref}
        onClick={handleClick}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.1 }}
        aria-disabled={loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps }; 