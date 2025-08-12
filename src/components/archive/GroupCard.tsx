import Image from "next/image";

interface GroupProps {
  thumbnails: string[];
  name: string;
  totalElements: number;
}

export default function GroupCard({
  thumbnails,
  name,
  totalElements,
}: GroupProps) {
  const group_placeholder = "/group/default.png";
  const [first, second, third] = thumbnails;
  const restSize = totalElements - 3;

  return (
    <div className="flex flex-col max-w-84 w-full rounded-xl p-2 gap-2 shadow-md click-effect">
      <div className="relative grid grid-rows-2 grid-cols-[2fr_1fr] gap-1 w-full h-48 rounded-lg">
        {thumbnails.length === 0 && (
          <div className="relative row-span-2 col-span-2">
            <Image
              src={group_placeholder}
              alt={`${name} preview`}
              layout="fill"
              className="rounded object-cover"
            />
          </div>
        )}
        {/* big left image, spans both rows */}
        {first && (
          <div
            className={`relative row-span-2 ${
              thumbnails.length === 1 && "col-span-2"
            }`}
          >
            <Image
              src={first}
              alt={`${name} preview`}
              layout="fill"
              className="rounded object-cover"
            />
          </div>
        )}

        {/* top‑right */}
        {second && (
          <div
            className={`relative ${thumbnails.length === 2 && "row-span-2"}`}
          >
            <Image
              src={second}
              alt={`${name} preview`}
              layout="fill"
              className="rounded object-cover"
            />
          </div>
        )}

        {/* bottom‑right */}
        {third && (
          <div className="relative">
            <Image
              src={third}
              alt={`${name} preview`}
              layout="fill"
              className="rounded object-cover"
            />
          </div>
        )}

        {/* if you have more than 3, overlay a “+N” badge */}
        {restSize > 0 && (
          <div
            className="
              absolute bottom-2 right-2
              bg-black bg-opacity-50 text-white text-sm
              px-2 py-1 rounded
            "
          >
            +{restSize}
          </div>
        )}
      </div>
      <p className="w-full text-center fg-principal text-md">{name}</p>
    </div>
  );
}
