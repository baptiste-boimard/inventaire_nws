import { appTest } from "./appTest";
import request from 'supertest';

// const mockStudy = {
//     firstname: 'firstname',
//     lastname: 'lastname',
//     email: 'flastname@normandiewebschool.fr'
// };

// const badMockStudy = {
//     firstname: 123,
//     lastname: 123,
//     email: 123,
// };

// const newMockStudy = {
//     firstname: 'newFirstname',
//     lastname: 'newLastname',
//     email: 'newflastname@normandiewebschool.fr'
// };

// let idMockStudyPosted: number;

interface ObjectAPI {
    id: number,
    nom: string,
    prenom:string,
    mail: string,
}

describe(`Test d'une mauvais adresse pour l'API`, ()=> {
    test(`Réponse 404 sur une mauvaise URL`, async()=> {
        const res = await fetch('http://vps-a47222b1.vps.ovh.net:4242/Inventaire')
        expect(res).toBeTruthy();
        expect(res.status).toEqual(404);
    })
    test(`Récupération de la liste des éléves avec l'adresse correcte`, async()=> {
        const res = await fetch('http://vps-a47222b1.vps.ovh.net:4242/Student')
        const resJson = await res.json() as Array<ObjectAPI>;
        console.log(resJson[0]);
        
        expect(res).toBeTruthy();
        expect(res.status).toEqual(200);
        expect(resJson[0].id).toEqual(1);
        expect(resJson[0].nom).toEqual('Hellscream');
        expect(resJson[0].prenom).toEqual('Garrosh');
        expect(resJson[0].mail).toEqual('ghellscream@normandiewebschool.fr');
    })
})



// describe('Test d\'une route qui n\'existe pas', () => {
//     test('Réponse 404 sur une mauvaise URL', async () => {
//         const res = await request(appTest)
//             .get('/ouinouin');                
//             expect(res).toBeTruthy();
//             expect(res.status).toBe(404);
//     })
// });

// describe('Tests de la route POST studyController', () => {
//     test('POST : Envoi d\'un mock non conforme', async() => {
//         const res = await request(appTest)
//             .post('/study')
//             .send(badMockStudy)
//             .set('Content-Type', 'application/json')
//             .set('Accept', 'application/json');                  
//         expect(res).toBeTruthy();   
//         expect(res.status).toBe(400);
//         expect(res.text).toEqual('Le format de données envoyé ne correpond pas');
//     }),
//     test('POST : Envoi d\'un mock conforme', async () => {
//         const res = await request(appTest)
//             .post('/study')
//             .send(mockStudy)
//             .set('Content-Type', 'application/json')
//             .set('Accept', 'application/json');
//         idMockStudyPosted = res.body.rows[0].study_id;   
//         expect(res).toBeTruthy();
//         expect(res.status).toBe(200);
//         expect(res.body.rowCount).toBe(1);
//     })
// });

// describe('Tests de la route GET studyController', () => {
//     test('GET : Récupération de tous les inventaires', async () => {
//         const res = await request(appTest)
//             .get('/study');
//         expect(res).toBeTruthy();
//         expect(res.status).toBe(200);         
//     }),
//     test('GET : Récupération en BDD du mock posté avec son id', async () => {
//         const res = await request(appTest)
//             .get(`/study/${idMockStudyPosted}`)        
//         expect(res).toBeTruthy();
//         expect(res.status).toBe(200);
//         expect(res.body.firstname).toEqual('firstname');
//         expect(res.body.lastname).toEqual('lastname');
//         expect(res.body.email).toEqual('flastname@normandiewebschool.fr');            
//     }),
//     test('GET : Echec de la récupération en BDD du mock avec son id', async () => {
//         const fakeStudy_id: string = 'coucou';
//         const res = await request(appTest)
//             .get(`/study/${fakeStudy_id}`) 
//         expect(res).toBeTruthy();
//         expect(res.status).toBe(403);  
//         expect(res.text).toEqual('Une erreur est survenue lors de votre demande')
//     }),
//     test('GET : Echec de la récupération en BDD du mock avec un mauvais id', async () => {
//         const res = await request(appTest)
//             .get(`/study/1256987`)  
//         expect(res).toBeTruthy();
//         expect(res.status).toBe(403);  
//         expect(res.text).toEqual('Les informations sur cet étudiant ne sont pas disponible');
//     })
// });

// describe('Tests de la route PATCH studyController', () => {
//     test('PATCH : modification d\' un study existant en BDD', async () => {                    
//         const res = await request(appTest)
//             .patch(`/study/${idMockStudyPosted}`)
//             .send(newMockStudy)
//             .set('Content-Type', 'application/json') 
//             .set('Accept', 'application/json');
//         expect(res).toBeTruthy();
//         expect(res.status).toBe(200);
//         expect(res.body.rowCount).toBe(1);
//     }),
//     test('PATCH : Envoi d\'un mock non conforme', async () => {
//         const res = await request(appTest)
//         .patch(`/study/${idMockStudyPosted}`)
//         .send(badMockStudy)
//         .set('Content-Type', 'application/json')
//         .set('Accept', 'application/json');          
//             expect(res.body.error).not.toBeTruthy();
//             expect(res.status).toBe(400);
//             expect(res.text).toEqual('Le format de données envoyé ne correpond pas');
//     }),
//     test('PATCH : Envoi d\'un mock conforme mais avec un mauvais id', async () => {
//         const res = await request(appTest)
//         .patch('/study/1256987')
//         .send(newMockStudy)
//         .set('Content-Type', 'application/json')
//         .set('Accept', 'application/json');                    
//             expect(res.body).toBeTruthy();
//             expect(res.status).toBe(200);
//             expect(res.body.rowCount).toBe(0);
//     })
// });

// describe('Tests de la route DELETE studyController', () => {
//     test('DELETE : Echec de la suppression du mock modifié avec un mauvais id', async () => {
//         const res = await request(appTest)
//             .delete(`/study/1256987`)                    
//         expect(res).toBeTruthy();
//         expect(res.status).toBe(200);
//         expect(res.body.rowCount).toBe(0);
//     }),
//     test('DELETE : Echec de la suppression du mock modifié avec un mauvais format d\'id', async () => {
//         const fakeStudy_id: string = 'coucou'
//         const res = await request(appTest)
//             .delete(`/study/${fakeStudy_id}`)                                
//         expect(res).toBeTruthy();
//         expect(res.status).toBe(403);
//         expect(res.text).toEqual('Une erreur est survenue lors de votre demande');
//     }),
//     test('DELETE : Suppression du mock modifié avec son id', async () => {
//         const study_id = idMockStudyPosted;
//         const res = await request(appTest)
//             .delete(`/study/${study_id}`)  
//         expect(res).toBeTruthy();
//         expect(res.status).toBe(200);
//         expect(res.body.rowCount).toBe(1);
//     })
// });