import { ErrorRequestHandler, RequestHandler } from 'express';
import { MulterError } from 'multer';
export const notFoundPage: RequestHandler = (req, res) => {
  res.status(404).json({
    error: 'page not found',
  });
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);

  if (err instanceof MulterError) {
    res.json({ error: err.code });
  } else {
    res.status(500).json({
      error: 'erro interno no servidor',
    });
  }
};
