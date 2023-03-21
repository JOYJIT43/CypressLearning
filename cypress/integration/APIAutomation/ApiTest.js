/// <reference types="Cypress" />

describe('My First Test Suite', function () {

    before(function () {

        cy.fixture('BookData').then(function (data) {
            this.data = data
        })


    })



    it('My FirstTest case', function () {

        cy.
            request(this.data.method,
                Cypress.env('baseapiurl') + this.data.suburl,
                {
                    "name": this.data.Name,
                    "isbn": this.data.isbn,
                    "aisle": this.data.aisle,
                    "author": this.data.Author

                }).then(function (res) {
                    //taking this id
                    this.id = res.body.ID
                    expect(res.status).to.eq(200)
                    expect(res.body).to.have.property("Msg", "successfully added")

                })

    })


    //verified the presence of same step
    it('My Second case', function () {

        cy.
            request("GET", Cypress.env('baseapiurl')
                + "GetBook.php?ID="  
                //entering the recently created id
                + this.id)
            .then(function (res2) {
                expect(res2.status).to.eq(200)
                //expect(res2.body).to.have.property("book_name",this.data.Name)
                expect(res2.body).to.have.property("isbn",this.data.isbn)
                expect(res2.body).to.have.property("aisle",this.data.aisle)
            }
            )


    })

})