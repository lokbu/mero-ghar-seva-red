
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className,
  hover = true,
  delay = 0
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300 animate-fade-in",
        hover && "hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export { AnimatedCard };
