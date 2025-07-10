import "../globals.css";

import { Locale, routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import ClientProviders from "../../contexts/ClientProvider";
import Header from "../../components/Header";

export const metadata = {
  title: "Notive",
  icons: {
    icon: "/icons/favicon-light.ico",
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
      <body className="h-full flex flex-col fg-principal bg-primary">
        <ClientProviders locale={locale} messages={messages}>
          <Header />
          <main className="flex-1 overflow-hidden">{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
}
