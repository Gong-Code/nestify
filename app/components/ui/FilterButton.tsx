import React from "react";

export type FilterButtonProps = {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  isSelected: boolean;
  className?: string;
};

export const FilterButton = ({
  title,
  icon,
  onClick,
  isSelected,
  className = "",
}: FilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`text-sm transition hover:translate-y-0.5 w-fit h-[33px] pl-3.5 pr-4 p-2 rounded-full flex items-center gap-1 ${
        isSelected
          ? "bg-[--color-primary] text-[--color-text-secondary] outline outline-1 outline-[--color-background]"
          : "text-[--color-text-primary] outline outline-1 outline-[--color-primary]"
      } ${className}`}
    >
      {icon}
      <span className="filterTitle hidden md:block">{title}</span>
    </button>
  );
};
