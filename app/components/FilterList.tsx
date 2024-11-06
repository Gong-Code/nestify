import React from "react";
import {
  Accessibility,
  House,
  Building,
  Waves,
  PawPrint,
  TreePine,
  SlidersHorizontal,
} from "lucide-react";

import { FilterButton, FilterButtonProps } from "./ui/FilterButton";

export const FilterList = () => {
  const filterButtons: FilterButtonProps[] = [
    {
      title: "Accessible",
      icon: <Accessibility />,
      onClick: () => console.log("Accessible"),
    },
    {
      title: "Spacious",
      icon: <House />,
      onClick: () => console.log("Spacious"),
    },
    {
      title: "Apartment",
      icon: <Building />,
      onClick: () => console.log("Apartment"),
    },
    {
      title: "Pet friendly",
      icon: <PawPrint />,
      onClick: () => console.log("Pet friendly"),
    },
    {
      title: "Close to nature",
      icon: <TreePine />,
      onClick: () => console.log("Close to nature"),
    },
    {
      title: "Near water",
      icon: <Waves />,
      onClick: () => console.log("Near water"),
    },
    {
      title: "All filters",
      icon: <SlidersHorizontal />,
      onClick: () => console.log("All filters"),
    },
  ];

  return (
    <div className="flex gap-3 items-center justify-center flex-wrap max-w-screen py-6">
      {filterButtons.map((button, index) => (
        <FilterButton key={index} {...button} />
      ))}
    </div>
  );
};
