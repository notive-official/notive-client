import { nanoid } from "nanoid";
import { useState } from "react";

export interface UploadedLink {
  id: string;
  link: string;
}

export default function useLinkUpload() {
  const [links, setLinks] = useState<UploadedLink[]>([
    { id: nanoid(), link: "" },
  ]);

  const handleChange = (id: string, value: string) => {
    const newLinks = links.map((link) => {
      if (id === link.id) {
        return { ...link, link: value };
      }
      return link;
    });
    setLinks(newLinks);
  };

  const handleAddLink = () => {
    setLinks([...links, { id: nanoid(), link: "" }]);
  };

  const handleRemoveLink = (id: string) => {
    const newLinks = links.filter((link) => {
      return id !== link.id;
    });
    setLinks(newLinks);
  };

  return { links, handleChange, handleAddLink, handleRemoveLink };
}
