
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
let idMockInventoryPatched: number;

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

describe('Tests de la route POST inventoryController', () => {
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
    })
});

describe('Tests de la route PATCH inventoryController', () => {
    test('PATCH : modification d\' un inventory existant en BDD', async () => {
        const inventory = await request(appTest)
            .get('/inventory')
            .query({
                name: 'Cables HDMI'
            });        
        const res = await request(appTest)
            .patch(`/inventory/${inventory.body.inventory_id}`)
            .send(newMockInventory)
            .set('Content-Type', 'application/json') 
            .set('Accept', 'application/json');
        idMockInventoryPatched = parseInt(inventory.body.inventory_id, 10);
        expect(res).toBeTruthy();
        expect(res.status).toBe(200);
    }),
    test('PATCH : Envoi d\'un mockInventory non conforme', async () => {
        const res = await request(appTest)
        .patch(`/inventory/${idMockInventoryPatched}`)
        .send(badMockInventory)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');  
            expect(res.body.error).toBeTruthy();
            expect(res.status).toBe(500);
            expect(res.body.error.message).toEqual('syntaxe en entrée invalide pour le type integer : « coucou »');
    }),
    test('PATCH : Envoi d\'un mockInventory mais avec un mauvais id', async () => {
        const res = await request(appTest)
        .patch('/inventory/1256987')
        .send(newMockInventory)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');                    
            expect(res.body).toBeTruthy();
            expect(res.status).toBe(200);
            expect(res.body.rowCount).toBe(0);
    })
});

describe('Tests de la route GET inventoryController', () => {
    test('GET : Récupération en BDD du mock modifié avec son id', async () => {
        const inventory_id = idMockInventoryPatched;
        const res = await request(appTest)
            .get(`/inventory/${inventory_id}`)        
        expect(res).toBeTruthy();
        expect(res.status).toBe(200);
        expect(res.body.name).toEqual('Cables HDMI');
        expect(res.body.quantity).toEqual(5);
        expect(res.body.details).toEqual('Cable de 3m de couleur jaune');            
    }),
    test('GET : Echec de la récupération en BDD du mock modifié avec son id', async () => {
        const fakeInventory_id: string = 'coucou';
        const res = await request(appTest)
            .get(`/inventory/${fakeInventory_id}`)        
        expect(res).toBeTruthy();
        expect(res.status).toBe(500);  
    }),
    test('GET : Echec de la récupération en BDD du mock modifié avec un mauvais id', async () => {
        const res = await request(appTest)
            .get(`/inventory/1256987`)  
        expect(res).toBeTruthy();
        expect(res.status).toBe(500);  
        expect(res.body.error.message).toEqual('Les informations sur ce matériel ne sont pas disponibe');
    })
});

describe('Tests de la route DELETE inventoryController', () => {
    test('DELETE : Echec de la suppression du mock modifié avec un mauvais id', async () => {
        const res = await request(appTest)
            .delete(`/inventory/1256987`)                    
        expect(res).toBeTruthy();
        expect(res.status).toBe(200);
        expect(res.body.rowCount).toBe(0);
    }),
    test('DELETE : Echec de la suppression du mock modifié avec un mauvais format d\'id', async () => {
        const fakeInventory_id: string = 'coucou'
        const res = await request(appTest)
            .delete(`/inventory/${fakeInventory_id}`)                                
        expect(res).toBeTruthy();
        expect(res.status).toBe(500);
        expect(res.body.error.message).toEqual('Une erreur est survenue lors de votre demande');
    }),
    test('DELETE : Suppression du mock modifié avec son id', async () => {
        const inventory_id = idMockInventoryPatched;
        const res = await request(appTest)
            .delete(`/inventory/${inventory_id}`)  
        expect(res).toBeTruthy();
        expect(res.status).toBe(200);
        expect(res.body.rowCount).toBe(1);
    })
});






  