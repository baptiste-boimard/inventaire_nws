import { appTest } from "./appTest";
import request from 'supertest';

let idMockStudy: number;
let idMockInventory: number;
// let newIdMockStudy: number;
// let newIdMockInventory: number;
let idMockLoanPosted: number;
let idAPIStudy: number;

interface ObjectAPI {
  id: number,
  nom: string,
  prenom:string,
  mail: string,
}

const mockLoan = {
  loan_quantity: 1
};

// const badMockLoan = {
//   loan_quantity: 1,
//   email:'notvalid@gmail.fr',
//   name: 'badMock'
// };

// const mockLoanRelaunch = {
//   email: 'bouketin28@gmail.com',
//   loan_quantity: 1,
//   name: 'baguette de pain',
//   loaning_date: '23/01/1980',
//   due_date: '15/12/2023'
// };

// const badMockLoanRelaunch = {
//   email: 'badbouketin28@gmail',
//   loan_quantity: 1,
//   name: 'baguette de pain',
//   loaning_date: '23/01/1980',
//   due_date: '15/12/2023'
// };

const mockInventory = {
  name: 'coucou',
  quantity: 1,
  details: 'coucou',
};

// const mockStudy = {
//   firstname: 'firstname',
//   lastname: 'lastname',
//   email: 'bouketin28@gmail.com'
// };


//on mock la fonction demander l'envoi de mail
const {sendMail} = require('../src/utils/sendMail');
jest.mock('../src/utils/sendMail')
//le retour de la fonction est une promesse qui donne true
const sendMailMock = jest.fn().mockResolvedValue(true);

beforeAll( () => {
  sendMailMock.mockClear();
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
    .send(mockInventory)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');   
    //Récupération de son id   
    idMockInventory = dataInventory.body.rows[0].inventory_id;
    
    // //Création d'un étudiant pour le test
    // const dataStudy = await request(appTest)
    // .post('/study')
    // .send(mockStudy)
    // .set('Content-Type', 'application/json')
    // .set('Accept', 'application/json');   
    // //Récupération de son id
    // idMockStudy = dataStudy.body.rows[0].study_id;

    //Récupération d'un étudiant à partir de l'API
    const fetchData = await fetch('http://vps-a47222b1.vps.ovh.net:4242/Student');
    const fetchDataJson = await fetchData.json() as Array<ObjectAPI>;
    idAPIStudy = fetchDataJson[0].id
    
    //Création du loan avec les 2 id nécéssaire en mockant la fonction qui demande le service de mail
    sendMail.mockReturnValue({sendMail: sendMailMock});
    const res = await request(appTest)
    .post(`/loan/${idMockInventory}/${idAPIStudy}`)
    .send({
      loan_quantity: mockLoan.loan_quantity,
      // name: dataInventory.body.rows[0].name,
      // email: dataStudy.body.rows[0].email,
    })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
    console.log(res.body);
    
    idMockLoanPosted = res.body.rows[0].loan_id;      
      
      expect(res).toBeTruthy();
      expect(res.status).toBe(200);
      expect(res.body.rowCount).toBe(1);
  }, 20000)
  test('POST : Envoi d\'un mock conforme mais avec des mauvais id de clé étrangères', async() => {
    const res = await request(appTest)
        .post(`/loan/1256987/1256987`)
        .send(mockLoan)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');                 
    expect(res).toBeTruthy();   
    expect(res.status).toBe(500);
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
    expect(res.body.firstname).toEqual('Garrosh');
    expect(res.body.lastname).toEqual('Hellscream');
    expect(res.body.email).toEqual('ghellscream@normandiewebschool.fr');
    expect(res.body.name).toEqual('coucou');
    expect(res.body.loan_quantity).toBe(1);
    expect(res.body.details).toEqual('coucou');            
  }),
  // test('GET : Récupération en BDD du mock posté avec son id', async () => {
  //   const res = await request(appTest)
  //       .get(`/loan/${idMockLoanPosted}`);    
  //   expect(res).toBeTruthy();
  //   expect(res.status).toBe(200);
  //   expect(res.body.firstname).toEqual('firstname');
  //   expect(res.body.lastname).toEqual('lastname');
  //   expect(res.body.email).toEqual('bouketin28@gmail.com');
  //   expect(res.body.name).toEqual('coucou');
  //   expect(res.body.loan_quantity).toBe(1);
  //   expect(res.body.details).toEqual('coucou');            
  // }),
  test('GET : Echec de la récupération en BDD du mock avec un mauvais id', async () => {
      const res = await request(appTest)
          .get(`/loan/1256987`)  
      expect(res).toBeTruthy();
      expect(res.status).toBe(403);  
      expect(res.text).toEqual('Les informations sur cet emprunt ne sont pas disponible');
  })
});

