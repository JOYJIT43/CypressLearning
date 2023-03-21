class PurchasePage
{
    getCountryBox()
    {
        return cy.get('#country')
    }
    
    getSuggestionBox()
    {
        return cy.get('.suggestions > ul > li > a')
    }

    getCheckBox()
    {
        return cy.get('#checkbox2')
    }

    getPurchaseBtn()
    {
        return cy.get('input[type="submit"]')
    }

    getSuccessMsg()
    {
        return cy.get('.alert')
    }

}
export default PurchasePage;

