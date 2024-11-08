import { db } from '@/firebase.config';
import { collection, doc, setDoc } from 'firebase/firestore';
import { z } from 'zod';
import { bookingSchema, Booking } from '../schema/bookingSchema'; // Adjust the import path as necessary

export async function bookAirbnb(newBooking: Booking): Promise<void> {
  const newBookingRef = doc(collection(db, 'book'));
  const bookingWithId = {
    ...newBooking,
    bookingId: newBookingRef.id,
  };

  try {
    const parsedBooking = bookingSchema.parse(bookingWithId);

    await setDoc(newBookingRef, parsedBooking);
    console.log('Booking successfully added!');
  } catch (e) {
    console.error('Error adding booking: ', e);
    if (e instanceof z.ZodError) {
      console.error('Validation error:', e.errors);
    }
  }
}