// describe('Tests de la route PATCH loanController', () => {
//   test('PATCH : modification d\' un loan existant en BDD', async () => {
//     //Création d'un nouvel inventaire pour le test patch  
//     const dataInventory = await request(appTest)
//     .post('/inventory')
//     .send(newMockInventory);
//     //Récupération de son id 
//     newIdMockInventory = dataInventory.body.rows[0].inventory_id;
    
//     //Création d'un nouvel étudiant pour le test patch
//     const dataStudy = await request(appTest)
//     .post('/study')
//     .send(newMockStudy)
//     //Récupération de son id  
//     newIdMockStudy = dataStudy.body.rows[0].study_id;    

//     const res = await request(appTest)
//         .patch(`/loan/${idMockLoanPosted}`)
//         .send({
//           loaning_date: newMockLoan.loaning_date,
//           inventory_id: newIdMockInventory,
//           study_id: newIdMockStudy,
//         })
//         .set('Content-Type', 'application/json') 
//         .set('Accept', 'application/json');    
//     expect(res).toBeTruthy();
//     expect(res.status).toBe(200);
//     expect(res.body.rowCount).toBe(1);
//   }),
//   test('PATCH : Envoi d\'un mock non conforme', async () => {    
//       const res = await request(appTest)
//       .patch(`/loan/${idMockLoanPosted}`)
//       .send({
//         loaning_date: badMockLoan.loaning_date,
//         inventory_id: newIdMockInventory,
//         study_id: newIdMockStudy,
//       })
//       .set('Content-Type', 'application/json')
//       .set('Accept', 'application/json');  
//           expect(res.body.error).toBeTruthy();
//           expect(res.status).toBe(500);
//           expect(res.body.error.message).toEqual('La date n\'est pas conforme');
//   }),
//   test('PATCH : Envoi d\'un mock mais avec un mauvais id', async () => {
//       const res = await request(appTest)
//       .patch('/loan/1256987')
//       .send({
//         loaning_date: newMockLoan.loaning_date,
//         inventory_id: newIdMockInventory,
//         study_id: newIdMockStudy,
//       })
//       .set('Content-Type', 'application/json')
//       .set('Accept', 'application/json');                    
//           expect(res.body).toBeTruthy();
//           expect(res.status).toBe(200);
//           expect(res.body.rowCount).toBe(0);
//   })
// });

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
      expect(res.status).toBe(403);
      expect(res.text).toEqual('Une erreur est survenue lors de votre demande');
  })
  test('DELETE : Suppression du mock avec son id', async () => {

      const res = await request(appTest)
          .delete(`/loan/${idMockLoanPosted}`)  
      expect(res).toBeTruthy();
      expect(res.status).toBe(200);
      expect(res.body.rowCount).toBe(1);

      //Supression de tous les ajouts à la BDD pour ce test
      await request(appTest)
        .delete(`/inventory/${idMockInventory}`);
  //     // await request(appTest)
  //     //   .delete(`/study/${idMockStudy}`);
  })
});