"use client";

import { Footer } from "@/app/(root)/_component/Footer";
import { Navbar } from "@/app/(root)/_component/Navbar";
import { Loader } from "@/app/helpers/Loader";
import { Pencil } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

  const handleRequestToBook = async () => {
    const query = new URLSearchParams(bookingDetails).toString();
    router.push(`/airbnbs/book/payment?${query}`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <header className="hidden md:block">
        <Navbar />
      </header>
      <div className="flex items-center justify-center min-h-screen bg-[--color-background] overflow-hidden">
        <div className="bg-[--color-background] p-8 rounded-lg w-full max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Your trip</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <img
                src={bookingDetails.images}
                alt="Luxurious cabin on lake"
                className="rounded-lg w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{bookingDetails.title}</h3>
                <button className="bg-[--color-secondary] hover:bg-[--color-secondary-hover] text-[--color-text-secondary] font-bold py-2 px-4 rounded-xl shadow-md md:shadow-none flex items-center">
                  <Pencil className="mr-2" size={16} />
                  Edit
                </button>
              </div>
              <p className="text-[--color-text-primary] font-bold text-lg md:text-base">
                Price per night: {bookingDetails.totalAmount} SEK
              </p>
              <p className="text-[--color-text-primary] font-bold text-lg md:text-base">
                Selected dates: {bookingDetails.checkIn} -{" "}
                {bookingDetails.checkOut}
              </p>
              <p className="text-[--color-text-primary] font-bold mb-20 text-lg md:text-base">
                Number of guests: {bookingDetails.guests}
              </p>
              <p className="text-[--color-text-primary] font-bold text-lg md:text-base">
                Total: {bookingDetails.totalAmount} SEK
              </p>
            </div>
          </div>

          <button
            onClick={handleRequestToBook}
            className="bg-[--color-primary] hover:bg-[--color-primary-hover] text-[--color-text-secondary] font-bold py-2 px-4 rounded-md mt-4 w-full"
          >
            Request to book
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
