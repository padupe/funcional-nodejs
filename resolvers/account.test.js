const expect = require('expect');
const request = require('supertest');
const app = require('./../index');
const { generateUser, clearDatabase, default_user } = require('../prisma/seed');
const default_value = 2;
const greater_value = 300;

beforeAll(async () => {
  await clearDatabase();
  await generateUser();
});

afterAll(async () => {
  await clearDatabase();
});

describe('Test GraphQL API', () => {
  describe('Get balance available', async function () {
    it('should return the balance available', (done) => {
      request(app)
        .get('/graphql')
        .send({
          query: `{ saldo(conta: ${default_user.conta.numero}) { numero saldo msg } }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.saldo.saldo).toBe(default_user.conta.saldo);
        })
        .end(done);
    });

    it('account not found', (done) => {
      request(app)
        .get('/graphql')
        .send({ query: `{ saldo(conta: 12345) { numero saldo msg } }` })
        .expect(200)
        .expect((res) => {
          expect(res.body.errors[0].message).toBe('Conta não localizada!');
        })
        .end(done);
    });
  });

  describe('Post withdrawal', async function () {
    it('must make the withdrawal and return the available balance', (done) => {
      request(app)
        .post('/graphql')
        .send({
          query: `mutation{ sacar(conta: ${default_user.conta.numero}, valor: ${default_value}) { numero saldo msg } }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.sacar.saldo).toBe(
            default_user.conta.saldo - default_value
          );
        })
        .end(done);
    });

    it('withdrawal with a value less than or equal to zero.', (done) => {
      request(app)
        .post('/graphql')
        .send({
          query: `mutation{ sacar(conta: ${default_user.conta.numero}, valor: 0) { numero saldo msg } }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.errors[0].message).toBe(
            'O valor precisa ser maior que zero!'
          );
        })
        .end(done);
    });

    it('insufficient balance for withdrawal.', (done) => {
      request(app)
        .post('/graphql')
        .send({
          query: `mutation{ sacar(conta: ${default_user.conta.numero}, valor: ${greater_value}) { numero saldo msg } }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.errors[0].message).toBe('Saldo Insuficiente!');
        })
        .end(done);
    });

    it('account not found', (done) => {
      request(app)
        .post('/graphql')
        .send({
          query: `mutation{ sacar(conta: 12345, valor: ${default_value}) { numero saldo msg } }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.errors[0].message).toBe('Conta não localizada!');
        })
        .end(done);
    });
  });

  describe('Post deposit', async function () {
    it('must make the deposit and return the available balance', (done) => {
      request(app)
        .post('/graphql')
        .send({
          query: `mutation{ depositar(conta: ${default_user.conta.numero}, valor: ${default_value}) { numero saldo msg } }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.depositar.saldo + default_value).toBe(
            default_user.conta.saldo + default_value
          );
        })
        .end(done);
    });

    it('deposit with a value less than or equal to zero.', (done) => {
      request(app)
        .post('/graphql')
        .send({
          query: `mutation{ depositar(conta: ${default_user.conta.numero}, valor: 0) { numero saldo msg } }`,
        })
        .expect(200)
        .expect((res) => {
          console.log(res.body.errors);
          expect(res.body.errors[0].message).toBe(
            'O valor precisa ser maior que zero!'
          );
        })
        .end(done);
    });

    it('account not found', (done) => {
      request(app)
        .post('/graphql')
        .send({
          query: `mutation{ depositar(conta: 12345, valor: ${default_value}) { numero saldo msg } }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.errors[0].message).toBe('Conta não localizada!');
        })
        .end(done);
    });
  });
});
