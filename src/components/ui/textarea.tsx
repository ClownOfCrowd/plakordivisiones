'use client';

import { forwardRef, useId, useState, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Check } from "lucide-react";

const textareaWrapperVariants = cva(
  "relative w-full rounded-lg transition-all",
  {
    variants: {
      variant: {
        default: "bg-white border-2 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20",
        filled: "bg-gray-50 border-2 border-transparent focus-within:bg-white focus-within:border-primary/50",
        outline: "bg-transparent border-2 border-gray-200 focus-within:border-primary/50",
      },
      error: {
        true: "!border-red-500 focus-within:!border-red-500 focus-within:!ring-red-200",
      },
      success: {
        true: "!border-green-500 focus-within:!border-green-500 focus-within:!ring-green-200",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed bg-gray-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const textareaVariants = cva(
  "w-full bg-transparent text-secondary placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed resize-y",
  {
    variants: {
      size: {
        default: "p-4 text-sm min-h-[120px]",
        sm: "p-3 text-xs min-h-[80px]",
        lg: "p-4 text-base min-h-[160px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaWrapperVariants>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    variant,
    size,
    error,
    success,
    disabled,
    label,
    hint,
    required,
    value,
    onChange,
    onFocus,
    onBlur,
    ...props
  }, ref) => {
    const [focused, setFocused] = useState(false);
    const id = useId();

    // Обработчики событий
    const handleFocus = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(true);
      onFocus?.(e);
    }, [onFocus]);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(false);
      onBlur?.(e);
    }, [onBlur]);

    return (
      <div className="space-y-1">
        {/* Метка */}
        {label && (
          <label 
            htmlFor={id}
            className="block text-sm font-medium text-secondary"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Обертка textarea */}
        <div
          className={cn(
            textareaWrapperVariants({ variant, error: !!error, success: !!success, disabled })
          )}
        >
          <textarea
            id={id}
            ref={ref}
            disabled={disabled}
            className={cn(
              textareaVariants({ size }),
              className
            )}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
            {...props}
          />

          {/* Иконка статуса */}
          {(error || success) && (
            <div className="absolute right-3 top-3">
              {error ? (
                <AlertCircle className="w-5 h-5 text-red-500" />
              ) : (
                <Check className="w-5 h-5 text-green-500" />
              )}
            </div>
          )}
        </div>

        {/* Сообщения */}
        <AnimatePresence mode="wait">
          {(error || success || hint) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm"
            >
              {error && (
                <p id={`${id}-error`} className="text-red-500">
                  {error}
                </p>
              )}
              {success && !error && (
                <p className="text-green-500">
                  {success}
                </p>
              )}
              {hint && !error && !success && (
                <p id={`${id}-hint`} className="text-gray-500">
                  {hint}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea, type TextareaProps }; 