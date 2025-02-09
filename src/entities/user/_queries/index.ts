import { getUserProfileAction } from "../_actions/get-user-profile";
import { UserId } from "../_domain/types";

const baseKey = "user";

export const getProfileQuery = (userId: UserId) => ({
  queryKey: [baseKey, userId, "getProfileById"],
  queryFn: () => getUserProfileAction({ userId }),
});
