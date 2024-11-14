import React, { useState } from "react";
import { Booking } from "@/app/types/airbnb";

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
  const [checkIn, setCheckIn] = useState<any>(
    new Date(bookingDetails.checkIn).toISOString().split("T")[0]
  );
  const [checkOut, setCheckOut] = useState<any>(
    new Date(bookingDetails.checkOut).toISOString().split("T")[0]
  );
  const [guests, setGuests] = useState<number>(bookingDetails.guests);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedDetails: Booking = {
      ...bookingDetails,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests,
    };
    onSave(updatedDetails);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="edit-form bg-white p-6 rounded-lg shadow-lg">
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Guests
          </label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-[--color-warning] hover:bg-[--color-warning-hover] text-[--color-text-secondary] font-bold py-2 px-4 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[--color-primary] hover:bg-[--color-primary-hover] text-[--color-text-secondary] font-bold py-2 px-4 rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutEditForm;
