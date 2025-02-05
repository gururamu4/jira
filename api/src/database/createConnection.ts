import { createConnection, Connection } from 'typeorm';

import * as entities from 'entities';
console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);
const createDatabaseConnection = async (): Promise<Connection> => {
  try {
    console.log('Connecting to 1 database...');
    const connection = await createConnection({
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },
      // url: process.env.DATABASE_URL,
      // Uncomment and configure if needed
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: Object.values(entities),
      synchronize: true,
    });
    console.log('Database connected successfully');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw error;
  }
};

export default createDatabaseConnection;
