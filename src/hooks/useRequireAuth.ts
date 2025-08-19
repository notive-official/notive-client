import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";

export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading || isAuthenticated) return;
    router.replace("/login");
  }, [isLoading, isAuthenticated, router]);
}
