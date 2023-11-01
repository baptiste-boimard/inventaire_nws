import { Request, Response, NextFunction } from 'express';

require('dotenv').config();
const express = require('express')

export const app = express();

const router = require('./routers/router')

const PORT = process.env.PORT || 3030;

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));

app.use((req: Request ,res: Response ,next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://51.75.133.155:3000');
  res.header(`Access-Control-Allow-Methods`, `GET, PATCH, PUT, POST, DELETE, OPTIONS, HEAD`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With,Content-Type,Authorization, Accept`);
  res.header(`Access-Control-Allow-Credentials`, 'true');
  next();
});

app.use(router);
app.use(express.static('docs'));

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

export default app;