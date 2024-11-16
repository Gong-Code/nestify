import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-10-28.acacia",
});

export async function POST(request: NextRequest) {
    try {

        console.log("this is the request is calling");
        const { totalAmount } = await request.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: "SEK",
            automatic_payment_methods: { enabled: true },
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
        
    } catch (error) {
        console.error("Failed to create payment intent:", error);
        return NextResponse.json({ error: { message: "Failed to create payment intent" } }, { status: 500 });
        
    }
}


