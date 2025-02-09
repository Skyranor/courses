import { ROLES, SessionEntity, UserId } from "./types";

export const createUserAbility = (session: SessionEntity) => {
  return {
    canGetUser: (userId: UserId) =>
      session.user.id === userId || session.user.role === ROLES.ADMIN,
  };
};
