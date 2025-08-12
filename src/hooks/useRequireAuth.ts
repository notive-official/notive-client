import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";

/**
 * 인증되지 않은 사용자를 지정된 경로로 리다이렉트합니다.
 * @param redirectTo 리다이렉트할 경로 (기본값: "/login")
 */
export function useRequireAuth(redirectTo: string = "/login") {
  const { isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, redirectTo, router]);
}
