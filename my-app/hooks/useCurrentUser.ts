import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const { data } = await axios.get("/api/auth/me");
      return data;
    },
  });
}
