export const generateTestLink = ({
  callbackUrl,
  email,
  token,
}: {
  callbackUrl: string;
  token: string;
  email: string;
}) => {
  const url = new URL(`${globalThis.location.origin}/api/auth/callback/email`);

  url.searchParams.set("callbackUrl", callbackUrl);
  url.searchParams.set("token", token);
  url.searchParams.set("email", email);
  return url.toString();
};
