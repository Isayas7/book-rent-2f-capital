import { z } from "zod";
import { LoginSchema, registerSchema } from "./schema";

export type RegisterFormTypes = z.infer<typeof registerSchema>
export type LoginFormTypes = z.infer<typeof LoginSchema>





