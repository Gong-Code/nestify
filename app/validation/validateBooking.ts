export const validateBooking = (
    checkIn: string,
    checkOut: string,
    guests: number,
    maxGuests: number,
    setGuestError: (error: string) => void
  ): boolean => {
    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates.");
      console.log("Please select both check-in and check-out dates.");
      return false;
    }
  
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    if (checkInDate < today || checkOutDate < today) {
      alert("You cannot book past dates.");
      console.log("You cannot book past dates.");
      return false;
    }
  
    if (checkInDate >= checkOutDate) {
      alert("Check-out date must be after check-in date.");
      console.log("Check-out date must be after check-in date.");
      return false;
    }
  
    if (guests > maxGuests) {
      setGuestError(`Cannot exceed max guest spot of ${maxGuests}.`);
      console.log(`Cannot exceed max guest spot of ${maxGuests}.`);
      return false;
    } else {
      setGuestError("");
    }
  
    return true;
  };