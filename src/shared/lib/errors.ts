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

export class BadRequest extends Error {
  constructor(message = "Bad Request") {
    super(message);
  }
}
