"use client";

import { useBooking } from "@/app/contexts/BookingContext";
import { fetchAirbnbById } from "@/app/lib/airbnb.db";
import { useAuth } from "@/app/providers/authProvider";
import { Airbnb } from "@/app/types/airbnb";
import { validateBooking } from "@/app/validation/validateBooking";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type BookingFormProps = {
  airbnbId: string;
  pricePerNight: number;
};

export const BookingForm = ({ airbnbId, pricePerNight }: BookingFormProps) => {
  const {
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
  } = useBooking();
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
      setTotalAmount(nights * bookingPricePerNight);
    };

    if (checkIn && checkOut) {
      calculateTotalAmount();
    }
  }, [checkIn, checkOut, bookingPricePerNight]);

  useEffect(() => {
    const fetchAirbnb = async () => {
      try {
        const airbnbDetails = await fetchAirbnbById(airbnbId);
        setAirbnb(airbnbDetails);
        if (airbnbDetails) {
          setBookingPricePerNight(airbnbDetails.pricePerNight);
          fetchAndSetMaxGuests(airbnbId); // Fetch and set max guests
        }
      } catch (error) {
        console.error("Failed to fetch Airbnb details:", error);
      }
    };

    fetchAirbnb();
  }, [airbnbId, fetchAndSetMaxGuests, setBookingPricePerNight]);

  const handleReserveClick = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user) {
      router.push("/log-in");
      return;
    }

    if (!validateBooking(checkIn, checkOut, guests, maxGuests)) {
      return;
    }

    if (guests < 1 || guests > maxGuests) {
      const errorMsg = `The number of guests must be between 1 and ${maxGuests}.`;
      setGuestError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    const checkInDate = new Date(checkIn).toISOString().split("T")[0];
    const checkOutDate = new Date(checkOut).toISOString().split("T")[0];

    const params = new URLSearchParams({
      airbnbId,
      userId: user.id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: guests.toString(),
      totalAmount: totalAmount.toString(),
      bookingPricePerNight: bookingPricePerNight.toString(),
      maxGuests: maxGuests.toString(),
      title: airbnb?.title || "",
      images: airbnb?.images[0]?.toString() || "",
    }).toString();

    console.log("params:", params);
    console.log("Booking Price Per Night:", bookingPricePerNight);

    router.push(`/airbnbs/book/checkout?${params}`);
  };

  return (
    <div className="border border-blue-500 p-8 rounded-lg">
      <Toaster />
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
              min={new Date().toISOString().split("T")[0]}
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
              min={checkIn || new Date().toISOString().split("T")[0]}
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
            onChange={(e) => {
              const value = Math.max(
                1,
                Math.min(Number(e.target.value), maxGuests)
              );
              setGuests(value);
              setGuestError("");
            }}
            className="border border-blue-500 p-3 rounded w-1/2"
            min="1"
            max={maxGuests}
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

export default BookingForm;
