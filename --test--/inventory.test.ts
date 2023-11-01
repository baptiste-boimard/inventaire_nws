import { Request, Response, NextFunction } from 'express';
import inventoryController from '../src/controllers/inventoryController';

// import request from 'supertest';
import axios from 'axios';
// import { server } from './appTest';
// import { appTest } from './appTest';

const url = 'http://localhost:3040';
const falseUrl = 'http://localhost:3040/ouinouin';
const urlTest = 'http://localhost:3050';

const mockInventory = {
    name: 'Cables HDMI',
    quantity: 2,
    details: 'Cable de 3m',
};

const badMockInventory = {
    name: 1,
    quantity: 1,
    details: 'Cable de 3m',
}


// const request = require('supertest');

let server

import { appTest } from './appTest';
import request from 'supertest'

describe('Tests des routes inventoryController', () => {

    test('muavais mock', async() => {
    try {
        const result = await request(appTest)
        .post('/inventory')
        .send(badMockInventory)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
    } catch (error) {
        console.log(error);
        expect(error).toBeTruthy();
        
    }
    })
});






  