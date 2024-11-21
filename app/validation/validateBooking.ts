import toast from "react-hot-toast";

export const validateBooking = (
  checkIn: string,
  checkOut: string,
  guests: number,
  maxGuests: number,
): boolean => {
  if (!checkIn || !checkOut) {
    toast.error("Check-in and check-out dates are required.");
    return false;
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (checkInDate >= checkOutDate) {
    toast.error("Check-out date must be after check-in date.");
    return false;
  }

  if (guests < 1 || guests > maxGuests) {
    toast.error(`The number of guests must be between 1 and ${maxGuests}.`);
    return false;
  }

  return true;
};