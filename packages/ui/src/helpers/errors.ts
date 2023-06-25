import * as Sentry from '@sentry/react';

export class CustomError extends Error {
  type: string;
  code: number;

  constructor(message: string) {
    super(message);
    this.type = 'CustomError';
    this.code = 400;
  }

  toJSON() {
    return {
      message: this.message,
      type: this.type
    };
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}

export class MissingParameterError extends CustomError {
  params: string[];

  constructor(...missingParams: string[]) {
    super(`Required parameters not supplied: ${missingParams.join(', ')}`);
    this.params = missingParams;
    this.type = 'MissingParameterError';
    this.code = 400;
  }

  toJSON() {
    return {
      message: this.message,
      type: this.type,
      params: this.params
    };
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message);
    this.type = 'BadRequestError';
    this.code = 400;
  }
}

export class NotAuthorisedError extends CustomError {
  constructor(message: string) {
    super(message);
    this.type = 'NotAuthorisedError';
    this.code = 401;
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message);
    this.type = 'NotFoundError';
    this.code = 404;
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string) {
    super(message);
    this.type = 'InternalServerError';
    this.code = 500;
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(message);
    this.type = 'ForbiddenError';
    this.code = 403;
  }
}

const getSuitableError = (type: string) => {
  switch (type) {
    case 'NotFoundError':
      return NotFoundError;
    case 'NotAuthorisedError':
      return NotAuthorisedError;
    case 'BadRequestError':
      return BadRequestError;
    case 'ForbiddenError':
      return ForbiddenError;
  }

  return InternalServerError;
};

export const handleAPIError = async (response: Response) => {
  if (response.status === 200 || response.status === 201) return;

  try {
    const attempt = response.clone();
    const error = await attempt.json();
    const SuitableError = getSuitableError(error.type);
    throw new SuitableError(error.message);
  } catch (e) {
    Sentry.captureException(e);
    if (e instanceof CustomError) throw e;
    throw new InternalServerError(`The response from the server is severely malformed: ${await response.text()}`);
  }
};
