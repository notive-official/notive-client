import Image, { StaticImageData } from "next/image";

interface CardProps {
  name: string;
  description: string;
  imageUrl?: string | StaticImageData;
}

export default function Card({ name, description, imageUrl }: CardProps) {
  return (
    <div className="bg-white/5 rounded-lg overflow-hidden shadow-lg">
      {imageUrl ? (
        <Image className="w-full px-6 py-6" src={imageUrl} alt={name} />
      ) : null}
      <div className="p-6">
        <h2 className="font-bold text-xl py-2">{name}</h2>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  );
}
