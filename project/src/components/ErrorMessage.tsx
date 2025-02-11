/**
 * Error message display component
 * Features:
 * - Different error types
 * - Icon support
 * - Accessibility
 */
const ErrorMessage = ({ message, type = 'error' }: ErrorMessageProps) => {
  const styles = {
    error: 'bg-red-50 text-red-700 border-red-200',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200'
  };

  return (
    <div
      role="alert"
      className={`
        p-4 rounded-md border
        ${styles[type]}
      `}
    >
      <div className="flex items-center gap-2">
        <AlertCircle className="w-5 h-5" />
        <p>{message}</p>
      </div>
    </div>
  );
}; 