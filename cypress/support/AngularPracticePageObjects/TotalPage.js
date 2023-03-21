class TotalPage
{
    getPrices()
    {
        return cy.get('tr td:nth-child(4) strong')
    }

    getTotalPrice()
    {
        return cy.get('h3 strong')
    }

    getCheckoutBtn()
    {
        return cy.get('button.btn.btn-success')
    }

}
export default TotalPage;
