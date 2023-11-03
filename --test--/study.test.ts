import { appTest } from "./appTest";
import request from 'supertest';

const mockStudy = {
  firstname: 'firstname',
  lastname: 'lastname',
  email: 'flastname@normandiewebschool.fr'
};

const badMockStudy = {
  firstname: 123,
  lastname: 123,
  email: 123,
};

const newMockStudy = {
  firstname: 'newFirstname',
  lastname: 'newLastname',
  email: 'newflastname@normandiewebschool.fr'
};

let idMockStudyPatched: number;

describe('Test d\'une route qui n\'existe pas', () => {
  test('Réponse 404 sur une mauvaise URL', async () => {
      const res = await request(appTest)
          .get('/ouinouin');                
          expect(res).toBeTruthy();
          expect(res.status).toBe(404);
  })
});

describe('Tests de la route POST studyController', () => {
  test('POST : Envoi d\'un mock non conforme', async() => {
      const res = await request(appTest)
          .post('/study')
          .send(badMockStudy)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json');                  
      expect(res).toBeTruthy();   
      expect(res.status).toBe(500);
      expect(res.body.error.message).toEqual('Le format de données envoyé ne correpond pas');
  }),
  test('POST : Envoi d\'un mock conforme', async () => {
      const res = await request(appTest)
      .post('/study')
      .send(mockStudy)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');      
          expect(res).toBeTruthy();
          expect(res.status).toBe(200);
          expect(res.body.rowCount).toBe(1);
  }),
  test('GET : Récupération en BDD du mock posté', async () => {
    const res = await request(appTest)
        .get('/study')
        .query({
            // Correspond à faire un WHERE en BDD
            'filter': '_firstname eq' + 'firstname'
        });
    expect(res).toBeTruthy();
    expect(res.status).toBe(200);
    expect(res.body.firstname).toEqual('firstname');
    expect(res.body.lastname).toEqual('lastname');            
    expect(res.body.email).toEqual('flastname@normandiewebschool.fr');            
  })
});

describe('Tests de la route PATCH studyController', () => {
  test('PATCH : modification d\' un study existant en BDD', async () => {
      const study = await request(appTest)
          .get('/study')
          .query({
              name: 'firstname'
          });                      
      const res = await request(appTest)
          .patch(`/study/${study.body.study_id}`)
          .send(newMockStudy)
          .set('Content-Type', 'application/json') 
          .set('Accept', 'application/json');
      idMockStudyPatched = parseInt(study.body.study_id, 10); 
      expect(res).toBeTruthy();
      expect(res.status).toBe(200);
      expect(res.body.rowCount).toBe(1);
  }),
  test('PATCH : Envoi d\'un mock non conforme', async () => {
      const res = await request(appTest)
      .patch(`/study/${idMockStudyPatched}`)
      .send(badMockStudy)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');  
          expect(res.body.error).toBeTruthy();
          expect(res.status).toBe(500);
          expect(res.body.error.message).toEqual('Le format de données envoyé ne correpond pas');
  }),
  test('PATCH : Envoi d\'un mock conforme mais avec un mauvais id', async () => {
      const res = await request(appTest)
      .patch('/study/1256987')
      .send(newMockStudy)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');                    
          expect(res.body).toBeTruthy();
          expect(res.status).toBe(200);
          expect(res.body.rowCount).toBe(0);
  })
});

describe('Tests de la route GET studyController', () => {
  test('GET : Récupération en BDD du mock modifié avec son id', async () => {
      const study_id = idMockStudyPatched;
      const res = await request(appTest)
          .get(`/study/${study_id}`)        
      expect(res).toBeTruthy();
      expect(res.status).toBe(200);
      expect(res.body.firstname).toEqual('newFirstname');
      expect(res.body.lastname).toEqual('newLastname');
      expect(res.body.email).toEqual('newflastname@normandiewebschool.fr');            
  }),
  test('GET : Echec de la récupération en BDD du mock modifié avec son id', async () => {
      const fakeStudy_id: string = 'coucou';
      const res = await request(appTest)
          .get(`/study/${fakeStudy_id}`)        
      expect(res).toBeTruthy();
      expect(res.status).toBe(500);  
  }),
  test('GET : Echec de la récupération en BDD du mock modifié avec un mauvais id', async () => {
      const res = await request(appTest)
          .get(`/study/1256987`)  
      expect(res).toBeTruthy();
      expect(res.status).toBe(500);  
      expect(res.body.error.message).toEqual('Les informations sur cet étudiant ne sont pas disponible');
  })
});

describe('Tests de la route DELETE studyController', () => {
  test('DELETE : Echec de la suppression du mock modifié avec un mauvais id', async () => {
      const res = await request(appTest)
          .delete(`/study/1256987`)                    
      expect(res).toBeTruthy();
      expect(res.status).toBe(200);
      expect(res.body.rowCount).toBe(0);
  }),
  test('DELETE : Echec de la suppression du mock modifié avec un mauvais format d\'id', async () => {
      const fakeStudy_id: string = 'coucou'
      const res = await request(appTest)
          .delete(`/inventory/${fakeStudy_id}`)                                
      expect(res).toBeTruthy();
      expect(res.status).toBe(500);
      expect(res.body.error.message).toEqual('Une erreur est survenue lors de votre demande');
  }),
  test('DELETE : Suppression du mock modifié avec son id', async () => {
      const study_id = idMockStudyPatched;
      const res = await request(appTest)
          .delete(`/study/${study_id}`)  
      expect(res).toBeTruthy();
      expect(res.status).toBe(200);
      expect(res.body.rowCount).toBe(1);
  })
});