declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        tokenId: string;
        expiresAt: Date;
      };
    }
  }
}

export {};