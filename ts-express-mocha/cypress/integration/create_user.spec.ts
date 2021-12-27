import users from '../../data/users.json';
import { CreateUserPayload } from '../interfaces';

const apiUrl = `${Cypress.env('apiUrl')}`;

describe('Create user', () => {
  const basePath = '/users';

  const createUserPayload: CreateUserPayload = {
    user: {
      name: 'David',
      password: '!Q@]G#DRMs&9.N/:',
    },
  };

  it('should create a user with valid object', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}${basePath}`,
      body: createUserPayload,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.data).to.have.property('user');
      expect(response.body.data.user).to.not.be.an('array');
      expect(response.body.data.user.name).to.equal(createUserPayload.user.name);
    });
  });

  it('should give a 400 with invalid params', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}${basePath}`,
      body: {},
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  const createAlreadyExistingUserPayload: CreateUserPayload = {
    user: {
      name: users[0].name,
      password: 'Whatever_342',
    },
  };

  it('should give a 400 if user already exists', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}${basePath}`,
      body: createAlreadyExistingUserPayload,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error.message).to.equal('User already exists');
    });
  });
});
