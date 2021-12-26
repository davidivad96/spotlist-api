import * as bcrypt from 'bcrypt';

const createErrorResponse = (type: string, message: string) => ({
  error: {
    type,
    message,
  },
});

const validatePassword = (raw_password: string, hashed_password: string) =>
  bcrypt.compareSync(raw_password, hashed_password);

export { createErrorResponse, validatePassword };
