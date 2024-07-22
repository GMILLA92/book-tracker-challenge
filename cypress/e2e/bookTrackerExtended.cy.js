describe('Book Tracker Application Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('.table', { timeout: 10000 }).should('be.visible')
  })

  it('should display the books table when books are loaded', () => {
    cy.get('.table').should('be.visible')
  })

  it('should search for a specific book in the table', () => {
    // Enter search term
    cy.get('.search-input').type('The Fellowship of the Ring')
    cy.get('.table tbody tr', { timeout: 10000 })
      .should('have.length.greaterThan', 0)
      .then(rows => {
        const rowTexts = [...rows].map(row => row.innerText)
        cy.log('Search Results:', rowTexts)
        expect(
          rowTexts.some(text => text.includes('The Fellowship of the Ring'))
        ).to.be.true
      })
  })

  it('should add a new book, verify it across pages, delete it, and verify it is removed', () => {
    // Open add book modal
    cy.get('.add-book-button').click()

    // Add a new book using ISBN
    cy.get('.modal-input').type('9780140042597')
    cy.get('[data-testid="search-button"]').click()
    cy.get('.results-dropdown li').first().click()
    cy.get('.modal-close').click()

    // Function to check for the book on the current page
    const checkBookOnPage = bookTitle => {
      cy.get('.table tbody tr').each($row => {
        cy.wrap($row)
          .find('td:nth-child(2)')
          .then($cell => {
            if ($cell.text().includes(bookTitle)) {
              cy.wrap($cell).should('contain', bookTitle)
            }
          })
      })
    }

    // Function to navigate through pages and check for the book
    const checkAllPagesForBook = bookTitle => {
      cy.get('body').then($body => {
        if ($body.find('.pagination .next:not(.disabled)').length > 0) {
          cy.get('.pagination .next:not(.disabled)').click({ force: true })
          checkBookOnPage(bookTitle)
          checkAllPagesForBook(bookTitle)
        } else {
          checkBookOnPage(bookTitle)
        }
      })
    }

    // Start checking for the book on the first page
    checkAllPagesForBook('On the Road')

    // Delete the newly added book
    const deleteBookOnPage = bookTitle => {
      cy.get('.table tbody tr').each($row => {
        cy.wrap($row)
          .find('td:nth-child(2)')
          .then($cell => {
            if ($cell.text().includes(bookTitle)) {
              cy.wrap($row).find('[data-testid^="delete-button-"]').click()
            }
          })
      })
    }

    // Function to navigate through pages and delete the book
    const deleteBookFromAllPages = bookTitle => {
      cy.get('body').then($body => {
        if ($body.find('.pagination .next:not(.disabled)').length > 0) {
          cy.get('.pagination .next:not(.disabled)').click({ force: true })
          deleteBookOnPage(bookTitle)
          deleteBookFromAllPages(bookTitle)
        } else {
          deleteBookOnPage(bookTitle)
        }
      })
    }

    // Start deleting the book from the first page
    deleteBookFromAllPages('On the Road')

    // Verify the book is removed from all pages
    const verifyBookRemoved = bookTitle => {
      cy.get('body').then($body => {
        if ($body.find('.pagination .next:not(.disabled)').length > 0) {
          cy.get('.pagination .next:not(.disabled)').click({ force: true })
          cy.get('.table tbody tr').each($row => {
            cy.wrap($row)
              .find('td:nth-child(2)')
              .should('not.contain', bookTitle)
          })
          verifyBookRemoved(bookTitle)
        } else {
          cy.get('.table tbody tr').each($row => {
            cy.wrap($row)
              .find('td:nth-child(2)')
              .should('not.contain', bookTitle)
          })
        }
      })
    }

    // Start verification for the book removal from the first page
    verifyBookRemoved('On the Road')
  })
})
