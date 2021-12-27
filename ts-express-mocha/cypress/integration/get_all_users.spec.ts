import users from '../../data/users.json';
import { User } from '../interfaces';

const apiUrl = `${Cypress.env('apiUrl')}`;

describe('Get all users', () => {
  const user: User = users[0];
  const basePath = '/users';

  it('should return a list with all users (3)', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}${basePath}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property('users');
      expect(response.body.data.users).to.have.length(3);
      expect(response.body.data.users[0].name).to.equal(user.name);
    });
  });
});
