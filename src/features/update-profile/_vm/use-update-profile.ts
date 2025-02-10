import { useMutation } from "@tanstack/react-query";
import { updateProfileAction } from "../_actions/update-profile";
import { useInvalidateProfile } from "@/entities/user/user";
import { useAppSession } from "@/entities/user/session";

export const useUpdateProfile = () => {
  const { update: updateSession } = useAppSession();
  const invalidateProfile = useInvalidateProfile();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProfileAction,
    async onSuccess({ profile }, { userId }) {
      await invalidateProfile(userId);
      await updateSession({
        user: profile,
      });
    },
  });
  return {
    update: mutateAsync,
    isPending,
  };
};
