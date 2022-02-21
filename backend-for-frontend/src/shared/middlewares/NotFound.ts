import AppError from '../errors/AppError';

export default function notFoundMiddleware(): void {
  throw new AppError('Not Found', 404);
}
