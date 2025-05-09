import "../globals.css";

import { Locale, routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import ClientProviders from "../../contexts/ClientProvider";

export const metadata = {
  title: "Notive",
  icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/icons/favicon-16x16.png", // 단축 아이콘 (옵션)
    apple: "/icons/apple-touch-icon.png", // iOS 홈 화면 아이콘 (옵션)
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const locale = (await params).locale;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="text-light-fg-primary dark:text-dark-fg-primary bg-light-bg-primary dark:bg-dark-bg-primary">
        <ClientProviders locale={locale} messages={messages}>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
