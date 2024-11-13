import { Booking } from "@/app/types/airbnb";
import React from "react";

type BookingDetailsProps = {
  booking: Booking;
};

export const BookingDetails = ({ booking }: BookingDetailsProps) => {
  const checkInDate =
    booking.checkIn instanceof Date
      ? booking.checkIn
      : booking.checkIn && (booking.checkIn as any).toDate
      ? (booking.checkIn as any).toDate()
      : null;

  const checkOutDate =
    booking.checkIn instanceof Date
      ? booking.checkOut
      : booking.checkOut && (booking.checkOut as any).toDate
      ? (booking.checkOut as any).toDate()
      : null;

  return (
    <div className="mb-4">
      {booking.images && booking.images.length > 0 && (
        <img
          src={booking.images[0]}
          alt={booking.airbnbTitle}
          className="w-full rounded-lg mb-2"
          style={{ width: "300px", height: "200px", objectFit: "cover" }}
        />
      )}
      <h3 className="text-lg font-medium">{booking.airbnbTitle}</h3>
      <p>Check in: {checkInDate ? checkInDate.toLocaleDateString() : "N/A"}</p>
      <p>
        Check out: {checkOutDate ? checkOutDate.toLocaleDateString() : "N/A"}
      </p>
      <p>Guests: {booking.guests}</p>
    </div>
  );
};
