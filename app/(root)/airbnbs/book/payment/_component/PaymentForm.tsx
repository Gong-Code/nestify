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
      const amount = Number(bookingDetails.totalAmount);
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

      console.log("Payment confirmed");

      const bookingId = await bookAirbnb({
        bookingId: bookingDetails.bookingId,
        airbnbId: bookingDetails.airbnbId,
        userId: bookingDetails.userId,
        checkIn: new Date(bookingDetails.checkIn),
        checkOut: new Date(bookingDetails.checkOut),
        guests: Number(bookingDetails.guests),
        totalPrice: amount,
        paymentStatus: "paid",
      });
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
      {errorMessage && <div>{errorMessage}</div>}
      <div className="mb-4">
        <label
          htmlFor="card-number-element"
          className="block text-sm font-medium text-gray-700"
        >
          Card Number
        </label>
        <CardNumberElement id="card-number-element" />
        <div id="card-errors" role="alert">
          {errorMessage && <div>{errorMessage}</div>}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 mb-4">
        <div>
          <label
            htmlFor="card-expiry-element"
            className="block text-sm font-medium text-gray-700"
          >
            Expiration
          </label>
          <CardExpiryElement
            id="card-expiry-element"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label
            htmlFor="card-cvc-element"
            className="block text-sm font-medium text-gray-700"
          >
            CVC
          </label>
          <CardCvcElement
            id="card-cvc-element"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700"
        >
          Country
        </label>
        <select
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
        >
          <option value="">Select</option>
          <option value="SE">Sweden</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
          {/* Add more countries as needed */}
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