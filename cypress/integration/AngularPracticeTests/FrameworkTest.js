/// <reference types="cypress"/>

import HomePage from '../../support/AngularPracticePageObjects/HomePage'
import ProductPage from '../../support/AngularPracticePageObjects/ProductPage'
import TotalPage from '../../support/AngularPracticePageObjects/TotalPage'
import PurchasePage from '../../support/AngularPracticePageObjects/PurchasePage.js'

describe('Framework', function () {

  before(function () {
    // runs once before all tests in the block
    cy.fixture('example').then(function (data) {
      this.data = data
    })
  })




  it('My FirstTest case', function () {

    const homePage = new HomePage()
    const productPage = new ProductPage()
    const totalPage = new TotalPage()
    const purchasePage = new PurchasePage()


    cy.visit(Cypress.env('url') + this.data.path)

    homePage.getEditBox().type(this.data.name)
    homePage.getGender().select(this.data.gender)
    homePage.getTwoWayDataBinding().should('have.value', this.data.name)
    homePage.getEditBox().should('have.attr', 'minlength', '2')
    homePage.getEntrepreneaur().should('be.disabled')
    Cypress.config('defaultCommandTimeout', 8000)
    homePage.getShopTab().click()



    this.data.productName.forEach(function (element) {

      cy.selectProduct(element)
    });
    productPage.checkOutButton().click()


    var sum = 0

    totalPage.getPrices().each(($el, index, $list) => {


      const amount = $el.text()
      var res = amount.split(" ")
      res = res[1].trim()
      sum = Number(sum) + Number(res)

    }).then(function () {
      cy.log(sum)
    })
    totalPage.getTotalPrice().then(function (element) {
      const amount = element.text()
      var res = amount.split(" ")
      var total = res[1].trim()
      expect(Number(total)).to.equal(sum)

    })

    totalPage.getCheckoutBtn().click()

    purchasePage.getCountryBox().type('India')
    purchasePage.getSuggestionBox().click()
    purchasePage.getCheckBox().click({ force: true })
    purchasePage.getPurchaseBtn().click()
    purchasePage.getSuccessMsg().then(function (element) {
      const actualText = element.text()
      expect(actualText.includes("Success")).to.be.true
    })

  })
})

