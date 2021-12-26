class BaseError extends Error {
  type: string;
  statusCode: number;
  message: string;

  constructor(type: string, statusCode: number, message: string) {
    super();
    this.type = type;
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default BaseError;
