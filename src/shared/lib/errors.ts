export class AuthorizationError extends Error {
  constructor(message = "Authorization Error") {
    super(message);
  }
}

export class NeedAuthError extends Error {
  constructor(message = "Need Auth Error") {
    super(message);
  }
}
