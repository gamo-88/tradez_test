import { getApiUrl } from "@/helper/getApiUrl";
import { User } from "@/userSlice";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";



export const useFetchAllUsers = () => {
    const [allUser, setAllUser] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const fetchUsers = useCallback(async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${getApiUrl()}/users`);
        setAllUser(response.data);
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchUsers();
    }, [fetchUsers]);
  
    return { allUser, loading, error };
}