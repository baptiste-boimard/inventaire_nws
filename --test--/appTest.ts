import express from "express";
export const appTest = express();
import handleError from '../src/handlers/handleError';


appTest.use(express.urlencoded({extended: true}));
appTest.use(express.json());

const router  = require('../src/routers/router');
appTest.use(router);

// Middleware pour attraper les erreurs
appTest.use(handleError);