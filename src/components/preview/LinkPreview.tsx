import { useGetOEmbedQuery } from "@/hooks/api/archive";
import { UploadedLink } from "@/hooks/linkUpload";
import Image from "next/image";

export default function LinkPreview({
  upLoadedLink,
}: {
  upLoadedLink: UploadedLink;
}) {
  const url = upLoadedLink.url;
  const { data: oEmbed, isError } = useGetOEmbedQuery(
    { url },
    {
      retry: () => {
        return false;
      },
    }
  );
  const handleClick = () => {
    window.open(
      url,
      "myPopup",
      "width=800,height=600,toolbar=no,menubar=no,scrollbars=yes"
    );
  };
  if (isError) {
    return (
      <p
        className="underline text-blue-500 cursor-pointer hover:text-blue-600"
        onClick={handleClick}
      >
        {url}
      </p>
    );
  }
  return (
    <div className="cursor-pointer max-w-148">
      {oEmbed ? (
        <div
          className="bg-tertiary rounded-lg overflow-hidden shadow-lg h-48"
          onClick={handleClick}
        >
          <div className="hover-bg-effect flex flex-row h-full">
            {oEmbed.thumbnailUrl ? (
              <div className="p-6 w-4/7 relative overflow-hidden h-full">
                <Image
                  src={oEmbed.thumbnailUrl}
                  alt={oEmbed.type}
                  fill
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="flex flex-col justify-between w-fill p-6">
              <h2
                className="fg-principal font-bold text-lg line-clamp-4"
                title={oEmbed.title}
              >
                {oEmbed.title}
              </h2>
              <p className="fg-assistant text-base">{oEmbed.providerName}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
