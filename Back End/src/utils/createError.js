class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(JSON.stringify(message));
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
