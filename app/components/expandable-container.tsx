'use client';

import { useId, useState } from 'react';
import { cn } from '@/utilities';

export default function ExpandableContainer({
    label,
    children,
    className,
    labelClassName,
    childrenClassName,
    expanded = false,
  }: Readonly<{
    label: React.ReactNode,
    children: React.ReactNode,
    className?: string,
    labelClassName?: string,
    childrenClassName?: string,
    expanded?: boolean,
  }>) {
  const id = useId();
  const [isExpanded, setIsExpanded] = useState(expanded);

  return (
    <span className={cn("flex flex-col", className)}>
      <input id={id} className="peer/expand absolute scale-0" type="checkbox"
        checked={isExpanded}
        onChange={() => setIsExpanded(!isExpanded)}
      />
      <label htmlFor={id} className={cn("w-fit", labelClassName)}>
        {label}
      </label>

      <div className={cn(
        "hidden opacity-0 transition-all duration-300 peer-checked/expand:flex peer-checked/expand:visible peer-checked/expand:opacity-100",
        childrenClassName
      )}>
        {children}
      </div>
    </span>
  );
};