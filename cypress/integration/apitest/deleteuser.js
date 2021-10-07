/// <reference types="Cypress" />

//const data = require('../../fixtures/createuser')

describe('delete a user request', ()=>{

    let accessToken = 'Bearer 79b69a660f2f15d2c8a13976ac542aa5bc1166df65a36e966b22344a90ef9412'
    let address = 'https://gorest.co.in/public/v1/users'
    let randomtext = ""
    let emailrandom = ""

    it('Create user', ()=>{
        
            cy.request({
                //Create the user
                method:'POST',
                url:address,
                headers:{
                    authorization:accessToken
                },
                body:{

                    "name":"Delete user test",
                    "gender":"male",
                    "email":"deleteemail@automation.com",
                    "status":"active"
                }
            }).then((response)=>{
                cy.log(JSON.stringify(response))
                expect(response.status).to.eq(201)
                expect(response.body.data).has.property('name', 'Delete user test')
                expect(response.body.data).has.property('email', 'deleteemail@automation.com')                
            }).then((response) =>{
                const userId = response.body.data.id
                cy.log("User id is: " + userId)
                cy.request({
                    //delete the user created
                    method: 'DELETE',
                    url:address+"/"+userId,
                    headers:{
                        authorization:accessToken
                    }
                }).then((response) =>{
                    expect(response.status).to.eq(204)
                })
            })
    });
})