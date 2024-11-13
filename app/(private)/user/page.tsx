"use client";

import { Footer } from "@/app/(root)/_component/Footer";
import { Navbar } from "@/app/(root)/_component/Navbar";
import { useAuth } from "@/app/providers/authProvider";

import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BookingDetails } from "./_component/BookingDetails";
import { Booking } from "@/app/types/airbnb";
import { movePastBookings } from "@/app/lib/booking.db";
import { db } from "@/firebase.config";

const UserPage = () => {
  const { user: currentUser } = useAuth();
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  const [previousBookings, setPreviousBookings] = useState<Booking[]>([]);

  const getInitials = (firstName: string, lastName: string) => {
    const initials = `${firstName[0]}${lastName[0]}`;
    return initials.toUpperCase();
  };

  const initials = currentUser
    ? getInitials(currentUser.firstName, currentUser.lastName)
    : "";

  useEffect(() => {
    const fetchBookings = async () => {
      if (currentUser) {
        console.log("Fetching bookings for user:", currentUser.id);
        await movePastBookings(currentUser.id);

        const userRef = doc(db, "users", currentUser.id);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          const activeBookings = userData.activeBookings || [];
          const previousBookings = userData.previousBookings || [];

          console.log("Active bookings:", activeBookings);

          setActiveBookings(activeBookings);
          setPreviousBookings(previousBookings);
        }
      }
    };

    fetchBookings();
  }, [currentUser]);

  return (
    <>
      <header className="hidden md:block">
        <Navbar />
      </header>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-20 text-left">My Account</h1>

          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="flex flex-col items-center justify-center bg-gray-200 p-10 rounded-2xl shadow-lg mb-6 md:mb-0 md:mr-4 w-full md:w-1/4 aspect-square h-[250px]">
              <div className="flex flex-col items-center justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-blue-800 text-white flex items-center justify-center text-4xl font-bold border-4 border-blue-500">
                  {initials}
                </div>
                <p className="text-lg font-medium mt-2">
                  {currentUser?.firstName} {currentUser?.lastName}
                </p>
              </div>
              <div className="text-center">
                <p>Active bookings: {activeBookings.length}</p>
                <p>Previous bookings: {previousBookings.length}</p>
              </div>
            </div>

            <div className=" p-6 rounded-lg shadow-lg w-full md:w-1/2 md:ml-auto">
              <h2 className="text-xl font-bold mb-4">Active Bookings</h2>
              {activeBookings.map((booking) => (
                <BookingDetails key={booking.bookingId} booking={booking} />
              ))}
              <h2 className="text-xl font-bold mb-4">Previous Bookings</h2>
              {previousBookings.map((booking) => (
                <BookingDetails key={booking.bookingId} booking={booking} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default UserPage;
