"use server";

import { profileSchema } from "@/entities/user/profile";
import { updateProfileUseCase } from "@/entities/user/profile.server";
import { getAppSessionStrictServer } from "@/entities/user/session.server";
import { z } from "zod";

const propsSchema = z.object({
  userId: z.string(),
  data: profileSchema.partial(),
});

const resultSchema = z.object({
  profile: profileSchema,
});

export const updateProfileAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  const { userId, data } = propsSchema.parse(props);

  const session = await getAppSessionStrictServer();

  const user = await updateProfileUseCase.execute({
    session,
    userId,
    data,
  });

  return resultSchema.parseAsync({
    profile: user,
  });
};
