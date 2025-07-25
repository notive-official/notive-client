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
            <div className="fixed bottom-0 left-0 w-full z-10">
              <EditorFooter />
            </div>
          </BlockEditorProvider>
        </EditorProvider>
      </FocusBlockProvider>
    </div>
  );
}
