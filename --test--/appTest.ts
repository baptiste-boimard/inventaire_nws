// import { Request, Response, NextFunction } from 'express';
// import 'dotenv/config'

// const express = require('express')

// export const appTest = express();

// const router = require('../src/routers/router')

// const PORT = 3050;

// appTest.use(express.urlencoded({extended: true}));
// appTest.use(express.json({extended: true}));

// appTest.use((req: Request ,res: Response ,next: NextFunction) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(`Access-Control-Allow-Methods`, `GET, PATCH, PUT, POST, DELETE, OPTIONS, HEAD`);
//   res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With,Content-Type,Authorization, Accept`);
//   res.header(`Access-Control-Allow-Credentials`, 'true');
//   next();
// });

// appTest.use(router);



// const server = appTest.listen('localhost:3050', () => {
//   console.log(`Listening on http://localhost:3050`);
// });

// module.exports = server;

import express from "express";
export const appTest = express();
import handleError from '../src/handlers/handleError';


appTest.use(express.urlencoded({extended: true}));
appTest.use(express.json());

const router  = require('../src/routers/router');
appTest.use(router);

// Middleware pour attraper les erreurs
appTest.use(handleError);