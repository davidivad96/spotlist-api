import users from '../../data/users.json';
import { DBUser } from '../interfaces';

const apiUrl = `${Cypress.env('apiUrl')}`;

describe('Get lists from specific user', () => {
  const userOwner: DBUser = users[1];
  const userNotOwner: DBUser = users[2];
  const basePath = `/users/${userOwner['id']}/lists`;

  it('should return a list of songs if userOwner is the owner', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}${basePath}`,
      auth: {
        user: userOwner['name'],
        password: userOwner['password'],
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.lists).to.be.an('array');
    });
  });

  it('should return 401 if not owner of that list', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}${basePath}`,
      auth: {
        user: userNotOwner['name'],
        password: userNotOwner['password'],
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it('should return 401 if the user id does not exist', () => {
    const basePath = '/users/fake/lists';

    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}${basePath}`,
      auth: {
        user: userNotOwner['name'],
        password: userNotOwner['password'],
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});
