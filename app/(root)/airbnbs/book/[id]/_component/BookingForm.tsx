"use client";

import { useBooking } from "@/app/contexts/BookingContext";
import { fetchAirbnbById } from "@/app/lib/airbnb.db";

import { useAuth } from "@/app/providers/authProvider";
import { Airbnb } from "@/app/types/airbnb";
import { validateBooking } from "@/app/validation/validateBooking";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type BookingFormProps = {
  airbnbId: string;
  pricePerNight: number;
  maxGuests: number;
};

export const BookingForm = ({
  airbnbId,
  pricePerNight,
  maxGuests,
}: BookingFormProps) => {
  const { checkIn, setCheckIn, checkOut, setCheckOut, guests, setGuests } =
    useBooking();
  const { user } = useAuth();
  const router = useRouter();
  const [totalAmount, setTotalAmount] = useState(0);
  const [guestError, setGuestError] = useState("");
  const [airbnb, setAirbnb] = useState<Airbnb | null>(null);

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

  useEffect(() => {
    const fetchAirbnb = async () => {
      try {
        const airbnbDetails = await fetchAirbnbById(airbnbId);
        setAirbnb(airbnbDetails);
      } catch (error) {
        console.error("Failed to fetch Airbnb details:", error);
      }
    };

    fetchAirbnb();
  }, [airbnbId]);

  const handleReserveClick = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user) {
      router.push("/log-in");
      return;
    }

    if (!validateBooking(checkIn, checkOut, guests, maxGuests, setGuestError)) {
      return;
    }

    const params = new URLSearchParams({
      airbnbId,
      userId: user.id,
      checkIn: new Date(checkIn).toISOString(),
      checkOut: new Date(checkOut).toISOString(),
      guests: guests.toString(),
      totalAmount: totalAmount.toString(),
      title: airbnb?.title || "",
      images: airbnb?.images[0]?.toString() || "",
    }).toString();

    router.push(`/airbnbs/book/checkout?${params}`);
  };

  return (
    <div className="border border-blue-500 p-8 rounded-lg">
      <p className="text-lg font-semibold mb-4">
        Price: {pricePerNight} SEK / night
      </p>
      <form className="flex flex-col gap-6" onSubmit={handleReserveClick}>
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
              min={new Date().toISOString().split("T")[0]} // Disable past dates
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
              min={checkIn || new Date().toISOString().split("T")[0]} // Disable past dates and ensure check-out is after check-in
            />
          </div>
        </div>
        <div>
          <label htmlFor="guests" className="block mb-2">
            Number of Guests (Max {maxGuests}):
          </label>
          <input
            type="number"
            id="guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="border border-blue-500 p-3 rounded w-1/2"
          />
          {guestError && <p className="text-red-500 mt-2">{guestError}</p>}
        </div>
        <div>
          <label htmlFor="totalAmount" className="block mb-2 text-lg">
            Total Amount: {totalAmount} SEK
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded w-full"
          >
            Reserve
          </button>
        </div>
      </form>
    </div>
  );
};
