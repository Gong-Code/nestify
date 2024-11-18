"use client";

import { Footer } from "@/app/(root)/_component/Footer";
import { Navbar } from "@/app/(root)/_component/Navbar";
import { Loader } from "@/app/helpers/Loader";
import { Pencil } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CheckoutEditForm from "./_component/CheckoutEditForm";
import { editBookingDetails } from "@/app/lib/booking.db";
import { Booking } from "@/app/types/airbnb";

const CheckoutPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState({
    airbnbId: "",
    userId: "",
    checkIn: new Date(),
    checkOut: new Date(),
    guests: 0,
    totalPrice: 0,
    bookingPricePerNight: 0,
    title: "",
    images: [""],
    maxGuests: 0,
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchBookingDetails = () => {
      const airbnbId = searchParams.get("airbnbId");
      const userId = searchParams.get("userId");
      const checkIn = searchParams.get("checkIn");
      const checkOut = searchParams.get("checkOut");
      const guests = searchParams.get("guests");
      const totalPrice = searchParams.get("totalAmount");
      const bookingPricePerNight = searchParams.get("bookingPricePerNight");
      const title = searchParams.get("title");
      const images = searchParams.get("images")?.split(",") || [""];
      const maxGuests = searchParams.get("maxGuests");

      console.log({
        airbnbId,
        userId,
        checkIn,
        checkOut,
        guests: Number(guests),
        totalPrice: Number(totalPrice),
        bookingPricePerNight: Number(bookingPricePerNight),
        title,
        images: images as string[],
        maxGuests: Number(maxGuests),
      });

      if (
        !airbnbId ||
        !userId ||
        !checkIn ||
        !checkOut ||
        !guests ||
        !totalPrice ||
        !bookingPricePerNight ||
        !title ||
        !images ||
        !maxGuests
      ) {
        router.push("/404");
      } else {
        setBookingDetails({
          airbnbId,
          userId,
          checkIn: new Date(checkIn as string),
          checkOut: new Date(checkOut as string),
          guests: Number(guests),
          totalPrice: Number(totalPrice),
          bookingPricePerNight: Number(bookingPricePerNight),
          title,
          images,
          maxGuests: Number(maxGuests),
        });
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [searchParams]);

  const handleRequestToBook = async () => {
    const query = new URLSearchParams({
      airbnbId: bookingDetails.airbnbId,
      userId: bookingDetails.userId,
      checkIn: bookingDetails.checkIn.toString(),
      checkOut: bookingDetails.checkOut.toString(),
      guests: bookingDetails.guests.toString(),
      totalAmount: bookingDetails.totalPrice.toString(),
      bookingPricePerNight: bookingDetails.bookingPricePerNight.toString(),
      title: bookingDetails.title,
      images: bookingDetails.images.join(","),
    }).toString();
    router.push(`/airbnbs/book/payment?${query}`);
  };

  const handleEditBookingDetails = async (updatedDetails: Booking) => {
    try {
      console.log("Updating booking details:", updatedDetails);
      await editBookingDetails(updatedDetails);
      setBookingDetails((prevDetails) => ({
        ...prevDetails,
        checkIn: updatedDetails.checkIn,
        checkOut: updatedDetails.checkOut,
        guests: updatedDetails.guests,
        totalPrice: updatedDetails.totalPrice as number,
      }));
      setIsEditing(false);
      console.log("Booking details updated successfully");
    } catch (error) {
      console.error("Error updating booking details:", error);
    }
  };

  const handleCancelBooking = async () => {
    router.push("/");
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <div>
              <img
                src={bookingDetails.images?.[0]}
                alt="Luxurious cabin on lake"
                className="rounded-md w-full h-auto max-h-64 object-cover"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{bookingDetails.title}</h3>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-[--color-secondary] hover:bg-[--color-secondary-hover] text-[--color-text-secondary] font-bold py-2 px-4 rounded-xl shadow-md md:shadow-none flex items-center"
                >
                  <Pencil className="mr-4" size={16} />
                  Edit
                </button>
              </div>
              <p className="text-[--color-text-primary] font-bold text-lg md:text-base mb-2">
                Price per night: {bookingDetails.totalPrice} SEK
              </p>
              <p className="text-[--color-text-primary] font-bold text-lg md:text-base mb-2">
                Selected dates:{" "}
                {new Date(bookingDetails.checkIn).toLocaleDateString()} -{" "}
                {new Date(bookingDetails.checkOut).toLocaleDateString()}
              </p>
              <p className="text-[--color-text-primary] font-bold mb-20 text-lg md:text-base">
                Number of guests: {bookingDetails.guests}
              </p>
              <p className="text-[--color-text-primary] font-bold text-lg md:text-base">
                Total: {bookingDetails.totalPrice} SEK
              </p>
            </div>
          </div>

          {isEditing && (
            <CheckoutEditForm
              bookingDetails={bookingDetails}
              onClose={() => setIsEditing(false)}
              onSave={handleEditBookingDetails}
            />
          )}

          <div className="flex justify-between items-center mt-4 gap-4">
            <button
              onClick={handleRequestToBook}
              className="bg-[--color-primary] hover:bg-[--color-primary-hover] text-[--color-text-secondary] font-bold py-2 px-4 rounded-md w-full"
            >
              Request to Book
            </button>
            <button
              onClick={handleCancelBooking}
              className="bg-[--color-warning] hover:bg-[--color-warning-hover] text-[--color-text-secondary] font-bold py-2 px-4 rounded-md w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
