import { z } from "zod"

export const signUpSchema = z.object({

    name: z.string().trim().min(2, "Name must be atleast two characters"),

    email: z.email("Invalid email address").trim(),

    password: z.string().min(8,"Password must be atleast 8 characters"),
})

export const loginSchema = z.object({

    email:z.email("Invalid email address").trim(),

    password: z.string().min(1,"Password is required"),
})