import { Airbnb } from "../types/airbnb";

export const filterAirbnbs = (
  airbnbs: Airbnb[],
  selectedFilters: string[] = [],
  searchValue: string = ""
): Airbnb[] => {

  const filteredAirbnbs = selectedFilters.length
    ? airbnbs.filter((airbnb) =>
        selectedFilters.every((filterKey) => {
          if (airbnb.accessibility[filterKey] === undefined) {
            console.warn(
              `Filter key "${filterKey}" does not exist in accessibility object`
            );
          }
          return airbnb.accessibility[filterKey] === true;
        })
      )
    : airbnbs;

  const finalFilteredAirbnbs = searchValue
    ? filteredAirbnbs.filter((airbnb) =>
        airbnb.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    : filteredAirbnbs;
    
  return finalFilteredAirbnbs;
};