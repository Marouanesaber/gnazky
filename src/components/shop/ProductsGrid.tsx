
import React from "react";
import { cn } from "@/lib/utils";

interface ProductsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ProductsGrid({ children, className, ...props }: ProductsGridProps) {
  return (
    <div 
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", 
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
