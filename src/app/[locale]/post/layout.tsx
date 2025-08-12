import EditorFooter from "@/components/editor/EditorFooter";
import { EditorProvider } from "@/contexts/EditorContext";
import { BlockEditorProvider } from "@/contexts/BlockEditorContext";
import { FocusBlockProvider } from "@/contexts/FocusBlockContext";

export default async function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative h-screen pb-16">
      <FocusBlockProvider>
        <EditorProvider>
          <BlockEditorProvider>
            {children}
            <EditorFooter />
          </BlockEditorProvider>
        </EditorProvider>
      </FocusBlockProvider>
    </div>
  );
}
