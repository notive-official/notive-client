"use client";

import { ReactNode } from "react";
import { NextIntlClientProvider, Messages } from "next-intl";
import AxiosProvider from "@/contexts/AxiosProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import ClientErrorBoundary from "@/components/ClientErrorBoundary";

interface Props {
  children: ReactNode;
  locale: string;
  messages: Messages;
}

export default function ClientProviders({ children, locale, messages }: Props) {
  return (
    <AxiosProvider>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone="Asia/Seoul"
      >
        <AuthProvider>
          <ClientErrorBoundary>{children}</ClientErrorBoundary>
        </AuthProvider>
      </NextIntlClientProvider>
    </AxiosProvider>
  );
}
