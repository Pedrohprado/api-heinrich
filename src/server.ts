import express from 'express';
import cors from 'cors';
import { apiRouter } from './routers/router';

const server = express();

server.use(cors());
server.use(express.json());

server.use('/api', apiRouter);

server.use((req, res) => {
  res.status(404).json({
    error: 'page notfound',
  });
});

server.listen(8080, () => {
  console.log('server running');
});
