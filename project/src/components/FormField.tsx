/**
 * Reusable form field component
 * Features:
 * - Label and input integration
 * - Error message display
 * - Accessibility support
 * - Custom validation
 */
const FormField = ({
  label,
  name,
  type = 'text',
  error,
  required = false,
  ...props
}: FormFieldProps) => {
  const id = useId();

  return (
    <div className="mb-4">
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className={`
          w-full px-3 py-2 rounded-md border
          focus:outline-none focus:ring-2 focus:ring-cyan-500
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p 
          id={`${id}-error`}
          className="mt-1 text-sm text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
}; 