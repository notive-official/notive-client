import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5분
    },
  },
});

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  withCredentials: true,
});

export default api;
