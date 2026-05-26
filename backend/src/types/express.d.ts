// src/types/express.d.ts

import { Account } from '../models/user.model.ts'; // Import your Account model or type

declare global {
  namespace Express {
    interface Request {
      // 🔑 Add the user property here
      user?: {
        id: string;
        role: 'professional' | 'admin' | 'superAdmin';
      };
      // Alternatively, if using Mongoose document types:
      // user?: Account; 
    }
  }
}
