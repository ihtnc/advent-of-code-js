'use client';

import { useId, useState } from 'react';

export default function ExpandableContainer({
    label,
    children,
    labelClassName,
    childrenClassName,
    expanded = false,
  }: Readonly<{
    label: React.ReactNode,
    children: React.ReactNode,
    labelClassName?: string,
    childrenClassName?: string,
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
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>

      <div className={`${["hidden opacity-0 transition-all duration-300 peer-checked/expand:flex peer-checked/expand:visible peer-checked/expand:opacity-100", childrenClassName].join(' ')}`}>
        {children}
      </div>
    </>
  );
};