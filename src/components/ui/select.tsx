'use client';

import { forwardRef, useId, useState, useCallback, useEffect, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, AlertCircle } from "lucide-react";

// Варианты стилей для обертки селекта
const selectWrapperVariants = cva(
  "relative flex items-center w-full rounded-lg transition-all",
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
      isDisabled: {
        true: "opacity-50 cursor-not-allowed bg-gray-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Варианты стилей для кнопки селекта
const selectButtonVariants = cva(
  "w-full flex items-center justify-between bg-transparent text-secondary placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        default: "h-10 px-4 text-sm",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

// Анимация для выпадающего списка
const dropdownVariants = {
  hidden: { 
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    }
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
    }
  },
  exit: { 
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    }
  }
};

// Анимация для сообщений
const messageVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
  variant?: "default" | "outline" | "filled";
  size?: "default" | "sm" | "lg";
  error?: string;
  success?: boolean;
  label?: string;
  hint?: string;
  disabled?: boolean;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({
    className,
    variant,
    size,
    error,
    success,
    disabled,
    options,
    value,
    onChange,
    placeholder = "Выберите опцию",
    label,
    hint,
    required,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focused, setFocused] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const id = useId();

    // Находим выбранную опцию
    const selectedOption = options.find(option => option.value === value);

    // Обработчик клика вне селекта
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Обработчик нажатия клавиш
    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault();
          setIsOpen(prev => !prev);
          break;
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowUp':
        case 'ArrowDown':
          if (!isOpen) {
            event.preventDefault();
            setIsOpen(true);
          }
          break;
      }
    }, [isOpen]);

    // Обработчик выбора опции
    const handleSelect = useCallback((option: SelectOption) => {
      if (!option.disabled) {
        onChange?.(option.value);
        setIsOpen(false);
      }
    }, [onChange]);

    return (
      <div className="space-y-1" ref={selectRef}>
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

        {/* Обертка селекта */}
        <div
          className={cn(
            selectWrapperVariants({ 
              variant, 
              error: !!error, 
              success: !!success, 
              isDisabled: disabled 
            })
          )}
        >
          <button
            id={id}
            ref={ref}
            type="button"
            disabled={disabled}
            className={cn(
              selectButtonVariants({ size }),
              className
            )}
            onClick={() => setIsOpen(prev => !prev)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-labelledby={label ? id : undefined}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
            {...props}
          >
            <span className={!selectedOption ? "text-gray-700" : "text-gray-900"}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </button>

          {/* Выпадающий список */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute left-0 right-0 top-full mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-auto"
                role="listbox"
                aria-labelledby={id}
              >
                {options.map((option) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    className={cn(
                      "w-full px-4 py-2 text-left flex items-center justify-between hover:bg-gray-50 transition-colors",
                      option.disabled && "opacity-50 cursor-not-allowed",
                      option.value === value && "bg-primary/5 text-primary",
                    )}
                    onClick={() => handleSelect(option)}
                    disabled={option.disabled}
                    role="option"
                    aria-selected={option.value === value}
                  >
                    <span>{option.label}</span>
                    {option.value === value && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Иконка статуса */}
          {(error || success) && (
            <div className="pr-3">
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
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
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

Select.displayName = "Select";

export type { SelectProps }; 