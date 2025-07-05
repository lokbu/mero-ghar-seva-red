
import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

interface EnhancedInputProps extends React.ComponentProps<"input"> {
  label?: string
  error?: string
  success?: boolean
  showPasswordToggle?: boolean
}

const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ className, type, label, error, success, showPasswordToggle, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)
    
    const inputType = showPasswordToggle && type === "password" 
      ? (showPassword ? "text" : "password") 
      : type

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={inputType}
            className={cn(
              "flex h-12 w-full rounded-lg border-2 bg-white px-4 py-3 text-base transition-all duration-200",
              "placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              error 
                ? "border-red-300 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-100" 
                : success
                ? "border-green-300 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-100"
                : "border-gray-200 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-100",
              isFocused && "shadow-lg",
              className
            )}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {showPasswordToggle && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <span className="w-1 h-1 bg-red-600 rounded-full"></span>
            {error}
          </p>
        )}
        {success && !error && (
          <p className="text-sm text-green-600 flex items-center gap-1">
            <span className="w-1 h-1 bg-green-600 rounded-full"></span>
            Looks good!
          </p>
        )}
      </div>
    )
  }
)
EnhancedInput.displayName = "EnhancedInput"

export { EnhancedInput }
