import { RequestHandler } from 'express';

export const addRespondToResponse: RequestHandler = (_req, res, next) => {
  (res as any).respond = (data): void => {
    res.status(200).send(data);
  };
  next();
};
