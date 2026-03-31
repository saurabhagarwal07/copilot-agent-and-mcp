// generated-by-copilot: E2E tests for real-time book search feature
describe('Book Search Feature', () => {
  const username = `searchuser${Math.floor(Math.random() * 10000)}`;
  const password = `searchpass${Math.floor(Math.random() * 10000)}`;

  before(() => {
    // Register and login once before all tests
    cy.visit('http://localhost:5173');
    cy.contains('Create Account').click();
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button#register').click();
    cy.contains('Registration successful! You can now log in.').should('exist');
    cy.wait(1000);
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button#login').click();
    cy.contains(`Hi, ${username}`).should('exist');
  });

  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.contains('Login').click();
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button#login').click();
    cy.contains('Books').click();
    cy.contains('h2', 'Books').should('exist');
  });

  it('should render the search input on the book list page', () => {
    cy.get('[data-testid="search-input"]').should('exist');
    cy.get('[data-testid="search-input"]').should('have.attr', 'placeholder', 'Search by title or author…');
  });

  it('should filter books by title (case-insensitive)', () => {
    cy.get('[data-testid="search-input"]').type('hobbit');
    cy.get('[data-testid="search-input"]').should('have.value', 'hobbit');
    cy.contains('The Hobbit').should('exist');
    // Other books should not be visible
    cy.contains('1984').should('not.exist');
  });

  it('should filter books by author (case-insensitive)', () => {
    cy.get('[data-testid="search-input"]').type('tolstoy');
    cy.contains('War and Peace').should('exist');
    cy.contains('Anna Karenina').should('exist');
    // A book not by Tolstoy should not appear
    cy.contains('Moby-Dick').should('not.exist');
  });

  it('should show no-results message for unmatched search', () => {
    cy.get('[data-testid="search-input"]').type('xyznonexistentbookxyz');
    cy.get('[data-testid="no-results"]').should('exist');
    cy.contains('No books match your search.').should('exist');
  });

  it('should show the clear button when search term is entered', () => {
    cy.get('[data-testid="search-clear"]').should('not.exist');
    cy.get('[data-testid="search-input"]').type('1984');
    cy.get('[data-testid="search-clear"]').should('exist');
  });

  it('should clear search term and restore book list when clear button is clicked', () => {
    cy.get('[data-testid="search-input"]').type('hobbit');
    cy.contains('The Hobbit').should('exist');
    cy.contains('1984').should('not.exist');
    cy.get('[data-testid="search-clear"]').click();
    cy.get('[data-testid="search-input"]').should('have.value', '');
    cy.contains('1984').should('exist');
    cy.contains('The Hobbit').should('exist');
  });

  it('should persist search term in Redux (visible when navigating back)', () => {
    cy.get('[data-testid="search-input"]').type('austen');
    cy.contains('Pride and Prejudice').should('exist');
    // Navigate away and back
    cy.get('a#favorites-link').click();
    cy.contains('Books').click();
    // Search term should still be in Redux store
    cy.get('[data-testid="search-input"]').should('have.value', 'austen');
    cy.contains('Pride and Prejudice').should('exist');
  });
});
