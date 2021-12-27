import users from '../../data/users.json';
import { DBUser, CreateListPayload } from '../interfaces';

const apiUrl = `${Cypress.env('apiUrl')}`;

describe('Create list for specific user', () => {
  const user: DBUser = users[1];
  const basePath = `/users/${user['id']}/lists`;

  const createListPayload: CreateListPayload = {
    list: {
      name: 'list1',
      songs: [
        {
          artist: 'artist1',
          title: 'title1',
        },
        {
          artist: 'artist2',
          title: 'title2',
        },
      ],
    },
  };

  it('should create a list with valid object', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}${basePath}`,
      body: createListPayload,
      auth: {
        user: user['name'],
        password: user['password'],
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.data.list).to.have.property('id');
      expect(response.body.data.list.songs).to.have.length(createListPayload.list.songs.length);
    });
  });

  it('should give a 400 with invalid params', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}${basePath}`,
      body: {},
      auth: {
        user: user['name'],
        password: user['password'],
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('should give a 401 with non-authorized user', () => {
    const fakeBasePath = '/users/1111/lists';
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}${fakeBasePath}`,
      body: createListPayload,
      auth: {
        user: user['name'],
        password: user['password'],
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it('should give a 401 with non-existing user', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}${basePath}`,
      body: createListPayload,
      auth: {
        user: 'aaaa',
        password: 'bbbb',
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});
