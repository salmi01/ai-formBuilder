import { db } from "@/configs";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function POST(req, res) {
    try {
        const { email } = await req.json();

        const users = await db.select().from(Users)
            .where(eq(Users.emailAddress, email));
        const dbUser = users[0];

        const plan = dbUser?.isSubscribed ? 'Premium' : 'Free';
        // send the plan to the client
        return NextResponse.json({ plan });
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }

}
