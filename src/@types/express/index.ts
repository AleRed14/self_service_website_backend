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


