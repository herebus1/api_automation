/// <reference types="Cypress" />

//const data = require('../../fixtures/createuser')

describe('post user request', ()=>{

    let accessToken = 'Bearer 64d70925cf4cfc95c9de224f579bc504f60656284c6bc4634cf4c72edbed6755'
    let address = 'https://gorest.co.in/public/v1/users'
    let randomtext = ""
    let emailrandom = ""

    it('Create user', ()=>{

        //Code to create a random email
        var patternstring = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for(var i = 0; i < 10; i++)
            randomtext +=patternstring.charAt(Math.floor(Math.random()*patternstring.length));
            emailrandom = randomtext + '@gmail.com'
        
        cy.fixture('createuser').then((dataLoad) =>{
            cy.request({
                //Create the user
                method:'POST',
                url:address,
                headers:{
                    authorization:accessToken
                },
                body:{
                    name: dataLoad.name,
                    gender: dataLoad.gender,
                    email: emailrandom,
                    status: dataLoad.status
                }
            }).then((response)=>{
                cy.log(JSON.stringify(response))
                expect(response.status).to.eq(201)
                expect(response.body.data).has.property('email',emailrandom)
                expect(response.body.data).has.property('name',dataLoad.name)
                expect(response.body.data).has.property('status',dataLoad.status)
            }).then((response) =>{
                const userId = response.body.data.id
                cy.log("User id is: " + userId)
                cy.request({
                    //Query the user created
                    method: 'GET',
                    url:address+"/"+userId,
                    headers:{
                        authorization:accessToken
                    }
                }).then((response) =>{
                    expect(response.status).to.eq(200)
                    expect(response.body.data).has.property('id', userId)
                    expect(response.body.data).has.property('email',emailrandom)
                })
            })
        })
    });
})