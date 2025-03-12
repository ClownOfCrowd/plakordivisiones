import { cn } from "@/lib/utils";
import { memo } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const containerVariants = cva(
  "container mx-auto px-4 sm:px-6 lg:px-8",
  {
    variants: {
      maxWidth: {
        sm: "max-w-screen-sm",
        md: "max-w-screen-md",
        lg: "max-w-screen-lg",
        xl: "max-w-screen-xl",
        "2xl": "max-w-screen-2xl",
        full: "max-w-full",
        default: "max-w-7xl"
      },
      padding: {
        none: "px-0",
        sm: "px-2 sm:px-4",
        md: "px-4 sm:px-6",
        lg: "px-6 sm:px-8",
        xl: "px-8 sm:px-12",
        default: "px-4 sm:px-6 lg:px-8"
      }
    },
    defaultVariants: {
      maxWidth: "default",
      padding: "default"
    }
  }
);

interface ContainerProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = memo(function Container({ 
  className,
  maxWidth,
  padding,
  ...props 
}: ContainerProps) {
  return (
    <div
      className={cn(
        containerVariants({ maxWidth, padding }),
        className
      )}
      {...props}
    />
  );
});

Container.displayName = "Container";

export { Container, type ContainerProps }; 