import { forwardRef, useId, useState, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, X, AlertCircle, Check } from "lucide-react";

const inputWrapperVariants = cva(
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

const inputVariants = cva(
  "w-full bg-transparent text-secondary placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed",
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

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    Omit<VariantProps<typeof inputWrapperVariants>, "isDisabled">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  showPasswordToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    variant,
    size,
    error,
    success,
    disabled,
    leftIcon,
    rightIcon,
    clearable,
    label,
    hint,
    showPasswordToggle,
    type = "text",
    required,
    value,
    onChange,
    onFocus,
    onBlur,
    ...props
  }, ref) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const id = useId();

    // Обработчики событий
    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(e);
    }, [onFocus]);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.(e);
    }, [onBlur]);

    const handleClear = useCallback(() => {
      const event = new Event("input", { bubbles: true });
      const input = document.getElementById(id) as HTMLInputElement;
      if (input) {
        input.value = "";
        input.dispatchEvent(event);
        onChange?.(event as any);
      }
    }, [id, onChange]);

    const togglePassword = useCallback(() => {
      setShowPassword(prev => !prev);
    }, []);

    // Определяем тип ввода с учетом видимости пароля
    const inputType = showPasswordToggle 
      ? (showPassword ? "text" : "password")
      : type;

    // Определяем иконку состояния
    const getStatusIcon = () => {
      if (error) return <AlertCircle className="w-5 h-5 text-red-500" />;
      if (success) return <Check className="w-5 h-5 text-green-500" />;
      return null;
    };

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

        {/* Обертка инпута */}
        <div
          className={cn(
            inputWrapperVariants({ 
              variant, 
              error: !!error, 
              success: !!success, 
              isDisabled: disabled 
            })
          )}
        >
          {/* Левая иконка */}
          {leftIcon && (
            <div className="pl-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: focused ? 1 : 0.5 }}
                className="text-gray-400"
              >
                {leftIcon}
              </motion.div>
            </div>
          )}

          {/* Поле ввода */}
          <input
            id={id}
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={cn(
              inputVariants({ size }),
              leftIcon && "pl-2",
              (rightIcon || clearable || showPasswordToggle || error || success) && "pr-2",
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

          {/* Правая часть с иконками */}
          <div className="flex items-center gap-1 pr-3">
            {/* Иконка очистки */}
            {clearable && value && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="button"
                onClick={handleClear}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Очистить поле"
              >
                <X className="w-4 h-4 text-gray-400" />
              </motion.button>
            )}

            {/* Переключатель видимости пароля */}
            {showPasswordToggle && (
              <button
                type="button"
                onClick={togglePassword}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </button>
            )}

            {/* Иконка статуса */}
            {getStatusIcon()}

            {/* Правая иконка */}
            {rightIcon && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: focused ? 1 : 0.5 }}
                className="text-gray-400"
              >
                {rightIcon}
              </motion.div>
            )}
          </div>
        </div>

        {/* Сообщения об ошибках или подсказки */}
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

Input.displayName = "Input";

export { Input, type InputProps }; 