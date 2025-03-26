
import React from "react";
import { cn } from "@/lib/utils";

interface ProductCategoryProps {
  category: {
    id: string;
    name: string;
  };
  isSelected: boolean;
  onSelect: () => void;
}

export function ProductCategory({ category, isSelected, onSelect }: ProductCategoryProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full text-left px-3 py-2 rounded-md transition-colors text-sm",
        isSelected
          ? "bg-primary/10 text-primary font-medium"
          : "hover:bg-gray-100 text-gray-700"
      )}
    >
      {category.name}
    </button>
  );
}
