export default async function ViewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex justify-center w-full h-full">{children}</div>;
}
