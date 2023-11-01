import { Request, Response, NextFunction } from 'express';
import inventoryController from '../src/controllers/inventoryController';

import request from 'supertest';
import axios from 'axios';


import express from 'express';

import app from '../src/index';

const url = 'http://localhost:3030/';
const falseUrl = 'http://localhost:3030/ouinouin';

const mockInventory = {
    cable: 42,
    mug: 2,
    laptop: 0
};

describe('Test unitaire', () => {
    
    test('Response to get / with value to mockInventory', async() => {
        // const res = await axios.get(url);service.inventory = {};

            inventoryController.services.inventory = mockInventory;

            const res = await axios.get(url);
            

                console.log(res);
                
                expect(res).toBeTruthy();
                expect(res.status).toBe(200);
                expect(res.data.cable).toBe(42);
                expect(res.data.mug).toBe(2);
                expect(res.data.laptop).toBe(0);
            }),

    // test('Test avec super test pour status 200 et mock' ,async() => {
    //     const userId = '123';
    //     const response = await request(app).get(`/user/123`);
        
    //     expect(response.status).toBe(200);
    //     expect(response.body).toEqual({
    //         id: userId,
    //         name: 'John Doel',
    //     });
    // }),

    test('BadResponse to bad url', async () => {
        try {
            
            const res = await axios.get(falseUrl);
            // const res = await app.get(falseUrl, (res: Response) => {
                expect(res).toBeTruthy();
                expect(res.status).toBe(404);
        // })
        } catch (error: any) {
            expect(error.message).toEqual('Request failed with status code 404');
        }
    

    })
});

// app.close();
