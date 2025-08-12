import ArchiveMenu from "@/components/archive/ArchiveMenu";

export default async function ArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row relative w-full h-screen pb-16 p-8">
      <div className="flex flex-col gap-4 w-full h-fit md:w-1/4 md:h-full">
        <ArchiveMenu />
      </div>
      {children}
    </div>
  );
}
