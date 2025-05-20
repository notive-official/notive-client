import Image, { StaticImageData } from "next/image";

interface CardProps {
  name: string;
  description: string;
  imageUrl?: string | StaticImageData;
}

const data = {
  version: "1.0",
  type: "video",
  providerName: "YouTube",
  providerUrl: "https://www.youtube.com/",
  title: "국민의 50%가 이 작은 섬에 모여 사는 이유",
  authorName: "서재로36",
  authorUrl: "https://www.youtube.com/@%EC%84%9C%EC%9E%AC%EB%A1%9C36",
  thumbnailUrl: "https://i.ytimg.com/vi/2mU7HBzhNOo/hqdefault.jpg",
  thumbnailWidth: 480,
  thumbnailHeight: 360,
  html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/2mU7HBzhNOo?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen title="국민의 50%가 이 작은 섬에 모여 사는 이유"></iframe>',
};

export default function Card() {
  const url = "https://www.youtube.com/watch?v=2mU7HBzhNOo";
  const handleClick = () => {
    window.open(
      url,
      "myPopup",
      "width=800,height=600,toolbar=no,menubar=no,scrollbars=yes"
    );
  };
  return (
    <div
      className="bg-tertiary rounded-lg overflow-hidden shadow-lg cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative hover-bg-effect">
        {data.thumbnailUrl ? (
          <Image
            className="w-full px-6 py-6"
            width={data.thumbnailWidth}
            height={data.thumbnailHeight}
            src={data.thumbnailUrl}
            alt={data.type}
          />
        ) : null}
        <div className="p-6">
          <h2 className="fg-principal font-bold text-lg py-2">{data.title}</h2>
          <p className="fg-assistant text-base">{data.providerName}</p>
        </div>
      </div>
    </div>
  );
}
