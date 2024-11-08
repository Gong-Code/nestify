"use client";
import { useBooking } from "@/app/contexts/BookingContext";
import { useEffect, useState } from "react";

type BookingFormProps = {
  airbnbId: string;
  userId: string;
  pricePerNight: number;
};

export const BookingForm = ({
  airbnbId,
  userId,
  pricePerNight,
}: BookingFormProps) => {
  const {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    guests,
    setGuests,
    handleReserve,
  } = useBooking();

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const calculateTotalAmount = () => {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const nights =
        (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24);
      setTotalAmount(nights * pricePerNight);
    };

    if (checkIn && checkOut) {
      calculateTotalAmount();
    }
  }, [checkIn, checkOut, pricePerNight]);

  const handleReserveClick = () => {
    if (!userId) {
      alert("You must be logged in to make a reservation.");
      return;
    }
    handleReserve(airbnbId, userId, pricePerNight);
  };

  return (
    <div className="border border-blue-500 p-8 rounded-lg">
      <p className="text-lg font-semibold mb-4">
        Price: {pricePerNight} SEK / night
      </p>
      <form className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label htmlFor="checkIn" className="block mb-2">
              Check-in Date:
            </label>
            <input
              type="date"
              id="checkIn"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="border border-blue-500 p-3 rounded w-full"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="checkOut" className="block mb-2">
              Check-out Date:
            </label>
            <input
              type="date"
              id="checkOut"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="border border-blue-500 p-3 rounded w-full"
            />
          </div>
        </div>
        <div>
          <label htmlFor="guests" className="block mb-2">
            Number of Guests:
          </label>
          <input
            type="number"
            id="guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="border border-blue-500 p-2 rounded w-full"
          />
        </div>
        <div>
          <label htmlFor="totalAmount" className="block mb-2 text-lg">
            Total Amount: {totalAmount} SEK
          </label>
        </div>
        <div>
          <button
            type="button"
            onClick={handleReserveClick}
            className="bg-blue-500 text-white p-3 rounded w-full"
          >
            Reserve
          </button>
        </div>
      </form>
    </div>
  );
};
