import { boolean, integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";


export const JsonForms = pgTable('jsonForms', {
    id: serial('id').primaryKey(),
    jsonform: text('jsonform').notNull(),
    theme: varchar('theme'),
    background: varchar('background'),
    style: varchar('style'),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull(),
    enableSignIn: boolean('enableSignIn').default(false)
})


export const UserResponses = pgTable('userResponses', {
    id: serial('id').primaryKey(),
    jsonResponse: text('jsonResponse').notNull(),
    createdBy: varchar('createdBy').default('anonymous'),
    createdAt: varchar('createdAt').notNull(),
    formRef: integer('formRef').references(() => JsonForms.id, { onDelete: 'cascade' })
})

export const Users = pgTable('users', {
    id: serial('id').primaryKey(),
    emailAddress: varchar('emailAddress').notNull().unique(),
    createdAt: varchar('createdAt').notNull(),
    formCount: integer('formCount').default(0),
    priceId: text('price_id'),
    stripeCustomerId: text('stripe_customer_id'),
    isSubscribed: boolean('isSubscribed').default(false),
});
