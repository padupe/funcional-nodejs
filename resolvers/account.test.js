const expect = require('expect');
const request = require('supertest');
const app = require('./../index');
const { generateUser, clearDatabase, default_user } = require('../prisma/seed');
const default_value = 2;

beforeAll(async () => {
  await clearDatabase();
  await generateUser();
});

afterAll(async () => {
  // await clearDatabase();
});

describe('Test GraphQL API', () => {
  describe('Get balance available', function () {
    it('should return the balance available', (done) => {
      let data = {
        query: `{
            saldo(conta: ${default_user.conta.numero}) {
              saldo
            }
          }`,
      };
      request(app)
        .get('/graphql')
        .send(data)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.saldo.saldo).toBe(default_user.conta.saldo);
        })
        .end(done);
    });

    // it('account not found', (done) => {
    //   let data = {
    //     query: `{
    //         saldo(conta: 12345) {
    //           saldo
    //         }
    //      }`,
    //   };
    //   request(app)
    //     .get('/graphql')
    //     .send(data)
    //     .expect(200)
    //     .expect((res) => {
    //       expect(res.body.data.saldo.msg);
    //     })
    //     .end(done);
    // });
  });

  describe('Post withdrawal', function () {
    it('must make the withdrawal and return the available balance', (done) => {
      let data = {
        mutation: `{
            sacar(conta: ${default_user.conta.numero}, valor: ${default_value}) {
              numero
              saldo
              msg
            }
          }`,
      };
      request(app)
        .post('/graphql')
        .send(data)
        .expect(200)
        .expect((res) => {
          expect(
            res.body.data.sacar.numero,
            res.body.data.sacar.saldo,
            res.body.data.sacar.msg
          ).toBe(default_user.conta.numero, default_user.conta.saldo);
        })
        .end(done);
    });
  });

  describe('Post deposit', function () {
    it('must make the deposit and return the available balance', (done) => {
      request(app)
        .post('/graphql')
        .send({
          mutation: `{
          depositar(conta: ${default_user.conta.numero}, valor: ${default_value}) {
            numero
            saldo
            msg
          }
        }`,
        })
        .expect(200)
        .expect((res) => {
          expect(
            res.body.data.depositar.numero,
            res.body.data.depositar.valor
          ).toBe(default_user.conta.numero, default_user.conta.saldo);
        })
        .end(done);
    });
  });
});
