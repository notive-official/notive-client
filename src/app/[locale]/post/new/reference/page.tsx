"use client";
import Editor from "@/components/editor/Editor";
import EditorFooter from "@/components/editor/EditorFooter";
import { EditorProvider, EditorState } from "@/contexts/EditorContext";
import { useErrorBar } from "@/contexts/ErrorBarContext";
import {
  usePostReferenceMutation,
  PostReference,
} from "@/hooks/api/archive/reference";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import useTranslation from "@/hooks/useTranslation";
import { useRouter } from "@/i18n/routing";

export default function PostPage() {
  useRequireAuth();
  const router = useRouter();
  const { pushWarning } = useErrorBar();
  const { PostTrans } = useTranslation();
  const { mutate: postReference } = usePostReferenceMutation({
    url: PostReference.url(),
  });

  const onSave = (data: EditorState) => {
    if (!data.group) {
      pushWarning(PostTrans("message.warning.group"));
      return;
    }
    if (!data.title || data.title.length === 0) {
      pushWarning(PostTrans("message.warning.title"));
      return;
    }

    const body = {
      ...data,
      groupId: data.group.id,
      thumbnail: data.thumbnail ? data.thumbnail.file : null,
    };

    if (data.type !== "REFERENCE") {
      return;
    }
    if (data.url.length == 0) {
      pushWarning(PostTrans("message.warning.url"));
      return;
    }
    return postReference(
      { ...body },
      {
        onSuccess(res) {
          router.push(`/post/${res.id}`);
        },
      }
    );
  };

  return (
    <div className="relative min-h-screen">
      <EditorProvider
        initial={{ mode: "create", type: "REFERENCE" }}
        postKey={"new"}
      >
        <div className="flex flex-1 flex-col w-full h-full md:pt-12 pb-12">
          <Editor />
        </div>
        <div className="fixed bottom-0 left-0 z-10 w-full">
          <EditorFooter placeholder="저장하기" onSave={onSave} />
        </div>
      </EditorProvider>
    </div>
  );
}
