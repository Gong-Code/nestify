import { db } from '@/firebase.config';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { Booking } from '../types/airbnb';
import { v4 as uuid4 } from 'uuid'; // Import UUID library

export async function bookAirbnb(newBooking: Booking): Promise<string> {
  const bookingWithId = {
    ...newBooking,
    bookingId: uuid4(), 
  };

  try {
    const userRef = doc(db, 'users', newBooking.userId);
    await updateDoc(userRef, {
      activeBookings: arrayUnion(bookingWithId),
    });

    console.log('Booking successfully added!', bookingWithId.bookingId);
    return bookingWithId.bookingId;
  } catch (error) {
    console.error('Error adding booking:', error);
    throw error;
  }
}

export async function getBookingById(userId: string, bookingId: string): Promise<Booking | null> {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const booking = userData.bookings.find((b: Booking) => b.bookingId === bookingId);
      if (booking) {
        console.log("Booking found:", booking.bookingId);
        return booking;
      } else {
        console.log("No booking found with ID:", bookingId);
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting booking:", error);
    return null;
  }
}

export async function movePastBookings(userId: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const currentDate = new Date();

      const activeBookings = userData.activeBookings || [];
      const previousBookings = userData.previousBookings || [];

      const updatedActiveBookings = activeBookings.filter((booking: Booking) => {
        const checkOutDate = new Date(booking.checkOut);
        if (checkOutDate < currentDate) {
          previousBookings.push(booking);
          return false;
        }
        return true;
      });

      await updateDoc(userRef, {
        activeBookings: updatedActiveBookings,
        previousBookings: previousBookings,
      });
    }

  } catch (error) {
    console.error("Error moving past bookings:", error);
  }
}

export const editBookingDetails = async (bookingDetails: Booking) => {
  try {
    const { airbnbId, userId, checkIn, checkOut, guests } = bookingDetails;

    if (!airbnbId || !userId || !checkIn || !checkOut || !guests) {
      throw new Error("Missing required booking details");
    }

    const userRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const activeBookings = userData.activeBookings || [];

      const updatedActiveBookings = activeBookings.map((booking: Booking) => {
        if (booking.airbnbId === airbnbId) {
          return {
            ...booking,
            checkIn,
            checkOut,
            guests,
          };
        }
        return booking;
      });

      await updateDoc(userRef, {
        activeBookings: updatedActiveBookings,
      });

      return updatedActiveBookings.find((booking: Booking) => booking.airbnbId === airbnbId);
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error editing booking details:", error);
    throw error;
  }
};