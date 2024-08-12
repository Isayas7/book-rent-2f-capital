import { RegisterFormTypes } from "@/data/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useUserRegisterQuery = () => {
    return useMutation({
        mutationFn: async (newUser:RegisterFormTypes) => {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`, newUser);
            return res;
        },
    });
};