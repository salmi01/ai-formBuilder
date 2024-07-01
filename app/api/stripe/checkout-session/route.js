import { stripe } from "@/lib/stripe";
import { useUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { toast } from "sonner";

export async function POST(req) {
    const { priceId, email } = await req.json();
    if (!email) {
        return new Response(
            JSON.stringify({
                error: "Unauthorized",
            }),
            {
                status: 401,
            }
        );
    }


    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    try {
        const session = await stripe.checkout.sessions.create(
            {
                success_url: `${baseUrl}/dashboard`,
                cancel_url: `${baseUrl}/dashboard/upgrade`,
                payment_method_types: ["card"],
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                mode: "subscription",
            },
        );

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return NextResponse.json({ error: "Failed to create checkout session" });
    }


}
