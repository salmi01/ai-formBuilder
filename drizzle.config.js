import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./configs/schema.js",
    out: "./drizzle",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://Ai-Form-Builder_owner:4UfELZuXpT3n@ep-aged-forest-a5c7f2t7.us-east-2.aws.neon.tech/Ai-Form-Builder?sslmode=require',
    }
});