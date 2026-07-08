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
    <div className={`mx-auto w-full max-w-[680px] px-6 ${className}`}>
      {children}
    </div>
  );
}
