
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className, 
  text 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <div 
        className={cn(
          "border-2 border-current border-t-transparent rounded-full animate-spin",
          sizeClasses[size],
          className
        )}
      />
      {text && (
        <span className="text-sm font-medium">{text}</span>
      )}
    </div>
  );
};

export { LoadingSpinner };
