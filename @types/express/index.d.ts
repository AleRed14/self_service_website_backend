import { Express } from "express-serve-static-core";
import "express-session"

declare global {
  namespace Express {
    interface Request {
      id?: number;
    }
  }
}

declare module "express-session" {
    interface SessionData {
        user: {
            id: number;
            name: string;
            email: string;
        };
    }
}