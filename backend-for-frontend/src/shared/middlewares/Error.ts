import type { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';

export default function errorMiddleware(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): any {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }

  return response.status(500).json({
    status: '500',
    message: 'Internal server error',
  });
}
