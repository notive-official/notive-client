"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api";
import {
  PostLogout,
  PostReissue,
  usePostLogoutMutation,
  usePostReissueMutation,
} from "@/hooks/api/user";

interface AuthContextType {
  isAuthenticated: boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const tokenHeader = "authorization";
const tokenPrefix = "Bearer ";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [issued, setIssued] = useState(false);

  const { mutate: reissueMutate } = usePostReissueMutation({
    url: PostReissue.url(),
  });
  const { mutate: logoutMutate } = usePostLogoutMutation({
    url: PostLogout.url(),
    options: {
      onSuccess: () => setAccessToken(null),
    },
  });

  // accessToken이 바뀔 때마다 axios 기본 헤더 갱신
  useEffect(() => {
    if (accessToken) {
      api.defaults.headers.common[tokenHeader] = tokenPrefix + accessToken;
      setIsAuthenticated(true);
    } else {
      delete api.defaults.headers.common[tokenHeader];
      setIsAuthenticated(false);
    }
    if (issued) setIsLoading(false);
  }, [accessToken]);

  // 새 토큰 헤더에 있으면 state 갱신
  useEffect(() => {
    const interceptor = api.interceptors.response.use((res) => {
      const header = res.headers[tokenHeader];
      if (header?.startsWith(tokenPrefix)) {
        const newToken = header.split(" ")[1];
        setAccessToken(newToken);
      }

      return res;
    });

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  // reissue 호출: 브라우저 fetch에 credentials: 'include' 로 쿠키 자동 전송
  useEffect(() => {
    reissueMutate(undefined, {
      onSettled: () => {
        setIssued(true);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  }, []);

  const logout = () => {
    logoutMutate();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
