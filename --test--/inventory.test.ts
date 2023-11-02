
const mockInventory = {
    name: 'Cables HDMI',
    quantity: 2,
    details: 'Cable de 3m',
};

const badMockInventory = {
    name: 'Cables HDMI',
    quantity: 'coucou',
    details: 'Cable de 3m',
}

const newMockInventory = {
    name: 'Cables HDMI',
    quantity: 5,
    details: 'Cable de 3m de couleur jaune',
}

// import app from '..';
import { appTest } from './appTest';
import request from 'supertest'


describe('Test d\'une route qui n\'existe pas', () => {
        test('Réponse 404 sur une mauvaise URL', async () => {
            const res = await request(appTest)
                .get('/ouinouin');                
                expect(res).toBeTruthy();
                expect(res.status).toBe(404);
        })
    });

describe('Tests des routes inventoryController', () => {

    test('POST : Envoi d\'un mock non conforme', async() => {
        const res = await request(appTest)
            .post('/inventory')
            .send(badMockInventory)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(res).toBeTruthy();   
        expect(res.status).toBe(500);
        expect(res.text).toEqual('{"error":{"message":"syntaxe en entrée invalide pour le type integer : « coucou »"}}');
    }),
    test('POST : Envoi d\'un mockInventory conforme', async () => {
        const res = await request(appTest)
        .post('/inventory')
        .send(mockInventory)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
            expect(res).toBeTruthy();
            expect(res.status).toBe(200);
    }),
    test('GET : Récupération en BDD du mock posté', async () => {
        const res = await request(appTest)
            .get('/inventory')
            .query({
                // Correspond à faire un WHERE en BDD
                'filter': '_name eq' + 'Cables HDMI'
            });
        expect(res).toBeTruthy();
        expect(res.status).toBe(200);
        expect(res.body.quantity).toEqual(2);
        expect(res.body.details).toEqual('Cable de 3m');            
    }),
    test('PATCH : modification d\' un inventory existant en BDD', async () => {
        const inventory = await request(appTest)
            .get('/inventory')
            .query({
                name: 'Cables HDMI'
            });
        console.log(inventory.body.inventory_id);
        
        const res = await request(appTest)
            .patch('/inventory')
            .send(newMockInventory)
            .query({
                // Correspond à faire un WHERE en BDD
                'filter': '_inventory_id eq' + inventory.body.inventory_id
            })
            .set('Content-Type', 'application/json') 
            .set('Accept', 'application/json');
        console.log(res);
        expect(res).toBeTruthy();
        expect(res.status).toBe(200);
    })
});






  