import { appTest } from './appTest';
import request from 'supertest'

const mockInventory = {
    name: 'Cables HDMI',
    quantity: 2,
    details: 'Cable de 3m',
};

const badMockInventory = {
    name: 123,
    quantity: 'coucou',
    details: 123,
}

const newMockInventory = {
    name: 'Cables HDMI',
    quantity: 5,
    details: 'Cable de 3m de couleur jaune',
}
let idMockInventoryPosted: number;

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
        expect(res.status).toBe(400);
        expect(res.text).toEqual('Le format de données envoyé ne correpond pas');
    }),
    test('POST : Envoi d\'un mockInventory conforme', async () => {
        const res = await request(appTest)
        .post('/inventory')
        .send(mockInventory)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');      
        idMockInventoryPosted = res.body.rows[0].inventory_id;
            expect(res).toBeTruthy();
            expect(res.status).toBe(201);
            expect(res.body.rowCount).toBe(1);
    })
});

describe('Tests de la route GET inventoryController', () => {
    test('GET : Récupération de tous les inventaires', async () => {
        const res = await request(appTest)
            .get(`/inventory`);  
        expect(res).toBeTruthy();
        expect(res.status).toBe(200);         
    }),
    test('GET : Récupération en BDD du mock posté', async () => {
        const res = await request(appTest)
            .get(`/inventory/${idMockInventoryPosted}`);
        expect(res).toBeTruthy();
        expect(res.status).toBe(200);
        expect(res.body.quantity).toEqual(2);
        expect(res.body.details).toEqual('Cable de 3m');            
    }),
    test('GET : Echec de la récupération en BDD du mock avec son id', async () => {
        const fakeInventory_id: string = 'coucou';
        const res = await request(appTest)
            .get(`/inventory/${fakeInventory_id}`)                
        expect(res).toBeTruthy();
        expect(res.status).toBe(403);  
        expect(res.text).toEqual('Une erreur est survenue lors de votre demande')
    }),
    test('GET : Echec de la récupération en BDD du mock avec un mauvais id', async () => {
        const res = await request(appTest)
            .get(`/inventory/1256987`)  
        expect(res).toBeTruthy();
        expect(res.status).toBe(403);  
        expect(res.text).toEqual('Les informations sur ce matériel ne sont pas disponibe');
    })
});

describe('Tests de la route PATCH inventoryController', () => {
    test('PATCH : modification d\' un inventory existant en BDD', async () => {
        const res = await request(appTest)
            .patch(`/inventory/${idMockInventoryPosted}`)
            .send(newMockInventory)
            .set('Content-Type', 'application/json') 
            .set('Accept', 'application/json');
        expect(res).toBeTruthy();
        expect(res.status).toBe(200);
        expect(res.body.rowCount).toBe(1);
    }),
    test('PATCH : Envoi d\'un mockInventory non conforme', async () => {
        const res = await request(appTest)
        .patch(`/inventory/${idMockInventoryPosted}`)
        .send(badMockInventory)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');  
            expect(res.body.error).not.toBeTruthy();
            expect(res.status).toBe(400);
            expect(res.text).toEqual('Le format de données envoyé ne correpond pas');
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
        expect(res.status).toBe(403);
        expect(res.text).toEqual('Une erreur est survenue lors de votre demande');
    }),
    test('DELETE : Suppression du mock modifié avec son id', async () => {
        const res = await request(appTest)
            .delete(`/inventory/${idMockInventoryPosted}`)  
        expect(res).toBeTruthy();
        expect(res.status).toBe(200);
        expect(res.body.rowCount).toBe(1);
    })
});
