import React, { useState, useEffect } from "react";
import { Booking } from "@/app/types/airbnb";
import toast from "react-hot-toast";

interface CheckoutEditFormProps {
  bookingDetails: Booking;
  onClose: () => void;
  onSave: (updatedDetails: Booking) => void;
}

const CheckoutEditForm: React.FC<CheckoutEditFormProps> = ({
  bookingDetails,
  onClose,
  onSave,
}) => {
  const [checkIn, setCheckIn] = useState<string>(
    new Date(bookingDetails.checkIn).toISOString().split("T")[0]
  );
  const [checkOut, setCheckOut] = useState<string>(
    new Date(bookingDetails.checkOut).toISOString().split("T")[0]
  );
  const [guests, setGuests] = useState<number>(bookingDetails.guests);
  const [totalPrice, setTotalPrice] = useState<number>(
    bookingDetails.totalPrice ?? 0
  );

  useEffect(() => {
    const calculateTotalPrice = (
      checkIn: string,
      checkOut: string,
      pricePerNight: number
    ) => {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysDiff * pricePerNight;
    };

    setTotalPrice(
      calculateTotalPrice(
        checkIn,
        checkOut,
        bookingDetails.bookingPricePerNight ?? 0
      )
    );
  }, [checkIn, checkOut, bookingDetails.bookingPricePerNight]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (guests > bookingDetails.guests) {
      toast.error(
        `The number of guests cannot exceed ${bookingDetails.guests}.`
      );
      return;
    }
    if (guests < 1) {
      toast.error("The number of guests must be at least 1.");
      return;
    }

    const updatedDetails: Booking = {
      ...bookingDetails,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests,
      totalPrice,
    };
    console.log("New Total Price:", totalPrice);
    onSave(updatedDetails);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-bold mb-4">Edit Booking Details</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Check-In
            </label>
            <input
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => setCheckIn(e.target.value)}
              className="mt-1 block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Check-Out
            </label>
            <input
              type="date"
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className="mt-1 block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Guests
            </label>
            <input
              type="number"
              value={guests}
              min={1}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="mt-1 block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutEditForm;
