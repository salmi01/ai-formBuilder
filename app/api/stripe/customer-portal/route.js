import { db } from '@/configs';
import { stripe } from "@/lib/stripe";
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { Users } from '@/configs/schema';


export async function POST(req, res) {
    const { user } = await req.json();
    if (!user) {
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

    const dbUser = await db.query.Users.findFirst({ where: eq(Users.emailAddress, user?.primaryEmailAddress?.emailAddress) });

    try {
        const session = await stripe.billingPortal.sessions.create({
            customer: dbUser.stripeCustomerId,
            return_url: `${baseUrl}/dashboard/billing`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}