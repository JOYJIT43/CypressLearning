/// <reference types="Cypress" />
 
describe('My First Test Suite', function() 
{
 
it('My FirstTest case',function() {
 
    
    cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
 
    //in this case cypress actually mocks the request
    cy.intercept('GET','https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
    (req)=>
    {
    //modyfing the request
    req.url="https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra"
 

    //andd then forwardinf the request
    req.continue((res)=>
    {
         //expect(res.statusCode).to.equal(403)
    })
 }
 ).as("dummyUrl")
 
 cy.get("button[class='btn btn-primary']").click()
 cy.wait('@dummyUrl').should(({request,response})=>
 {
    expect(response.statusCode).to.equal(404)
 })
 
})
 
})
 