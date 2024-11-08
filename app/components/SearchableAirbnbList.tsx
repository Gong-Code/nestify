"use client";

import React, { useState } from "react";
import { AirbnbList } from "../(root)/_component/AirbnbList";
import { fetchAirbnbs } from "../lib/airbnb.db";
import { Airbnb } from "../types/airbnb";
import { Search } from "lucide-react";

type SearchableAirbnbListProps = {
  initialAirbnbs: Airbnb[];
};

const SearchableAirbnbList = ({
  initialAirbnbs,
}: SearchableAirbnbListProps) => {
  const [airbnbs, setAirbnbs] = useState<Airbnb[]>(initialAirbnbs);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchValue(value);
    const filteredAirbnbs = await fetchAirbnbs(value);
    setAirbnbs(filteredAirbnbs);
  };

  return (
    <div>
      <div className="relative flex items-center">
        <span className="absolute left-2 bg-[--color-primary] rounded-full">
          <Search className="size-4 text-[--color-text-secondary] cursor-pointer m-[0.4rem] md:m-2" />
        </span>
        <input
          type="search"
          value={searchValue}
          onChange={handleSearchInput}
          placeholder="Search..."
          className="input w-[15.625rem] md:w-[21.875rem] h-[2.8125rem] md:h-[3.125rem] outline outline-offset-2 outline-1 outline-[--color-primary] rounded-lg py-1.5 pl-[3rem] pr-3 placeholder-opacity-30 text-opacity-30"
        />
      </div>
      <AirbnbList airbnbs={airbnbs} />
    </div>
  );
};

export default SearchableAirbnbList;
