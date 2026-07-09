import type { ReactNode } from "react";

// The single 680px reading column shared by every surface.
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-border border-r-1 border-l-1 mx-auto w-full max-w-[680px] px-6 ${className}`}>
      {children}
    </div>
  );
}

