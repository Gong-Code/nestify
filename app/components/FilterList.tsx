"use client";
import {
  Accessibility,
  House,
  Building,
  Waves,
  PawPrint,
  TreePine,
  SlidersHorizontal,
} from "lucide-react";

import { FilterButton } from "./ui/FilterButton";

type FilterListProps = {
  selectedFilters: string[];
  handleFilterClick: (filterKey: string) => void;
  clearFilters: () => void;
};

export const FilterList = ({
  selectedFilters,
  handleFilterClick,
  clearFilters,
}: FilterListProps) => {
  const filterButtons = [
    {
      title: "Wheelchair",
      filterKey: "wheelChairAccessible",
      icon: <Accessibility />,
    },
    {
      title: "Spacious",
      filterKey: "spacious",
      icon: <House />,
    },
    {
      title: "Apartment",
      filterKey: "apartment",
      icon: <Building />,
    },
    {
      title: "Pet Friendly",
      filterKey: "petFriendly",
      icon: <PawPrint />,
    },
    {
      title: "Close to Nature",
      filterKey: "closeToNature",
      icon: <TreePine />,
    },
    {
      title: "Near Water",
      filterKey: "nearWater",
      icon: <Waves />,
    },
  ];

  return (
    <div className="flex gap-3 items-center justify-center flex-wrap max-w-screen py-6">
      {filterButtons.map((button) => (
        <FilterButton
          key={button.filterKey}
          title={button.title}
          icon={button.icon}
          onClick={() => {
            handleFilterClick(button.filterKey);
          }}
          isSelected={selectedFilters.includes(button.filterKey)}
        />
      ))}
      <FilterButton
        title="Clear filters"
        icon={<SlidersHorizontal />}
        onClick={clearFilters}
        isSelected={false}
      />
    </div>
  );
};
