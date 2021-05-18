const users = [
  {
    email: 'jim@example.com',
    password: 'j1m',
  },
  {
    email: 'bob@example.com',
    password: 'b0b',
  },
];

/**
 * @param {String} email
 * @param {String} password
 *
 * @return {?Object}
 */
function login(email, password) {
  return users.find((user) => user.email === email && user.password === password) || null;
}

export default login;
