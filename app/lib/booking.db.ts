import { db } from '@/firebase.config';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { Booking } from '../types/airbnb';

export async function bookAirbnb(newBooking: Booking): Promise<string> {
  const newBookingRef = doc(collection(db, 'bookings'));
  const bookingWithId = {
    ...newBooking,
    bookingId: newBookingRef.id,
  };

  try {
    await setDoc(newBookingRef, bookingWithId);
    console.log('Booking successfully added!');
    return newBookingRef.id;
  } catch (error) {
    console.error('Error adding booking:', error);
    throw error;
  }
}

export async function getBookingById(bookingId: string): Promise<Booking | null> {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    const bookingSnapshot = await getDoc(bookingRef);

    if (bookingSnapshot.exists()) {
      const booking = bookingSnapshot.data() as Booking;
      console.log("Booking found:", booking.bookingId);
      return booking;
    } else {
      console.log("No booking found with ID:", bookingId);
      return null;
    }
  } catch (error) {
    console.error("Error getting booking:", error);
    return null;
  }
}