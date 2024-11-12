import React from "react";
import { Airbnb } from "@/app/types/airbnb";
import { AirbnbCard } from "./AirbnbCard";
import { filterAirbnbs } from "@/app/lib/filterAirbnbs";

type AirbnbListProps = {
  airbnbs: Airbnb[];
  selectedFilters?: string[];
  searchValue?: string;
};

export const AirbnbList = ({
  airbnbs,
  selectedFilters = [],
  searchValue = "",
}: AirbnbListProps) => {
  const filteredAirbnbs = filterAirbnbs(airbnbs, selectedFilters, searchValue);

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredAirbnbs.map((airbnb) => (
        <AirbnbCard key={airbnb.airbnbId} airbnb={airbnb} />
      ))}
    </div>
  );
};
