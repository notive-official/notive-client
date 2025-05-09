"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 1) accessToken이 바뀔 때마다 axios 기본 헤더 갱신
  useEffect(() => {
    if (accessToken) {
      api.defaults.headers.common[tokenHeader] = tokenPrefix + accessToken;
      setIsAuthenticated(true);
    } else {
      delete api.defaults.headers.common[tokenHeader];
      setIsAuthenticated(false);
    }
  }, [accessToken]);

  // 2) 새 토큰 헤더에 있으면 state 갱신
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

  // 3) reissue 호출: 브라우저 fetch에 credentials: 'include' 로 쿠키 자동 전송
  useEffect(() => {
    if (!accessToken) {
      (async () => {
        await api.post("/api/auth/reissue").catch(() => {
          return;
        });
      })();
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    api.post("/api/auth/logout").catch(() => {});
    setAccessToken(null);
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
