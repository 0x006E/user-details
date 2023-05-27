import { useQuery } from "@tanstack/react-query";
import { User } from "../models/User";
import axios from "axios";

export default function useUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await axios.get<User[]>('https://602e7c2c4410730017c50b9d.mockapi.io/users');
            return data;
        }
    });
}
