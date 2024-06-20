import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema"
import { eq } from 'drizzle-orm';
import { Users } from '@/configs/schema'
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL_CONFIG);
export const db = drizzle(sql, { schema });



export const addUserIfNotExists = async (user) => {
    const existingUser = await db.select().from(Users)
        .where(eq(Users.emailAddress, user?.primaryEmailAddress?.emailAddress));

    if (existingUser.length === 0) {
        // Add user to the database
        await db.insert(Users).values({
            emailAddress: user?.primaryEmailAddress?.emailAddress,
            createdAt: new Date().toISOString(),
            // Add other necessary fields
        });
        //console.log('New user added:', user?.primaryEmailAddress?.emailAddress);
    } else {
        //console.log('User already exists:', user?.primaryEmailAddress?.emailAddress);
    }
};