import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";

export function useRequireAuth() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) return;
    router.replace("/login");
  }, [isAuthenticated, router]);
}
