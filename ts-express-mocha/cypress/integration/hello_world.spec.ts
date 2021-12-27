const apiUrl = `${Cypress.env('apiUrl')}`;

describe('Hello World', () => {
  it('should return a Hello World! message', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.equal('Hello World!');
    });
  });
});
