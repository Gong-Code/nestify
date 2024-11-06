import React from "react";

export type FilterButtonProps = {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
};

export const FilterButton = ({ title, icon, onClick }: FilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="text-sm text-[--color-text-primary] outline outline-1 outline-[--color-primary] transition hover:translate-y-0.5 w-fit aspect-square md:aspect-auto md:h-[33px] md:pl-3.5 md:pr-4 p-2 rounded-full flex items-center gap-1 last:bg-[--color-primary] last:text-[--color-text-secondary] last:outline-[--color-background]"
    >
      {icon}
      <span className="filterTitle hidden md:block">{title}</span>
    </button>
  );
};
