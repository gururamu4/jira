// filepath: /Users/gururamu/Documents/personal/interview/jira/api/src/index.ts
import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import createDatabaseConnection from './database/createConnection';
import { addRespondToResponse } from './middleware/response';
import { authenticateUser } from './middleware/authentication';
import { handleError } from './middleware/errors';
import { RouteNotFoundError } from './errors';

import { attachPublicRoutes, attachPrivateRoutes } from './routes';

const establishDatabaseConnection = async (): Promise<void> => {
  try {
    console.log('Connecting to database...');
    await createDatabaseConnection();
    console.log('Connected to database');
  } catch (error) {
    console.log(error);
  }
};

const initializeExpress = (): void => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());

  app.use(addRespondToResponse);

  attachPublicRoutes(app);

  app.use('/', authenticateUser);

  attachPrivateRoutes(app);

  app.use((req, _res, next) => next(new RouteNotFoundError(req.originalUrl)));
  app.use(handleError);

  console.log("Server is running on port 3000");
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
};

const initializeApp = async (): Promise<void> => {
  try {
    await establishDatabaseConnection();
    initializeExpress();
  } catch (error) {
    console.error('Error initializing app', error);
  }
};

initializeApp();