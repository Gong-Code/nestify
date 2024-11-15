"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type BookingContextType = {
  checkIn: string;
  setCheckIn: (checkIn: string) => void;
  checkOut: string;
  setCheckOut: (checkOut: string) => void;
  guests: number;
  setGuests: (guests: number) => void;
  bookingPricePerNight: number;
  setBookingPricePerNight: (bookingPricePerNight: number) => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [guests, setGuests] = useState(1);
  const [bookingPricePerNight, setBookingPricePerNight] = useState<number>(0);

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
function setError(message: string | undefined) {
  throw new Error("Function not implemented.");
}
