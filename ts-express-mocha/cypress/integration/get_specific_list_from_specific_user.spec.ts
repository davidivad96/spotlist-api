import users from '../../../data/users.json';
import { User, CreateListPayload } from '../interfaces';

const apiUrl = `${Cypress.env('apiUrl')}`;

describe('Get specific list from specific user', () => {
  const user: User = users[1];
  const addListBasePath = `/users/${user['id']}/lists`;
  let getListByIdBasePath: string;
  let listId: string;

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

  before(() => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}${addListBasePath}`,
      body: createListPayload,
      auth: {
        user: user['name'],
        password: user['password'],
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      listId = response.body.data.list.id;
      getListByIdBasePath = `/users/${user['id']}/lists/${listId}`;
    });
  });

  it('should return a list if the id and user are correct', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}${getListByIdBasePath}`,
      auth: {
        user: user['name'],
        password: user['password'],
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.list).to.not.be.an('array');
      expect(response.body.data.list.name).to.equal(createListPayload.list.name);
    });
  });

  it('should throw 400 if list id does not exist', () => {
    const getListByIdBasePath = `/users/${user['id']}/lists/111111`;

    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}${getListByIdBasePath}`,
      auth: {
        user: user['name'],
        password: user['password'],
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('should throw 401 if user is not the owner', () => {
    const user: User = users[2];

    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}${getListByIdBasePath}`,
      auth: {
        user: user['name'],
        password: user['password'],
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it('should throw 401 if user is does not exist', () => {
    const user: object = users[0];

    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}${getListByIdBasePath}`,
      auth: {
        user: user['name'],
        password: user['password'],
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});
