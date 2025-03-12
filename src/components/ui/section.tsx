import { cn } from "@/lib/utils";
import { memo } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { useDeviceOptimization } from "@/hooks/useDeviceOptimization";

const sectionVariants = cva(
  "relative w-full",
  {
    variants: {
      spacing: {
        none: "",
        sm: "py-4 sm:py-6",
        md: "py-6 sm:py-8",
        lg: "py-8 sm:py-12",
        xl: "py-12 sm:py-16",
        "2xl": "py-16 sm:py-24",
        default: "py-8 sm:py-12 md:py-16"
      },
      background: {
        none: "",
        light: "bg-gray-50/50",
        dark: "bg-gray-900 text-white",
        primary: "bg-primary/5 text-primary-foreground",
        secondary: "bg-secondary/5 text-secondary-foreground",
        default: "bg-background"
      }
    },
    defaultVariants: {
      spacing: "default",
      background: "default"
    }
  }
);

interface SectionProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: "section" | "article" | "aside" | "div";
  animate?: boolean;
}

const Section = memo(function Section({
  className,
  spacing,
  background,
  as: Component = "section",
  animate = true,
  children,
  ...props
}: SectionProps) {
  const { isLowBandwidth, shouldReduceMotion } = useDeviceOptimization();
  const shouldAnimate = animate && !shouldReduceMotion && !isLowBandwidth;

  const content = (
    <Component
      className={cn(
        sectionVariants({ spacing, background }),
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );

  if (!shouldAnimate) {
    return content;
  }

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 0.3,
          ease: "easeOut"
        }}
      >
        {content}
      </motion.div>
    </LazyMotion>
  );
});

Section.displayName = "Section";

export { Section, type SectionProps }; 