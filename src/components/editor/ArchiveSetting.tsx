import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ImageView from "../viewer/ImageView";
import ToggleSwitch from "../common/ToggleSwitch";
import Combo from "../common/Combo";
import { Button } from "@headlessui/react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import {
  PostPackageRequest,
  useListPakagesQuery,
  usePostPackageeMutation,
} from "@/hooks/api/archive";
import Modal from "../common/Modal";
import InputBox from "../common/InputBox";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";

export default function ArchiveSetting() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const { mutate: postPackage } = usePostPackageeMutation();
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [newPackage, setNewPackage] = useState("");

  const addPackage = (packageName: string) => {
    const req: PostPackageRequest = { packageName };
    postPackage(req, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["listPackages"] });
      },
    });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setThumbnail(acceptedFiles[0]);
  }, []);

  const { isLoading, data } = useListPakagesQuery({
    staleTime: 1000 * 60 * 5,
    enabled: isAuthenticated,
  });

  const handleEvent = () => {
    addPackage(newPackage);
    setNewPackage("");
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  const deleteFile = () => {
    setThumbnail(null);
  };

  const packages = data?.packages.map((pkg) => {
    return { id: pkg.id, name: pkg.name };
  });

  const packageAddNode = (
    <div className="p-2 bg-transparent-reverse-25 click-effect">
      <PlusIcon className="w-5 h-5" />
    </div>
  );

  const modalActionNode = (
    <div className="flex flex-col items-center justify-center gap-4">
      <InputBox
        value={newPackage}
        handleChange={setNewPackage}
        buttonIcon={<PlusIcon className="w-5 h-5" />}
        onAction={handleEvent}
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-4 w-full">
      <section className="flex flex-col h-full md:gap-5">
        <div className="flex flex-row gap-2 w-full">
          <div
            {...getRootProps()}
            className="p-3 border-2 border-dashed rounded-lg cursor-pointer bg-tertiary border-primary w-full md:max-w-full shadow-md"
          >
            <input {...getInputProps()} />
            {thumbnail ? (
              <p className="fg-primary overflow-hidden text-ellipsis whitespace-nowrap block w-full text-center">
                {thumbnail.name}
              </p>
            ) : (
              <p className="fg-assistant text-center">파일 선택 (최대 5MB)</p>
            )}
          </div>
        </div>
        <div>
          <div className="w-full aspect-video bg-transparent hidden md:block relative">
            <div className="w-full h-full rounded-xl overflow-hidden items-center justify-center">
              {thumbnail ? (
                <ImageView file={thumbnail} />
              ) : (
                <div className="w-full h-full bg-transparent-reverse-25" />
              )}
            </div>
            {thumbnail && (
              <Button
                className="absolute -top-2 -right-2 flex justify-center items-center click-effect"
                onClick={deleteFile}
              >
                <div className="w-full h-full p-1 rounded-xl bg-dark-transparent-75 hover:outline-light-transparent-50 hover:outline-2 hover:-outline-offset-2">
                  <XMarkIcon className="w-5 h-5 fg-reverse" />
                </div>
              </Button>
            )}
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-2 w-full">
        <div className="flex flex-row items-center justify-between">
          <p className="text-md fg-principal p-2">{"Public / Private"}</p>
          <div className="flex flex-row justify-center items-center gap-2">
            <p className="text-sm fg-assistant">
              {isPublic ? "public" : "private"}
            </p>
            <ToggleSwitch enabled={isPublic} onChange={setIsPublic} />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center w-full gap-2">
          <p className="w-1/4 text-md fg-principal p-2">Pakage</p>
          <div className="flex flex-row items-end gap-2">
            <Combo options={isLoading ? [] : packages || []} />
            <Modal
              openNode={packageAddNode}
              title="새로 생성할 패키지명을 입력해주세요."
              actionNode={modalActionNode}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
