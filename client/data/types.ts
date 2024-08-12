import { z } from "zod";
import { registerSchema } from "./schema";

export type RegisterFormTypes = z.infer<typeof registerSchema>


export const loginFormData = [
  {
    label: "Email address",
    type: "email",
  },
  {
    label: "Password",
    type: "password",
  },
];

