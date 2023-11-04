import { appTest } from "./appTest";
import request from 'supertest';

let idMockStudy: number;
let idMockInventory: number;
let newIdMockStudy: number;
let newIdMockInventory: number;
let idMockLoanPosted: number;


const mockLoan = {
  loaning_date: new Date('2000-01-23T00:00:01'),
};

const badMockLoan = {
  loaning_date: new Date('2023-23-03T14:10:57'),
};

const newMockLoan = {
  loaning_date: new Date('1980-12-25T12:00:00'),
};

const mockInventory = {
  name: 'coucou',
  quantity: 1,
  details: 'coucou',
};

const newMockInventory = {
  name: 'aurevoir',
  quantity: 2,
  details: 'aurevoir',
};

const mockStudy = {
  firstname: 'firstname',
  lastname: 'lastname',
  email: 'flastname@normandiewebschool.fr'
};

const newMockStudy = {
  firstname: 'aurevoir',
  lastname: 'aurevoir',
  email: 'aurevoir@normandiewebschool.fr'
};

afterAll( async() => {
  //Supression de tous les ajouts à la BDD pour ce test
  await request(appTest)
  .delete(`/inventory/${idMockInventory}`);
  await request(appTest)
  .delete(`/inventory/${newIdMockInventory}`);
  await request(appTest)
  .delete(`/study/${idMockStudy}`);
  await request(appTest)
  .delete(`/study/${newIdMockStudy}`);
});

describe('Test d\'une route qui n\'existe pas', () => {
  test('Réponse 404 sur une mauvaise URL', async () => {
    const res = await request(appTest)
          .get('/ouinouin');                
          expect(res).toBeTruthy();
          expect(res.status).toBe(404);
  })
});

describe('Tests de la route POST loanController', () => {
  test('POST : Envoi d\'un mock conforme', async () => {  
    //Création d'un inventaire pour le test    
    const dataInventory = await request(appTest)
    .post('/inventory')
    .send(mockInventory);
    //Récupération de son id 
    idMockInventory = dataInventory.body.rows[0].inventory_id;
    
    //Création d'un étudiant pour le test
    const dataStudy = await request(appTest)
    .post('/study')
    .send(mockStudy)
    //Récupération de son id  
    idMockStudy = dataStudy.body.rows[0].study_id;
    
    //Création du loan avec les 2 id nécéssaire
    const res = await request(appTest)
    .post(`/loan/${idMockInventory}/${idMockStudy}`)
    .send(mockLoan)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');  
    idMockLoanPosted = res.body.rows[0].loan_id;    
        expect(res).toBeTruthy();
        expect(res.status).toBe(200);
        expect(res.body.rowCount).toBe(1);
  }),
  test('POST : Envoi d\'un mock avec une date non conforme', async() => {
    const res = await request(appTest)
        .post(`/loan/${idMockInventory}/${idMockStudy}`)
        .send(badMockLoan)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');          
    expect(res).toBeTruthy();   
    expect(res.status).toBe(500);
    expect(res.body.error.message).toEqual('La date n\'est pas conforme');
  }),
  test('POST : Envoi d\'un mock conforme mais avec des mauvais id de clé étrangères', async() => {
    const res = await request(appTest)
        .post(`/loan/1256987/1256987`)
        .send(mockLoan)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');                 
    expect(res).toBeTruthy();   
    expect(res.status).toBe(500);
    expect(res.body.error.message).toEqual('une instruction insert ou update sur la table « loan » viole la contrainte de clé\n' +
    'étrangère « inventory_id_fk »');
  })
});

