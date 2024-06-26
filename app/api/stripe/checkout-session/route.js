'use client'
import { stripe } from "@/lib/stripe";
import { useUser } from "@clerk/nextjs";

export async function POST(req) {
    console.log(req)
    const { price, quantity = 1 } = await req.json();
    console.log(price)
    const { user } = useUser()
    const userId = user?.id;
    if (!userId) {
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
        const session =
            await stripe.checkout.sessions.create(
                {
                    success_url: `${baseUrl}/payment/success`,
                    customer: '1',
                    payment_method_types: [
                        "card",
                    ],
                    line_items: [
                        {
                            price,
                            quantity,
                        },
                    ],
                    mode: "subscription",
                },
            );
        console.log(session)
        if (session) {
            return new Response(
                JSON.stringify({
                    sessionId: session.id,
                }),
                {
                    status: 200,
                }
            );
        } else {
            console.error('Failed to create session');
            return new Response(
                JSON.stringify({
                    error:
                        "Failed to create session",
                }),
                {
                    status: 500,
                }
            );
        }
    } catch (error) {
        console.error(
            "Error creating checkout session",
            error
        );
    }


}
