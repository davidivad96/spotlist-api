import users from '../../data/users.json';
import { DBUser, CreateListPayload, AddSongPayload } from '../interfaces';

const apiUrl = `${Cypress.env('apiUrl')}`;

describe('Add songs to specific list', () => {
  const user: DBUser = users[1];
  const addListBasePath = `/users/${user['id']}/lists`;
  let listId: string;
  let addSongBasePath: string;

  const createListsPayload: CreateListPayload = {
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

  const addSongPayload: AddSongPayload = {
    song: {
      artist: 'artistname',
      title: 'songtitle',
    },
  };

  before(() => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}${addListBasePath}`,
      body: createListsPayload,
      auth: {
        user: user['name'],
        password: user['password'],
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      listId = response.body.data.list.id;
      addSongBasePath = `/users/${user['id']}/lists/${listId}/songs`;
    });
  });

  it('should add a song to an existing list', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}${addSongBasePath}`,
      body: addSongPayload,
      auth: {
        user: user['name'],
        password: user['password'],
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.data.song).to.have.property('id');
      expect(response.body.data.song.title).to.equal(addSongPayload.song.title);
      expect(response.body.data.song.artist).to.equal(addSongPayload.song.artist);
    });
  });

  it('should throw 400 if list id does not exist', () => {
    const randomListIdBasePath = `/users/${user['id']}/lists/1111111/songs`;

    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}${randomListIdBasePath}`,
      body: addSongPayload,
      auth: {
        user: user['name'],
        password: user['password'],
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('should throw 401 if user does not have permissions to the list', () => {
    const nonOwnerUser: DBUser = users[2];

    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}${addSongBasePath}`,
      body: addSongPayload,
      auth: {
        user: nonOwnerUser['name'],
        password: nonOwnerUser['password'],
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it('should throw 401 if user does not exist', () => {
    const user: DBUser = users[0];

    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}${addSongBasePath}`,
      body: addSongPayload,
      auth: {
        user: user['name'],
        password: user['password'],
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});
