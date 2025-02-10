import { AuthorizationError } from "@/shared/lib/errors";
import { Profile, SessionEntity, UserId } from "../_domain/types";
import { createProfileAbility } from "../_domain/ability";
import { profileRepository } from "../_repositories/profile";

export type UpdateProfile = {
  userId: UserId;
  data: Partial<Profile>;
  session: SessionEntity;
};

export class UpdateProfileUseCase {
  async execute({ session, userId, data }: UpdateProfile): Promise<Profile> {
    const profileAbility = createProfileAbility(session);

    if (!profileAbility.canUpdateProfile(userId)) {
      throw new AuthorizationError();
    }

    return await profileRepository.update(userId, data);
  }
}

export const updateProfileUseCase = new UpdateProfileUseCase();
