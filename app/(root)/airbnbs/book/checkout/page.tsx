"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const CheckoutPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState({
    airbnbId: "",
    userId: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    totalAmount: "",
    title: "",
    images: "",
  });

  useEffect(() => {
    const fetchBookingDetails = () => {
      const airbnbId = searchParams.get("airbnbId");
      const userId = searchParams.get("userId");
      const checkIn = searchParams.get("checkIn");
      const checkOut = searchParams.get("checkOut");
      const guests = searchParams.get("guests");
      const totalAmount = searchParams.get("totalAmount");
      const title = searchParams.get("title");
      const images = searchParams.get("images");

      console.log({
        airbnbId,
        userId,
        checkIn,
        checkOut,
        guests,
        totalAmount,
        title,
        images,
      });

      if (
        !airbnbId ||
        !userId ||
        !checkIn ||
        !checkOut ||
        !guests ||
        !totalAmount ||
        !title ||
        !images
      ) {
        router.push("/404");
      } else {
        setBookingDetails({
          airbnbId,
          userId,
          checkIn,
          checkOut,
          guests,
          totalAmount,
          title,
          images,
        });
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [searchParams]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Booking Details</h1>
          <p>Airbnb ID: {bookingDetails.airbnbId}</p>
          <p>User ID: {bookingDetails.userId}</p>
          <p>Check-In: {bookingDetails.checkIn}</p>
          <p>Check-Out: {bookingDetails.checkOut}</p>
          <p>Guests: {bookingDetails.guests}</p>
          <p>Total Amount: {bookingDetails.totalAmount}</p>
          <p>Title: {bookingDetails.title}</p>
          <Image
            src={bookingDetails.images}
            alt="Airbnb Image"
            width={500}
            height={300}
          />
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
