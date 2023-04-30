describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });
  it('Then: I should be able to add book to reading list and UNDO it when user clicks UNDO button on the snackbar', async () => {
    cy.get('input[type="search"]').type('java');
    cy.get('form').submit();
    if(!(cy.get('[data-testing="book-item"]').find('button:not(:disabled)'))) return;
    const listLength = cy.get('.reading-list-item').then( vals => vals.length);
    cy.get('[data-testing="book-item"]').find('button:not(:disabled)').first().click();
    cy.get('.reading-list-item').should('have.length.greaterThan', listLength);
    cy.get('.mat-simple-snackbar-action .mat-button').click();
    cy.get('.reading-list-item').should('have.length', listLength);
  });

  it('Then: I should be able to delete the book from reading list and UNDO it when user clicks UNDO button on the snackbar', async () => {
    let listLength;
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('[data-testing="book-item"]').find('button:not(:disabled)').then((elements) => {
      if(elements.length > 0){
        const firstEle = elements[0];
        firstEle.click();
        listLength = cy.get('.reading-list-item').then( vals => vals.length);
      } else return;
    });
    cy.get(('[data-testing="toggle-reading-list"]')).click();
    if (listLength === 0) return;
    cy.get('.reading-list-item .mat-icon-button').then((elements) => {
      const firstEle = elements[0];
      firstEle.click();
    })
    cy.get('.reading-list-item').should('have.length.greaterThan', listLength);
    cy.get('.mat-simple-snackbar-action .mat-button').click();
    cy.get('.reading-list-item').should('have.length', listLength);
    cy.get('.reading-list-container .mat-button').click();
  });

});
