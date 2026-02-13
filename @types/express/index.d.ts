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

declare global {
  type Email = `${string}@${string}.${string}`;
}

export interface IProduct {
    id?: number;
    name: string;
    image: string;
    category: string;
    price: number | string;
    active?: number;
}
