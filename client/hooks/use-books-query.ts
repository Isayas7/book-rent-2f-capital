import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';


export const useBookQuery = () => {
    return useQuery({
        queryKey: ["Books"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/book/allBooks`, {
                withCredentials: true,
            });
            return res.data
        },
    });
};



export const useBookCreateQuery = () => {
    return useMutation({
        mutationFn: async (newBook) => {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/book/create`, newBook, { withCredentials: true });
            return res;
        },
    });
};


export const useChangeBookStatusQuery = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ bookId, newStatus }: { bookId: string; newStatus: string }) => {
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/book/status/${bookId}`;
            const payload = {
                status: newStatus,
            };
            const res = await axios.put(url, payload, {
                withCredentials: true,
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries("Books");
        },
    });
};


