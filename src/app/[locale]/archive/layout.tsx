import ArchiveMenu from "@/components/archive/ArchiveMenu";

export default async function ArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full md:flex-row flex-col">
      <div className="flex flex-col gap-4 w-full md:w-1/4 h-auto md:h-full p-4 md:px-8">
        <ArchiveMenu />
      </div>
      <div className="flex-1 min-h-0 h-full overflow-y-auto">{children}</div>
    </div>
  );
}
