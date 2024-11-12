"use client";

import { PaymentForm } from "./_component/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const PaymentPage = () => {
  const searchParams = useSearchParams();

  const bookingDetails = {
    airbnbId: searchParams.get("airbnbId") || "",
    userId: searchParams.get("userId") || "",
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
    guests: searchParams.get("guests") || "",
    totalAmount: searchParams.get("totalAmount") || "",
    title: searchParams.get("title") || "",
    images: searchParams.get("images") || "",
    paymentMethodId: searchParams.get("paymentMethodId") || "",
    bookingId: searchParams.get("bookingId") || "",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: Number(bookingDetails.totalAmount),
            currency: "sek",
          }}
        >
          <PaymentForm bookingDetails={bookingDetails} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
