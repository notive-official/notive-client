import Image from "next/image";

export default function ImageView({ filePath }: { filePath: string; width?: number; height?: number }) {
  return (
    <div className="my-8">
      <Image src={filePath} alt="" width={768} height={480} className="w-full h-auto rounded-xl" />
    </div>
  );
}