describe('Tests de la route GET loanController', () => {
  test('GET : Récupération de tous les loan', async () => {
    const res = await request(appTest)
        .get('/loan')
    expect(res).toBeTruthy();
    expect(res.status).toBe(200);       
  }),
  test('GET : Récupération en BDD du mock posté avec son id', async () => {
    const res = await request(appTest)
        .get(`/loan/${idMockLoanPosted}`);    
    expect(res).toBeTruthy();
    expect(res.status).toBe(200);
    expect(res.body.firstname).toEqual('firstname');
    expect(res.body.lastname).toEqual('lastname');
    expect(res.body.email).toEqual('flastname@normandiewebschool.fr');
    expect(res.body.name).toEqual('coucou');
    expect(res.body.quantity).toBe(1);
    expect(res.body.details).toEqual('coucou');            
  }),
  test('GET : Echec de la récupération en BDD du mock modifié avec son id', async () => {
      const fakeStudy_id: string = 'coucou';
      const res = await request(appTest)
          .get(`/loan/${fakeStudy_id}`)        
      expect(res).toBeTruthy();
      expect(res.status).toBe(500);  
  }),
  test('GET : Echec de la récupération en BDD du mock modifié avec un mauvais id', async () => {
      const res = await request(appTest)
          .get(`/loan/1256987`)  
      expect(res).toBeTruthy();
      expect(res.status).toBe(500);  
      expect(res.body.error.message).toEqual('Les informations sur cet emprunt ne sont pas disponible');
  })
});

describe('Tests de la route PATCH loanController', () => {
  test('PATCH : modification d\' un loan existant en BDD', async () => {
    //Création d'un nouvel inventaire pour le test patch  
    const dataInventory = await request(appTest)
    .post('/inventory')
    .send(newMockInventory);
    //Récupération de son id 
    newIdMockInventory = dataInventory.body.rows[0].inventory_id;
    
    //Création d'un nouvel étudiant pour le test patch
    const dataStudy = await request(appTest)
    .post('/study')
    .send(newMockStudy)
    //Récupération de son id  
    newIdMockStudy = dataStudy.body.rows[0].study_id;    

    const res = await request(appTest)
        .patch(`/loan/${idMockLoanPosted}`)
        .send({
          loaning_date: newMockLoan.loaning_date,
          inventory_id: newIdMockInventory,
          study_id: newIdMockStudy,
        })
        .set('Content-Type', 'application/json') 
        .set('Accept', 'application/json');    
    expect(res).toBeTruthy();
    expect(res.status).toBe(200);
    expect(res.body.rowCount).toBe(1);
  }),
  test('PATCH : Envoi d\'un mock non conforme', async () => {    
      const res = await request(appTest)
      .patch(`/loan/${idMockLoanPosted}`)
      .send({
        loaning_date: badMockLoan.loaning_date,
        inventory_id: newIdMockInventory,
        study_id: newIdMockStudy,
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');  
          expect(res.body.error).toBeTruthy();
          expect(res.status).toBe(500);
          expect(res.body.error.message).toEqual('La date n\'est pas conforme');
  }),
  test('PATCH : Envoi d\'un mock mais avec un mauvais id', async () => {
      const res = await request(appTest)
      .patch('/loan/1256987')
      .send({
        loaning_date: newMockLoan.loaning_date,
        inventory_id: newIdMockInventory,
        study_id: newIdMockStudy,
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');                    
          expect(res.body).toBeTruthy();
          expect(res.status).toBe(200);
          expect(res.body.rowCount).toBe(0);
  })
});

describe('Tests de la route DELETE loanController', () => {
  test('DELETE : Echec de la suppression du mock modifié avec un mauvais id', async () => {
      const res = await request(appTest)
          .delete(`/loan/1256987`)                    
      expect(res).toBeTruthy();
      expect(res.status).toBe(200);
      expect(res.body.rowCount).toBe(0);
  }),
  test('DELETE : Echec de la suppression du mock modifié avec un mauvais format d\'id', async () => {
      const fakeStudy_id: string = 'coucou'
      const res = await request(appTest)
          .delete(`/loan/${fakeStudy_id}`)                                
      expect(res).toBeTruthy();
      expect(res.status).toBe(500);
      expect(res.body.error.message).toEqual('Une erreur est survenue lors de votre demande');
  }),
  test('DELETE : Suppression du mock modifié avec son id', async () => {
    console.log(idMockLoanPosted);
    
      const res = await request(appTest)
          .delete(`/loan/${idMockLoanPosted}`)  
      expect(res).toBeTruthy();
      expect(res.status).toBe(200);
      expect(res.body.rowCount).toBe(1);

      //Supression de tous les ajouts à la BDD pour ce test
      await request(appTest)
        .delete(`/inventory/${idMockInventory}`);
      await request(appTest)
        .delete(`/inventory/${newIdMockInventory}`);
      await request(appTest)
        .delete(`/study/${idMockStudy}`);
      await request(appTest)
        .delete(`/study/${newIdMockStudy}`);
  })
});