import "../globals.css";

import { Locale, routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import ClientProviders from "../../contexts/ClientContext";
import Header from "../../components/Header";
import Footer from "@/components/Footer";
import ErrorBarProvider from "@/contexts/ErrorBarContext";

export const metadata = {
  title: "Notive",
  icons: {
    icon: "/icons/favicon-light.ico",
    innerWidth: 10,
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
    <html lang={locale} className="h-full overflow-hidden">
      <body className="h-full flex flex-col text-foreground bg-surface">
        <ClientProviders locale={locale} messages={messages}>
          <ErrorBarProvider listenGlobal position="bottom" align="left">
            <Header />
            <main className="flex-1 h-full overflow-hidden">{children}</main>
          </ErrorBarProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
