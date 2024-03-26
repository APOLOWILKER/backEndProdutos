const { v4 } = require('uuid');

const users = [
  {
    id: v4(),
    email: 'apolo@mail.com',
    senha: '123123',
  },
];

class LoginsRepository {
  findUser() {
    // test
    return users;
  }
}

module.exports = new LoginsRepository();
