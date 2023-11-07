import { Request, Response, NextFunction } from 'express';

const debug = require('debug')('HANDLEERROR');

// Créer un objet avec une erreur personnalisée
const handleError = async (error: any, req: Request, res: Response, next: NextFunction) => {
  debug(error.message, error.status);
  
  res.status(error.status || 500);
  res.send({
    error : {
      message: error.message,
      status: error.status
    },
  });
  console.log(error);
  
};

export default handleError;