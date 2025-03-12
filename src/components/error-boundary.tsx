'use client';

import { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

const ErrorContent = ({ onReload, onBack }: { onReload: () => void; onBack: () => void }) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 safe-area-inset">
      <div className="max-w-md w-full text-center space-y-4 mx-4">
        <AlertTriangle className="w-12 h-12 mx-auto text-yellow-500" />
        <h2 className="text-2xl font-semibold text-gray-900">
          Algo salió mal
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Lo sentimos, ha ocurrido un error inesperado. Por favor, intente recargar la página.
        </p>
        <div className={cn(
          "flex gap-4 justify-center",
          isMobile ? "flex-col" : "flex-row"
        )}>
          <Button
            variant="default"
            onClick={onReload}
            className="w-full sm:w-auto"
          >
            Recargar página
          </Button>
          <Button
            variant="outline"
            onClick={onBack}
            className="w-full sm:w-auto"
          >
            Volver atrás
          </Button>
        </div>
      </div>
    </div>
  );
};

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public reset = () => {
    this.setState({ hasError: false });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleBack = () => {
    window.history.back();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorContent 
          onReload={this.handleReload}
          onBack={this.handleBack}
        />
      );
    }

    return this.props.children;
  }
} 