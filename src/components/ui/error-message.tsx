type ErrorMessageProps = {
  message: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-red-500 text-center">
        <p className="text-lg font-semibold">{message}</p>
      </div>
    </div>
  );
} 