import { EditorProvider } from "@/contexts/EditorProvider";

export default async function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <EditorProvider>{children}</EditorProvider>;
}
