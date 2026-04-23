import ArchiveMenu from "@/components/archive/ArchiveMenu";

export default async function ArchiveLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-full w-full md:flex-row flex-col">
      <aside className="shrink-0 w-full md:w-52 border-b md:border-b-0 md:border-r border-border px-3 md:px-4">
        <ArchiveMenu />
      </aside>
      <div className="flex-1 min-h-0 h-full overflow-y-auto">{children}</div>
    </div>
  );
}
