import { useMutation } from "@tanstack/react-query";
import { ClientSafeProvider, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export function useOAuthSignIn(provider: ClientSafeProvider) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const oAuthSignInMutation = useMutation({
    mutationFn: () =>
      signIn(provider.id, { callbackUrl: callbackUrl ?? undefined }),
  });

  return {
    signIn: oAuthSignInMutation.mutate,
    isPending: oAuthSignInMutation.isPending,
  };
}
