/// <reference types="Cypress" />

describe('Handle Child Tabs And Windows', function () {


    before(function () {
        // runs once before all tests in the block
        cy.fixture('AutomationData').then(function (data) {
            this.data = data
        })
    })

    it('Child Tab', function () {

        //Check boxes
        cy.visit(Cypress.env('url') + this.data.suburl)
        cy.get('#alertbtn').click()
        cy.get('[value="Confirm"]').click()
        //window:alert
        cy.on('window:alert', (str) => {
            //Mocha
            expect(str).to.equal('Hello , share this practice page and share your knowledge')
        })

        cy.on('window:confirm', (str) => {
            //Mocha
            expect(str).to.equal('Hello , Are you sure you want to confirm?')
        })

        // manipulating the DOM on the go
        cy.get('#opentab').invoke('removeAttr', 'target').click()

        cy.url().should('include', 'https://www.rahulshettyacademy.com/')

        cy.go('back')

        cy.url().should('include', this.data.suburl)
    })



})