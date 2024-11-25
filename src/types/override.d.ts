export {};

declare global {
  namespace Express {
    // 1. Create a Custom Type Definition for Request
    export interface Request {
      userId?: string;
    }
  }
}
