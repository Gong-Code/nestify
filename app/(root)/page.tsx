"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "./_component/Navbar";
import { Footer } from "./_component/Footer";
import { Airbnb } from "../types/airbnb";
import { fetchAirbnbs } from "../lib/airbnb.db";
import { AirbnbList } from "./_component/AirbnbList";
import { LandingPageSearch } from "../components/SearchInputs";
import { FilterList } from "../components/FilterList";
import Image from "next/image";
import { CircleUserRound } from "lucide-react";
import { Loader } from "../helpers/Loader";
import { filterAirbnbs } from "../lib/filterAirbnbs";

const LandingPage = () => {
  const [airbnbs, setAirbnbs] = useState<Airbnb[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const landingPageImage = "/assets/images/landingPageImg.jpg";

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const airbnbList = await fetchAirbnbs();
        setAirbnbs(airbnbList);
        console.log(airbnbList);
      } catch (error) {
        console.log("Error fetching airbnbs", error);
      }
    };

    fetchAllData();
  }, []);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleFilterClick = (filter: string) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter];
      return newFilters;
    });
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const searchFilteredAirbnbs = filterAirbnbs(
    airbnbs,
    selectedFilters,
    searchValue
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <header className="hidden md:block">
        <Navbar />
      </header>
      <div className="overflow-x-hidden md:py-6 md:px-18">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex justify-center items-start text-left md:w-1/3">
            <div className="py-6">
              <h1 className="hidden md:block mb-2">Rent your dream home</h1>
              <h2 className="hidden md:block mb-9 font-bold">
                Where do you want to go?
              </h2>
              <div className="flex items-center gap-3">
                <LandingPageSearch
                  placeholder="Search..."
                  onChange={handleSearchInput}
                  value={searchValue}
                />
                <div className="bg-[--color-primary] py-1 px-1 rounded-full md:hidden">
                  <CircleUserRound className="text-[--color-text-secondary] size-8" />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block relative w-[400px] h-[400px] md:w-[500px] md:h-[400px]">
            <Image
              src={landingPageImage}
              alt="Landing page image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="py-9">
          <FilterList
            selectedFilters={selectedFilters}
            handleFilterClick={handleFilterClick}
            clearFilters={clearFilters}
          />
        </div>
        <div className="flex justify-center">
          <div className="overflow-x-hidden px-4 md:px-12 mx-auto">
            <p className=" pb-2 pt-6 text-3xl font-bold">Featured</p>
            <p className="hidden md:block pb-6">
              Take a look at our most popular accommodations!
            </p>
            <AirbnbList airbnbs={searchFilteredAirbnbs} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
