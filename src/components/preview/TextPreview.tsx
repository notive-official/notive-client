export default function TextPreview({ text }: { text: string }) {
  return (
    <div className="py-2 rounded-xl">
      {text.split("\n").map((line, index) => (
        <div key={index} className="rounded-xl">
          {line}
        </div>
      ))}
    </div>
  );
}
