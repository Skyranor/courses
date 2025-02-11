"use server";
import { fileStorage } from "@/shared/lib/file-storage";
import { z } from "zod";
import { AVATAR_FILE_KEY } from "../_vm/_constants";
import { BadRequest } from "@/shared/lib/errors";

const resultSchema = z.object({
  avatar: z.object({
    path: z.string(),
  }),
});

export const uploadAvatarAction = async (formdata: FormData) => {
  const file = formdata.get(AVATAR_FILE_KEY);

  if (!(file instanceof File)) {
    throw new BadRequest();
  }

  const storedFile = await fileStorage.uploadImage(file, {
    tags: [{ Key: "image-type", Value: "avatar" }],
  });

  return resultSchema.parse({
    avatar: storedFile,
  });
};
