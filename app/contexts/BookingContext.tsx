"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

import { Airbnb, Booking } from "../types/airbnb"; // Adjust the import path as necessary
import { bookAirbnb } from "../lib/booking.db";
import { fetchAirbnbById } from "../lib/airbnb.db";

type BookingContextType = {
  checkIn: string;
  setCheckIn: (checkIn: string) => void;
  checkOut: string;
  setCheckOut: (checkOut: string) => void;
  guests: number;
  setGuests: (guests: number) => void;
  handleReserve: (
    airbnbId: string,
    userId: string,
    pricePerNight: number
  ) => Promise<string>;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const handleReserve = async (
    airbnbId: string,
    userId: string,
    pricePerNight: number
  ): Promise<string> => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights =
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24);
    const totalAmount = nights * pricePerNight;

    const newBooking: Booking = {
      bookingId: "",
      airbnbId,
      userId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      totalPrice: totalAmount,
      paymentStatus: "paid",
    };

    try {
      const bookingId = await bookAirbnb(newBooking);
      console.log("Booking successfully added!", newBooking);
      return bookingId;
    } catch (error) {
      console.error("Error making reservation:", error);
      throw error;
    }
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
        handleReserve,
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
