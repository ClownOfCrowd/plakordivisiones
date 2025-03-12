'use client';

import * as React from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, useCallback, memo, useRef } from "react";
import { Loader2 } from "lucide-react";
import { motion, HTMLMotionProps } from "framer-motion";
import { useDeviceOptimization } from "@/hooks/useDeviceOptimization";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none gap-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg focus-visible:ring-primary/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border-2 border-primary hover:bg-primary hover:text-white",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        cta: "bg-accent text-white hover:bg-accent/90 shadow-lg hover:shadow-xl text-base font-semibold focus-visible:ring-accent/50 transform hover:scale-[1.02] active:scale-[0.98] transition-transform",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
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
  children: React.ReactNode;
}

// Мемоизированный компонент загрузки
const LoadingIndicator = memo(({ text }: { text: React.ReactNode }) => {
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <motion.div
        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
        variants={spinnerVariants}
        animate="animate"
      />
      {typeof text === 'string' ? text : typeof text === 'number' ? String(text) : null}
    </div>
  );
});

LoadingIndicator.displayName = 'LoadingIndicator';

// Мемоизированный компонент контента
const ButtonContent = memo(({ 
  leftIcon, 
  rightIcon,
  children 
}: { 
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: string | number | React.ReactElement;
}) => (
  <>
    {leftIcon && <span className="mr-2">{leftIcon}</span>}
    {children}
    {rightIcon && <span className="ml-2">{rightIcon}</span>}
  </>
));

ButtonContent.displayName = 'ButtonContent';

const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(
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
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { isLowBandwidth, shouldReduceMotion } = useDeviceOptimization();

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      if (soundEffect && !isLowBandwidth) {
        if (!audioRef.current) {
          audioRef.current = new Audio("/sounds/click.mp3");
          audioRef.current.volume = 0.2;
        }
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
      onClick?.(e);
    }, [onClick, soundEffect, isLowBandwidth]);

    const motionProps = shouldReduceMotion ? {
      whileTap: {}
    } : {
      whileTap: { scale: 0.98 },
      transition: { duration: 0.1 }
    };

    const renderContent = () => {
      if (loading) {
        return <LoadingIndicator text={loadingText || (typeof children === 'string' || typeof children === 'number' ? children : null)} />;
      }
      
      const isValidChild = typeof children === 'string' || typeof children === 'number' || React.isValidElement(children);
      
      return isValidChild ? (
        <ButtonContent
          leftIcon={leftIcon}
          rightIcon={rightIcon}
        >
          {children}
        </ButtonContent>
      ) : null;
    };

    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, fullWidth, loading, className }))}
        ref={ref}
        onClick={handleClick}
        {...motionProps}
        aria-disabled={loading}
        aria-busy={loading}
        {...props}
      >
        {renderContent()}
      </motion.button>
    );
  }
));

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps }; 