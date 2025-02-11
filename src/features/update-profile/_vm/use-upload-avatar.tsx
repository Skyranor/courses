import { selectFile, validateFileSize } from "@/shared/lib/file";
import { useMutation } from "@tanstack/react-query";
import { AVATAR_FILE_KEY, MAX_AVATAR_SIZE } from "./_constants";
import { uploadAvatarAction } from "../_actions/upload-avatar";

export const useUploadAvatar = ({
  onError,
  onSuccess,
}: {
  onError?: (type?: "big-size") => void;
  onSuccess?: (avatarPath: string) => void;
}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadAvatarAction,
    onSuccess: (data) => {
      onSuccess?.(data.avatar.path);
    },
  });

  const handleSelectFile = async () => {
    const file = await selectFile("image/*");

    if (validateFileSize(file, MAX_AVATAR_SIZE)) {
      return onError?.("big-size");
    }

    const formdata = new FormData();

    formdata.set(AVATAR_FILE_KEY, file);

    await mutateAsync(formdata);
  };

  return {
    isPending,
    handleSelectFile,
  };
};
