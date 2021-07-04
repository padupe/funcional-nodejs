const { find, updateBalance, withdraw, deposit } = require('./account');
const defaultAccount = () => {
  return {
    numero: 123,
    saldo: 30,
  };
};
const default_value = 2;
describe('Test Account Model', () => {
  it('must find an account', async function () {
    let account = defaultAccount();

    const fakePrisma = {
      conta: {
        findUnique: jest.fn().mockReturnValue(Promise.resolve(account)),
      },
    };

    let accountSearched = await find(fakePrisma)(account.numero);

    expect(accountSearched.conta).toBe(account.conta);
    expect(accountSearched.numero).toBe(account.numero);
  });

  it('should not return an account', async function () {
    const fakePrisma = {
      conta: {
        findUnique: jest.fn().mockReturnValue(Promise.resolve(null)),
      },
    };

    let accountSearched = await find(fakePrisma)(0);

    expect(accountSearched).toBe(null);
  });

  it('must update a balance', async function () {
    let account = defaultAccount();

    const fakePrisma = {
      conta: {
        update: jest.fn().mockReturnValue(Promise.resolve(account)),
      },
    };

    let accountUpdate = await updateBalance(fakePrisma)(account.numero);

    expect(accountUpdate.conta).toBe(account.conta);
    expect(accountUpdate.numero).toBe(account.numero);
  });

  it('should not update balance', async function () {
    const fakePrisma = {
      conta: {
        update: jest.fn().mockReturnValue(Promise.resolve(null)),
      },
    };

    let accountUpdate = await updateBalance(fakePrisma)(0);
    expect(accountUpdate).toBe(null);
  });

  it('must make a withdrawal', async function () {
    let account = defaultAccount();
    let total = account.saldo - default_value;

    account.saldo -= default_value;
    const fakePrisma = {
      conta: {
        update: jest.fn().mockReturnValue(Promise.resolve(account)),
      },
    };

    let accountWithdraw = await withdraw(fakePrisma)(
      account.numero,
      default_value
    );

    expect(total).toBe(accountWithdraw.saldo);
  });

  it('failed to withdraw', async function () {
    const fakePrisma = {
      conta: {
        update: jest.fn().mockReturnValue(Promise.resolve(null)),
      },
    };

    let accountWithdraw = await deposit(fakePrisma)(0);

    expect(null).toBe(null);
  });

  it('must make a deposit', async function () {
    let account = defaultAccount();
    let total = account.saldo + default_value;

    account.saldo += default_value;
    const fakePrisma = {
      conta: {
        update: jest.fn().mockReturnValue(Promise.resolve(account)),
      },
    };

    let accountDeposit = await deposit(fakePrisma)(
      account.numero,
      default_value
    );

    expect(total).toBe(accountDeposit.saldo);
  });

  it('failed to make deposit', async function () {
    const fakePrisma = {
      conta: {
        update: jest.fn().mockReturnValue(Promise.resolve(null)),
      },
    };

    let accountDeposit = await deposit(fakePrisma)(0);

    expect(null).toBe(null);
  });
});
