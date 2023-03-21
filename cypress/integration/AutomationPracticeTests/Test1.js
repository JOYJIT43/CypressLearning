/// <reference types="Cypress" />

describe('My Second Test Suite', function () {

    it('My Test case', function () {

        //Check 
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        cy.get('input[type="checkbox"]').check(['option2', 'option3'])

        //Static Dropdown

        cy.get('select').select('option2').should('have.value', 'option2')

        //Dynamic dropdowns
        cy.get('#autocomplete').type('ind')

        cy.get('.ui-menu-item div').each((el, index, $list) => {

            if (el.text() === "India") {
                el.click()
            }


        })
        //autocomplete
        cy.get('#autocomplete').should('have.value', 'India')
        //visible invisible
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')

        //radio buttons

        cy.get('[value="radio2"]').check().should('be.checked')




    })

    it("handling Webtables", function () {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

        cy.get('tr td:nth-child(2)').each(($e1, index, $list) => {

            const text = $e1.text()
            if (text.includes("Python")) {

                cy.get("tr td:nth-child(2)").eq(index).next().then(function (price) {
                    const priceText = price.text()
                    expect(priceText).to.equal('25')
                })
            }

        })


    })

    it("Mouse Hover", function () {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

        //cy.get('div.mouse-hover-content').invoke('show')
        cy.contains('Top').click({force: true})
        cy.url().should('include','top')

        
      

    })




})