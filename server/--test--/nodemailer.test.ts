import { appTest } from './appTest';
import request from 'supertest'

const sendMailMock = jest.fn().mockResolvedValue(true);
const sendbBadMailMock = jest.fn().mockResolvedValue(false);

const email = {}

jest.mock('nodemailer');
const nodemailer = require('nodemailer');

beforeEach( () => {
  sendMailMock.mockClear();
  nodemailer.createTransport.mockClear();
});

describe(`Test l'envoi d'un mail de rappel avec le mock de nodemailer`, () => {
  test(`Envoi du mail OK`, async() => {
    nodemailer.createTransport.mockReturnValue({sendMail: sendMailMock})
    const res = await request(appTest)
      .post('/loan/relaunch')
      .send({email: email})
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');   
    expect(res.status).toBe(200);
  })
  test(`Envoi du mail NOK`, async() => {
    nodemailer.createTransport.mockReturnValue({sendMail: sendbBadMailMock})
    const res = await request(appTest)
      .post('/loan/relaunch')
      .send({email: email})
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');   
    expect(res.status).toBe(421);
  })
})