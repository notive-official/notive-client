import { EditorElementType } from "@/contexts/EditorProvider";
import {
  ArchiveImageRequest,
  ArchiveLinkRequest,
  ArchiveTextRequest,
} from "@/hooks/api/archive";

export function converElementTo(elements: EditorElementType[]) {
  const links: ArchiveLinkRequest[] = [];
  const images: ArchiveImageRequest[] = [];
  const texts: ArchiveTextRequest[] = [];

  elements.forEach((element, idx) => {
    if (element.elementCategory === "image") {
      const files: File[] = element.data.uploadedFiles.map((f) => f.file);
      const description = element.data.description;
      images.push({ sequence: idx, files, description });
    }
    if (element.elementCategory === "link") {
      const urls: string[] = element.data.links.map((l) => l.url);
      links.push({ sequence: idx, urls });
    }
    if (element.elementCategory === "text") {
      texts.push({
        sequence: idx,
        type: element.data.text.type,
        content: element.data.text.value,
      });
    }
  });
  return { links, images, texts };
}
