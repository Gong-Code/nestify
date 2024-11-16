import { Booking } from "@/app/types/airbnb";
import React from "react";

type BookingDetailsProps = {
  booking: Booking;
};

export const BookingDetails = ({ booking }: BookingDetailsProps) => {
  const checkInDate =
    booking.checkIn instanceof Date
      ? booking.checkIn
      : booking.checkIn &&
        (booking.checkIn as unknown as { toDate: () => Date }).toDate
      ? (booking.checkIn as unknown as { toDate: () => Date }).toDate()
      : null;

  const checkOutDate =
    booking.checkOut instanceof Date
      ? booking.checkOut
      : booking.checkOut &&
        (booking.checkOut as unknown as { toDate: () => Date }).toDate
      ? (booking.checkOut as unknown as { toDate: () => Date }).toDate()
      : null;

  return (
    <div className="flex flex-col md:flex-row mb-4 p-4 rounded-lg shadow-md items-center space-y-4 md:space-y-0 md:space-x-6">
      {booking.images && booking.images.length > 0 && (
        <img
          src={booking.images[0]}
          alt={booking.airbnbTitle}
          className="w-full rounded-lg mb-2"
          style={{ width: "300px", height: "200px", objectFit: "cover" }}
        />
      )}
      <div className="flex flex-col justify-between space-y-2">
        <h3 className="text-xl font-medium">{booking.airbnbTitle}</h3>
        <p className="text-[--color-primary]">
          Check in: {checkInDate ? checkInDate.toLocaleDateString() : "N/A"}
        </p>
        <p className="text-[--color-primary]">
          Check out: {checkOutDate ? checkOutDate.toLocaleDateString() : "N/A"}
        </p>
        <p className="text-[--color-primary]">Guests: {booking.guests}</p>
      </div>
    </div>
  );
};
