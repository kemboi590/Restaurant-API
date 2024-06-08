import { z } from "zod";

export const stateSchema = z.object({
    name: z.string(),
    code: z.string(),
});

export const citySchema = z.object({
    name: z.string(),
    state_id: z.number(),
});

export const addressSchema = z.object({
    street_address_1: z.string(),
    street_address_2: z.string(),
    city_id: z.number(),
    zip_code: z.string(),
    delivery_instructions: z.string(),
    user_id: z.number(),
});

export const restaurantSchema = z.object({
    name: z.string(),
    street_address: z.string(),
    zip_code: z.string(),
    city_id: z.number()
});

export const userSchema = z.object({
    name: z.string(),
    contact_phone: z.string(),
    phone_verified: z.boolean(),
    email: z.string(),
    email_verified: z.boolean(),
    confirmation_code: z.string(),
    password: z.string()
});
