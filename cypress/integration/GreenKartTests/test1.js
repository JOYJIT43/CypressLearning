/// <reference types="cypress"/>

//const cypress = require("cypress")



describe("GreenKart UI Automation Test",function()
{

    //runs before the test cases start executing
    before(function(){
          
        cy.fixture('GreenKartData').then(function(data)
        {
            this.data=data
        })

    })

    //test case 1
    it('First Test',function(){
 
        //hitting the URL
        cy.visit(Cypress.env('url')+this.data.suburl)
        
        //SEARCH BOX URL 
        cy.get('input.search-keyword').type(this.data.input)

        //telling cypress to explicitly focus on visible elements
        cy.get('div.product:visible').should('have.length',4)

        //selecting the products dynamically by creating custom commands and fixtures
        this.data.products.forEach(element => {
            cy.addingProducts(element)
        });




        // cy.get('div.product:visible').each((el, index, $list) => {
        //     // $el is a wrapped jQuery element
        //     if (el.text().includes('Cashews')) {
        //       // wrap this element so we can
        //       // use cypress commands on it
        //      // cy.wrap(el).click()
        //         cy.get('div.product-action button').eq(index).click()
        //     } 
        //   })


        //adding products statically 
        //cy.AddingProducts('Cashews')

        cy.get('a.cart-icon img').click()

        cy.contains('PROCEED TO CHECKOUT').click()

        //verifying the sum
        var sum = 0

        cy.get('tbody tr td:nth-child(4) p').each((el, index, $list) => {
           
            var price = el.text()

            sum = sum + Number(price)
        
        })
       
        //handling the promise since .text() is a jqeury method
        cy.get('span.totAmt').then(function(element)
        {
            var ActualSum = element.text()
            expect(Number(ActualSum)).to.equal(sum)
        })


        //placing order
        cy.contains('Place Order').click()

        //choose country
        cy.get('select').select('India')

        //checking check box
        cy.get('input.chkAgree').check()

        //validation of whether the checkbox is checked or not
        cy.get('input.chkAgree').should("be.checked")

        //searching element with Exact UI text
        cy.contains("Proceed").click()


        //validation
        cy.get('div.wrapperTwo').should('include.text','successfully')


        //wait
        //Cypress.config('defaultCommandTimeout','10000')

        //test that whether it is getting back to the home page or not 
        //cy.url().should('have.text','https://rahulshettyacademy.com/seleniumPractise/#/')



    
    })


})