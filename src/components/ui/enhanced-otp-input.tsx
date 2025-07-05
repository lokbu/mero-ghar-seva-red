
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface EnhancedOTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

const EnhancedOTPInput: React.FC<EnhancedOTPInputProps> = ({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled = false,
  error = false,
  className
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (value.length === length && onComplete) {
      onComplete(value);
    }
  }, [value, length, onComplete]);

  const handleChange = (index: number, inputValue: string) => {
    if (disabled) return;

    const newValue = value.split('');
    newValue[index] = inputValue.slice(-1); // Only take the last character
    const updatedValue = newValue.join('');
    
    onChange(updatedValue);

    // Auto-focus next input
    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, length);
    onChange(pasteData);
  };

  return (
    <div className={cn("flex gap-3 justify-center", className)}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => setActiveIndex(index)}
          onBlur={() => setActiveIndex(-1)}
          disabled={disabled}
          className={cn(
            "w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg transition-all duration-200 focus:outline-none",
            error
              ? "border-red-500 bg-red-50 text-red-700"
              : activeIndex === index
              ? "border-red-500 bg-red-50 shadow-lg scale-105"
              : value[index]
              ? "border-green-500 bg-green-50 text-green-700"
              : "border-gray-300 bg-white hover:border-red-300",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
      ))}
    </div>
  );
};

export { EnhancedOTPInput };
