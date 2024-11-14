import {ApiError} from "@/types/backend-stubs";

export class BaseError extends Error {
  public readonly context?: any;
  public readonly cause?: Error;

  constructor(message: string, options: { cause?: Error; context?: any } = {}) {
    const {cause, context} = options;

    super(message, {cause});
    this.name = this.constructor.name;
    this.context = context;
    this.cause = cause;
  }

  static fromError(error: Error, context?: any) {
    return new BaseError(error.message, {cause: error, context});
  }
}

export class ApiErrorCls extends BaseError {
  public readonly code: string;
  public readonly description: string;
  public readonly message: string;

  constructor(error: ApiError, context?: any) {
    super(error.message, {context: {errResponse: error, ...context}});
    this.code = error.code;
    this.description = error.description;
    this.message = error.message;
  }
}

export class RefreshAuthError extends BaseError {
  constructor(message: string, cause?: Error) {
    super(message, {cause});
  }
}

export class ValidationError extends BaseError {
  private _validationErrors: Record<string, string>;

  constructor(
      message: string,
      validationErrors: Record<string, string>,
      context: any,
  ) {
    super(message, {context});
    this._validationErrors = validationErrors;
  }

  public get validationErrors(): Record<string, string> {
    return this._validationErrors;
  }
}

export function ensureError(err: unknown): Error {
  if (err instanceof Error) return err;

  let stringified = "[unable to stringify the thrown value]";

  try {
    stringified = JSON.stringify(err);
  } catch {
  }

  return new BaseError(
      `The value was thrown as is, not through an Error: ${stringified}`,
  );
}
