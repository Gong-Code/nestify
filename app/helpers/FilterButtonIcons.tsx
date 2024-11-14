import {
  House,
  Building,
  PawPrint,
  TreePine,
  Waves,
  Accessibility,
} from "lucide-react";

export const FilterButtonIcons = [
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
