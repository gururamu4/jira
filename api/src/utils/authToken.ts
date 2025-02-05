import jwt, { SignOptions } from 'jsonwebtoken';
import { isPlainObject } from 'lodash';

import { InvalidTokenError } from '../errors';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

export const signToken = (payload: object, options?: SignOptions): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '180 days',
    ...options,
  });
};

export const verifyToken = (token: string): { [key: string]: any } => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);

    if (isPlainObject(payload)) {
      return payload as { [key: string]: any };
    }
    throw new Error();
  } catch (error) {
    throw new InvalidTokenError();
  }
};