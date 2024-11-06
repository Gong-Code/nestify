import { Airbnb } from "@/app/types/airbnb";
import React, { useEffect, useState } from "react";
import { AirbnbCard } from "./AirbnbCard";
import { fetchAirbnbs } from "@/app/lib/airbnb.db";

export const AirbnbList = () => {
  const [airbnbs, setAirbnbs] = useState<Airbnb[]>([]);

  useEffect(() => {
    const fetchAllAirbnbs = async () => {
      try {
        const airbnbList = await fetchAirbnbs();
        setAirbnbs(airbnbList);
        console.log(airbnbList);
      } catch (error) {
        const appError = {
          message:
            error instanceof Error
              ? error.message
              : "An error occurred while fetching airbnbs",
          code: error instanceof Error ? undefined : error,
        };
        console.log("Error fetching airbnbs", appError);
      }
    };

    fetchAllAirbnbs();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 mb-2 gap-2 md:gap-6">
      {airbnbs.map((airbnb: Airbnb) => (
        <AirbnbCard key={airbnb.airbnbId} airbnb={airbnb} />
      ))}
    </div>
  );
};
