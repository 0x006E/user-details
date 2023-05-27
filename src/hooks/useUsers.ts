import { useQuery } from "@tanstack/react-query";
import { User } from "../models/User";

export default useUsers = () => useQuery<User>({
    queryKey: "users",
    queryFn: () => {
        try {
            
        }
    }
});
