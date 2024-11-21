"use client";

import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { bookAirbnb } from "@/app/lib/booking.db";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type BookingDetails = {
  airbnbId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  totalAmount: string;
  title: string;
  images: string;
  paymentMethodId: string;
  bookingId: string;
};

type PaymentFormProps = {
  bookingDetails: BookingDetails;
};

export const PaymentForm = ({ bookingDetails }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("");

  const router = useRouter();

  const handleStripePayment = async (amount: number, currency: string) => {
    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ totalAmount: amount, currency }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create payment intent: ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log(data);
    return data.clientSecret;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded yet.");
      setLoading(false);
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      setErrorMessage("Card elements not found");
      setLoading(false);
      return;
    }

    try {
      const amount = Number(bookingDetails.totalAmount) * 100;
      const currency = "SEK";
      const clientSecret = await handleStripePayment(amount, currency);

      const { error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardNumberElement,
            billing_details: {
              name: bookingDetails.userId,
            },
          },
        }
      );

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      const checkInDateString = new Date(bookingDetails.checkIn)
        .toISOString()
        .split("T")[0];
      const checkOutDateString = new Date(bookingDetails.checkOut)
        .toISOString()
        .split("T")[0];

      const checkInDate = new Date(checkInDateString);
      const checkOutDate = new Date(checkOutDateString);

      console.log("Payment confirmed");

      console.log("Check-in date:", checkInDate);
      console.log("Check-out date:", checkOutDate);

      const bookingId = await bookAirbnb({
        bookingId: bookingDetails.bookingId,
        airbnbTitle: bookingDetails.title,
        airbnbId: bookingDetails.airbnbId,
        userId: bookingDetails.userId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: Number(bookingDetails.guests),
        totalPrice: amount / 100,
        paymentStatus: "paid",
        images: [bookingDetails.images],
      });
      toast.success("Booking confirmed! 🎉");
      console.log("Booking saved with ID:", bookingId);
      setLoading(false);
      router.push("/airbnbs/book/success");
    } catch (error) {
      console.error("Error processing payment:", error);
      if (error instanceof Error) {
        setErrorMessage(error.message || "An unknown error occurred");
      } else {
        setErrorMessage("An unknown error occurred");
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="card-number"
        className="block text-sm font-bold text-gray-700"
      >
        Card Number
      </label>
      <CardNumberElement
        id="card-number-element"
        className="mt-1 block w-full border p-2 border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <div id="card-errors" role="alert">
        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
      </div>
      <div className="grid mt-1 grid-cols-1 gap-2 md:grid-cols-2 md:gap-6 mb-4">
        <div>
          <label
            htmlFor="card-expiry-element"
            className="block text-sm font-bold text-gray-700 mb-1"
          >
            Expiration
          </label>
          <CardExpiryElement
            id="card-expiry-element"
            className="border border-gray-500 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label
            htmlFor="card-cvc-element"
            className="block text-sm font-bold text-gray-700 mb-1"
          >
            CVC
          </label>
          <CardCvcElement
            id="card-cvc-element"
            className="border border-gray-500 rounded-md p-2 w-full"
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="country"
          className="block text-sm font-bold text-gray-700 mb-1"
        >
          Country
        </label>
        <select
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border border-gray-500 rounded-md p-2 w-full"
        >
          <option value="">Select</option>
          <option value="SE">Sweden</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        {loading ? "Processing..." : "Confirm Payment"}
      </button>
    </form>
  );
};
