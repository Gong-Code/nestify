import { z } from 'zod';

export const bookingSchema = z.object({
  bookingId: z.string().uuid(),
  airbnbId: z.string(),
  userId: z.string(),
  checkIn: z.date(),
  checkOut: z.date(),
  guests: z.number().min(1),
  totalPrice: z.number().min(0),
  paymentStatus: z.enum(["paid", "failed"]),
});

export type Booking = z.infer<typeof bookingSchema>;