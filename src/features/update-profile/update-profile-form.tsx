"use client";

import { useQuery } from "@tanstack/react-query";
import { ProfileForm } from "./_ui/profile-form";
import { Spinner } from "@/shared/ui/spinner";
import { getProfileQuery } from "@/entities/user/_queries";
import { useRouter } from "next/navigation";

export function UpdateProfileForm({
  callbackUrl,
  userId,
}: {
  userId: string;
  callbackUrl?: string;
}) {
  const profileQuery = useQuery({
    ...getProfileQuery(userId),
    retry: 0,
  });

  const router = useRouter();
  const handleSuccess = () => {
    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  if (profileQuery.isPending) {
    return <Spinner aria-label="Загрузка профиля" />;
  }

  if (profileQuery.isError) {
    return <div>Не удалось загрузить профиль, возможно у вас нет прав</div>;
  }

  return (
    <ProfileForm
      profile={profileQuery.data.profile}
      onSuccess={handleSuccess}
      userId={userId}
      submitText={callbackUrl ? "Продолжить" : "Сохранить"}
    />
  );
}
