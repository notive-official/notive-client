import { BlockType } from "@/common/types";

interface TextiewProps {
  blockType: BlockType;
  text: string;
}

export default function TextView({ blockType, text }: TextiewProps) {
  return (
    <div className="py-2 rounded-xl">
      {text.split("\n").map((line, index) => (
        <div key={index} className="rounded-xl">
          {blockType === "PARAGRAPH" && (
            <div className="text-normal">
              {line.length === 0 ? <br /> : line}
            </div>
          )}
          {blockType === "H1" && (
            <h1 className="text-h1">{line.length === 0 ? <br /> : line}</h1>
          )}
          {blockType === "H2" && (
            <h2 className="text-h2">{line.length === 0 ? <br /> : line}</h2>
          )}
          {blockType === "H3" && (
            <h3 className="text-h3">{line.length === 0 ? <br /> : line}</h3>
          )}
        </div>
      ))}
    </div>
  );
}
