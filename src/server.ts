import express from 'express';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import { apiRouter } from './routers/router';
import { errorHandler, notFoundPage } from './routers/errorhandler';

const SERVER: string = process.env.IP_SERVER || '127.0.0.1';
const PORT: number =
  typeof process.env.PORT === 'string' ? +process.env.PORT : 8080 || 8080;

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, '../public')));

server.use('/api', apiRouter);
server.use(notFoundPage);
server.use(errorHandler);

server.listen(PORT, SERVER, () => {
  console.log(SERVER, PORT);
  console.log('server running!');
});
