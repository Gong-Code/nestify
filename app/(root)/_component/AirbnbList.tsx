import React from "react";
import { Airbnb } from "@/app/types/airbnb";
import { AirbnbCard } from "./AirbnbCard";

type AirbnbListProps = {
  airbnbs: Airbnb[];
};

export const AirbnbList = ({ airbnbs }: AirbnbListProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {airbnbs.map((airbnb) => (
        <AirbnbCard key={airbnb.airbnbId} airbnb={airbnb} />
      ))}
    </div>
  );
};
