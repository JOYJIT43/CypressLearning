// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Adding customize select products cypress command
Cypress.Commands.add('addingProducts', (product) => { 

    cy.get('div.product:visible').each((el, index, $list) => {
        // $el is a wrapped jQuery element
        if (el.text().includes(product)) {
          // wrap this element so we can
          // use cypress commands on it
         // cy.wrap(el).click()
            cy.get('div.product-action button').eq(index).click()
        } 
      })

})

Cypress.Commands.add("selectProduct", (productName) => { 
  cy.get('h4.card-title').each(($el, index, $list) => {
      if($el.text().includes(productName))
      {
          cy.get('button.btn.btn-info').eq(index).click()
      }
      
      })


})