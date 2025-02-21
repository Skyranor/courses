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

export class ParsingError extends Error {
  constructor(
    public source: string,
    message = "Parsing Error",
    cause?: unknown,
  ) {
    super(message, { cause });
  }
}

export class ValidationError extends Error {
  constructor(
    public errors: unknown[],
    message = "Validation Error",
  ) {
    super(message);
  }
}
