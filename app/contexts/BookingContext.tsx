"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { fetchAirbnbById } from "@/app/lib/airbnb.db";
type BookingContextType = {
  checkIn: string;
  setCheckIn: (checkIn: string) => void;
  checkOut: string;
  setCheckOut: (checkOut: string) => void;
  guests: number;
  setGuests: (guests: number) => void;
  bookingPricePerNight: number;
  setBookingPricePerNight: (bookingPricePerNight: number) => void;
  maxGuests: number;
  fetchAndSetMaxGuests: (airbnbId: string) => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [guests, setGuestsState] = useState(1);
  const [bookingPricePerNight, setBookingPricePerNight] = useState<number>(0);
  const [maxGuests, setMaxGuests] = useState<number>(0);

  const fetchAndSetMaxGuests = async (airbnbId: string) => {
    try {
      const airbnb = await fetchAirbnbById(airbnbId);
      if (airbnb) {
        setMaxGuests(airbnb.guests);
      }
    } catch (error) {
      console.error("Failed to fetch max guests:", error);
    }
  };

  const setGuests = (guests: number) => {
    if (guests > maxGuests) {
      console.error(`The number of guests cannot exceed ${maxGuests}.`);
      return;
    }
    setGuestsState(guests);
  };

  return (
    <BookingContext.Provider
      value={{
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        guests,
        setGuests,
        bookingPricePerNight,
        setBookingPricePerNight,
        maxGuests,
        fetchAndSetMaxGuests,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
