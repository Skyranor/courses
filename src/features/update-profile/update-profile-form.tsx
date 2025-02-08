"use client";

import { ProfileForm } from "./_ui/profile-form";

export function UpdateProfileForm({
  callbackUrl,
}: {
  userId: string;
  callbackUrl?: string;
}) {
  return (
    <ProfileForm
      //profile={profile}
      //onSuccess={handleSuccess}
      submitText={callbackUrl ? "Продолжить" : "Сохранить"}
    />
  );
}
