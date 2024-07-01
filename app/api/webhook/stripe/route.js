import Stripe from "stripe";
import { headers } from 'next/headers';
import { db } from "@/configs";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;


export async function POST(req) {


    const body = await req.text();

    const signature = headers().get('stripe-signature');

    let data;
    let eventType;
    let event;

    // verify Stripe event is legit
    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error(`Webhook signature verification failed. ${err.message}`);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }

    data = event.data;
    eventType = event.type;

    try {
        switch (eventType) {
            case 'checkout.session.completed': {
                // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
                // ✅ Grant access to the product
                let user;
                console.log(data)
                const session = await stripe.checkout.sessions.retrieve(
                    data.object.id,
                    {
                        expand: ['line_items']
                    },
                );

                const customerId = session?.customer;
                const customer = await stripe.customers.retrieve(customerId);
                const priceId = session?.line_items?.data[0]?.price.id;
                if (customer.email) {
                    const users = await db.select().from(Users)
                        .where(eq(Users.emailAddress, customer.email));

                    if (users.length === 0) {
                        // Add user to the database
                        await db.insert(Users).values({
                            emailAddress: customer.email,
                            createdAt: new Date().toISOString(),
                            stripeCustomerId: customerId,
                        });
                    } else {
                        // If user exists, use the existing user
                        user = users[0];
                        if (!user.stripeCustomerId) {
                            await db.update(Users)
                                .set({ stripeCustomerId: customerId })
                                .where(eq(Users.emailAddress, customer.email));
                        }
                    }
                } else {
                    console.error('No user found');
                    throw new Error('No user found');
                }
                // update user's subscription status && priceId
                await db.update(Users)
                    .set({ isSubscribed: true, priceId, stripeCustomerId: customerId})
                    .where(eq(Users.emailAddress, customer.email));

                // ✅ Send email to user

                break;
            }
            case 'customer.subscription.deleted': {
                // ❌ Revoke access to the product
                // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
                const subscription = await stripe.subscriptions.retrieve(
                    data.object.id
                );

                // update user's subscription status
                await db.update(Users)
                    .set({ isSubscribed: false })
                    .where(eq(Users.stripeCustomerId, subscription.customer));

                // ✅ Send email to user
                break;
            }
            default:
                break;

        }
    } catch (e) {
        console.error(
            'stripe error: ' + e.message + ' | EVENT TYPE: ' + eventType
        );
    }

    return NextResponse.json({});
}