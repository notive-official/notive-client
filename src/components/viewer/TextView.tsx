import { BlockType } from "@/common/types";

interface TextViewProps { blockType: BlockType; text: string }

export default function TextView({ blockType, text }: TextViewProps) {
  const lines = text.split("\n");

  if (blockType === "H1") return (
    <div className="mt-12 mb-4">
      {lines.map((l, i) => <h2 key={i} className="text-2xl font-bold text-foreground leading-snug tracking-tight">{l || <br />}</h2>)}
    </div>
  );
  if (blockType === "H2") return (
    <div className="mt-10 mb-3">
      {lines.map((l, i) => <h3 key={i} className="text-xl font-semibold text-foreground leading-snug">{l || <br />}</h3>)}
    </div>
  );
  if (blockType === "H3") return (
    <div className="mt-8 mb-2">
      {lines.map((l, i) => <h4 key={i} className="text-lg font-semibold text-foreground/90 leading-snug">{l || <br />}</h4>)}
    </div>
  );

  return (
    <div className="my-1">
      {lines.map((l, i) => (
        <p key={i} className="text-base leading-[1.9] text-foreground/75 whitespace-normal break-words">{l || <br />}</p>
      ))}
    </div>
  );
}
