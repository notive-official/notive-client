"use client";
import Editor from "@/components/editor/Editor";
import EditorFooter from "@/components/editor/EditorFooter";
import { EditorProvider, EditorState } from "@/contexts/EditorContext";
import { useErrorBar } from "@/contexts/ErrorBarContext";
import { usePostNote } from "@/hooks/api/archive/note";
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
  const { postNote } = usePostNote();
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

    if (data.type !== "NOTE") {
      return;
    }
    if (data.blocks.length === 0) {
      pushWarning(PostTrans("message.warning.content"));
      return;
    }
    return postNote(body).then((res) => {
      router.push(`/post/${res.data.id}`);
    });
  };

  return (
    <div className="relative h-full">
      <EditorProvider
        initial={{ mode: "create", type: "NOTE" }}
        postKey={"new"}
      >
        <div className="flex flex-col w-full h-full py-12">
          <Editor />
        </div>
        <div className="fixed bottom-0 left-0 z-10 w-full">
          <EditorFooter placeholder="저장하기" onSave={onSave} />
        </div>
      </EditorProvider>
    </div>
  );
}
