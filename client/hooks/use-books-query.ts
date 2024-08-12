import { queryOptions, useMutation } from '@tanstack/react-query'
import axios from 'axios';

export const pokemonOptions = queryOptions({
    queryKey: ['pokemon'],
    queryFn: async () => {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/25')

        return response.json()
    },
})



export const useBookCreateQuery = () => {
    return useMutation({
        mutationFn: async (newUser) => {
            const res = await axios.post(`/api/book`, newUser);
            return res;
        },
    });
};