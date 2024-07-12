import { ErrorRequestHandler, RequestHandler } from 'express';
export const notFoundPage: RequestHandler = (req, res) => {
  res.status(404).json({
    error: 'page not found',
  });
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    error: 'erro interno no servidor',
  });
};
