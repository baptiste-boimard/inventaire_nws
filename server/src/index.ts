import { Request, Response, NextFunction } from 'express';
import 'dotenv/config'
import handleError from './handlers/handleError';

const express = require('express')

const app = express();

const router = require('./routers/router')

const PORT: number = parseInt(process.env.PORT as string);

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));

app.use((req: Request ,res: Response ,next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(`Access-Control-Allow-Methods`, `GET, PATCH, PUT, POST, DELETE, OPTIONS, HEAD`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With,Content-Type,Authorization, Accept`);
  res.header(`Access-Control-Allow-Credentials`, 'true');
  next();
});

app.use(router);
app.use(express.static('docs'));

// Middleware pour attraper les erreurs
app.use(handleError);

//
app.listen(PORT, process.env.URL_SERVER, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
