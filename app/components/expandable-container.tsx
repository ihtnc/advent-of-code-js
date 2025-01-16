'use client';

import { useId, useState } from 'react';

export default function ExpandableContainer({
    text,
    children,
    className,
    expanded = false,
  }: Readonly<{
    text: string,
    children: React.ReactNode,
    className?: string,
    expanded?: boolean,
  }>) {
  const id = useId();
  const [isExpanded, setIsExpanded] = useState(expanded);

  return (
    <>
      <input id={id} className="peer/expand absolute scale-0" type="checkbox"
        checked={isExpanded}
        onChange={() => setIsExpanded(!isExpanded)}
      />
      <label htmlFor={id} className={className}>
        {text}
      </label>

      <div className="h-0 collapse opacity-0 transition-all duration-300 peer-checked/expand:h-fit peer-checked/expand:visible peer-checked/expand:opacity-100">
        {children}
      </div>
    </>
  );
};