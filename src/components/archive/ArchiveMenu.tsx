"use client";
import { Link, usePathname } from "@/i18n/routing";

const items = [
  { href: "/archive/note", label: "Note" },
  { href: "/archive/link", label: "Link" },
  { href: "/archive/like", label: "Like" },
  { href: "/archive/group", label: "Group" },
];

export default function ArchiveMenu() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-row md:flex-col gap-1 py-3 md:py-5">
      {items.map(({ href, label }) => (
        <Link key={href} href={href}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 text-center md:text-left
            ${pathname.startsWith(href) ? "text-foreground bg-reverse-5" : "text-muted-foreground hover:text-foreground hover:bg-reverse-5"}`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
