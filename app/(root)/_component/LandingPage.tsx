"use client";

import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Airbnb } from "../../types/airbnb";
import { fetchAirbnbs } from "../../lib/airbnb.db";
import { AirbnbList } from "./AirbnbList";
import { LandingPageSearch } from "../../components/SearchInputs";
import Image from "next/image";
import { Loader } from "../../helpers/Loader";
import { filterAirbnbs } from "../../lib/filterAirbnbs";
import { useRouter } from "next/navigation";
import { useAuth } from "../../providers/authProvider";
import { FilterButtonIcons } from "../../helpers/FilterButtonIcons";
import { CircleUserRound, SlidersHorizontal } from "lucide-react";
import { FilterButton } from "../../components/ui/FilterButton";

const LandingPage = () => {
  const [airbnbs, setAirbnbs] = useState<Airbnb[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const { user: currentUser } = useAuth();

  const router = useRouter();

  const landingPageImage = "/assets/images/landingPageImg.jpg";

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const airbnbList = await fetchAirbnbs();
        setAirbnbs(airbnbList);
        console.log(airbnbList);
      } catch (error) {
        console.log("Error fetching airbnbs", error);
      } finally {
        setLoading(false);
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

  const handleUserIconClick = () => {
    if (currentUser) {
      router.push("/user");
    } else {
      router.push("/log-in");
    }
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
                  <CircleUserRound
                    onClick={handleUserIconClick}
                    className="text-[--color-text-secondary] size-8 cursor-pointer"
                  />
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
          <div className="flex gap-3 items-center justify-center flex-wrap max-w-screen py-6">
            {FilterButtonIcons.map((button) => (
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
              title={
                selectedFilters.length > 0 ? "Clear filters" : "All filters"
              }
              icon={<SlidersHorizontal />}
              onClick={clearFilters}
              isSelected={false}
              className="bg-[--color-primary] text-[--color-text-secondary] hover:bg-[--color-primary-hover] hover:text-white"
            />
          </div>
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
