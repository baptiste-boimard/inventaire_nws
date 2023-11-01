import { Request, Response, NextFunction } from 'express';

// wrapper qui prend nos controllers pour remonter les erreurs
const routerWrapper = (method: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {    
    await method(req, res, next);    
  } catch (error) {
    next(error);
  };
};

export default routerWrapper;